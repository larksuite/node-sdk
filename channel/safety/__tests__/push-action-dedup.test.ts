/**
 * Regression for card-action dedup bug:
 *   different buttons on the same card by the same user must NOT collapse
 *   under SeenCache. The channel layer ensures distinct eventIds by hashing
 *   action.tag + action.value into the key; this test locks in the pipeline
 *   contract that distinct eventIds run independently while repeat ones
 *   still dedup.
 */

import { SafetyPipeline } from '../index';
import { internalCache } from '../../../utils';

const silentLogger = {
    info: () => {}, warn: () => {}, error: () => {}, debug: () => {}, trace: () => {},
} as any;

function makePipeline(): SafetyPipeline {
    return new SafetyPipeline({
        cache: internalCache,
        logger: silentLogger,
        onReject: () => {},
        onMessage: async () => {},
        // queue + batch off so this test only exercises dedup+lock.
        config: { chatQueue: { enabled: false } },
    });
}

describe('SafetyPipeline.pushAction dedup', () => {
    test('distinct eventIds both execute (different buttons, same card+user)', async () => {
        const pipeline = makePipeline();
        let calls = 0;
        const handler = async () => { calls++; };

        await pipeline.pushAction(
            'card:m1:u1:button||{"cmd":"A"}',
            'chat1',
            handler,
        );
        await pipeline.pushAction(
            'card:m1:u1:button||{"cmd":"B"}',
            'chat1',
            handler,
        );

        expect(calls).toBe(2);
    });

    test('repeated eventId is deduped (genuine Feishu re-delivery)', async () => {
        const pipeline = makePipeline();
        let calls = 0;
        const handler = async () => { calls++; };

        const key = 'card:m2:u1:button||{"cmd":"A"}';
        await pipeline.pushAction(key, 'chat2', handler);
        await pipeline.pushAction(key, 'chat2', handler);

        expect(calls).toBe(1);
    });
});
