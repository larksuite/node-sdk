import type { NormalizedMessage, RejectEvent, SafetyConfig } from '../types';

export interface BatchConfig {
    delayMs: number;
    longThresholdChars: number;
    longDelayMs: number;
    maxMessages: number;
    maxChars: number;
}

export const DEFAULT_BATCH: BatchConfig = {
    delayMs: 600,
    longThresholdChars: 1000,
    longDelayMs: 2000,
    maxMessages: 8,
    maxChars: 4000,
};

export const DEFAULT_DEDUP = {
    ttl: 12 * 3600_000,
    maxEntries: 5000,
    sweepIntervalMs: 5 * 60_000,
    namespace: 'channel:seen',
} as const;

export const DEFAULT_STALE_MS = 30 * 60_000;
export const DEFAULT_LOCK_TTL_MS = 5 * 60_000;

export interface BatchedDispatch {
    message: NormalizedMessage;
    sourceIds: string[];
}

export type OnReject = (evt: RejectEvent) => void;
export type OnMessageDispatch = (merged: NormalizedMessage) => Promise<void>;

export function resolveBatchConfig(cfg?: SafetyConfig): BatchConfig {
    const t = cfg?.batch?.text ?? {};
    return {
        delayMs: t.delayMs ?? DEFAULT_BATCH.delayMs,
        longThresholdChars: t.longThresholdChars ?? DEFAULT_BATCH.longThresholdChars,
        longDelayMs: t.longDelayMs ?? DEFAULT_BATCH.longDelayMs,
        maxMessages: t.maxMessages ?? DEFAULT_BATCH.maxMessages,
        maxChars: t.maxChars ?? DEFAULT_BATCH.maxChars,
    };
}
