/**
 * WS endpoint-discovery credential branch (`ws-client`).
 *
 * `pullConnectConfig` is private — we drive it via start() and assert on the
 * payload the mocked httpInstance.request receives (its mock.calls).
 *
 * Reuses the proto-buf + MockWebSocket + controlled-http pattern from
 * ws-client/__tests__/reconnect.ts.
 *
 * Only placeholder fake values. appId matches ^cli_[0-9a-fA-F]{16}$.
 */
import { WSClient } from '../index';
import { EventDispatcher } from '@node-sdk/dispatcher/event';

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

jest.mock('ws', () => {
    const OPEN = 1;
    class MockWebSocket {
        static OPEN = OPEN;
        readyState = OPEN;
        private listeners: Record<string, Function[]> = {};
        on(event: string, fn: Function) {
            (this.listeners[event] ||= []).push(fn);
        }
        removeAllListeners() {
            this.listeners = {};
        }
        send(_data: any, cb?: (err?: Error) => void) {
            cb?.();
        }
        close() {}
        terminate() {}
    }
    return { __esModule: true, default: MockWebSocket };
});

const flushPromises = () => new Promise<void>((r) => setImmediate(r));
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const APP_ID = 'cli_ABCDEF0123456789';
const FAKE_ASSERTION = 'aaa.bbb.ccc';

function createControlledHttp() {
    const pending: Array<{ resolve: (v: any) => void; reject: (e: any) => void }> = [];
    const request = jest.fn().mockImplementation(
        () =>
            new Promise((resolve, reject) => {
                pending.push({ resolve, reject });
            })
    );
    const resolveNext = (resp: any) => {
        const d = pending.shift();
        if (!d) throw new Error('no pending request');
        d.resolve(resp);
    };
    return { request, pending, resolveNext };
}

const OK_RESP = {
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
};

function lastRequestPayload(http: ReturnType<typeof createControlledHttp>) {
    return http.request.mock.calls.at(-1)![0];
}

describe('WS credential branch', () => {
    test('provider mode: body AppSecret empty + ClientAssertion set; provider aud = OpenAPI host', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const http = createControlledHttp();
        const client = new WSClient({
            appId: APP_ID,
            clientAssertionProvider: provider,
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        } as any);

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        await delay(5);

        expect(http.request).toHaveBeenCalledTimes(1);
        const payload = lastRequestPayload(http);
        expect(payload.data.AppID).toBe(APP_ID);
        expect(payload.data.AppSecret).toBe('');
        expect(payload.data.ClientAssertion).toBe(FAKE_ASSERTION);
        expect(provider.retrieveToken).toHaveBeenCalledWith('open.feishu.cn');

        http.resolveNext(OK_RESP);
        client.close();
    });

    test('proxy branch: targetInfo rewrites url + adds X-Target-Service', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({
                value: FAKE_ASSERTION,
                targetInfo: {
                    targetService: 'proxy.example.org',
                    targetPrefix: '/proxy/Lark',
                },
            }),
        };
        const http = createControlledHttp();
        const client = new WSClient({
            appId: APP_ID,
            clientAssertionProvider: provider,
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        } as any);

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        await delay(5);

        const payload = lastRequestPayload(http);
        expect(payload.url).toContain('proxy.example.org');
        expect(payload.url).toContain('/proxy/Lark');
        expect(payload.headers['X-Target-Service']).toBe('open.feishu.cn');

        http.resolveNext(OK_RESP);
        client.close();
    });

    test('secret mode (no provider): body has AppSecret, no ClientAssertion (regression)', async () => {
        const http = createControlledHttp();
        const client = new WSClient({
            appId: APP_ID,
            appSecret: 'fake-secret-1',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        } as any);

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        await delay(5);

        const payload = lastRequestPayload(http);
        expect(payload.data.AppSecret).toBe('fake-secret-1');
        expect('ClientAssertion' in payload.data).toBe(false);

        http.resolveNext(OK_RESP);
        client.close();
    });

    test('non-ok server code → server msg is propagated (not generic system busy)', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const http = createControlledHttp();
        const onError = jest.fn();
        const client = new WSClient({
            appId: APP_ID,
            clientAssertionProvider: provider,
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: false,
            onError,
        } as any);

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        await delay(5);

        http.resolveNext({
            code: 403,
            data: { URL: '', ClientConfig: {} },
            msg: 'assertion rejected by gateway',
        });
        await flushPromises();
        await delay(20);

        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain(
            'assertion rejected by gateway'
        );
        client.close();
    });
});
