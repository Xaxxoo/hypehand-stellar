import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (!this.metricsService.isEnabled()) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.route?.path || request.url;
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = String(response.statusCode);
          this.recordMetrics(method, path, statusCode, start);
        },
        error: () => {
          this.recordMetrics(method, path, '500', start);
        },
      }),
    );
  }

  private recordMetrics(
    method: string,
    path: string,
    statusCode: string,
    start: bigint,
  ) {
    const durationNs = Number(process.hrtime.bigint() - start);
    const durationSec = durationNs / 1e9;

    this.metricsService.incrementCounter('http_requests_total', {
      method,
      path,
      status: statusCode,
    });

    this.metricsService.observeHistogram(
      'http_request_duration_seconds',
      durationSec,
      { method, path },
    );
  }
}
