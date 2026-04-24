import { DEFAULT_STALE_MS } from './types';

export function isStale(createTimeMs: number, windowMs: number = DEFAULT_STALE_MS): boolean {
    if (!createTimeMs || !Number.isFinite(createTimeMs)) return false;
    return Date.now() - createTimeMs > windowMs;
}
