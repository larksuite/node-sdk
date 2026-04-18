import type {
    CardStreamController as CardStreamControllerPublic,
    CardStreamProducer,
    SendOptions,
    SendResult,
} from '../../types';
import type { OutboundSender } from '../sender';
import type { ReceiveIdType } from '../routing';
import { Throttle } from './throttle';
import { UpdateQueue } from './update-queue';

const DEFAULT_THROTTLE_MS = 100;
const DEFAULT_THROTTLE_CHARS = 50;

/**
 * Streaming card reply — the caller provides an initial card JSON and a
 * producer that drives incremental `update()` calls with full or partial
 * new card state.
 *
 * Updates are throttled + serialized. On producer exception, the last
 * known state is kept and an error footer element is appended.
 */
export class CardStreamControllerImpl implements CardStreamControllerPublic {
    private _current: object;
    private _messageId = '';
    private throttle: Throttle;
    private queue = new UpdateQueue();

    constructor(
        private sender: OutboundSender,
        private to: string,
        private idType: ReceiveIdType,
        private opts: SendOptions,
        initial: object
    ) {
        this._current = initial;
        const cfg = sender.config;
        this.throttle = new Throttle(
            {
                ms: cfg.streamThrottleMs ?? DEFAULT_THROTTLE_MS,
                chars: cfg.streamThrottleChars ?? DEFAULT_THROTTLE_CHARS,
            },
            () => this.patch()
        );
    }

    get messageId(): string {
        return this._messageId;
    }
    get current(): object {
        return this._current;
    }

    async update(next: object | ((current: object) => object)): Promise<void> {
        const nextCard = typeof next === 'function' ? (next as (c: object) => object)(this._current) : next;
        this._current = nextCard;
        this.throttle.note(JSON.stringify(nextCard).length);
    }

    async run(producer: CardStreamProducer): Promise<SendResult> {
        await this.sendInitial();
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

    private async sendInitial(): Promise<void> {
        const id = await this.sender.sendOneWithFallback({
            to: this.to,
            idType: this.idType,
            msgType: 'interactive',
            content: this._current,
            replyTo: this.opts.replyTo,
            replyInThread: this.opts.replyInThread,
        });
        this._messageId = id;
    }

    private async patch(): Promise<void> {
        if (!this._messageId) return;
        const snapshot = this._current;
        await this.queue.enqueue(async () => {
            await this.sender.patchCard(this._messageId, snapshot);
        });
    }

    private async completeTerminal(): Promise<void> {
        await this.throttle.flushNow();
        await this.queue.drain();
    }

    private async failTerminal(_err: unknown): Promise<void> {
        this.throttle.dispose();
        const withFooter = appendErrorFooter(this._current);
        await this.queue.enqueue(async () => {
            try {
                await this.sender.patchCard(this._messageId, withFooter);
            } catch {
                // best effort
            }
        });
        await this.queue.drain();
    }
}

function appendErrorFooter(card: unknown): object {
    const cardObj = card as { elements?: unknown[] };
    const elements = Array.isArray(cardObj?.elements) ? [...cardObj.elements] : [];
    elements.push({
        tag: 'note',
        elements: [{ tag: 'plain_text', content: '⚠️ 生成中断' }],
    });
    return { ...(card as object), elements };
}

export class CardStreamController {
    private impl: CardStreamControllerImpl;
    constructor(
        sender: OutboundSender,
        to: string,
        idType: ReceiveIdType,
        opts: SendOptions,
        initial: object
    ) {
        this.impl = new CardStreamControllerImpl(sender, to, idType, opts, initial);
    }
    run(producer: CardStreamProducer): Promise<SendResult> {
        return this.impl.run(producer);
    }
}
