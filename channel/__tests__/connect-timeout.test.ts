/**
 * Issue #197: when the WebSocket handshake does not complete within the
 * connect() timeout, the channel must tear down the orphaned WSClient —
 * otherwise it keeps retrying in the background (leaking sockets/timers) and
 * its late failures can surface as unhandled exceptions
 * ("WebSocket was closed before the connection was established").
 */

// Mock WSClient so the import chain doesn't pull in the protobuf .js file
// which Jest's ts-jest transform can't parse.
jest.mock('@node-sdk/ws-client', () => ({
    WSClient: class FakeWSClient {
        start() { /* never invokes onReady -> the handshake hangs until the timeout */ }
        close = jest.fn();
    },
}));

import { LoggerLevel } from '../../typings';
import { createLarkChannel } from '../index';

function createChannel() {
    const ch = createLarkChannel({
        appId: 'cli_test',
        appSecret: 'secret',
        loggerLevel: LoggerLevel.error,
        connectTimeoutMs: 50,
    });
    // Resolve the bot-identity lookup so connect() reaches the WS handshake.
    (ch.rawClient as any).request = jest.fn().mockResolvedValue({
        bot: { open_id: 'ou_abc', app_name: 'Test Bot' },
    });
    return ch;
}

describe('connect() handshake timeout (issue #197)', () => {
    test('rejects with not_connected and force-closes the orphaned WSClient', async () => {
        const ch = createChannel();
        const connectPromise = ch.connect();

        await expect(connectPromise).rejects.toMatchObject({ code: 'not_connected' });

        const client = (ch as any).rawWsClient;
        expect(client).toBeDefined();
        expect(client.close).toHaveBeenCalledWith({ force: true });
    });

    test('a later retry starts a fresh WSClient and closes the previous one', async () => {
        const ch = createChannel();
        await expect(ch.connect()).rejects.toMatchObject({ code: 'not_connected' });

        const first = (ch as any).rawWsClient;
        await expect(ch.connect()).rejects.toMatchObject({ code: 'not_connected' });

        const second = (ch as any).rawWsClient;
        expect(second).not.toBe(first);
        expect(first.close).toHaveBeenCalledTimes(1);
        expect(second.close).toHaveBeenCalledTimes(1);
    });
});
