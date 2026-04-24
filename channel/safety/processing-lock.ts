import { DEFAULT_LOCK_TTL_MS } from './types';

/**
 * Short-TTL in-memory lock to prevent concurrent processing of the same
 * event — complements SeenCache by covering the "currently in flight"
 * window, during which the event is not yet committed to SeenCache.
 */
export class ProcessingLock {
    private locks = new Map<string, number>();   // id → expireAt (ms)
    private sweeper: NodeJS.Timeout;

    constructor(private ttlMs: number = DEFAULT_LOCK_TTL_MS, sweepMs: number = 60_000) {
        this.sweeper = setInterval(() => this.sweep(), sweepMs);
        this.sweeper.unref?.();
    }

    /** Returns true if the lock is acquired; false if already held. */
    acquire(id: string): boolean {
        const now = Date.now();
        const exp = this.locks.get(id);
        if (exp && exp > now) return false;
        this.locks.set(id, now + this.ttlMs);
        return true;
    }

    release(id: string): void {
        this.locks.delete(id);
    }

    private sweep(): void {
        const now = Date.now();
        for (const [k, v] of this.locks) {
            if (v <= now) this.locks.delete(k);
        }
    }

    dispose(): void {
        clearInterval(this.sweeper);
        this.locks.clear();
    }
}
