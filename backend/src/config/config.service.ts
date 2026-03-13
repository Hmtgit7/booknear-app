import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  // ─── App ───────────────────────────────────────────────────────────────────
  get env(): string {
    return this.config.getOrThrow<string>('app.env');
  }
  get port(): number {
    return this.config.get<number>('app.port', 5000);
  }
  get isProduction(): boolean {
    return this.env === 'production';
  }

  // ─── Database ──────────────────────────────────────────────────────────────
  get databaseUrl(): string {
    return this.config.getOrThrow<string>('database.url');
  }

  // ─── Redis ─────────────────────────────────────────────────────────────────
  get redisHost(): string {
    return this.config.get<string>('redis.host', 'localhost');
  }
  get redisPort(): number {
    return this.config.get<number>('redis.port', 6379);
  }
  get redisPassword(): string | undefined {
    return this.config.get<string>('redis.password');
  }

  // ─── JWT ───────────────────────────────────────────────────────────────────
  get jwtSecret(): string {
    return this.config.getOrThrow<string>('jwt.secret');
  }
  get jwtExpiresIn(): string {
    return this.config.get<string>('jwt.expiresIn', '15m');
  }
  get jwtRefreshSecret(): string {
    return this.config.getOrThrow<string>('jwt.refreshSecret');
  }
  get jwtRefreshExpiresIn(): string {
    return this.config.get<string>('jwt.refreshExpiresIn', '7d');
  }

  // ─── AWS ───────────────────────────────────────────────────────────────────
  get awsRegion(): string {
    return this.config.get<string>('aws.region', 'ap-south-1');
  }
  get awsAccessKeyId(): string {
    return this.config.getOrThrow<string>('aws.accessKeyId');
  }
  get awsSecretAccessKey(): string {
    return this.config.getOrThrow<string>('aws.secretAccessKey');
  }
  get s3MedicalBucket(): string {
    return this.config.get<string>('aws.s3MedicalBucket', 'docnear-medical-files');
  }
  get s3KycBucket(): string {
    return this.config.get<string>('aws.s3KycBucket', 'docnear-kyc-docs');
  }

  // ─── MSG91 ─────────────────────────────────────────────────────────────────
  get msg91ApiKey(): string {
    return this.config.getOrThrow<string>('msg91.apiKey');
  }
  get msg91SenderId(): string {
    return this.config.get<string>('msg91.senderId', 'DOCNEAR');
  }
  get msg91OtpTemplateId(): string {
    return this.config.getOrThrow<string>('msg91.otpTemplateId');
  }

  // ─── Resend ────────────────────────────────────────────────────────────────
  get resendApiKey(): string {
    return this.config.getOrThrow<string>('resend.apiKey');
  }

  // ─── Razorpay ──────────────────────────────────────────────────────────────
  get razorpayKeyId(): string {
    return this.config.getOrThrow<string>('razorpay.keyId');
  }
  get razorpayKeySecret(): string {
    return this.config.getOrThrow<string>('razorpay.keySecret');
  }
  get razorpayWebhookSecret(): string {
    return this.config.getOrThrow<string>('razorpay.webhookSecret');
  }

  // ─── CORS ──────────────────────────────────────────────────────────────────
  get corsOrigins(): string[] {
    return this.config.get<string[]>('cors.origins', []);
  }
}
