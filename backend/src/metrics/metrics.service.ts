import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface HistogramBucket {
  le: number | string;
  count: number;
}

interface HistogramEntry {
  labels: Record<string, string>;
  sum: number;
  count: number;
  buckets: HistogramBucket[];
}

interface CounterEntry {
  labels: Record<string, string>;
  value: number;
}

@Injectable()
export class MetricsService implements OnModuleInit {
  private enabled = false;
  private counters: Map<string, CounterEntry[]> = new Map();
  private histograms: Map<
    string,
    { bucketBounds: number[]; entries: HistogramEntry[] }
  > = new Map();
  private descriptions: Map<string, string> = new Map();

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const envVal = this.configService.get<string>('ENABLE_METRICS');
    this.enabled = envVal === 'true' || envVal === '1';

    this.registerCounter(
      'http_requests_total',
      'Total number of HTTP requests',
    );
    this.registerHistogram(
      'http_request_duration_seconds',
      'HTTP request duration in seconds',
      [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    );
    this.registerCounter(
      'contract_invocations_total',
      'Total number of Soroban contract invocations',
    );
    this.registerCounter(
      'contract_gas_used_total',
      'Total gas used by contract invocations',
    );
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private registerCounter(name: string, help: string) {
    this.counters.set(name, []);
    this.descriptions.set(name, help);
  }

  private registerHistogram(name: string, help: string, bounds: number[]) {
    this.histograms.set(name, { bucketBounds: bounds, entries: [] });
    this.descriptions.set(name, help);
  }

  incrementCounter(name: string, labels: Record<string, string> = {}) {
    if (!this.enabled) return;
    const entries = this.counters.get(name);
    if (!entries) return;

    const existing = entries.find((e) =>
      this.labelsMatch(e.labels, labels),
    );
    if (existing) {
      existing.value++;
    } else {
      entries.push({ labels: { ...labels }, value: 1 });
    }
  }

  observeHistogram(
    name: string,
    value: number,
    labels: Record<string, string> = {},
  ) {
    if (!this.enabled) return;
    const hist = this.histograms.get(name);
    if (!hist) return;

    let entry = hist.entries.find((e) =>
      this.labelsMatch(e.labels, labels),
    );
    if (!entry) {
      entry = {
        labels: { ...labels },
        sum: 0,
        count: 0,
        buckets: hist.bucketBounds.map((b) => ({ le: b, count: 0 })),
      };
      entry.buckets.push({ le: '+Inf', count: 0 });
      hist.entries.push(entry);
    }

    entry.sum += value;
    entry.count++;
    for (const bucket of entry.buckets) {
      if (bucket.le === '+Inf' || value <= (bucket.le as number)) {
        bucket.count++;
      }
    }
  }

  getMetrics(): string {
    if (!this.enabled) {
      return '# Metrics collection is disabled. Set ENABLE_METRICS=true to enable.\n';
    }

    const lines: string[] = [];

    for (const [name, entries] of this.counters) {
      const help = this.descriptions.get(name) || '';
      lines.push(`# HELP ${name} ${help}`);
      lines.push(`# TYPE ${name} counter`);
      if (entries.length === 0) {
        lines.push(`${name} 0`);
      }
      for (const entry of entries) {
        const labelStr = this.formatLabels(entry.labels);
        lines.push(`${name}${labelStr} ${entry.value}`);
      }
    }

    for (const [name, hist] of this.histograms) {
      const help = this.descriptions.get(name) || '';
      lines.push(`# HELP ${name} ${help}`);
      lines.push(`# TYPE ${name} histogram`);
      for (const entry of hist.entries) {
        const labelStr = this.formatLabels(entry.labels);
        for (const bucket of entry.buckets) {
          const bucketLabels = this.formatLabels({
            ...entry.labels,
            le: String(bucket.le),
          });
          lines.push(`${name}_bucket${bucketLabels} ${bucket.count}`);
        }
        lines.push(`${name}_sum${labelStr} ${entry.sum}`);
        lines.push(`${name}_count${labelStr} ${entry.count}`);
      }
    }

    return lines.join('\n') + '\n';
  }

  private labelsMatch(
    a: Record<string, string>,
    b: Record<string, string>,
  ): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => a[k] === b[k]);
  }

  private formatLabels(labels: Record<string, string>): string {
    const keys = Object.keys(labels);
    if (keys.length === 0) return '';
    const pairs = keys.map((k) => `${k}="${labels[k]}"`);
    return `{${pairs.join(',')}}`;
  }
}
