import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MetricsInterceptor } from './metrics.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({})
export class MetricsModule {
  static register(): DynamicModule {
    return {
      module: MetricsModule,
      imports: [ConfigModule],
      controllers: [MetricsController],
      providers: [
        MetricsService,
        {
          provide: APP_INTERCEPTOR,
          useClass: MetricsInterceptor,
        },
      ],
      exports: [MetricsService],
    };
  }
}
