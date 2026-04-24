import type {
    MarkdownStreamController as MarkdownStreamControllerPublic,
    MarkdownStreamProducer,
    SendOptions,
    SendResult,
} from '../../types';
import type { OutboundSender } from '../sender';
import type { ReceiveIdType } from '../routing';
import { Throttle } from './throttle';
import { UpdateQueue } from './update-queue';
import { mergeStreamingText } from './merge-text';

const DEFAULT_THROTTLE_MS = 100;
const DEFAULT_THROTTLE_CHARS = 50;
const DEFAULT_INITIAL = 'Thinking...';
const DEFAULT_EMPTY = '(no content)';
const INITIAL_SUMMARY = '[Generating...]';
const SUMMARY_MAX_CHARS = 50;
const ERROR_FOOTER = '\n\n— _(Generation interrupted)_';

const ELEMENT_ID = 'stream_md';

/**
 * Shorten a markdown content string into a single-line preview suitable for
 * the card's `summary.content` — shown in chat lists / message previews.
 */
function truncateSummary(text: string, max = SUMMARY_MAX_CHARS): string {
    if (!text) return '';
    const cleaned = text.replace(/\s+/g, ' ').trim();
    return cleaned.length <= max ? cleaned : cleaned.slice(0, max - 1) + '…';
}

/**
 * Build the initial card JSON for a streaming markdown reply.
 *
 * `streaming_mode: true` tells Feishu client to render incremental updates
 * (via the cardElement.content API) as a native typewriter animation.
 *
 * `print_strategy: 'fast'` means: when a new full-content update arrives,
 * immediately show any already-buffered-but-not-yet-animated text, so the
 * display doesn't lag behind the upstream token rate.
 */
function buildStreamingCard(initialText: string): object {
    return {
        schema: '2.0',
        config: {
            streaming_mode: true,
            summary: { content: INITIAL_SUMMARY },
            streaming_config: {
                print_frequency_ms: { default: 70 },
                print_step: { default: 1 },
                print_strategy: 'fast',
            },
        },
        body: {
            elements: [
                {
                    tag: 'markdown',
                    element_id: ELEMENT_ID,
                    content: initialText,
                },
            ],
        },
    };
}

/**
 * Streaming markdown reply that uses Feishu's native typewriter effect
 * (cardkit.v1.cardElement.content).
 *
 * Flow:
 *   1. ensureStarted(): create a card instance with streaming_mode=true,
 *      send it as an interactive message referencing the card_id.
 *   2. append(chunk) / setContent(full): accumulate locally, throttle.
 *   3. throttle fires: updateCardElementContent(content, sequence++)
 *      Feishu client renders typewriter animation based on the diff.
 *   4. completeTerminal(): drain queue + finishStreamingCard to disable
 *      streaming_mode (removes the typing cursor).
 *   5. producer throws → append ERROR_FOOTER + finish stream → rethrow.
 *
 * The controller keeps its public shape (`append / setContent / run /
 * messageId`) — callers don't see the implementation change.
 */
export class MarkdownStreamControllerImpl implements MarkdownStreamControllerPublic {
    private content = '';
    private _messageId = '';
    private cardId = '';
    private sequence = 0;

    private throttle: Throttle;
    private queue = new UpdateQueue();
    private started = false;

    constructor(
        private sender: OutboundSender,
        private to: string,
        private idType: ReceiveIdType,
        private opts: SendOptions,
    ) {
        const cfg = this.sender.config;
        this.throttle = new Throttle(
            {
                ms: cfg.streamThrottleMs ?? DEFAULT_THROTTLE_MS,
                chars: cfg.streamThrottleChars ?? DEFAULT_THROTTLE_CHARS,
            },
            () => this.pushContent(),
        );
    }

    get messageId(): string {
        return this._messageId;
    }

    async append(chunk: string): Promise<void> {
        if (!chunk) return;
        await this.ensureStarted();
        this.content = mergeStreamingText(this.content, chunk);
        this.throttle.note(chunk.length);
    }

    async setContent(full: string): Promise<void> {
        await this.ensureStarted();
        this.content = full ?? '';
        this.throttle.note(Number.MAX_SAFE_INTEGER);
    }

    async run(producer: MarkdownStreamProducer): Promise<SendResult> {
        // Eagerly send the placeholder card so `run()` always returns a real
        // messageId, and so that failTerminal / completeTerminal have a card
        // to PATCH even if the producer never appends anything.
        await this.ensureStarted();
        try {
            await producer(this);
        } catch (e) {
            await this.failTerminal(e);
            throw e;
        }
        await this.completeTerminal();
        return { messageId: this._messageId };
    }

    // ─── internals ─────────────────────────────────────────

    private async ensureStarted(): Promise<void> {
        if (this.started) return;
        this.started = true;

        const initialText = this.sender.config.streamInitialText ?? DEFAULT_INITIAL;
        const cardSpec = buildStreamingCard(initialText || '...');

        this.cardId = await this.sender.createCardInstance(cardSpec);
        this._messageId = await this.sender.sendCardByReference(
            this.to,
            this.idType,
            this.cardId,
            this.opts,
        );
    }

    private async pushContent(): Promise<void> {
        if (!this.cardId) return;
        const snapshot = this.content || '...';
        const seq = ++this.sequence;
        await this.queue.enqueue(async () => {
            await this.sender.updateCardElementContent(
                this.cardId,
                ELEMENT_ID,
                snapshot,
                seq,
            );
        });
    }

    private async completeTerminal(): Promise<void> {
        await this.throttle.flushNow();
        await this.queue.drain();
        if (!this.cardId) return;

        // If the producer never appended anything, PATCH the card to a
        // neutral terminal state so the user sees the response is finalized
        // rather than a stuck "Thinking..." placeholder.
        if (!this.content) {
            const seq = ++this.sequence;
            await this.queue.enqueue(async () => {
                try {
                    await this.sender.updateCardElementContent(
                        this.cardId, ELEMENT_ID, DEFAULT_EMPTY, seq,
                    );
                } catch {
                    // best effort
                }
            });
            await this.queue.drain();
        }

        try {
            await this.sender.finishStreamingCard(
                this.cardId,
                ++this.sequence,
                truncateSummary(this.content || DEFAULT_EMPTY),
            );
        } catch (e) {
            // best effort — Feishu auto-closes after 10min anyway
            this.sender.logger.warn?.('[stream] finishStreamingCard failed', e);
        }
    }

    private async failTerminal(_err: unknown): Promise<void> {
        this.throttle.dispose();
        if (!this.cardId) return;

        this.content = (this.content || '') + ERROR_FOOTER;
        const seq = ++this.sequence;
        await this.queue.enqueue(async () => {
            try {
                await this.sender.updateCardElementContent(
                    this.cardId,
                    ELEMENT_ID,
                    this.content,
                    seq,
                );
            } catch {
                // best effort
            }
        });
        await this.queue.drain();
        try {
            await this.sender.finishStreamingCard(
                this.cardId,
                ++this.sequence,
                truncateSummary(this.content),
            );
        } catch {
            // best effort
        }
    }
}

export class MarkdownStreamController {
    private impl: MarkdownStreamControllerImpl;
    constructor(
        sender: OutboundSender,
        to: string,
        idType: ReceiveIdType,
        opts: SendOptions,
    ) {
        this.impl = new MarkdownStreamControllerImpl(sender, to, idType, opts);
    }
    run(producer: MarkdownStreamProducer): Promise<SendResult> {
        return this.impl.run(producer);
    }
}
