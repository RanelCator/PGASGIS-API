import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, MemoryHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
   ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
        async () => this.db.pingCheck('database', { timeout: 1500 }),
        async () => this.disk.checkStorage('disk', { path: 'C:\\', thresholdPercent: 0.9 }),
        async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
