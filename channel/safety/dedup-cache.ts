import type { Cache } from '@node-sdk/typings';
import { DEFAULT_DEDUP } from './types';

export interface DedupOptions {
    ttlMs?: number;          // default 12h
    maxMemEntries?: number;  // default 5000
    sweepMs?: number;        // default 5min
    namespace?: string;      // default 'channel:seen'
}

/**
 * Two-tier dedup cache: hot in-memory LRU + injectable long-term Cache.
 * Memory tier serves 99% of queries sub-millisecond; long-term tier
 * survives process restarts when a persistent Cache implementation is
 * provided. Default node-sdk `internalCache` is memory-only — callers
 * wanting cross-restart persistence inject their own Cache (e.g., Redis).
 */
export class SeenCache {
    private memory = new Map<string, number>();  // id → expireAt
    private sweeper: NodeJS.Timeout;
    private ttlMs: number;
    private maxMem: number;
    private ns: string;

    constructor(private cache: Cache, opts: DedupOptions = {}) {
        this.ttlMs = opts.ttlMs ?? DEFAULT_DEDUP.ttl;
        this.maxMem = opts.maxMemEntries ?? DEFAULT_DEDUP.maxEntries;
        this.ns = opts.namespace ?? DEFAULT_DEDUP.namespace;

        const sweepMs = opts.sweepMs ?? DEFAULT_DEDUP.sweepIntervalMs;
        this.sweeper = setInterval(() => this.sweep(), sweepMs);
        this.sweeper.unref?.();
    }

    async has(id: string): Promise<boolean> {
        const now = Date.now();
        const exp = this.memory.get(id);
        if (exp && exp > now) {
            // refresh LRU position
            this.memory.delete(id);
            this.memory.set(id, exp);
            return true;
        }
        // fall through to long-term tier
        const hit = await this.cache.get(id, { namespace: this.ns });
        if (hit) {
            this.memory.set(id, now + this.ttlMs);
            this.evictIfNeeded();
            return true;
        }
        return false;
    }

    async add(id: string): Promise<void> {
        const expireAt = Date.now() + this.ttlMs;
        this.memory.set(id, expireAt);
        this.evictIfNeeded();
        // best-effort write to long-term; ignore failures
        try {
            await this.cache.set(id, '1', expireAt, { namespace: this.ns });
        } catch {
            // tolerated — memory tier remains authoritative during the session
        }
    }

    private evictIfNeeded(): void {
        while (this.memory.size > this.maxMem) {
            const first = this.memory.keys().next().value;
            if (first === undefined) break;
            this.memory.delete(first);
        }
    }

    private sweep(): void {
        const now = Date.now();
        for (const [k, v] of this.memory) {
            if (v <= now) this.memory.delete(k);
        }
    }

    dispose(): void {
        clearInterval(this.sweeper);
        this.memory.clear();
    }
}
