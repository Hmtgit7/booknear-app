import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';

/**
 * PrismaService — Wraps the Prisma client and manages the connection lifecycle.
 *
 * Connects on module init and disconnects gracefully on module destroy.
 * Use this service (not PrismaClient directly) throughout the app.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ MongoDB connected via Prisma');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('MongoDB disconnected');
  }
}
