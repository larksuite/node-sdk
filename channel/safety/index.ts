import type { Cache, Logger } from '@node-sdk/typings';
import type {
    BotIdentity,
    NormalizedMessage,
    PolicyConfig,
    RejectEvent,
    SafetyConfig,
} from '../types';

import { ChatPipelineManager } from './chat-pipeline';
import { SeenCache } from './dedup-cache';
import { PolicyGate } from './policy-gate';
import { ProcessingLock } from './processing-lock';
import { isStale } from './stale-detector';
import {
    DEFAULT_STALE_MS,
    OnMessageDispatch,
    OnReject,
    resolveBatchConfig,
} from './types';

export { ChatPipeline, ChatPipelineManager } from './chat-pipeline';
export { SeenCache } from './dedup-cache';
export { PolicyGate } from './policy-gate';
export { ProcessingLock } from './processing-lock';
export { isStale } from './stale-detector';
export type { PolicyDecision } from './policy-gate';

export interface SafetyPipelineOptions {
    config?: SafetyConfig;
    policy?: PolicyConfig;
    cache: Cache;
    botIdentity?: BotIdentity;
    logger: Logger;
    onReject: OnReject;
    onMessage: OnMessageDispatch;
}

/**
 * Pipeline entry facade for the channel's safety layer.
 *
 * Three tiers of protection, each targeting different event shapes:
 *   - pushMessage: full pipeline (stale + dedup + policy + lock + batch + queue)
 *   - pushAction:  dedup + lock + queue — for card button clicks and doc comments
 *   - pushLight:   dedup only — for reactions
 */
export class SafetyPipeline {
    private readonly seenCache: SeenCache;
    private readonly lock: ProcessingLock;
    private readonly policy: PolicyGate;
    private readonly manager: ChatPipelineManager;
    private readonly staleWindow: number;
    private readonly queueEnabled: boolean;

    private readonly logger: Logger;
    private readonly onReject: OnReject;
    private readonly onMessage: OnMessageDispatch;

    constructor(opts: SafetyPipelineOptions) {
        this.logger = opts.logger;
        this.onReject = opts.onReject;
        this.onMessage = opts.onMessage;

        this.staleWindow = opts.config?.staleMessageWindowMs ?? DEFAULT_STALE_MS;
        this.queueEnabled = opts.config?.chatQueue?.enabled ?? true;

        this.seenCache = new SeenCache(opts.cache, {
            ttlMs: opts.config?.dedup?.ttl,
            maxMemEntries: opts.config?.dedup?.maxEntries,
            sweepMs: opts.config?.dedup?.sweepIntervalMs,
        });
        this.lock = new ProcessingLock();
        this.policy = new PolicyGate(opts.policy, opts.botIdentity);
        this.manager = new ChatPipelineManager(resolveBatchConfig(opts.config));
    }

    // ─── tier 1: full pipeline for IM messages ─────────────

    async pushMessage(msg: NormalizedMessage): Promise<void> {
        if (isStale(msg.createTime, this.staleWindow)) {
            this.logger.debug?.(`safety: drop stale message ${msg.messageId}`);
            return;
        }
        if (await this.seenCache.has(msg.messageId)) {
            this.logger.debug?.(`safety: drop duplicate message ${msg.messageId}`);
            return;
        }
        const decision = this.policy.evaluate(msg);
        if (!decision.allowed) {
            this.onReject({
                messageId: msg.messageId,
                chatId: msg.chatId,
                senderId: msg.senderId,
                reason: decision.reason ?? 'group_not_allowed',
            } as RejectEvent);
            return;
        }
        if (!this.lock.acquire(msg.messageId)) {
            this.logger.debug?.(`safety: drop in-flight message ${msg.messageId}`);
            return;
        }

        const dispatchHandler = async (batch: { message: NormalizedMessage; sourceIds: string[] }) => {
            try {
                await this.onMessage(batch.message);
            } catch (e) {
                this.logger.error?.(`safety: message handler threw`, e);
            } finally {
                for (const id of batch.sourceIds) {
                    try { await this.seenCache.add(id); } catch { /* best effort */ }
                    this.lock.release(id);
                }
            }
        };

        if (this.queueEnabled) {
            this.manager.push(msg.chatId, msg, dispatchHandler);
        } else {
            // queueing disabled: fire-and-forget, no batch either
            void dispatchHandler({ message: msg, sourceIds: [msg.messageId] });
        }
    }

    // ─── tier 2: dedup + lock + queue for cardAction & comment ─────

    async pushAction(
        eventId: string,
        queueScope: string,
        handler: () => Promise<void>,
    ): Promise<void> {
        if (await this.seenCache.has(eventId)) {
            this.logger.debug?.(`safety: drop duplicate action ${eventId}`);
            return;
        }
        if (!this.lock.acquire(eventId)) {
            this.logger.debug?.(`safety: drop in-flight action ${eventId}`);
            return;
        }

        const task = async () => {
            try {
                await handler();
            } catch (e) {
                this.logger.error?.(`safety: action handler threw`, e);
            } finally {
                try { await this.seenCache.add(eventId); } catch { /* best effort */ }
                this.lock.release(eventId);
            }
        };

        if (this.queueEnabled) {
            await this.manager.run(queueScope, task);
        } else {
            await task();
        }
    }

    // ─── tier 3: dedup only (reactions) ────────────────────

    async pushLight(eventId: string, handler: () => void | Promise<void>): Promise<void> {
        if (await this.seenCache.has(eventId)) return;
        await this.seenCache.add(eventId);
        try {
            await handler();
        } catch (e) {
            this.logger.warn?.(`safety: light handler threw`, e);
        }
    }

    // ─── runtime config ────────────────────────────────────

    updatePolicy(partial: Partial<PolicyConfig>): void {
        this.policy.updateConfig(partial);
    }

    getPolicy(): Readonly<PolicyConfig> {
        return this.policy.getConfig();
    }

    setBotIdentity(bot: BotIdentity): void {
        this.policy.setBotIdentity(bot);
    }

    async dispose(): Promise<void> {
        await this.manager.dispose();
        this.seenCache.dispose();
        this.lock.dispose();
    }
}
