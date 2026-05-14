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
import { splitWithCodeFences } from '../markdown/splitter';

const DEFAULT_THROTTLE_MS = 100;
const DEFAULT_THROTTLE_CHARS = 50;
const DEFAULT_INITIAL = 'Thinking...';
const DEFAULT_EMPTY = '(no content)';
const INITIAL_SUMMARY = '[Generating...]';
const SUMMARY_MAX_CHARS = 50;
const ERROR_FOOTER = '\n\n— _(Generation interrupted)_';
const DEFAULT_MAX_ELEMENT_CHARS = 30000;

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
 * Rollover: when the current card's element content exceeds
 * `streamMaxElementChars` (Feishu rejects oversized elements with code
 * 230099), the controller splits the content at a safe boundary, finalizes
 * the current card with the head, and creates a fresh streaming card to
 * continue with the tail. Multiple rollovers within one stream are
 * supported. The head card's messageId is what `messageId` / `run()`
 * return; follow-up cards are tracked internally.
 */
export class MarkdownStreamControllerImpl implements MarkdownStreamControllerPublic {
    /** Content of the current (latest) card's markdown element. */
    private content = '';
    /**
     * Full upstream-side accumulated text. Kept separate from `content` so
     * that accumulated-mode producers (where each `append` chunk contains
     * the full history) merge correctly even after rollover has discarded
     * the head from `content`.
     */
    private fullAccumulated = '';
    private _messageId = '';
    private cardId = '';
    private sequence = 0;

    private throttle: Throttle;
    private queue = new UpdateQueue();
    private started = false;
    /**
     * Set when an unrecoverable update error occurs; subsequent pushes /
     * rollovers are skipped to avoid spamming the API. Terminal cleanup
     * still runs on a best-effort basis.
     */
    private streamingFailed = false;
    /** messageIds of every rollover card created after the head. */
    private rolloverMessageIds: string[] = [];

    private readonly maxChars: number;

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
        this.maxChars = cfg.streamMaxElementChars ?? DEFAULT_MAX_ELEMENT_CHARS;
    }

    get messageId(): string {
        return this._messageId;
    }

    async append(chunk: string): Promise<void> {
        if (!chunk) return;
        await this.ensureStarted();
        const merged = mergeStreamingText(this.fullAccumulated, chunk);
        const delta = merged.slice(this.fullAccumulated.length);
        this.fullAccumulated = merged;
        this.content += delta;
        this.throttle.note(chunk.length);
    }

    async setContent(full: string): Promise<void> {
        await this.ensureStarted();
        this.fullAccumulated = full ?? '';
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
        if (!this.cardId || this.streamingFailed) return;

        await this.queue.enqueue(async () => {
            if (this.streamingFailed) return;
            try {
                await this.pushSnapshot();
            } catch (e) {
                this.streamingFailed = true;
                this.sender.logger.warn?.('[stream] update failed', e);
            }
        });
    }

    /**
     * Roll over until content fits and then PATCH the latest card. Caller
     * must already be inside a queue task — no enqueue here. Used by
     * pushContent and the terminal helpers so they share rollover behavior.
     */
    private async pushSnapshot(): Promise<void> {
        while (this.content.length > this.maxChars) {
            await this.rollover();
        }
        const snapshot = this.content || '...';
        await this.sender.updateCardElementContent(
            this.cardId,
            ELEMENT_ID,
            snapshot,
            ++this.sequence,
        );
    }

    /**
     * Finalize the current card with as much head content as fits and start
     * a fresh streaming card for the tail. Called from inside the queue task
     * so rollover steps are serialized with regular updates.
     */
    private async rollover(): Promise<void> {
        const chunks = splitWithCodeFences(this.content, this.maxChars);
        if (chunks.length < 2) {
            // Splitter couldn't split below the cap (single token over limit?).
            // Caller's outer catch will mark streamingFailed.
            throw new Error('rollover: content not splittable below limit');
        }

        const head = chunks[0];
        const tail = chunks.slice(1).join('\n');

        // 1. Pin the old card's element to the head content.
        await this.sender.updateCardElementContent(
            this.cardId,
            ELEMENT_ID,
            head,
            ++this.sequence,
        );

        // 2. Disable streaming on the old card. Best-effort — Feishu auto-
        //    closes after 10min, so a transient failure here is recoverable.
        try {
            await this.sender.finishStreamingCard(
                this.cardId,
                ++this.sequence,
                truncateSummary(head),
            );
        } catch {
            // best effort
        }

        // 3. Create a fresh streaming card seeded with the tail. Replies use
        //    the original opts so every rollover card threads to the same
        //    original target message.
        const cardSpec = buildStreamingCard(tail || '...');
        const newCardId = await this.sender.createCardInstance(cardSpec);
        const newMessageId = await this.sender.sendCardByReference(
            this.to,
            this.idType,
            newCardId,
            this.opts,
        );

        // 4. Switch state to the new card. Sequence is per-element, restart
        //    from 0 for the fresh element.
        this.cardId = newCardId;
        this.content = tail;
        this.sequence = 0;
        this.rolloverMessageIds.push(newMessageId);
    }

    private async completeTerminal(): Promise<void> {
        await this.throttle.flushNow();
        await this.queue.drain();
        if (!this.cardId) return;

        // If the producer never appended anything, PATCH the card to a
        // neutral terminal state so the user sees the response is finalized
        // rather than a stuck "Thinking..." placeholder.
        if (!this.content && !this.streamingFailed) {
            await this.queue.enqueue(async () => {
                try {
                    await this.sender.updateCardElementContent(
                        this.cardId, ELEMENT_ID, DEFAULT_EMPTY, ++this.sequence,
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
        await this.queue.enqueue(async () => {
            try {
                await this.pushSnapshot();
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
