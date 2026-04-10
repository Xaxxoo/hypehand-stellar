import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;

  const createService = async (enableMetrics: string) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) =>
              key === 'ENABLE_METRICS' ? enableMetrics : undefined,
          },
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
    service.onModuleInit();
    return service;
  };

  describe('when disabled', () => {
    beforeEach(async () => {
      await createService('false');
    });

    it('should report as disabled', () => {
      expect(service.isEnabled()).toBe(false);
    });

    it('should return disabled message from getMetrics', () => {
      const output = service.getMetrics();
      expect(output).toContain('disabled');
    });

    it('should not track increments when disabled', () => {
      service.incrementCounter('http_requests_total', { method: 'GET' });
      const output = service.getMetrics();
      expect(output).not.toContain('http_requests_total');
    });
  });

  describe('when enabled', () => {
    beforeEach(async () => {
      await createService('true');
    });

    it('should report as enabled', () => {
      expect(service.isEnabled()).toBe(true);
    });

    it('should increment http_requests_total counter', () => {
      service.incrementCounter('http_requests_total', {
        method: 'GET',
        path: '/health',
        status: '200',
      });
      service.incrementCounter('http_requests_total', {
        method: 'GET',
        path: '/health',
        status: '200',
      });

      const output = service.getMetrics();
      expect(output).toContain('http_requests_total');
      expect(output).toContain(
        'http_requests_total{method="GET",path="/health",status="200"} 2',
      );
    });

    it('should observe http_request_duration_seconds histogram', () => {
      service.observeHistogram('http_request_duration_seconds', 0.05, {
        method: 'GET',
        path: '/health',
      });

      const output = service.getMetrics();
      expect(output).toContain('http_request_duration_seconds_bucket');
      expect(output).toContain('http_request_duration_seconds_sum');
      expect(output).toContain('http_request_duration_seconds_count');
    });

    it('should increment contract_invocations_total', () => {
      service.incrementCounter('contract_invocations_total', {
        method: 'transfer',
      });

      const output = service.getMetrics();
      expect(output).toContain(
        'contract_invocations_total{method="transfer"} 1',
      );
    });

    it('should track contract_gas_used_total', () => {
      service.incrementCounter('contract_gas_used_total', {
        method: 'transfer',
      });

      const output = service.getMetrics();
      expect(output).toContain('contract_gas_used_total');
    });

    it('should handle multiple label combinations', () => {
      service.incrementCounter('http_requests_total', {
        method: 'GET',
        path: '/health',
        status: '200',
      });
      service.incrementCounter('http_requests_total', {
        method: 'POST',
        path: '/auth/login',
        status: '201',
      });

      const output = service.getMetrics();
      expect(output).toContain('method="GET"');
      expect(output).toContain('method="POST"');
    });

    it('should produce valid Prometheus text format', () => {
      service.incrementCounter('http_requests_total', {
        method: 'GET',
        path: '/',
        status: '200',
      });

      const output = service.getMetrics();
      expect(output).toContain('# HELP http_requests_total');
      expect(output).toContain('# TYPE http_requests_total counter');
      expect(output).toContain('# TYPE http_request_duration_seconds histogram');
    });
  });

  describe('opt-in via env var', () => {
    it('should enable with ENABLE_METRICS=1', async () => {
      await createService('1');
      expect(service.isEnabled()).toBe(true);
    });

    it('should disable with ENABLE_METRICS=false', async () => {
      await createService('false');
      expect(service.isEnabled()).toBe(false);
    });

    it('should disable with undefined ENABLE_METRICS', async () => {
      await createService(undefined as unknown as string);
      expect(service.isEnabled()).toBe(false);
    });
  });
});
