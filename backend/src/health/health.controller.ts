import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get('live')
  getLiveness() {
    return this.healthService.getLiveness();
  }

  @Public()
  @Get('ready')
  async getReadiness() {
    return this.healthService.getReadiness();
  }
}
