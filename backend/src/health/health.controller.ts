import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  private readonly rpcUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.rpcUrl =
      this.configService.get<string>('SOROBAN_RPC_URL') ||
      'https://soroban-testnet.stellar.org';
  }

  @Get()
  async status() {
    const sorobanStatus = await this.checkSorobanRpc();

    return {
      status: sorobanStatus.ok ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.0.1',
      uptime: process.uptime(),
      services: {
        soroban_rpc: sorobanStatus,
      },
    };
  }

  private async checkSorobanRpc(): Promise<{
    ok: boolean;
    latency_ms: number;
    network?: string;
    error?: string;
  }> {
    const start = Date.now();
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getHealth',
          params: [],
        }),
        signal: AbortSignal.timeout(5000),
      });

      const data = await response.json();
      const latency = Date.now() - start;

      if (data.result?.status === 'healthy') {
        return {
          ok: true,
          latency_ms: latency,
          network: this.rpcUrl.includes('testnet') ? 'testnet' : 'mainnet',
        };
      }

      return {
        ok: false,
        latency_ms: latency,
        error: `Unexpected RPC status: ${JSON.stringify(data.result)}`,
      };
    } catch (err) {
      return {
        ok: false,
        latency_ms: Date.now() - start,
        error: err instanceof Error ? err.message : 'RPC unreachable',
      };
    }
  }
}
