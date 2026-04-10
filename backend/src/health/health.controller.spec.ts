import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'SOROBAN_RPC_URL')
                return 'https://soroban-testnet.stellar.org';
              return undefined;
            },
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status with expected shape', async () => {
    const result = await controller.status();

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('uptime');
    expect(result).toHaveProperty('services');
    expect(result.services).toHaveProperty('soroban_rpc');
    expect(result.services.soroban_rpc).toHaveProperty('ok');
    expect(result.services.soroban_rpc).toHaveProperty('latency_ms');
    expect(typeof result.services.soroban_rpc.latency_ms).toBe('number');
  });

  it('should return ok or degraded status', async () => {
    const result = await controller.status();
    expect(['ok', 'degraded']).toContain(result.status);
  });
});
