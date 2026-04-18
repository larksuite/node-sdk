import { classifyError, isRetryable } from './errors';
import type { LarkChannelError } from '../types';

export interface RetryOptions {
    maxAttempts?: number;   // default 3
    baseDelayMs?: number;   // default 500
}

/**
 * Execute `op` with exponential backoff. Only retries errors classified as
 * retryable (rate_limited / unknown). Business errors (format / revoked /
 * permission / timeout) fail fast and bubble up.
 */
export async function retry<T>(
    op: (attempt: number) => Promise<T>,
    opts: RetryOptions = {}
): Promise<T> {
    const max = opts.maxAttempts ?? 3;
    const base = opts.baseDelayMs ?? 500;

    let lastErr: LarkChannelError | undefined;
    for (let attempt = 1; attempt <= max; attempt++) {
        try {
            return await op(attempt);
        } catch (raw) {
            const err = classifyError(raw, { attempt });
            lastErr = err;
            if (attempt >= max || !isRetryable(err)) {
                throw err;
            }
            const delay = base * Math.pow(3, attempt - 1);
            await sleep(delay);
        }
    }
    throw lastErr!;
}

function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}
