/**
 * `connect()`'s bot-identity lookup used to collapse every failure into
 * `not_connected`, so invalid credentials looked the same as network
 * outages. `fetchBotIdentity()` now runs `classifyError()` on the raw
 * failure so that:
 *   - auth errors (HTTP 401/403 or Feishu code 99991401) surface as
 *     `permission_denied`
 *   - rate limiting and timeouts keep their specific codes
 *   - only genuinely unclassifiable failures fall back to `not_connected`
 */

// Mock WSClient so the import chain doesn't pull in the protobuf .js file
// which Jest's ts-jest transform can't parse.
jest.mock('@node-sdk/ws-client', () => ({
    WSClient: class FakeWSClient {
        start() { /* no-op */ }
        close() { /* no-op */ }
    },
}));

import { LoggerLevel } from '../../typings';
import { createLarkChannel } from '../index';

function createChannel() {
    return createLarkChannel({
        appId: 'cli_test',
        appSecret: 'secret',
        loggerLevel: LoggerLevel.error,
    });
}

/** Call the private fetchBotIdentity() without exercising WS/connect. */
function fetchBotIdentity(ch: unknown): Promise<unknown> {
    return (ch as { fetchBotIdentity: () => Promise<unknown> }).fetchBotIdentity();
}

describe('fetchBotIdentity error classification', () => {
    test('HTTP 401 from rawClient → permission_denied', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockRejectedValue({
            response: { status: 401, data: { code: 99991401, msg: 'invalid token' } },
        });
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'permission_denied',
        });
    });

    test('HTTP 403 → permission_denied', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockRejectedValue({
            response: { status: 403, data: { code: 99991400, msg: 'forbidden' } },
        });
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'permission_denied',
        });
    });

    test('Feishu code 99991401 without HTTP status → permission_denied', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockRejectedValue({
            response: { data: { code: 99991401, msg: 'auth failed' } },
        });
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'permission_denied',
        });
    });

    test('HTTP 429 passes through as rate_limited', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockRejectedValue({
            response: { status: 429, data: { msg: 'too many requests' } },
        });
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'rate_limited',
        });
    });

    test('ETIMEDOUT passes through as send_timeout', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockRejectedValue({
            code: 'ETIMEDOUT',
            message: 'Error: ETIMEDOUT',
        });
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'send_timeout',
        });
    });

    test('unclassifiable failure falls back to not_connected', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest
            .fn()
            .mockRejectedValue(new Error('ECONNREFUSED: no route to host'));
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'not_connected',
        });
    });

    test('response 200 but missing open_id falls back to not_connected', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockResolvedValue({ bot: {} });
        await expect(fetchBotIdentity(ch)).rejects.toMatchObject({
            code: 'not_connected',
            message: expect.stringContaining('could not resolve bot identity'),
        });
    });

    test('success path returns BotIdentity', async () => {
        const ch = createChannel();
        (ch.rawClient as any).request = jest.fn().mockResolvedValue({
            bot: { open_id: 'ou_abc', app_name: 'Test Bot' },
        });
        await expect(fetchBotIdentity(ch)).resolves.toEqual({
            openId: 'ou_abc',
            name: 'Test Bot',
        });
    });
});
