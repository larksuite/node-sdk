import crypto from 'crypto';
import { EventDispatcher } from '../event';
import { CardActionHandler } from '../card';

const MISSING = Symbol('missing');
const logger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
};

function eventOf(schema: string, token: unknown) {
    const payload: any =
        schema === 'v1'
            ? {
                  uuid: 'audit-id',
                  type: 'event_callback',
                  event: { type: 'audit.test' },
              }
            : {
                  schema: '2.0',
                  header: { event_type: 'audit.test' },
                  event: {},
              };
    const target = schema === 'v1' ? payload : payload.header;
    if (token !== MISSING) {
        target.token = token;
    }
    return payload;
}

describe('plaintext webhook verification token', () => {
    test.each(['v1', 'v2'])(
        '%s authenticates before dispatch',
        async (schema) => {
            for (const token of [
                'audit-fixture',
                'wrong',
                MISSING,
                null,
                '',
                123,
                {},
                [],
            ]) {
                const handler = jest.fn();
                const dispatcher = new EventDispatcher({
                    verificationToken: 'audit-fixture',
                    logger,
                }).register({ 'audit.test': handler });
                await dispatcher.invoke(eventOf(schema, token));
                expect(handler).toHaveBeenCalledTimes(
                    token === 'audit-fixture' ? 1 : 0
                );
            }
        }
    );

    test.each(['v1', 'v2'])(
        '%s preserves credential-free dispatch',
        async (schema) => {
            const handler = jest.fn();
            const dispatcher = new EventDispatcher({ logger }).register({
                'audit.test': handler,
            });
            for (const token of ['', 'wrong', MISSING, null]) {
                await dispatcher.invoke(eventOf(schema, token));
            }
            expect(handler).toHaveBeenCalledTimes(4);
        }
    );

    test('trusted websocket dispatch still works without credentials', async () => {
        const handler = jest.fn();
        const dispatcher = new EventDispatcher({ logger }).register({
            'audit.test': handler,
        });
        await dispatcher.invoke(eventOf('v2', MISSING), { needCheck: false });
        expect(handler).toHaveBeenCalledTimes(1);
    });
});

test('v2 events cannot fall back to a top-level token', async () => {
    const handler = jest.fn();
    const dispatcher = new EventDispatcher({
        verificationToken: 'audit-fixture',
        logger,
    }).register({ 'audit.test': handler });
    await dispatcher.invoke({
        schema: '2.0',
        token: 'audit-fixture',
        header: { event_type: 'audit.test' },
        event: {},
    });
    expect(handler).not.toHaveBeenCalled();
});

test.each([true, false])(
    'encrypted webhook retains signature validation: %s',
    async (valid) => {
        const handler = jest.fn();
        const dispatcher = new EventDispatcher({
            encryptKey: 'encryption-fixture',
            logger,
        }).register({ 'audit.test': handler });
        const iv = Buffer.alloc(16, 1);
        const key = crypto
            .createHash('sha256')
            .update('encryption-fixture')
            .digest();
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const encrypted = Buffer.concat([
            iv,
            cipher.update(JSON.stringify(eventOf('v2', MISSING))),
            cipher.final(),
        ]).toString('base64');
        const body = { encrypt: encrypted };
        const signature = crypto
            .createHash('sha256')
            .update('timestampnonceencryption-fixture' + JSON.stringify(body))
            .digest('hex');
        const data = Object.assign(
            Object.create({
                headers: {
                    'x-lark-request-timestamp': 'timestamp',
                    'x-lark-request-nonce': 'nonce',
                    'x-lark-signature': valid ? signature : 'wrong',
                },
            }),
            body
        );
        await dispatcher.invoke(data);
        expect(handler).toHaveBeenCalledTimes(valid ? 1 : 0);
    }
);

test.each(['audit-fixture', 'wrong', MISSING])(
    'v2 card callback validates token %#',
    async (token) => {
        const handler = jest.fn().mockResolvedValue({});
        const dispatcher = new CardActionHandler(
            { verificationToken: 'audit-fixture', logger },
            handler
        );
        const payload = eventOf('v2', token);
        payload.header.event_type = 'card.action.trigger';
        await dispatcher.invoke(payload);
        expect(handler).toHaveBeenCalledTimes(
            token === 'audit-fixture' ? 1 : 0
        );
    }
);
