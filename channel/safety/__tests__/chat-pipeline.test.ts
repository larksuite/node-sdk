import type { NormalizedMessage } from '../../types';
import { ChatPipeline, ChatPipelineManager } from '../chat-pipeline';
import { DEFAULT_BATCH } from '../types';

function makeMsg(id: string, content: string, chatId = 'oc_test'): NormalizedMessage {
    return {
        messageId: id,
        chatId,
        chatType: 'group',
        senderId: 'ou_alice',
        content,
        rawContentType: 'text',
        resources: [],
        mentions: [],
        mentionAll: false,
        mentionedBot: false,
        createTime: Date.now(),
    };
}

async function flushTimers(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

describe('ChatPipeline — push (batching)', () => {
    test('single message flushes after debounce delay', async () => {
        const flushes: { message: NormalizedMessage; sourceIds: string[] }[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 50 }, false);
        p.push(makeMsg('m1', 'hello'), async (b) => { flushes.push(b); });
        await flushTimers(80);
        expect(flushes).toHaveLength(1);
        expect(flushes[0].sourceIds).toEqual(['m1']);
        expect(flushes[0].message.content).toBe('hello');
    });

    test('rapid messages within window merge into one batch', async () => {
        const flushes: { message: NormalizedMessage; sourceIds: string[] }[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 50 }, false);
        p.push(makeMsg('m1', 'hello'), async (b) => { flushes.push(b); });
        p.push(makeMsg('m2', 'world'), async (b) => { flushes.push(b); });
        p.push(makeMsg('m3', 'foo'), async (b) => { flushes.push(b); });
        await flushTimers(100);
        expect(flushes).toHaveLength(1);
        expect(flushes[0].sourceIds).toEqual(['m1', 'm2', 'm3']);
        expect(flushes[0].message.content).toBe('hello\n\nworld\n\nfoo');
    });

    test('maxMessages forces flush', async () => {
        const flushes: { message: NormalizedMessage; sourceIds: string[] }[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 10_000, maxMessages: 2 }, false);
        p.push(makeMsg('m1', 'a'), async (b) => { flushes.push(b); });
        p.push(makeMsg('m2', 'b'), async (b) => { flushes.push(b); });
        await flushTimers(50);
        expect(flushes).toHaveLength(1);
    });

    test('maxChars forces flush', async () => {
        const flushes: { message: NormalizedMessage; sourceIds: string[] }[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 10_000, maxChars: 5 }, false);
        p.push(makeMsg('m1', 'hello'), async (b) => { flushes.push(b); });
        await flushTimers(50);
        expect(flushes).toHaveLength(1);
    });

    test('serial-only mode flushes immediately', async () => {
        const flushes: { message: NormalizedMessage; sourceIds: string[] }[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 1000 }, true);
        p.push(makeMsg('m1', 'a'), async (b) => { flushes.push(b); });
        await flushTimers(20);
        expect(flushes).toHaveLength(1);
    });
});

describe('ChatPipeline — serialization', () => {
    test('handlers in same pipeline run one-at-a-time', async () => {
        const order: string[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 10 }, false);

        const slow = (id: string, ms: number) => async () => {
            order.push(`${id}-start`);
            await flushTimers(ms);
            order.push(`${id}-end`);
        };

        p.push(makeMsg('m1', 'a'), slow('m1', 40));
        await flushTimers(30);
        p.push(makeMsg('m2', 'b'), slow('m2', 20));
        await flushTimers(200);

        // m1 must complete before m2 starts
        const m1Start = order.indexOf('m1-start');
        const m1End = order.indexOf('m1-end');
        const m2Start = order.indexOf('m2-start');
        expect(m1Start).toBeLessThan(m1End);
        expect(m1End).toBeLessThan(m2Start);
    });

    test('run() tasks serialize with pending batch', async () => {
        const order: string[] = [];
        const p = new ChatPipeline({ ...DEFAULT_BATCH, delayMs: 30 }, false);

        p.push(makeMsg('m1', 'a'), async () => {
            await flushTimers(50);
            order.push('batch');
        });

        await p.run(async () => {
            order.push('direct');
        });

        expect(order).toEqual(['batch', 'direct']);
    });
});

describe('ChatPipelineManager', () => {
    test('different scopes run in parallel', async () => {
        const mgr = new ChatPipelineManager({ ...DEFAULT_BATCH, delayMs: 10 });
        const order: string[] = [];
        const task = (id: string, ms: number) => async () => {
            await flushTimers(ms);
            order.push(id);
        };

        await Promise.all([
            mgr.run('A', task('A', 50)),
            mgr.run('B', task('B', 10)),
        ]);

        // B should complete before A (different scopes = parallel)
        expect(order).toEqual(['B', 'A']);
    });

    test('same scope serializes even across push and run', async () => {
        const mgr = new ChatPipelineManager({ ...DEFAULT_BATCH, delayMs: 10 });
        const order: string[] = [];

        mgr.push('A', makeMsg('m1', 'a'), async () => {
            await flushTimers(30);
            order.push('push');
        });
        await mgr.run('A', async () => { order.push('run'); });

        expect(order).toEqual(['push', 'run']);
    });
});
