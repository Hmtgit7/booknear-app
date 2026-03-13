import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  getLiveness() {
    return {
      status: 'ok',
      uptimeSec: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness() {
    let database: 'up' | 'down' = 'up';

    try {
      const prismaAny = this.prisma as unknown as {
        $runCommandRaw?: (command: Record<string, unknown>) => Promise<unknown>;
      };

      if (typeof prismaAny.$runCommandRaw === 'function') {
        await prismaAny.$runCommandRaw({ ping: 1 });
      } else {
        database = 'down';
      }
    } catch {
      database = 'down';
    }

    return {
      status: database === 'up' ? 'ready' : 'degraded',
      checks: {
        database,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
