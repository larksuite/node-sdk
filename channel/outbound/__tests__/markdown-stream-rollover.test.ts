/**
 * Coverage for MarkdownStreamControllerImpl's rollover logic — when
 * cumulative streaming content exceeds the configured per-element cap,
 * the controller finalizes the current card and creates a fresh streaming
 * card so generation can continue without hitting Feishu's "element
 * exceeds the limit" error.
 */

import { MarkdownStreamControllerImpl } from '../streaming/markdown-stream';

interface SenderCalls {
    createCardInstance: jest.Mock;
    sendCardByReference: jest.Mock;
    updateCardElementContent: jest.Mock;
    finishStreamingCard: jest.Mock;
}

function makeStubSender(opts: {
    cap?: number;
    throttleMs?: number;
    throttleChars?: number;
    updateContentImpl?: () => Promise<void>;
} = {}): { sender: any; calls: SenderCalls; logger: { warn: jest.Mock } } {
    let cardCounter = 0;
    let messageCounter = 0;
    const logger = { warn: jest.fn() };

    const calls: SenderCalls = {
        createCardInstance: jest.fn(async () => `card_${++cardCounter}`),
        sendCardByReference: jest.fn(async () => `om_${++messageCounter}`),
        updateCardElementContent: jest.fn(opts.updateContentImpl ?? (async () => {})),
        finishStreamingCard: jest.fn(async () => {}),
    };

    const sender = {
        ...calls,
        logger,
        config: {
            streamThrottleMs: opts.throttleMs ?? 0,
            streamThrottleChars: opts.throttleChars ?? 1,
            streamMaxElementChars: opts.cap ?? 1000,
        },
    };

    return { sender, calls, logger };
}

const flush = () => new Promise<void>(r => setImmediate(r));
async function flushAll() {
    for (let i = 0; i < 10; i++) await flush();
}

describe('MarkdownStreamController rollover', () => {
    test('content under cap → no rollover, single card', async () => {
        const { sender, calls } = makeStubSender({ cap: 1000 });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        await ctrl.run(async (c) => {
            await c.append('hello world');
        });

        expect(calls.createCardInstance).toHaveBeenCalledTimes(1);
        expect(calls.sendCardByReference).toHaveBeenCalledTimes(1);
        expect(calls.finishStreamingCard).toHaveBeenCalledTimes(1);
        // updateCardElementContent fires at least once for the streaming
        // content; the exact count depends on throttle timing but >= 1.
        expect(calls.updateContentImpl).toBeUndefined();
        expect(calls.updateCardElementContent.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('content exceeds cap → rollover creates additional card(s)', async () => {
        const { sender, calls } = makeStubSender({ cap: 100 });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        await ctrl.run(async (c) => {
            // 200 chars of paragraphs — splitter should split at line boundary.
            const big = Array.from({ length: 20 }, (_, i) => `paragraph ${i}`).join('\n');
            await c.append(big);
        });

        // At least one rollover happened (head + ≥1 follow-up).
        const cardCount = calls.createCardInstance.mock.calls.length;
        expect(cardCount).toBeGreaterThanOrEqual(2);
        expect(calls.sendCardByReference).toHaveBeenCalledTimes(cardCount);
        // Each card gets finalized exactly once.
        expect(calls.finishStreamingCard).toHaveBeenCalledTimes(cardCount);
        // The head card was finalized first.
        expect(calls.finishStreamingCard.mock.calls[0][0]).toBe('card_1');
        // The last finalize targets the latest card.
        expect(calls.finishStreamingCard.mock.calls[cardCount - 1][0]).toBe(`card_${cardCount}`);
    });

    test('messageId returned is the head card (not rollover cards)', async () => {
        const { sender } = makeStubSender({ cap: 50 });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        const result = await ctrl.run(async (c) => {
            await c.append('a'.repeat(80) + '\n' + 'b'.repeat(80));
        });

        // First sendCardByReference returned 'om_1' — that's the head.
        expect(result.messageId).toBe('om_1');
    });

    test('many small appends accumulating past cap → rollover triggers correctly', async () => {
        const { sender, calls } = makeStubSender({ cap: 200 });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        await ctrl.run(async (c) => {
            for (let i = 0; i < 50; i++) {
                await c.append(`line ${i}\n`);
            }
        });

        // 50 lines × ~8 chars ≈ 400 chars total → at least one rollover.
        expect(calls.createCardInstance.mock.calls.length).toBeGreaterThanOrEqual(2);
    });

    test('update API failure → marks streamingFailed, run() still resolves', async () => {
        let updateCount = 0;
        const { sender, logger } = makeStubSender({
            cap: 1000,
            updateContentImpl: async () => {
                updateCount++;
                if (updateCount === 1) throw new Error('230099 element exceeds the limit');
            },
        });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        // Should not throw — failure is contained.
        const result = await ctrl.run(async (c) => {
            await c.append('first chunk');
            await c.append('second chunk');
        });

        expect(result.messageId).toBe('om_1');
        expect(logger.warn).toHaveBeenCalled();
        // Subsequent updates should be skipped after the first failure.
        // (We can't assert exact count without timing knowledge, but the
        // streamingFailed flag prevents further enqueues.)
    });

    test('producer throws → ERROR_FOOTER appended on the latest card', async () => {
        const { sender, calls } = makeStubSender({ cap: 100 });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        await expect(
            ctrl.run(async (c) => {
                // Trigger a rollover so the latest card is the rollover one.
                await c.append('x'.repeat(80) + '\n' + 'y'.repeat(50));
                throw new Error('producer failure');
            })
        ).rejects.toThrow('producer failure');

        // The final updateCardElementContent should target the latest
        // (rollover) card and contain the ERROR_FOOTER text.
        const allCalls = calls.updateCardElementContent.mock.calls;
        const lastUpdate = allCalls[allCalls.length - 1];
        const cardCount = calls.createCardInstance.mock.calls.length;
        expect(lastUpdate[0]).toBe(`card_${cardCount}`);
        expect(lastUpdate[2]).toContain('Generation interrupted');
    });

    test('accumulated-mode producer survives rollover (full text re-sent each chunk)', async () => {
        // After rollover, this.content is just the tail. If the producer is
        // accumulated-mode (each chunk is the full history), naive merge
        // would produce garbage because next no longer starts with prev.
        // The controller maintains fullAccumulated separately to merge
        // correctly.
        const { sender, calls } = makeStubSender({ cap: 100 });
        const ctrl = new MarkdownStreamControllerImpl(sender, 'oc_x', 'chat_id', {});

        await ctrl.run(async (c) => {
            const a = 'a'.repeat(60);
            const b = 'b'.repeat(60);
            const c2 = 'c'.repeat(60);
            // Simulate accumulated mode — each chunk includes everything so far.
            await c.append(a);
            await c.append(a + '\n' + b);            // accumulated + new line
            await c.append(a + '\n' + b + '\n' + c2); // accumulated + another
        });

        // At least one rollover happened; final card's last update should
        // contain only the trailing portion (c-block) and not bizarre
        // duplicated content from a misapplied merge.
        const allCalls = calls.updateCardElementContent.mock.calls;
        const lastSnapshot: string = allCalls[allCalls.length - 1][2];
        expect(lastSnapshot).toContain('c'.repeat(10));      // tail content present
        // tail should not double-contain the head bytes.
        expect(lastSnapshot.match(/aaaaaaaaaa/g)?.length ?? 0).toBeLessThanOrEqual(1);
    });
});
