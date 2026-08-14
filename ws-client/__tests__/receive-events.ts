/**
 * Issue #201: inbound frames that fail to decode / merge / parse must be
 * surfaced as error logs instead of being silently dropped (missing debug
 * line, no disconnect, connection keeps working) or crashing the process via
 * unhandled rejections.
 */

let lastWsInstance: any = null;

jest.mock('ws', () => {
    const OPEN = 1;
    class MockWebSocket {
        static OPEN = OPEN;
        readyState = OPEN;
        private listeners: Record<string, Function[]> = {};
        constructor() {
            lastWsInstance = this;
            // Auto-emit 'open' so connect() completes and communicate() attaches.
            queueMicrotask(() => this.emit('open'));
        }
        on(event: string, fn: Function) {
            (this.listeners[event] ||= []).push(fn);
        }
        removeAllListeners() {
            this.listeners = {};
        }
        emit(event: string, ...args: any[]) {
            (this.listeners[event] || []).forEach((fn) => fn(...args));
        }
        send(_data: any, cb?: (err?: Error) => void) {
            cb?.();
        }
        close() {}
        terminate() {}
    }
    return { __esModule: true, default: MockWebSocket };
});

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

import { WSClient } from '../index';
import { DataCache } from '../data-cache';
import { FrameType, HeaderKey, MessageType } from '../enum';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { decode as decodeFrame } from '../proto-buf';

const flushPromises = () => new Promise<void>((r) => setImmediate(r));

function createMockHttp() {
    const pending: Array<{ resolve: (v: unknown) => void }> = [];
    const request = jest.fn().mockImplementation(() => new Promise((resolve) => pending.push({ resolve })));
    const resolveNext = () => {
        const d = pending.shift();
        if (!d) throw new Error('No pending request');
        d.resolve({
            code: 0,
            data: {
                URL: 'wss://fake?device_id=d1&service_id=s1',
                ClientConfig: {
                    PingInterval: 120,
                    ReconnectCount: 3,
                    ReconnectInterval: 0.001,
                    ReconnectNonce: 0,
                },
            },
            msg: 'ok',
        });
    };
    return { request, pending, resolveNext };
}

function createClient() {
    const logger = { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn(), trace: jest.fn() };
    const http = createMockHttp();
    const client = new WSClient({
        appId: 'cli_0000000000000001',
        appSecret: 'secret',
        loggerLevel: 4,
        logger: logger as any,
        httpInstance: http as any,
        autoReconnect: true,
    });
    return { client, logger, http };
}

function errorCalls(logger: { error: jest.Mock }) {
    return JSON.stringify(logger.error.mock.calls);
}

async function connectClient(client: WSClient, http: ReturnType<typeof createMockHttp>) {
    client.start({ eventDispatcher: new EventDispatcher({} as any) });
    await flushPromises();
    http.resolveNext();
    await flushPromises(); // connect() -> new MockWebSocket -> 'open' microtask
    await flushPromises(); // communicate() attaches listeners
    expect(lastWsInstance).toBeTruthy();
}

describe('inbound frame error handling (#201)', () => {
    afterEach(() => {
        // Stop ping/reconnect timers so no late timer fires after teardown.
        lastWsInstance = null;
    });

    test('decode failure is logged and the connection survives', async () => {
        const { client, logger, http } = createClient();
        await connectClient(client, http);

        (decodeFrame as jest.Mock).mockImplementationOnce(() => {
            throw new Error('bad frame bytes');
        });
        lastWsInstance.emit('message', new Uint8Array([1, 2, 3]));
        await flushPromises();

        expect(errorCalls(logger)).toContain('failed to handle inbound frame');
        expect(errorCalls(logger)).toContain('bad frame bytes');
        // the connection is still alive
        expect((client as any).wsConfig.getWSInstance()).toBe(lastWsInstance);

        // and a subsequent valid frame is still processed without new errors
        (decodeFrame as jest.Mock).mockReturnValueOnce({
            method: FrameType.control,
            headers: [{ key: HeaderKey.type, value: MessageType.ping }],
        });
        lastWsInstance.emit('message', new Uint8Array([4]));
        await flushPromises();
        expect(logger.error.mock.calls.length).toBe(1);

        client.close(); // stop ping/reconnect timers before teardown
    });

    test('malformed event fragment metadata is logged with message_id', async () => {
        const { client, logger } = createClient();
        const priv = client as any;

        const badFrame = {
            headers: [
                { key: HeaderKey.type, value: MessageType.event },
                { key: HeaderKey.message_id, value: 'msg_1' },
                { key: HeaderKey.sum, value: 'not-a-number' },
                { key: HeaderKey.seq, value: '0' },
                { key: HeaderKey.trace_id, value: 'trace_1' },
            ],
            payload: new Uint8Array([1, 2, 3]),
        };
        await priv.handleEventData(badFrame);

        expect(errorCalls(logger)).toContain('failed to merge event fragments');
        expect(errorCalls(logger)).toContain('msg_1');
    });

    test('malformed pong payload is logged, not crashed', async () => {
        const { client, logger } = createClient();
        const priv = client as any;

        const badPong = {
            headers: [{ key: HeaderKey.type, value: MessageType.pong }],
            payload: new TextEncoder().encode('this is not json'),
        };
        await priv.handleControlData(badPong);

        expect(errorCalls(logger)).toContain('invalid pong payload');
    });

    test('valid fragmented event merges, dispatches to the handler and ACKs', async () => {
        const { client, logger } = createClient();
        const priv = client as any;
        const handler = jest.fn();
        const dispatcher = new EventDispatcher({} as any);
        dispatcher.register({ 'im.message.receive_v1': handler });
        priv.eventDispatcher = dispatcher;
        const sendSpy = jest.spyOn(priv, 'sendMessage');

        const eventPayload = JSON.stringify({
            schema: '2.0',
            header: {
                event_id: 'evt_1',
                event_type: 'im.message.receive_v1',
                create_time: '2026-01-01T00:00:00+08:00',
                token: 't',
                app_id: 'cli_x',
                tenant_key: 'tk',
            },
            event: { message: { message_id: 'om_1' }, sender: {} },
        });
        const bytes = new TextEncoder().encode(eventPayload);
        const half = Math.ceil(bytes.length / 2);

        await priv.handleEventData({
            headers: [
                { key: HeaderKey.type, value: MessageType.event },
                { key: HeaderKey.message_id, value: 'msg_2' },
                { key: HeaderKey.sum, value: '2' },
                { key: HeaderKey.seq, value: '0' },
                { key: HeaderKey.trace_id, value: 'trace_2' },
            ],
            payload: bytes.slice(0, half),
        });
        await priv.handleEventData({
            headers: [
                { key: HeaderKey.type, value: MessageType.event },
                { key: HeaderKey.message_id, value: 'msg_2' },
                { key: HeaderKey.sum, value: '2' },
                { key: HeaderKey.seq, value: '1' },
                { key: HeaderKey.trace_id, value: 'trace_2' },
            ],
            payload: bytes.slice(half),
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledTimes(1); // ACK sent
        expect(errorCalls(logger)).not.toContain('failed to merge');
    });
});

describe('DataCache.mergeData fragment validation (#201)', () => {
    function makeCache() {
        return new DataCache({ logger: { error: jest.fn() } as any });
    }

    test('merges in-order fragments', () => {
        const cache = makeCache();
        const bytes = new TextEncoder().encode('{"a":1}');
        expect(cache.mergeData({ message_id: 'm', sum: 2, seq: 0, trace_id: 't', data: bytes.slice(0, 4) })).toBeNull();
        expect(cache.mergeData({ message_id: 'm', sum: 2, seq: 1, trace_id: 't', data: bytes.slice(4) })).toEqual({ a: 1 });
    });

    test('merges out-of-order fragments', () => {
        const cache = makeCache();
        const bytes = new TextEncoder().encode('{"a":1}');
        expect(cache.mergeData({ message_id: 'm', sum: 2, seq: 1, trace_id: 't', data: bytes.slice(4) })).toBeNull();
        expect(cache.mergeData({ message_id: 'm', sum: 2, seq: 0, trace_id: 't', data: bytes.slice(0, 4) })).toEqual({ a: 1 });
    });

    test('invalid sum throws', () => {
        const cache = makeCache();
        expect(() => cache.mergeData({ message_id: 'm', sum: NaN, seq: 0, trace_id: 't', data: new Uint8Array([1]) }))
            .toThrow('invalid event fragment metadata');
        expect(() => cache.mergeData({ message_id: 'm', sum: 0, seq: 0, trace_id: 't', data: new Uint8Array([1]) }))
            .toThrow('invalid event fragment metadata');
    });

    test('invalid seq throws', () => {
        const cache = makeCache();
        expect(() => cache.mergeData({ message_id: 'm', sum: 2, seq: 2, trace_id: 't', data: new Uint8Array([1]) }))
            .toThrow('invalid event fragment metadata');
        expect(() => cache.mergeData({ message_id: 'm', sum: 2, seq: -1, trace_id: 't', data: new Uint8Array([1]) }))
            .toThrow('invalid event fragment metadata');
    });
});
