import WebSocket from 'ws';
import { WSClient } from '../index';
import { buildConnectionUrl, ConnectionConfigError } from '../connection-config';

jest.mock('../proto-buf/pbbp2', () => ({
  pbbp2: { Frame: {
    decode: jest.fn().mockReturnValue({ method: 0, headers: [] }),
    encode: jest.fn().mockReturnValue({ finish: () => new Uint8Array() }),
  } },
}));
jest.mock('../proto-buf', () => ({
  decode: jest.fn().mockReturnValue({ method: 0, headers: [] }),
}));

jest.mock('ws', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ on: jest.fn(), terminate: jest.fn() })),
}));

const endpoint = 'wss://original.test/a%2Fb?device_id=d&service_id=42&x=%2F&x=2';
const createClient = (overrides: Record<string, unknown> = {}) => new WSClient({
  appId: 'cli_ABCDEF0123456789', appSecret: 'placeholder', loggerLevel: 4,
  ...overrides,
});

beforeEach(() => jest.clearAllMocks());

test.each(['example.test', 'example.test:443', '127.0.0.1:80', '[::1]', '[::1]:443'])(
  'host override preserves raw path/query: %s', host => {
    createClient({ connectionHost: host });
    expect(buildConnectionUrl(endpoint, host)).toBe(`wss://${host}/a%2Fb?device_id=d&service_id=42&x=%2F&x=2`);
    expect(buildConnectionUrl(endpoint)).toBe(endpoint);
  },
);

test.each(['', ' ', 'https://x', 'x/path', 'x?q=1', 123])(
  'rejects invalid host before network: %s', host => {
    expect(() => createClient({ connectionHost: host })).toThrow('invalid websocket connection host');
    expect(WebSocket).not.toHaveBeenCalled();
  },
);

test.each(['Host', 'cOnNeCtIoN', 'Upgrade', 'sEc-WeBsOcKeT-Key'])(
  'rejects reserved header: %s', name => {
    expect(() => createClient({ connectionHeaders: { [name]: 'value' } })).toThrow('invalid websocket connection headers');
  },
);

test.each(['https://x/ws', 'wss://user@x/ws', 'wss://x/ws#', 'wss:///path'])(
  'invalid overridden endpoint is terminal: %s', value => {
    expect(() => buildConnectionUrl(value, 'logical.test')).toThrow(ConnectionConfigError);
  },
);

test('bootstrap and repeated handshakes use isolated configuration and existing agent', async () => {
  const http = { request: jest.fn().mockResolvedValue({ code: 0, msg: 'ok', data: {
    URL: endpoint, ClientConfig: { PingInterval: 120, ReconnectCount: 3, ReconnectInterval: 1, ReconnectNonce: 0 },
  } }) };
  const headers = { 'X-Route': 'ws-only' };
  const agent = {};
  const client = createClient({ httpInstance: http, connectionHost: 'logical.test:8443', connectionHeaders: headers, agent });
  headers['X-Route'] = 'caller-mutated';
  for (let i = 0; i < 2; i++) {
    expect(await (client as any).pullConnectConfig()).toEqual({ ok: true });
    const bootstrap = http.request.mock.calls[i][0];
    expect(bootstrap.url).toContain('/callback/ws/endpoint');
    expect(bootstrap.headers['X-Route']).toBeUndefined();
    const pending = (client as any).connect();
    const [url, options] = (WebSocket as unknown as jest.Mock).mock.calls[i];
    expect(url).toBe('wss://logical.test:8443/a%2Fb?device_id=d&service_id=42&x=%2F&x=2');
    expect(options.agent).toBe(agent);
    expect(options.headers).toEqual({ 'X-Route': 'ws-only' });
    options.headers['X-Route'] = 'transport-mutated';
    const socket = (WebSocket as unknown as jest.Mock).mock.results[i].value;
    const onError = socket.on.mock.calls.find(([name]: [string]) => name === 'error')[1];
    onError(new Error('test rejection'));
    expect(await pending).toBe(false);
  }
});

test('default connection preserves original URL and options', async () => {
  const client = createClient();
  (client as any).wsConfig.updateWs({ connectUrl: endpoint });
  const pending = (client as any).connect();
  expect(WebSocket).toHaveBeenCalledWith(endpoint, { agent: undefined });
  const socket = (WebSocket as unknown as jest.Mock).mock.results[0].value;
  socket.on.mock.calls.find(([name]: [string]) => name === 'error')[1](new Error('test rejection'));
  expect(await pending).toBe(false);
});

test('invalid overridden endpoint is classified as non-retryable', async () => {
  const http = { request: jest.fn().mockResolvedValue({ code: 0, data: {
    URL: 'wss://user@original.test/ws', ClientConfig: {},
  } }) };
  const client = createClient({ httpInstance: http, connectionHost: 'logical.test' });
  expect(await (client as any).pullConnectConfig()).toEqual({ ok: false, retryable: false, error: 'invalid websocket connection endpoint' });
  expect(WebSocket).not.toHaveBeenCalled();
});
