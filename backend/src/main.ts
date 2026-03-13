import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  const appConfig = app.get(AppConfigService);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: appConfig.isProduction,
    }),
  );
  app.use(compression());
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestIdHeader = req.headers['x-request-id'];
    const requestId =
      typeof requestIdHeader === 'string' && requestIdHeader.trim().length > 0
        ? requestIdHeader
        : randomUUID();

    req.headers['x-request-id'] = requestId;
    res.setHeader('x-request-id', requestId);
    next();
  });

  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: appConfig.isProduction ? 300 : 2000,
      standardHeaders: true,
      legacyHeaders: false,
      skip: (req) => req.path.startsWith('/health') || req.path.startsWith('/docs'),
    }),
  );

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: appConfig.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id'],
  });

  // ─── Global Prefix & Versioning ────────────────────────────────────────────
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // ─── Global Exception Filter ───────────────────────────────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ─── Global Guards (order matters) ────────────────────────────────────────
  // 1. JWT validates the token
  // 2. Roles checks the role
  // 3. Permissions checks fine-grained access
  app.useGlobalGuards(
    new JwtAuthGuard(reflector),
    new RolesGuard(reflector),
    new PermissionsGuard(reflector),
  );

  // ─── Global Interceptors ───────────────────────────────────────────────────
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  // ─── Global Validation Pipe ────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // throw on unknown fields
      transform: true, // auto-transform types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ─── Swagger (dev only) ────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('DocNear API')
      .setDescription('DocNear backend REST API — Verified doctor discovery for India')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
      .addTag('auth', 'Authentication & OTP')
      .addTag('users', 'User management')
      .addTag('doctors', 'Doctor profiles & search')
      .addTag('appointments', 'Booking & scheduling')
      .addTag('prescriptions', 'Digital prescriptions')
      .addTag('reports', 'Medical reports')
      .addTag('kyc', 'KYC verification')
      .addTag('feed', 'Doctor social feed')
      .addTag('reviews', 'Patient reviews')
      .addTag('notifications', 'Push & SMS notifications')
      .addTag('admin', 'Admin panel')
      .build();

    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));

    console.log(`📄 Swagger: http://localhost:${appConfig.port}/api/docs`);
  }

  await app.listen(appConfig.port);
  console.log(`🚀 DocNear API running on port ${appConfig.port}`);
  console.log(`🌍 Environment: ${appConfig.env}`);
}

void bootstrap();
