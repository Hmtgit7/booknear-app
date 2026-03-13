import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';

/**
 * AppModule — Root module.
 *
 * Global modules (available everywhere without re-importing):
 *   - AppConfigModule → AppConfigService
 *   - PrismaModule → PrismaService
 *
 * Feature modules are registered here as the app grows.
 * Phase 1 modules will be uncommented as they are implemented.
 */
@Module({
  imports: [
    // ─── Global Infrastructure ──────────────────────────────────────────────
    AppConfigModule, // @Global — ConfigService available everywhere
    PrismaModule, // @Global — PrismaService available everywhere

    // ─── Phase 1 Feature Modules (uncomment as you implement) ───────────────
    // AuthModule,
    // UsersModule,
    // DoctorsModule,
    // AppointmentsModule,
    // KycModule,
    // FilesModule,
    // NotificationsModule,

    // ─── Phase 2 ─────────────────────────────────────────────────────────────
    // FeedModule,
    // ReviewsModule,
    // PaymentsModule,
    // AdminModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
