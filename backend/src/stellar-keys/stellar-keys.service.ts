import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

@Injectable()
export class StellarKeysService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(StellarKeysService.name);
  private secretKeyBuffer: Buffer | null = null;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const secretKey = this.configService.get<string>('stellarKeys.secretKey');
    if (secretKey) {
      this.secretKeyBuffer = Buffer.from(secretKey, 'utf-8');
      this.logger.log('Stellar secret key loaded into secure buffer');
    } else {
      this.logger.warn(
        'STELLAR_SECRET_KEY not set — Stellar signing operations will fail',
      );
    }
  }

  onModuleDestroy() {
    this.wipeSecretKey();
    this.logger.log('Stellar secret key wiped from memory');
  }

  getPublicKey(): string {
    const key = this.configService.get<string>('stellarKeys.publicKey');
    if (!key) {
      throw new Error('STELLAR_PUBLIC_KEY is not configured');
    }
    return key;
  }

  getSecretKey(): string {
    if (!this.secretKeyBuffer) {
      throw new Error(
        'Stellar secret key is not loaded — set STELLAR_SECRET_KEY',
      );
    }
    return this.secretKeyBuffer.toString('utf-8');
  }

  getRpcUrl(): string {
    return this.configService.get<string>(
      'stellarKeys.rpcUrl',
      'https://soroban-testnet.stellar.org',
    );
  }

  getNetworkPassphrase(): string {
    return this.configService.get<string>(
      'stellarKeys.networkPassphrase',
      'Test SDF Network ; September 2015',
    );
  }

  private wipeSecretKey(): void {
    if (this.secretKeyBuffer) {
      randomBytes(this.secretKeyBuffer.length).copy(this.secretKeyBuffer);
      this.secretKeyBuffer = null;
    }
  }
}
