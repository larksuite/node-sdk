/**
 * Channel-level API behavior:
 *   - downloadResource handles Feishu's stream wrapper
 *     `{ getReadableStream, writeFile, headers }` by consuming the readable
 *     into a Buffer.
 *   - editMessage routes text edits through `im.v1.message.update`
 *     (the one API that supports editing text/post), not `message.patch`
 *     (cards only).
 *   - shareChat / shareUser / sticker outbound routes reach the correct
 *     msg_type on the wire.
 */

jest.mock('@node-sdk/ws-client', () => ({
    WSClient: class FakeWSClient {
        start() { /* no-op */ }
        close() { /* no-op */ }
    },
}));

import { Readable } from 'stream';
import { LoggerLevel } from '../../typings';
import { createLarkChannel } from '../index';

function createChannel() {
    const ch = createLarkChannel({
        appId: 'cli_test',
        appSecret: 'secret',
        loggerLevel: LoggerLevel.error,
    });
    // Pre-populate bot identity so we skip the network fetch for tests
    // that don't care about the connect path.
    (ch as any).botIdentity = { openId: 'ou_bot', name: 'TestBot' };
    return ch;
}

describe('downloadResource stream wrapper', () => {
    function makeStreamWrapper(bytes: Buffer) {
        return {
            getReadableStream: () => Readable.from([bytes]),
            writeFile: async () => '/tmp/x',
            headers: {},
        };
    }

    test('image download: consumes getReadableStream into Buffer', async () => {
        const ch = createChannel();
        const payload = Buffer.from('fake-png-bytes');
        (ch.rawClient.im.v1.image as any).get = jest
            .fn()
            .mockResolvedValue(makeStreamWrapper(payload));

        const buf = await ch.downloadResource('img_v3_xyz', 'image');
        expect(Buffer.isBuffer(buf)).toBe(true);
        expect(buf.equals(payload)).toBe(true);
    });

    test('file download: consumes getReadableStream into Buffer', async () => {
        const ch = createChannel();
        const payload = Buffer.from('hello file contents');
        (ch.rawClient.im.v1.file as any).get = jest
            .fn()
            .mockResolvedValue(makeStreamWrapper(payload));

        const buf = await ch.downloadResource('file_v3_xyz', 'file');
        expect(buf.equals(payload)).toBe(true);
    });

    test('legacy Buffer response still works (defensive)', async () => {
        const ch = createChannel();
        const payload = Buffer.from('legacy');
        (ch.rawClient.im.v1.image as any).get = jest.fn().mockResolvedValue(payload);
        const buf = await ch.downloadResource('img_x', 'image');
        expect(buf.equals(payload)).toBe(true);
    });

    test('{ data: Buffer } shape still works (defensive)', async () => {
        const ch = createChannel();
        const payload = Buffer.from('nested');
        (ch.rawClient.im.v1.image as any).get = jest
            .fn()
            .mockResolvedValue({ data: payload });
        const buf = await ch.downloadResource('img_x', 'image');
        expect(buf.equals(payload)).toBe(true);
    });

    test('unknown shape throws LarkChannelError', async () => {
        const ch = createChannel();
        (ch.rawClient.im.v1.image as any).get = jest
            .fn()
            .mockResolvedValue({ some: 'random' });
        await expect(ch.downloadResource('img_x', 'image')).rejects.toMatchObject({
            code: 'unknown',
            message: expect.stringContaining('unexpected download response type'),
        });
    });
});

describe('reaction add / remove round-trip', () => {
    test('addReaction returns the reaction_id from response', async () => {
        const ch = createChannel();
        const create = jest.fn().mockResolvedValue({
            data: { reaction_id: 'rx_1234', reaction_type: { emoji_type: 'OK' } },
        });
        (ch.rawClient.im.v1.messageReaction as any).create = create;

        const rid = await ch.addReaction('om_xyz', 'OK');
        expect(rid).toBe('rx_1234');
        expect(create).toHaveBeenCalledWith(
            expect.objectContaining({
                path: { message_id: 'om_xyz' },
                data: { reaction_type: { emoji_type: 'OK' } },
            })
        );
    });

    test('addReaction accepts top-level reaction_id as a defensive fallback', async () => {
        const ch = createChannel();
        (ch.rawClient.im.v1.messageReaction as any).create = jest
            .fn()
            .mockResolvedValue({ reaction_id: 'rx_top' });
        const rid = await ch.addReaction('om_xyz', 'OK');
        expect(rid).toBe('rx_top');
    });

    test('addReaction throws when reaction_id missing', async () => {
        const ch = createChannel();
        (ch.rawClient.im.v1.messageReaction as any).create = jest
            .fn()
            .mockResolvedValue({ data: {} });
        await expect(ch.addReaction('om_xyz', 'OK')).rejects.toMatchObject({
            code: 'unknown',
            message: expect.stringContaining('no reaction_id'),
        });
    });

    test('removeReaction calls messageReaction.delete with reaction_id', async () => {
        const ch = createChannel();
        const del = jest.fn().mockResolvedValue({ data: {} });
        (ch.rawClient.im.v1.messageReaction as any).delete = del;

        await ch.removeReaction('om_xyz', 'rx_1234');
        expect(del).toHaveBeenCalledWith({
            path: { message_id: 'om_xyz', reaction_id: 'rx_1234' },
        });
    });

    test('removeReactionByEmoji finds bot-added reaction and deletes it', async () => {
        const ch = createChannel();
        const list = jest.fn().mockResolvedValue({
            data: {
                items: [
                    {
                        reaction_id: 'rx_user',
                        operator: { operator_type: 'user' },
                    },
                    {
                        reaction_id: 'rx_bot',
                        operator: { operator_type: 'app' },
                    },
                ],
            },
        });
        const del = jest.fn().mockResolvedValue({ data: {} });
        (ch.rawClient.im.v1.messageReaction as any).list = list;
        (ch.rawClient.im.v1.messageReaction as any).delete = del;

        const deleted = await ch.removeReactionByEmoji('om_xyz', 'OK');
        expect(deleted).toBe(true);
        expect(list).toHaveBeenCalledWith(
            expect.objectContaining({
                path: { message_id: 'om_xyz' },
                params: expect.objectContaining({ reaction_type: 'OK' }),
            })
        );
        expect(del).toHaveBeenCalledWith({
            path: { message_id: 'om_xyz', reaction_id: 'rx_bot' },
        });
    });

    test('removeReactionByEmoji returns false when bot has not reacted', async () => {
        const ch = createChannel();
        (ch.rawClient.im.v1.messageReaction as any).list = jest.fn().mockResolvedValue({
            data: {
                items: [
                    { reaction_id: 'rx_user', operator: { operator_type: 'user' } },
                ],
            },
        });
        const del = jest.fn();
        (ch.rawClient.im.v1.messageReaction as any).delete = del;

        const deleted = await ch.removeReactionByEmoji('om_xyz', 'OK');
        expect(deleted).toBe(false);
        expect(del).not.toHaveBeenCalled();
    });

    test('removeReactionByEmoji returns false when list is empty', async () => {
        const ch = createChannel();
        (ch.rawClient.im.v1.messageReaction as any).list = jest
            .fn()
            .mockResolvedValue({ data: { items: [] } });
        const del = jest.fn();
        (ch.rawClient.im.v1.messageReaction as any).delete = del;
        expect(await ch.removeReactionByEmoji('om_xyz', 'OK')).toBe(false);
        expect(del).not.toHaveBeenCalled();
    });
});

describe('editMessage routes to im.v1.message.update', () => {
    test('uses message.update with msg_type=text (NOT message.patch)', async () => {
        const ch = createChannel();
        const update = jest.fn().mockResolvedValue({ data: {} });
        const patch = jest.fn();
        (ch.rawClient.im.v1.message as any).update = update;
        (ch.rawClient.im.v1.message as any).patch = patch;

        await ch.editMessage('om_xyz', 'new body');

        expect(patch).not.toHaveBeenCalled();
        expect(update).toHaveBeenCalledWith(
            expect.objectContaining({
                path: { message_id: 'om_xyz' },
                data: expect.objectContaining({
                    msg_type: 'text',
                    content: JSON.stringify({ text: 'new body' }),
                }),
            })
        );
    });
});

describe('card.action dedup key includes button identity', () => {
    // Regression: previously the dedup key was
    //   card:${messageId}:${operatorId}
    // so the second click on ANY button of the same card by the same user
    // got silently dropped. The fix folds action.tag + action.value into
    // the key so distinct buttons never collide.

    function buildRawCardAction(value: unknown, messageId = 'om_card1'): unknown {
        return {
            schema: '2.0',
            event_type: 'card.action.trigger',
            context: {
                open_message_id: messageId,
                open_chat_id: 'oc_test',
            },
            operator: { open_id: 'ou_alice' },
            action: { tag: 'button', value },
        };
    }

    async function dispatchRaw(ch: any, raw: unknown) {
        // The dispatcher routes by event_type -> handler registered in
        // `registerDispatcherHandlers()`. We invoke that handler directly.
        await ch.dispatcher.handles.get('card.action.trigger')(raw);
    }

    test('two different buttons on the same card both fire the handler', async () => {
        const ch = createChannel();
        (ch as any).registerDispatcherHandlers();

        const fired: unknown[] = [];
        ch.on('cardAction', (evt) => { fired.push(evt.action.value); });

        await dispatchRaw(ch, buildRawCardAction({ cmd: 'A' }));
        await dispatchRaw(ch, buildRawCardAction({ cmd: 'B' }));

        expect(fired).toEqual([{ cmd: 'A' }, { cmd: 'B' }]);
    });

    test('same button clicked twice (e.g. Feishu re-delivery) only fires once', async () => {
        const ch = createChannel();
        (ch as any).registerDispatcherHandlers();

        let calls = 0;
        ch.on('cardAction', () => { calls++; });

        // Use a fresh messageId so this test doesn't inherit state from the
        // previous test case in the same module (internalCache is a
        // module-level singleton and persists across jest tests in the same
        // file).
        await dispatchRaw(ch, buildRawCardAction({ cmd: 'A' }, 'om_dedup_probe'));
        await dispatchRaw(ch, buildRawCardAction({ cmd: 'A' }, 'om_dedup_probe'));

        expect(calls).toBe(1);
    });
});

describe('share_chat / share_user / sticker outbound', () => {
    function stubSender(ch: ReturnType<typeof createChannel>) {
        const create = jest.fn().mockResolvedValue({ data: { message_id: 'om_ok' } });
        (ch.rawClient.im.v1.message as any).create = create;
        (ch.rawClient.im.v1.message as any).reply = jest.fn();
        return create;
    }

    test('shareChat → msg_type=share_chat, content={chat_id}', async () => {
        const ch = createChannel();
        const create = stubSender(ch);
        const r = await ch.send('oc_abc', { shareChat: { chatId: 'oc_target' } });
        expect(r.messageId).toBe('om_ok');
        const call = create.mock.calls[0][0];
        expect(call.data.msg_type).toBe('share_chat');
        expect(JSON.parse(call.data.content)).toEqual({ chat_id: 'oc_target' });
    });

    test('shareUser → msg_type=share_user, content={user_id}', async () => {
        const ch = createChannel();
        const create = stubSender(ch);
        const r = await ch.send('oc_abc', { shareUser: { userId: 'ou_alice' } });
        expect(r.messageId).toBe('om_ok');
        const call = create.mock.calls[0][0];
        expect(call.data.msg_type).toBe('share_user');
        expect(JSON.parse(call.data.content)).toEqual({ user_id: 'ou_alice' });
    });

    test('sticker → msg_type=sticker, content={file_key}', async () => {
        const ch = createChannel();
        const create = stubSender(ch);
        const r = await ch.send('oc_abc', { sticker: { fileKey: 'sticker_abc' } });
        expect(r.messageId).toBe('om_ok');
        const call = create.mock.calls[0][0];
        expect(call.data.msg_type).toBe('sticker');
        expect(JSON.parse(call.data.content)).toEqual({ file_key: 'sticker_abc' });
    });
});
