import crypto from 'crypto';
import { EventEmitter } from 'events';
import { EventDispatcher } from '../event';
import { CardActionHandler } from '../card';
import { adaptDefault } from '../../adaptor/default';
import { adaptExpress } from '../../adaptor/express';
import { adaptKoa } from '../../adaptor/koa';
import { adaptKoaRouter } from '../../adaptor/koa-router';

const logger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
};
const credentials = (token: string, key = '') => ({
    verificationToken: token,
    encryptKey: key,
});
const event = (token = '') => ({
    schema: '2.0',
    header: { event_type: 'audit.test', token },
    event: {},
});

function encrypted(payload: object, key: string) {
    const iv = Buffer.alloc(16, 1);
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        crypto.createHash('sha256').update(key).digest(),
        iv
    );
    const body = {
        encrypt: Buffer.concat([
            iv,
            cipher.update(JSON.stringify(payload)),
            cipher.final(),
        ]).toString('base64'),
    };
    return Object.assign(
        Object.create({
            headers: {
                'x-lark-request-timestamp': 'timestamp',
                'x-lark-request-nonce': 'nonce',
                'x-lark-signature': crypto
                    .createHash('sha256')
                    .update('timestampnonce' + key + JSON.stringify(body))
                    .digest('hex'),
            },
        }),
        body
    );
}

async function runAdapter(
    name: string,
    dispatcher: EventDispatcher | CardActionHandler,
    payload: any,
    autoChallenge = true
) {
    const req: any = new EventEmitter();
    req.url = '/audit';
    req.headers = payload.headers || {};
    req.body = payload;
    const res: any = { statusCode: 200, body: undefined };
    res.status = (status) => {
        res.statusCode = status;
        return res;
    };
    res.json = (body) => {
        res.body = body;
    };
    res.end = (body) => {
        res.body = body === undefined ? undefined : JSON.parse(body);
    };
    const ctx: any = {
        originalUrl: '/audit',
        req,
        request: { body: payload },
        status: 200,
    };
    const next = jest.fn().mockResolvedValue(undefined);
    if (name === 'default') {
        const operation = adaptDefault('/audit', dispatcher, { autoChallenge })(
            req,
            res
        );
        req.emit('data', JSON.stringify(payload));
        req.emit('end');
        await operation;
    } else if (name === 'express') {
        await adaptExpress(dispatcher, { autoChallenge })(req, res);
    } else if (name === 'koa') {
        await adaptKoa('/audit', dispatcher, { autoChallenge })(ctx, next);
    } else {
        await adaptKoaRouter(dispatcher, { autoChallenge })(ctx, next);
    }
    return name.startsWith('koa')
        ? { status: ctx.status, body: ctx.body }
        : { status: res.statusCode, body: res.body };
}

test('provider is lazy, rotates token, and trusted WS bypasses it', async () => {
    let current = credentials('first');
    const provider = jest.fn(() => current);
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        webhookCredentialsProvider: provider,
        logger,
    }).register({ 'audit.test': handler });
    expect(provider).not.toHaveBeenCalled();
    await dispatcher.invoke(event('first'));
    current = credentials('second');
    await dispatcher.invoke(event('first'));
    await dispatcher.invoke(event('second'));
    expect(provider).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledTimes(2);
    await dispatcher.invoke(event(), { needCheck: false });
    expect(provider).toHaveBeenCalledTimes(3);
    expect(handler).toHaveBeenCalledTimes(3);
});

test('rotated AES keys are used for signature and decryption', async () => {
    let key = 'first-key';
    const provider = jest.fn(() => credentials('', key));
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        webhookCredentialsProvider: provider,
        logger,
    }).register({ 'audit.test': handler });
    await dispatcher.invoke(encrypted(event(), key));
    key = 'second-key';
    await dispatcher.invoke(encrypted(event(), key));
    await dispatcher.invoke(encrypted(event(), 'first-key'));
    expect(handler).toHaveBeenCalledTimes(2);
    expect(provider).toHaveBeenCalledTimes(3);
});

test('concurrent asynchronous requests retain independent snapshots', async () => {
    const resolvers: Array<(value: ReturnType<typeof credentials>) => void> =
        [];
    const provider = jest.fn(
        () =>
            new Promise<ReturnType<typeof credentials>>((resolve) =>
                resolvers.push(resolve)
            )
    );
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        webhookCredentialsProvider: provider,
        logger,
    }).register({ 'audit.test': handler });
    const first = dispatcher.invoke(encrypted(event(), 'first'));
    const second = dispatcher.invoke(encrypted(event(), 'second'));
    resolvers[1](credentials('', 'second'));
    await second;
    resolvers[0](credentials('', 'first'));
    await first;
    expect(handler).toHaveBeenCalledTimes(2);
    expect(provider).toHaveBeenCalledTimes(2);
});

test('copied snapshot survives mutation of the returned object', async () => {
    const supplied = credentials('first');
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        webhookCredentialsProvider: () => supplied,
        logger,
    }).register({ 'audit.test': handler });
    const data = event('first');
    Object.defineProperty(data, 'schema', {
        get: () => {
            supplied.verificationToken = 'changed';
            return '2.0';
        },
    });
    await dispatcher.invoke(data);
    expect(handler).toHaveBeenCalledTimes(1);
});

test.each([
    undefined,
    null,
    {},
    { encryptKey: '', verificationToken: null },
    { encryptKey: 1, verificationToken: '' },
])(
    'invalid provider result fails without static fallback %#',
    async (value) => {
        const handler = jest.fn();
        const dispatcher = new EventDispatcher({
            verificationToken: 'static',
            webhookCredentialsProvider: () => value as any,
            logger,
        }).register({ 'audit.test': handler });
        await expect(dispatcher.invoke(event('static'))).rejects.toThrow(
            'webhook credentials provider failed'
        );
        expect(handler).not.toHaveBeenCalled();
    }
);

test.each([false, true])(
    'provider failure sanitizes error: async=%s',
    async (isAsync) => {
        const provider = () => {
            const error = new Error('SECRET-key');
            if (isAsync) {
                return Promise.reject(error);
            }
            throw error;
        };
        const handler = jest.fn();
        const dispatcher = new EventDispatcher({
            webhookCredentialsProvider: provider,
            logger,
        }).register({ 'audit.test': handler });
        try {
            await dispatcher.invoke(event());
            throw new Error('expected failure');
        } catch (error) {
            expect(String(error)).toBe(
                'Error: webhook credentials provider failed'
            );
            expect((error as any).cause).toBeUndefined();
        }
        expect(handler).not.toHaveBeenCalled();
        expect(JSON.stringify(logger.error.mock.calls)).not.toContain(
            'SECRET-key'
        );
    }
);

test('empty successful credentials override static authentication', async () => {
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        verificationToken: 'static',
        webhookCredentialsProvider: () => credentials(''),
        logger,
    }).register({ 'audit.test': handler });
    await dispatcher.invoke(event('wrong'));
    expect(handler).toHaveBeenCalledTimes(1);
});

test('direct card callbacks resolve once and reject bad tokens', async () => {
    const provider = jest.fn(() => credentials('card-token'));
    const handler = jest.fn();
    const dispatcher = new CardActionHandler(
        { webhookCredentialsProvider: provider, logger },
        handler
    );
    expect(provider).not.toHaveBeenCalled();
    await dispatcher.invoke(event('card-token'));
    await dispatcher.invoke(event('wrong'));
    expect(provider).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledTimes(1);
});

describe.each(['default', 'express', 'koa', 'koa-router'])(
    '%s adapter snapshot',
    (name) => {
        test.each(['event', 'card'])(
            'challenge and ordinary %s requests each resolve once',
            async (kind) => {
                const provider = jest.fn(() =>
                    credentials('token-' + provider.mock.calls.length)
                );
                const handler = jest.fn().mockResolvedValue({ ok: true });
                const params = { webhookCredentialsProvider: provider, logger };
                const dispatcher =
                    kind === 'event'
                        ? new EventDispatcher(params).register({
                              'audit.test': handler,
                          })
                        : new CardActionHandler(params, handler);
                expect(provider).not.toHaveBeenCalled();
                const response = await runAdapter(name, dispatcher, {
                    type: 'url_verification',
                    token: 'token-1',
                    challenge: 'fixture',
                });
                expect(response.body).toEqual({ challenge: 'fixture' });
                await runAdapter(name, dispatcher, event('token-2'));
                expect(provider).toHaveBeenCalledTimes(2);
                expect(handler).toHaveBeenCalledTimes(1);
            }
        );
        test.each([false, true])(
            'provider error is sanitized with autoChallenge=%s',
            async (autoChallenge) => {
                const provider = jest.fn(() =>
                    Promise.reject(new Error('SECRET-key'))
                );
                const handler = jest.fn();
                const dispatcher = new EventDispatcher({
                    webhookCredentialsProvider: provider,
                    logger,
                }).register({ 'audit.test': handler });
                const response = await runAdapter(
                    name,
                    dispatcher,
                    event(),
                    autoChallenge
                );
                expect(response).toEqual({
                    status: 403,
                    body: { msg: 'webhook verification failed' },
                });
                expect(provider).toHaveBeenCalledTimes(1);
                expect(handler).not.toHaveBeenCalled();
            }
        );
        test('empty successful credentials preserve challenge behavior', async () => {
            const provider = jest.fn(() => credentials(''));
            const dispatcher = new EventDispatcher({
                verificationToken: 'static',
                webhookCredentialsProvider: provider,
                logger,
            });
            const response = await runAdapter(name, dispatcher, {
                type: 'url_verification',
                challenge: 'fixture',
            });
            expect(response.body).toEqual({ challenge: 'fixture' });
            expect(provider).toHaveBeenCalledTimes(1);
        });
        test('encrypted challenge uses the rotated provider credentials', async () => {
            let key = 'first';
            const provider = jest.fn(() => credentials('dynamic-token', key));
            const dispatcher = new EventDispatcher({
                webhookCredentialsProvider: provider,
                logger,
            });
            for (const nextKey of ['first', 'second']) {
                key = nextKey;
                const response = await runAdapter(
                    name,
                    dispatcher,
                    encrypted(
                        {
                            type: 'url_verification',
                            token: 'dynamic-token',
                            challenge: 'fixture',
                        },
                        key
                    )
                );
                expect(response.body).toEqual({ challenge: 'fixture' });
            }
            expect(provider).toHaveBeenCalledTimes(2);
        });
        test('encrypted ordinary requests share the same rotated key', async () => {
            let key = 'first';
            const provider = jest.fn(() => credentials('', key));
            const handler = jest.fn();
            const dispatcher = new EventDispatcher({
                webhookCredentialsProvider: provider,
                logger,
            }).register({ 'audit.test': handler });
            await runAdapter(name, dispatcher, encrypted(event(), key));
            key = 'second';
            await runAdapter(name, dispatcher, encrypted(event(), key));
            expect(provider).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenCalledTimes(2);
        });
    }
);

test('provider result fields are each read once and getter failures are sanitized', async () => {
    const encryptKey = jest
        .fn()
        .mockReturnValueOnce('')
        .mockReturnValue('changed');
    const verificationToken = jest
        .fn()
        .mockReturnValueOnce('first')
        .mockReturnValue('changed');
    const supplied = Object.defineProperties(
        {},
        {
            encryptKey: { get: encryptKey },
            verificationToken: { get: verificationToken },
        }
    );
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        webhookCredentialsProvider: () => supplied as any,
        logger,
    }).register({ 'audit.test': handler });
    await dispatcher.invoke(event('first'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(encryptKey).toHaveBeenCalledTimes(1);
    expect(verificationToken).toHaveBeenCalledTimes(1);

    const badResult = Object.defineProperty({}, 'encryptKey', {
        get: () => {
            throw new Error('SECRET-key');
        },
    });
    const failing = new EventDispatcher({
        webhookCredentialsProvider: () => badResult as any,
        logger,
    }).register({ 'audit.test': handler });
    await expect(failing.invoke(event())).rejects.toThrow(
        'webhook credentials provider failed'
    );
    expect(handler).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(logger.error.mock.calls)).not.toContain('SECRET-key');
});

describe.each(['default', 'express', 'koa', 'koa-router'])(
    '%s static adapter compatibility',
    (name) => {
        test.each(['event', 'card'])(
            'preserves overridden public invoke for %s without provider',
            async (kind) => {
                const handler = jest.fn();
                const dispatcher =
                    kind === 'event'
                        ? new EventDispatcher({ logger })
                        : new CardActionHandler({ logger }, handler);
                const overriddenInvoke = jest
                    .fn()
                    .mockResolvedValue({ custom: true });
                dispatcher.invoke = overriddenInvoke;
                const result = await runAdapter(
                    name,
                    dispatcher,
                    event(),
                    false
                );
                expect(overriddenInvoke).toHaveBeenCalledTimes(1);
                expect(result.body).toEqual(
                    name.startsWith('koa')
                        ? JSON.stringify({ custom: true })
                        : { custom: true }
                );
                expect(handler).not.toHaveBeenCalled();
            }
        );
    }
);
