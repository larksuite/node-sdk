import { WSClient } from '../index';

/**
 * Tests for the state-transition callbacks (onReady / onError / onReconnecting
 * / onReconnected) added to WSClient.
 *
 * Uses the same proto-buf mocking pattern as reconnect.ts to avoid ESM parse
 * issues with pbbp2.js.
 */

jest.mock('../proto-buf/pbbp2', () => ({
    pbbp2: {
        Frame: {
            decode: jest.fn().mockReturnValue({ method: 0, headers: [] }),
            encode: jest.fn().mockReturnValue({ finish: () => new Uint8Array() }),
        },
    },
}));
jest.mock('../proto-buf', () => ({
    decode: jest.fn().mockReturnValue({ method: 0, headers: [] }),
}));

// Minimal logger that records errors so we can assert error swallowing
function makeLogger() {
    const errors: unknown[][] = [];
    return {
        error: (...args: unknown[]) => { errors.push(args); },
        warn: () => {},
        info: () => {},
        debug: () => {},
        trace: () => {},
        errors,
    };
}

describe('WSClient.safeInvoke', () => {
    test('is a no-op when callback is undefined', () => {
        const logger = makeLogger();
        const client = new WSClient({
            appId: 'x', appSecret: 'y', logger, loggerLevel: 4 as never,
        });
        // Access private method via type cast for isolated testing.
        const safeInvoke = (client as unknown as { safeInvoke: Function }).safeInvoke.bind(client);
        expect(() => safeInvoke('any', undefined)).not.toThrow();
        expect(logger.errors).toHaveLength(0);
    });

    test('calls callback with provided arguments', () => {
        const logger = makeLogger();
        const client = new WSClient({
            appId: 'x', appSecret: 'y', logger, loggerLevel: 4 as never,
        });
        const safeInvoke = (client as unknown as { safeInvoke: Function }).safeInvoke.bind(client);
        const fn = jest.fn();
        safeInvoke('test', fn, 'a', 42);
        expect(fn).toHaveBeenCalledWith('a', 42);
    });

    test('swallows callback exceptions and logs them', () => {
        const logger = makeLogger();
        const client = new WSClient({
            appId: 'x', appSecret: 'y', logger, loggerLevel: 4 as never,
        });
        const safeInvoke = (client as unknown as { safeInvoke: Function }).safeInvoke.bind(client);
        const thrower = () => { throw new Error('boom'); };
        expect(() => safeInvoke('bad', thrower)).not.toThrow();
        expect(logger.errors).toHaveLength(1);
        // logged with label + error
        expect(logger.errors[0].some((a) => String(a).includes('bad'))).toBe(true);
    });
});

describe('WSClient callback state flags', () => {
    test('hasEverConnected starts false', () => {
        const client = new WSClient({ appId: 'x', appSecret: 'y' });
        expect((client as unknown as { hasEverConnected: boolean }).hasEverConnected).toBe(false);
    });

    test('accepts callback fields without error', () => {
        const onReady = jest.fn();
        const onError = jest.fn();
        const onReconnecting = jest.fn();
        const onReconnected = jest.fn();
        const client = new WSClient({
            appId: 'x',
            appSecret: 'y',
            onReady,
            onError,
            onReconnecting,
            onReconnected,
        });
        // Fields are captured privately; verify they're stored
        const priv = client as unknown as {
            onReady?: Function;
            onError?: Function;
            onReconnecting?: Function;
            onReconnected?: Function;
        };
        expect(priv.onReady).toBe(onReady);
        expect(priv.onError).toBe(onError);
        expect(priv.onReconnecting).toBe(onReconnecting);
        expect(priv.onReconnected).toBe(onReconnected);
    });

    test('tolerates missing (optional) callbacks', () => {
        // All 4 callbacks omitted — construction must succeed
        expect(() => new WSClient({ appId: 'x', appSecret: 'y' })).not.toThrow();
    });
});
