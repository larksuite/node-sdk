import type { NormalizedMessage, ResourceDescriptor, MentionInfo } from '../types';
import type { BatchConfig, BatchedDispatch } from './types';

type FlushHandler = (batch: BatchedDispatch) => Promise<void>;

/**
 * Per-scope pipeline that does two things at once:
 *   - Debounce-based batch aggregation (for IM messages)
 *   - Strict serialization of all work (both batched flushes and direct
 *     `run()` tasks) via a promise chain
 *
 * Supports two entry points:
 *   - push(msg, handler):  enqueue for batched dispatch
 *   - run(task):           run a one-shot async task serialized after any
 *                          pending batch and previous tasks
 */
export class ChatPipeline {
    private buffer: NormalizedMessage[] = [];
    private bufferChars = 0;
    private timer?: NodeJS.Timeout;
    private tail: Promise<void> = Promise.resolve();
    private pendingHandler?: FlushHandler;

    constructor(
        private config: BatchConfig,
        private serialOnly: boolean,
    ) {}

    push(msg: NormalizedMessage, handler: FlushHandler): void {
        this.buffer.push(msg);
        this.bufferChars += msg.content.length;
        this.pendingHandler ??= handler;

        // Force flush when caps reached.
        if (this.buffer.length >= this.config.maxMessages
            || this.bufferChars >= this.config.maxChars) {
            this.clearTimer();
            this.enqueueFlush();
            return;
        }

        // Pure-serial mode (debounce disabled).
        if (this.config.delayMs <= 0 || this.serialOnly) {
            this.clearTimer();
            this.enqueueFlush();
            return;
        }

        // Debounced flush.
        this.clearTimer();
        const delay = this.bufferChars >= this.config.longThresholdChars
            ? this.config.longDelayMs
            : this.config.delayMs;
        this.timer = setTimeout(() => {
            this.timer = undefined;
            this.enqueueFlush();
        }, delay);
    }

    run<T>(task: () => Promise<T>): Promise<T> {
        // Any pending batch flushes first so a follow-on action-like task
        // runs after its chat's in-flight message work.
        if (this.buffer.length > 0) {
            this.clearTimer();
            this.enqueueFlush();
        }
        const next = this.tail.then(task, task);
        this.tail = next.then(
            () => undefined,
            () => undefined,
        );
        return next as Promise<T>;
    }

    async flushNow(): Promise<void> {
        if (this.buffer.length > 0) {
            this.clearTimer();
            this.enqueueFlush();
        }
        await this.tail;
    }

    isIdle(): boolean {
        return this.buffer.length === 0 && !this.timer;
    }

    dispose(): void {
        this.clearTimer();
        this.buffer = [];
        this.pendingHandler = undefined;
    }

    private clearTimer(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }

    private enqueueFlush(): void {
        if (this.buffer.length === 0) return;
        const batch = this.buffer;
        const handler = this.pendingHandler;
        this.buffer = [];
        this.bufferChars = 0;
        this.pendingHandler = undefined;

        if (!handler) return;

        const dispatch: BatchedDispatch = {
            message: mergeBatch(batch),
            sourceIds: batch.map((m) => m.messageId),
        };

        const task = () => handler(dispatch);
        const next = this.tail.then(task, task);
        this.tail = next.then(
            () => undefined,
            () => undefined,
        );
    }
}

export class ChatPipelineManager {
    private pipelines = new Map<string, ChatPipeline>();

    constructor(private config: BatchConfig) {}

    push(scope: string, msg: NormalizedMessage, handler: FlushHandler): void {
        this.getOrCreate(scope, false).push(msg, handler);
    }

    run<T>(scope: string, task: () => Promise<T>): Promise<T> {
        return this.getOrCreate(scope, true).run(task);
    }

    private getOrCreate(scope: string, serialOnly: boolean): ChatPipeline {
        let p = this.pipelines.get(scope);
        if (!p) {
            p = new ChatPipeline(this.config, serialOnly);
            this.pipelines.set(scope, p);
        }
        return p;
    }

    async flushAll(): Promise<void> {
        await Promise.all([...this.pipelines.values()].map((p) => p.flushNow()));
    }

    async dispose(): Promise<void> {
        await this.flushAll();
        for (const p of this.pipelines.values()) p.dispose();
        this.pipelines.clear();
    }
}

/**
 * Merge a batch of NormalizedMessages (all from the same chat) into a
 * single representative message. Keeps the latest-arrival metadata and
 * unions content / resources / mentions.
 */
function mergeBatch(batch: NormalizedMessage[]): NormalizedMessage {
    if (batch.length === 1) return batch[0];
    const last = batch[batch.length - 1];

    const content = batch
        .map((m) => m.content)
        .filter((c) => c && c.length > 0)
        .join('\n\n');

    const resources = dedupBy(
        batch.flatMap((m) => m.resources),
        (r: ResourceDescriptor) => r.fileKey,
    );
    const mentions = dedupBy(
        batch.flatMap((m) => m.mentions),
        (m: MentionInfo) => m.openId ?? m.key,
    );

    return {
        ...last,
        content,
        resources,
        mentions,
        mentionAll: batch.some((m) => m.mentionAll),
        mentionedBot: batch.some((m) => m.mentionedBot),
    };
}

function dedupBy<T>(items: T[], key: (t: T) => string | undefined): T[] {
    const seen = new Set<string>();
    const out: T[] = [];
    for (const item of items) {
        const k = key(item);
        if (k == null) {
            out.push(item);
            continue;
        }
        if (seen.has(k)) continue;
        seen.add(k);
        out.push(item);
    }
    return out;
}
