import { LarkChannelError } from '../../types';
import { retry } from '../retry';

describe('retry', () => {
    test('returns result on first success', async () => {
        let calls = 0;
        const r = await retry(async () => { calls++; return 'ok'; });
        expect(r).toBe('ok');
        expect(calls).toBe(1);
    });

    test('retries on retryable errors and eventually succeeds', async () => {
        let calls = 0;
        const r = await retry(
            async () => {
                calls++;
                if (calls < 2) throw new LarkChannelError('rate_limited', 'limited');
                return 'ok';
            },
            { maxAttempts: 3, baseDelayMs: 1 }
        );
        expect(r).toBe('ok');
        expect(calls).toBe(2);
    });

    test('gives up after maxAttempts', async () => {
        let calls = 0;
        await expect(
            retry(
                async () => {
                    calls++;
                    throw new LarkChannelError('rate_limited', 'nope');
                },
                { maxAttempts: 3, baseDelayMs: 1 }
            )
        ).rejects.toMatchObject({ code: 'rate_limited' });
        expect(calls).toBe(3);
    });

    test('does not retry business errors', async () => {
        let calls = 0;
        await expect(
            retry(
                async () => {
                    calls++;
                    throw new LarkChannelError('format_error', 'bad');
                },
                { maxAttempts: 5, baseDelayMs: 1 }
            )
        ).rejects.toMatchObject({ code: 'format_error' });
        expect(calls).toBe(1);
    });

    test('does not retry send_timeout', async () => {
        let calls = 0;
        await expect(
            retry(
                async () => {
                    calls++;
                    throw new LarkChannelError('send_timeout', 'slow');
                },
                { maxAttempts: 3, baseDelayMs: 1 }
            )
        ).rejects.toMatchObject({ code: 'send_timeout' });
        expect(calls).toBe(1);
    });
});
