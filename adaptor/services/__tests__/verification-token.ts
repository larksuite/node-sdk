import crypto from 'crypto';
import { EventEmitter } from 'events';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { adaptDefault } from '../../default';
import { adaptExpress } from '../../express';
import { adaptKoa } from '../../koa';
import { adaptKoaRouter } from '../../koa-router';
import { generateChallenge } from '../challenge';

const MISSING = Symbol('missing');
const logger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
};

function encrypt(payload: object): string {
    const iv = Buffer.alloc(16, 1);
    const key = crypto
        .createHash('sha256')
        .update('encryption-fixture')
        .digest();
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([
        iv,
        cipher.update(JSON.stringify(payload)),
        cipher.final(),
    ]).toString('base64');
}

async function runAdapter(
    name: string,
    dispatcher: EventDispatcher,
    payload: object
) {
    const req: any = new EventEmitter();
    req.url = '/audit';
    req.headers = {};
    req.body = payload;
    const res: any = { statusCode: 200, body: undefined };
    res.status = jest.fn((status) => {
        res.statusCode = status;
        return res;
    });
    res.json = jest.fn((body) => {
        res.body = body;
    });
    res.end = jest.fn((body) => {
        res.body = body === undefined ? undefined : JSON.parse(body);
    });
    const ctx: any = {
        originalUrl: '/audit',
        req,
        request: { body: payload },
        status: 200,
    };
    const next = jest.fn().mockResolvedValue(undefined);
    if (name === 'default') {
        const operation = adaptDefault('/audit', dispatcher, {
            autoChallenge: true,
        })(req, res);
        req.emit('data', JSON.stringify(payload));
        req.emit('end');
        await operation;
    } else if (name === 'express') {
        await adaptExpress(dispatcher, { autoChallenge: true })(req, res);
    } else if (name === 'koa') {
        await adaptKoa('/audit', dispatcher, { autoChallenge: true })(
            ctx,
            next
        );
    } else {
        await adaptKoaRouter(dispatcher, { autoChallenge: true })(ctx, next);
    }
    return name === 'koa' || name === 'koa-router'
        ? { status: ctx.status, body: ctx.body }
        : { status: res.statusCode, body: res.body };
}

describe.each(['default', 'express', 'koa', 'koa-router'])(
    '%s webhook adapter',
    (name) => {
        test.each(['audit-fixture', 'wrong', MISSING, null, '', 123, {}, []])(
            'authenticates challenge token %#',
            async (token) => {
                const handler = jest.fn();
                const dispatcher = new EventDispatcher({
                    verificationToken: 'audit-fixture',
                    logger,
                }).register({ 'audit.test': handler });
                const payload: any = {
                    type: 'url_verification',
                    challenge: 'fixture',
                };
                if (token !== MISSING) {
                    payload.token = token;
                }
                const result = await runAdapter(name, dispatcher, payload);
                expect(result.status).toBe(
                    token === 'audit-fixture' ? 200 : 403
                );
                expect(result.body).toEqual(
                    token === 'audit-fixture'
                        ? { challenge: 'fixture' }
                        : { msg: 'webhook verification failed' }
                );
                expect(handler).not.toHaveBeenCalled();
            }
        );

        test('preserves plaintext challenge with no configured token', async () => {
            const result = await runAdapter(
                name,
                new EventDispatcher({ logger }),
                { type: 'url_verification', token: '', challenge: 'fixture' }
            );
            expect(result.status).toBe(200);
            expect(result.body).toEqual({ challenge: 'fixture' });
        });

        test.each(['audit-fixture', 'wrong'])(
            'authenticates decrypted challenge token %s',
            async (token) => {
                const dispatcher = new EventDispatcher({
                    verificationToken: 'audit-fixture',
                    encryptKey: 'encryption-fixture',
                    logger,
                });
                const result = await runAdapter(name, dispatcher, {
                    encrypt: encrypt({
                        type: 'url_verification',
                        token,
                        challenge: 'fixture',
                    }),
                });
                expect(result.status).toBe(
                    token === 'audit-fixture' ? 200 : 403
                );
            }
        );

        test('rejects forged ordinary events before handlers', async () => {
            const handler = jest.fn();
            const dispatcher = new EventDispatcher({
                verificationToken: 'audit-fixture',
                logger,
            }).register({ 'audit.test': handler });
            await runAdapter(name, dispatcher, {
                schema: '2.0',
                header: { event_type: 'audit.test', token: 'wrong' },
                event: {},
            });
            expect(handler).not.toHaveBeenCalled();
        });
    }
);

test('non-challenge payloads still flow through regular validation', () => {
    expect(generateChallenge({}, { encryptKey: '' }).isChallenge).toBe(false);
});

test('Koa downstream errors are not converted into verification failures', async () => {
    const dispatcher = new EventDispatcher({
        verificationToken: 'audit-fixture',
        logger,
    });
    const ctx: any = {
        req: { headers: {} },
        request: {
            body: {
                type: 'url_verification',
                token: 'audit-fixture',
                challenge: 'fixture',
            },
        },
    };
    const next = jest.fn().mockRejectedValue(new Error('downstream failure'));
    await expect(
        adaptKoaRouter(dispatcher, { autoChallenge: true })(ctx, next)
    ).rejects.toThrow('downstream failure');
});
