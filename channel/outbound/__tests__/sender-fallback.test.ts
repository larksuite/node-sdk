/**
 * Outbound send fallback behavior:
 *   - a text/post reply whose replyTo target was revoked must retry
 *     without replyTo (downgrade to a new message) instead of propagating
 *     `target_revoked`.
 *   - a `post` that fails with `format_error` must fall back to plain-text
 *     instead of propagating.
 *
 * Both features are implemented inside `sendOneWithFallback`. These tests
 * lock in that `sendText` / `sendPost` / media / card variants all route
 * through that helper rather than calling `rawSendWithRetry` directly.
 */

import { OutboundSender } from '../sender';

function makeClient(opts: {
    reply?: jest.Mock;
    create?: jest.Mock;
} = {}): any {
    return {
        im: {
            v1: {
                message: {
                    reply: opts.reply ?? jest.fn(),
                    create: opts.create ?? jest.fn(),
                },
            },
        },
    };
}

function okResponse(messageId: string) {
    return { data: { message_id: messageId } };
}

function apiErr(feishuCode: number, status?: number) {
    const err: any = new Error(`feishu error ${feishuCode}`);
    err.response = { status: status ?? 400, data: { code: feishuCode, msg: `code ${feishuCode}` } };
    return err;
}

const logger = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {}, trace: () => {} } as any;

// Skip retry delays during tests
const fastConfig = { retry: { maxAttempts: 1, baseDelayMs: 0 } } as any;

describe('sendText fallback', () => {
    test('reply with revoked target → retry as a fresh create', async () => {
        const reply = jest.fn().mockRejectedValueOnce(apiErr(230020, 404));
        const create = jest.fn().mockResolvedValueOnce(okResponse('om_new'));
        const sender = new OutboundSender(makeClient({ reply, create }), fastConfig, logger);

        const r = await sender.send('oc_abc', { text: 'hi' }, { replyTo: 'om_gone' });

        expect(r.messageId).toBe('om_new');
        expect(reply).toHaveBeenCalledTimes(1);
        // Second call went through im.v1.message.create WITHOUT replyTo
        expect(create).toHaveBeenCalledTimes(1);
        expect(create.mock.calls[0][0].data.msg_type).toBe('text');
    });

    test('successful reply does NOT fall back', async () => {
        const reply = jest.fn().mockResolvedValueOnce(okResponse('om_replied'));
        const create = jest.fn();
        const sender = new OutboundSender(makeClient({ reply, create }), fastConfig, logger);

        const r = await sender.send('oc_abc', { text: 'hi' }, { replyTo: 'om_alive' });

        expect(r.messageId).toBe('om_replied');
        expect(create).not.toHaveBeenCalled();
    });

    test('non-revoke error still throws (no swallow)', async () => {
        const reply = jest.fn().mockRejectedValueOnce(apiErr(99991401, 401)); // permission_denied
        const create = jest.fn();
        const sender = new OutboundSender(makeClient({ reply, create }), fastConfig, logger);

        await expect(
            sender.send('oc_abc', { text: 'hi' }, { replyTo: 'om_x' })
        ).rejects.toMatchObject({ code: 'permission_denied' });
        expect(create).not.toHaveBeenCalled();
    });
});

describe('sendPost fallback', () => {
    test('post with format_error → retry as text', async () => {
        const create = jest
            .fn()
            .mockRejectedValueOnce(apiErr(230002, 400))   // first: post rejected
            .mockResolvedValueOnce(okResponse('om_text')); // second: text accepted
        const sender = new OutboundSender(makeClient({ create }), fastConfig, logger);

        const badPost = {
            zh_cn: {
                title: 'bad',
                content: [[{ tag: 'text', text: 'hello' }]],
            },
        };

        const r = await sender.send('oc_abc', { post: badPost });

        expect(r.messageId).toBe('om_text');
        expect(create).toHaveBeenCalledTimes(2);
        expect(create.mock.calls[0][0].data.msg_type).toBe('post');
        expect(create.mock.calls[1][0].data.msg_type).toBe('text');
        // the text fallback should carry a plain rendering
        const textBody = JSON.parse(create.mock.calls[1][0].data.content);
        expect(textBody.text).toContain('hello');
    });

    test('post reply with revoked target → retry as fresh post (no text downgrade)', async () => {
        // sendOneWithFallback applies ONE fallback per call. reply-gone wins,
        // so after dropping replyTo the retry is still `post`. If that second
        // call also fails the error just propagates — we don't compose
        // fallbacks.
        const reply = jest.fn().mockRejectedValueOnce(apiErr(230020, 404));
        const create = jest.fn().mockResolvedValueOnce(okResponse('om_post_new'));
        const sender = new OutboundSender(makeClient({ reply, create }), fastConfig, logger);

        const r = await sender.send(
            'oc_abc',
            { post: { zh_cn: { title: 't', content: [[{ tag: 'text', text: 'x' }]] } } },
            { replyTo: 'om_gone' }
        );

        expect(r.messageId).toBe('om_post_new');
        expect(create.mock.calls[0][0].data.msg_type).toBe('post');
    });

    test('post succeeds on first try → no fallback', async () => {
        const create = jest.fn().mockResolvedValueOnce(okResponse('om_post'));
        const sender = new OutboundSender(makeClient({ create }), fastConfig, logger);

        const r = await sender.send('oc_abc', {
            post: { zh_cn: { title: 't', content: [[{ tag: 'text', text: 'x' }]] } },
        });

        expect(r.messageId).toBe('om_post');
        expect(create).toHaveBeenCalledTimes(1);
    });
});

describe('image / card reply fallback', () => {
    // Card / image / file / audio / video all route through the same
    // sendOneWithFallback, so the reply-gone fallback applies uniformly.

    test('card reply with revoked target → retry as fresh create', async () => {
        const reply = jest.fn().mockRejectedValueOnce(apiErr(230020, 404));
        const create = jest.fn().mockResolvedValueOnce(okResponse('om_card_new'));
        const sender = new OutboundSender(makeClient({ reply, create }), fastConfig, logger);

        const r = await sender.send(
            'oc_abc',
            { card: { schema: '2.0', body: { elements: [] } } },
            { replyTo: 'om_gone' }
        );

        expect(r.messageId).toBe('om_card_new');
        expect(create.mock.calls[0][0].data.msg_type).toBe('interactive');
    });
});
