import { WSClient } from '../index';
import { EventDispatcher } from '@node-sdk/dispatcher/event';

/**
 * Test for issue #177: WSClient.reConnect timer leak
 *
 * Core bug: when close() + start() is called while an async tryConnect()
 * is in-flight, the old loopReConnect continues after its await completes,
 * spawning orphaned reconnect loops that accumulate over time.
 */

// Mock proto-buf to avoid ESM parse issues with pbbp2.js
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createDeferred<T = void>() {
  let resolve!: (val: T) => void;
  let reject!: (err: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
const flushPromises = () => new Promise<void>(r => setImmediate(r));

// ---------------------------------------------------------------------------
// Mock WebSocket
// ---------------------------------------------------------------------------

jest.mock('ws', () => {
  const CONNECTING = 0;
  const OPEN = 1;
  class MockWebSocket {
    static CONNECTING = CONNECTING;
    static OPEN = OPEN;
    static instances: MockWebSocket[] = [];
    readyState = CONNECTING;
    private listeners: Record<string, Function[]> = {};
    terminate = jest.fn(() => {
      setImmediate(() => this.emit('error', new Error('WebSocket was closed before the connection was established')));
    });
    constructor() {
      MockWebSocket.instances.push(this);
    }
    on(event: string, fn: Function) {
      (this.listeners[event] ||= []).push(fn);
    }
    once(event: string, fn: Function) {
      const wrapper = (...args: any[]) => {
        this.listeners[event] = (this.listeners[event] || []).filter(listener => listener !== wrapper);
        fn(...args);
      };
      this.on(event, wrapper);
    }
    removeAllListeners() {
      this.listeners = {};
    }
    emit(event: string, ...args: any[]) {
      const listeners = this.listeners[event] || [];
      if (event === 'error' && listeners.length === 0) throw args[0];
      listeners.slice().forEach(fn => fn(...args));
    }
    send(_data: any, cb?: (err?: Error) => void) {
      cb?.();
    }
    // Real `ws` routes close() on a non-OPEN socket through abortHandshake()
    // too, so it emits the same late error as terminate().
    close = jest.fn(() => {
      if (this.readyState === CONNECTING) {
        setImmediate(() => this.emit('error', new Error('WebSocket was closed before the connection was established')));
      }
    });
  }
  return { __esModule: true, default: MockWebSocket };
});

// ---------------------------------------------------------------------------
// Mock HTTP that gives us control over when requests resolve
// ---------------------------------------------------------------------------

function createMockHttpInstance() {
  const pendingRequests: Array<ReturnType<typeof createDeferred<any>>> = [];

  const request = jest.fn().mockImplementation(() => {
    const d = createDeferred<any>();
    pendingRequests.push(d);
    return d.promise;
  });

  const makeSuccessResponse = () => ({
    code: 0,
    data: {
      URL: 'wss://fake?device_id=d1&service_id=s1',
      ClientConfig: {
        PingInterval: 120,
        ReconnectCount: 3,
        ReconnectInterval: 0.001, // 1ms for fast tests
        ReconnectNonce: 0,
      },
    },
    msg: 'ok',
  });

  const makeFailResponse = () => ({
    code: 99999,
    data: { URL: '', ClientConfig: {} },
    msg: 'system busy',
  });

  const resolveNext = (success: boolean = true) => {
    const d = pendingRequests.shift();
    if (!d) throw new Error('No pending request');
    d.resolve(success ? makeSuccessResponse() : makeFailResponse());
  };

  return { request, pendingRequests, resolveNext };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

// `MockWebSocket.instances` is a module-level array that would otherwise grow
// across tests — including from reconnect loops still running after a test
// returns — making any `instances[n]` index unreliable.
beforeEach(() => {
  jest.requireMock('ws').default.instances.length = 0;
});

describe('WSClient reconnect timer leak (#177)', () => {
  function createClient(
    httpMock: ReturnType<typeof createMockHttpInstance>,
    overrides: Record<string, unknown> = {},
  ) {
    return new WSClient({
      appId: 'cli_0000000000000001',
      appSecret: 'test-app-secret',
      loggerLevel: 4,
      httpInstance: httpMock as any,
      autoReconnect: true,
      ...overrides,
    } as any);
  }

  test('close() during an in-flight first handshake must not resurrect the client', async () => {
    // The isStart branch of reConnect() awaits tryConnect(). A close() landing
    // during that await used to be invisible to it: reconnectGeneration only
    // invalidates *older* loops, and the reConnect() it calls on a retryable
    // failure bumps the generation itself — so a closed client restarted its
    // own retry loop, kept a non-unref'd pingLoop timer alive, and never
    // re-armed the DataCache sweep (only start() does that).
    const httpMock = createMockHttpInstance();
    const client = createClient(httpMock, { handshakeTimeoutMs: 50 });
    const priv = client as any;

    client.start({ eventDispatcher: new EventDispatcher({} as any) });
    await flushPromises();
    expect(httpMock.pendingRequests.length).toBe(1);

    httpMock.resolveNext(true);   // pullConnectConfig succeeds
    await flushPromises();        // connect() is now waiting on the handshake

    // Caller gives up while the handshake is still in flight. getWSInstance()
    // is still null here (it is only set on 'open'), so close() cannot reach
    // the socket — all it can do is mark the client closed.
    client.close();
    expect(priv.closed).toBe(true);

    // Watchdog fires -> connect() resolves false -> tryConnect() returns a
    // retryable failure -> the abandoned isStart branch resumes.
    await delay(120);
    await flushPromises();
    await delay(50);
    await flushPromises();

    // No new pullConnectConfig: the retry loop was never started.
    expect(httpMock.pendingRequests.length).toBe(0);
    expect(httpMock.request).toHaveBeenCalledTimes(1);
    expect(priv.reconnectInterval).toBeUndefined();
  }, 10000);

  test('a handshake that wins the race with close() is torn down, not adopted', async () => {
    // The generation counter alone cannot handle this case: it says "someone
    // else moved on" but not *who*, so it must leave wsConfig's socket alone.
    // Only the explicit `closed` flag proves nobody restarted the client, which
    // is what makes discarding the socket safe here.
    const httpMock = createMockHttpInstance();
    const client = createClient(httpMock);
    const priv = client as any;
    const onReady = jest.fn();
    priv.onReady = onReady;

    client.start({ eventDispatcher: new EventDispatcher({} as any) });
    await flushPromises();
    httpMock.resolveNext(true);
    await flushPromises();

    const MockWebSocket = jest.requireMock('ws').default;
    const socket = MockWebSocket.instances[MockWebSocket.instances.length - 1];
    expect(socket).toBeDefined();

    // Caller closes while the handshake is in flight...
    client.close();
    // ...and only then does the peer complete it.
    socket.emit('open');
    await flushPromises();
    await flushPromises();

    // The connection must not be adopted by a client the caller closed.
    expect(onReady).not.toHaveBeenCalled();
    expect(socket.terminate).toHaveBeenCalledTimes(1);
    expect(priv.wsConfig.getWSInstance()).toBeNull();
  }, 10000);

  test('generation counter prevents stale loops from continuing', async () => {
    const httpMock = createMockHttpInstance();
    const client = createClient(httpMock);

    // Access private fields
    const priv = client as any;

    // Simulate: set up state as if we're connected
    priv.isConnecting = false;
    priv.eventDispatcher = new EventDispatcher({} as any);

    // Set short intervals so timers fire quickly in real-time tests
    priv.wsConfig.updateWs({
      autoReconnect: true,
      reconnectNonce: 0,
      reconnectInterval: 10,
      reconnectCount: 3,
    });

    // Call reConnect(false) — starts a reconnect loop
    priv.reConnect(false);
    await flushPromises();

    // reconnectNonce=0 so the outer setTimeout fires immediately
    await delay(20);
    await flushPromises();

    // loopReConnect should be running, tryConnect pending
    expect(httpMock.pendingRequests.length).toBe(1);
    const gen1 = priv.reconnectGeneration;

    // Now call close() — this should invalidate the loop
    client.close();
    expect(priv.reconnectGeneration).toBeGreaterThan(gen1);

    // Resolve the old in-flight request (fails)
    httpMock.resolveNext(false);
    await flushPromises();
    await delay(50); // wait past reconnectInterval

    // The stale loop should NOT have scheduled a new tryConnect
    expect(httpMock.pendingRequests.length).toBe(0);
  }, 10000);

  test('reConnect(true) bypasses isConnecting guard and invalidates old loop', async () => {
    const httpMock = createMockHttpInstance();
    const client = createClient(httpMock);
    const priv = client as any;

    priv.eventDispatcher = new EventDispatcher({} as any);

    // Set short intervals
    priv.wsConfig.updateWs({
      autoReconnect: true,
      reconnectNonce: 0,
      reconnectInterval: 10,
      reconnectCount: 3,
    });

    // Start a reconnect loop
    priv.reConnect(false);
    await flushPromises();
    await delay(20);
    await flushPromises();

    // An old tryConnect is in-flight
    expect(httpMock.pendingRequests.length).toBe(1);
    expect(priv.isConnecting).toBe(true);

    // With the fix, reConnect(true) should NOT be blocked by isConnecting
    priv.reConnect(true);
    await flushPromises();

    // A new request should be queued
    expect(httpMock.pendingRequests.length).toBe(2);

    // Resolve old request — should be discarded by generation check
    httpMock.resolveNext(false);
    await flushPromises();
    await delay(50);
    await flushPromises();

    // No orphaned retry from the old loop
    // Only the new reConnect(true)'s request remains
    expect(httpMock.pendingRequests.length).toBe(1);

    // Clean up
    httpMock.resolveNext(true);
    await flushPromises();
  }, 10000);

  test('5 rapid close/start cycles produce no orphaned loops', async () => {
    const httpMock = createMockHttpInstance();
    const client = createClient(httpMock);
    const priv = client as any;

    priv.eventDispatcher = new EventDispatcher({} as any);

    // Simulate 5 rapid reconnect → close → restart cycles
    for (let i = 0; i < 5; i++) {
      priv.isConnecting = false;
      priv.reConnect(false);
      await flushPromises();
      await delay(5);
      await flushPromises();
      client.close();
    }

    // There should be 5 pending HTTP requests from the 5 tryConnect calls
    const pendingCount = httpMock.pendingRequests.length;

    // Resolve all of them as failures
    for (let i = 0; i < pendingCount; i++) {
      httpMock.resolveNext(false);
    }
    await flushPromises();
    await delay(100); // well past any reconnectInterval
    await flushPromises();

    // With the fix: all loops exited due to generation mismatch — no new requests
    // Without the fix: each stale loop would schedule retries
    expect(httpMock.pendingRequests.length).toBe(0);
  }, 10000);
});

// ---------------------------------------------------------------------------
// Retryable vs fatal classification (only code 1000040343 is retryable)
// ---------------------------------------------------------------------------

describe('retryable vs fatal classification', () => {
    function makeFailResp(code: number, msg = 'failed') {
        return { code, data: { URL: '', ClientConfig: {} }, msg };
    }

    function createControlledHttp() {
        const pendingRequests: Array<ReturnType<typeof createDeferred<any>>> = [];
        const request = jest.fn().mockImplementation(() => {
            const d = createDeferred<any>();
            pendingRequests.push(d);
            return d.promise;
        });
        const resolveNext = (resp: any) => {
            const d = pendingRequests.shift();
            if (!d) throw new Error('No pending request');
            d.resolve(resp);
        };
        const rejectNext = (err: any) => {
            const d = pendingRequests.shift();
            if (!d) throw new Error('No pending request');
            d.reject(err);
        };
        return { request, pendingRequests, resolveNext, rejectNext };
    }

    function createClient(http: ReturnType<typeof createControlledHttp>, onError = jest.fn()) {
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'test-app-secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
            onError,
        });
        return { client, onError };
    }

    test('first-connect: non-1000040343 code is fatal — onError fires once, no retry', async () => {
        const http = createControlledHttp();
        const { client, onError } = createClient(http);

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        expect(http.pendingRequests.length).toBe(1);

        http.resolveNext(makeFailResp(403, 'forbidden'));
        await flushPromises();
        await delay(30);

        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain('code=403');
        expect(http.pendingRequests.length).toBe(0);
    }, 10000);

    test('first-connect: code 1 (system_busy) is fatal under new rule', async () => {
        const http = createControlledHttp();
        const { client, onError } = createClient(http);

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        http.resolveNext(makeFailResp(1, 'system busy'));
        await flushPromises();
        await delay(30);

        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain('code=1');
        expect(http.pendingRequests.length).toBe(0);
    }, 10000);

    test('first-connect: code 1000040343 is retryable — enters retry loop', async () => {
        const http = createControlledHttp();
        const { client, onError } = createClient(http);
        const priv = client as any;
        // Bound the retry loop so the test exits.
        priv.wsConfig.updateWs({ reconnectCount: 2, reconnectInterval: 5, reconnectNonce: 0 });

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();

        // 1st attempt (from isStart): retryable failure.
        http.resolveNext(makeFailResp(1000040343, 'internal'));
        await flushPromises();
        await delay(15);

        // The retry loop should have produced another request.
        expect(http.pendingRequests.length).toBeGreaterThanOrEqual(1);
        // onError should NOT have fired yet (we're still retrying).
        expect(onError).not.toHaveBeenCalled();

        // Drain until exhaust.
        while (http.pendingRequests.length > 0) {
            http.resolveNext(makeFailResp(1000040343, 'internal'));
            await flushPromises();
            await delay(15);
        }

        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain('exhausted');
    }, 10000);

    test('first-connect: HTTP exception (catch branch) is retryable', async () => {
        const http = createControlledHttp();
        const { client, onError } = createClient(http);
        const priv = client as any;
        priv.wsConfig.updateWs({ reconnectCount: 2, reconnectInterval: 5, reconnectNonce: 0 });

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();

        // 1st attempt rejects with a network error.
        http.rejectNext(new Error('ETIMEDOUT'));
        await flushPromises();
        await delay(15);

        expect(http.pendingRequests.length).toBeGreaterThanOrEqual(1);
        expect(onError).not.toHaveBeenCalled();

        while (http.pendingRequests.length > 0) {
            http.rejectNext(new Error('ETIMEDOUT'));
            await flushPromises();
            await delay(15);
        }

        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain('exhausted');
    }, 10000);

    test('reconnect-loop fatal resets hasEverConnected to false', async () => {
        const http = createControlledHttp();
        const { client, onError } = createClient(http);
        const priv = client as any;
        priv.eventDispatcher = new EventDispatcher({} as any);
        // Simulate prior successful connect.
        priv.hasEverConnected = true;
        priv.wsConfig.updateWs({
            reconnectCount: 3,
            reconnectInterval: 5,
            reconnectNonce: 0,
        });

        priv.reConnect(false);
        await flushPromises();
        await delay(15);

        expect(http.pendingRequests.length).toBe(1);
        http.resolveNext(makeFailResp(403, 'forbidden'));
        await flushPromises();
        await delay(20);

        expect(priv.hasEverConnected).toBe(false);
        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain('code=403');
    }, 10000);

    test('start() with invalid appId logs error and does not connect', async () => {
        const cases = [
            'test-app-id',                  // legacy fixture format
            'cli_short',                    // too short
            'cli_00000000000000000',        // too long (17 hex chars)
            'cli_g000000000000001',         // non-hex char
            'CLI_0000000000000001',         // wrong prefix case
            '',                             // empty
        ];
        for (const appId of cases) {
            const http = createControlledHttp();
            const client = new WSClient({
                appId,
                appSecret: 'secret',
                loggerLevel: 4,
                httpInstance: http as any,
                autoReconnect: true,
            });
            await client.start({ eventDispatcher: new EventDispatcher({} as any) });
            await flushPromises();
            expect(http.pendingRequests.length).toBe(0);
        }
    }, 10000);

    test('start() accepts uppercase hex appId (loose validation)', async () => {
        const http = createControlledHttp();
        const client = new WSClient({
            appId: 'cli_ABCDEF0123456789',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        });
        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        expect(http.pendingRequests.length).toBe(1);
    }, 10000);

    test('first-connect fatal also resets hasEverConnected to false', async () => {
        const http = createControlledHttp();
        const { client, onError } = createClient(http);
        const priv = client as any;

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        http.resolveNext(makeFailResp(514, 'auth failed'));
        await flushPromises();
        await delay(15);

        expect(priv.hasEverConnected).toBe(false);
        expect(onError).toHaveBeenCalledTimes(1);
        expect((onError.mock.calls[0][0] as Error).message).toContain('code=514');
    }, 10000);
});

// ---------------------------------------------------------------------------
// F1: pingTimeout liveness watchdog
// ---------------------------------------------------------------------------

describe('pingTimeout liveness watchdog', () => {
    function createClientWithPingTimeout(pingTimeoutSec: number | undefined) {
        const http = createMockHttpInstance();
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
            wsConfig: pingTimeoutSec === undefined ? undefined : { pingTimeout: pingTimeoutSec },
        });
        return { http, client };
    }

    test('disabled by default — no watchdog, no auto-terminate', async () => {
        const { client } = createClientWithPingTimeout(undefined);
        const priv = client as any;

        // Simulate connected: arm via the internal method directly.
        priv.armLiveness();
        expect(priv.livenessTimer).toBeUndefined();
    });

    test('armLiveness schedules a timer when pingTimeout > 0', async () => {
        const { client } = createClientWithPingTimeout(1);
        const priv = client as any;
        priv.armLiveness();
        expect(priv.livenessTimer).toBeDefined();
        priv.clearLiveness();
    });

    test('inbound message clears (not re-arms) the watchdog', async () => {
        // Re-arming on inbound would terminate idle-but-healthy connections
        // (ping every 30s + 3s watchdog → fires 3s after pong even though
        // the link is fine). Cancelling on inbound is correct: the next
        // ping will arm again.
        const { client } = createClientWithPingTimeout(1);
        const priv = client as any;
        priv.armLiveness();
        expect(priv.livenessTimer).toBeDefined();
        priv.clearLiveness();
        expect(priv.livenessTimer).toBeUndefined();
    });

    test('timer firing calls terminate() on the wsInstance', async () => {
        const { client } = createClientWithPingTimeout(0.05); // 50ms
        const priv = client as any;
        const terminate = jest.fn();
        priv.wsConfig.setWSInstance({ terminate } as any);

        priv.armLiveness();
        await delay(80);

        expect(terminate).toHaveBeenCalledTimes(1);
    }, 5000);

    test('idle connection after pong does NOT trigger watchdog (regression)', async () => {
        // Sequence: ping → arm (50ms watchdog) → pong inbound → clear → idle.
        // With the previous (buggy) "re-arm on inbound" semantics, the
        // watchdog would fire 50ms after pong, terminating a healthy
        // connection. With the fix, it stays cleared until the next ping.
        const { client } = createClientWithPingTimeout(0.05); // 50ms window
        const priv = client as any;
        const terminate = jest.fn();
        priv.wsConfig.setWSInstance({ terminate } as any);

        priv.armLiveness();          // simulate "ping sent"
        await delay(20);
        priv.clearLiveness();        // simulate "pong received"
        await delay(80);             // wait past the original 50ms window

        expect(terminate).not.toHaveBeenCalled();
    }, 5000);
});

// ---------------------------------------------------------------------------
// F2: handshakeTimeoutMs inside WSClient.connect
// ---------------------------------------------------------------------------

describe('handshakeTimeoutMs', () => {
    test('hung handshake → terminate is guarded, connect resolves false, retry kicks in', async () => {
        const http = createMockHttpInstance();
        const MockWebSocket = jest.requireMock('ws').default;
        const instanceIndex = MockWebSocket.instances.length;
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
            handshakeTimeoutMs: 50,
        });

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        http.resolveNext(true); // pullConnectConfig succeeds
        await flushPromises();
        // Mock WebSocket never emits 'open'/'error'. Without timeout this
        // would hang. With 50ms timeout, connect() should resolve false
        // and trigger a retry which queues a second pullConfig request.
        await delay(120);
        await flushPromises();

        expect(MockWebSocket.instances[instanceIndex].terminate).toHaveBeenCalledTimes(1);
        expect(http.request).toHaveBeenCalledTimes(2);

        // autoReconnect is on: without this the loop keeps creating sockets
        // (and pushing them into MockWebSocket.instances) during later tests.
        client.close();
    }, 10000);

    // close() detaches every listener before tearing the socket down, so the
    // error `ws` emits a tick later has nowhere to land unless a sink is left
    // behind. Both branches — terminate() and close() — need one.
    describe.each([
        { label: 'force', params: { force: true }, method: 'terminate' as const },
        { label: 'graceful', params: {}, method: 'close' as const },
    ])('closing a connecting socket keeps its late error handled ($label)', ({ params, method }) => {
        test('no exception escapes to the process', async () => {
            const http = createMockHttpInstance();
            const client = new WSClient({
                appId: 'cli_ABCDEF0123456789',
                appSecret: 'secret',
                loggerLevel: 4,
                httpInstance: http as any,
            });
            const MockWebSocket = jest.requireMock('ws').default;
            const socket = new MockWebSocket();
            (client as any).wsConfig.setWSInstance(socket);

            // Assert the real guarantee explicitly. Without it the only signal
            // is Jest's own uncaughtException handling, which can attribute the
            // failure to whichever test happens to be running at the time.
            const escaped: Error[] = [];
            const collect = (err: Error) => escaped.push(err);
            process.on('uncaughtException', collect);
            try {
                client.close(params);
                await flushPromises();
                await flushPromises();
            } finally {
                process.off('uncaughtException', collect);
            }

            expect(socket[method]).toHaveBeenCalledTimes(1);
            expect(escaped).toHaveLength(0);
        });
    });

    test('unset handshakeTimeoutMs preserves original "no timeout" behavior', async () => {
        const http = createMockHttpInstance();
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        });

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        http.resolveNext(true);
        await flushPromises();
        await delay(80);

        // Without timeout, connect() stays pending → no second request.
        expect(http.request).toHaveBeenCalledTimes(1);
    }, 10000);
});

// ---------------------------------------------------------------------------
// F3: getConnectionStatus()
// ---------------------------------------------------------------------------

describe('getConnectionStatus', () => {
    function makeClient() {
        const http = createMockHttpInstance();
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        });
        return { http, client };
    }

    test('idle before start()', () => {
        const { client } = makeClient();
        const s = client.getConnectionStatus();
        expect(s.state).toBe('idle');
        expect(s.reconnectAttempts).toBe(0);
        expect(s.lastConnectTime).toBeUndefined();
    });

    test('connecting after start() before pullConfig resolves', async () => {
        const { http, client } = makeClient();
        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        expect(http.pendingRequests.length).toBe(1);
        const s = client.getConnectionStatus();
        expect(s.state).toBe('connecting');
    }, 10000);

    test('failed after fatal pullConnectConfig error', async () => {
        const http = createMockHttpInstance();
        const onError = jest.fn();
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
            onError,
        });

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();
        // 403 is fatal under current classification
        http.resolveNext(false); // makeFailResponse() returns code 99999 — also fatal
        await flushPromises();
        await delay(20);

        expect(onError).toHaveBeenCalledTimes(1);
        const s = client.getConnectionStatus();
        expect(s.state).toBe('failed');
    }, 10000);

    test('reconnectAttempts counter increments in loopReConnect', async () => {
        const http = createMockHttpInstance();
        const client = new WSClient({
            appId: 'cli_0000000000000001',
            appSecret: 'secret',
            loggerLevel: 4,
            httpInstance: http as any,
            autoReconnect: true,
        });
        const priv = client as any;
        priv.eventDispatcher = new EventDispatcher({} as any);
        priv.wsConfig.updateWs({
            autoReconnect: true,
            reconnectNonce: 0,
            reconnectInterval: 10,
            reconnectCount: 5,
        });

        priv.reConnect(false);
        await flushPromises();
        await delay(20);
        await flushPromises();
        expect(http.pendingRequests.length).toBe(1);

        // 1st retry attempt — count incremented before tryConnect resolves.
        // Resolve as code 1000040343 (retryable) so it loops once more.
        const d = http.pendingRequests.shift();
        d?.resolve({
            code: 1000040343,
            data: { URL: '', ClientConfig: {} },
            msg: 'internal',
        });
        await flushPromises();
        await delay(20);

        const s = client.getConnectionStatus();
        expect(s.reconnectAttempts).toBeGreaterThanOrEqual(1);
    }, 10000);

    test('start() clears stale terminalError', async () => {
        const { client } = makeClient();
        const priv = client as any;
        priv.terminalError = true;
        priv.currentReconnectAttempts = 7;

        client.start({ eventDispatcher: new EventDispatcher({} as any) });
        await flushPromises();

        const s = client.getConnectionStatus();
        expect(s.state).toBe('connecting');
        expect(s.reconnectAttempts).toBe(0);
    }, 10000);
});
