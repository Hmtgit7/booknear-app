import { Injectable, Logger } from '@nestjs/common';

/**
 * Prisma Service
 * Manages database connection and provides access to Prisma client
 */
@Injectable()
export class PrismaService {
  private readonly logger = new Logger(PrismaService.name);

  onModuleInit() {
    this.logger.log('PrismaService initialized');
  }

  onModuleDestroy() {
    this.logger.log('PrismaService destroyed');
  }
}
