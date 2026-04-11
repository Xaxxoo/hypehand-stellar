import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { StellarKeysService } from './stellar-keys.service';
import stellarKeysConfig from './stellar-keys.config';

describe('StellarKeysService', () => {
  let service: StellarKeysService;

  beforeEach(async () => {
    process.env.STELLAR_SECRET_KEY = 'STEST_SECRET_KEY_FOR_TESTING';
    process.env.STELLAR_PUBLIC_KEY = 'GTEST_PUBLIC_KEY_FOR_TESTING';

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [stellarKeysConfig], isGlobal: true }),
      ],
      providers: [StellarKeysService],
    }).compile();

    service = module.get<StellarKeysService>(StellarKeysService);
    service.onModuleInit();
  });

  afterEach(() => {
    service.onModuleDestroy();
    delete process.env.STELLAR_SECRET_KEY;
    delete process.env.STELLAR_PUBLIC_KEY;
  });

  it('should load and return the public key', () => {
    expect(service.getPublicKey()).toBe('GTEST_PUBLIC_KEY_FOR_TESTING');
  });

  it('should load and return the secret key from buffer', () => {
    expect(service.getSecretKey()).toBe('STEST_SECRET_KEY_FOR_TESTING');
  });

  it('should wipe secret key on destroy', () => {
    service.onModuleDestroy();
    expect(() => service.getSecretKey()).toThrow(
      'Stellar secret key is not loaded',
    );
  });

  it('should return default RPC URL when not configured', () => {
    expect(service.getRpcUrl()).toContain('soroban');
  });
});
