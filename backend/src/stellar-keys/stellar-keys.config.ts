import { registerAs } from '@nestjs/config';

export default registerAs('stellarKeys', () => ({
  secretKey: process.env.STELLAR_SECRET_KEY,
  publicKey: process.env.STELLAR_PUBLIC_KEY,
  rpcUrl: process.env.STELLAR_RPC || 'https://soroban-testnet.stellar.org',
  networkPassphrase:
    process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
}));
