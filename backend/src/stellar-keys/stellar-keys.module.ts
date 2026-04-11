import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StellarKeysService } from './stellar-keys.service';
import stellarKeysConfig from './stellar-keys.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(stellarKeysConfig)],
  providers: [StellarKeysService],
  exports: [StellarKeysService],
})
export class StellarKeysModule {}
