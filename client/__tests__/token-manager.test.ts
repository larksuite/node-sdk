import { TokenManager } from '../token-manager';
import { AppType, Cache, Logger } from '@node-sdk/typings';
import { CTenantAccessToken, CAppTicket } from '@node-sdk/consts';

const DOMAIN = 'https://open.feishu.cn';
const APP_ID = 'cli_test_app';

function makeLogger(): Logger {
    return {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        trace: jest.fn(),
    };
}

// In-memory cache keyed by `${String(key)}|${namespace}`.
function makeCache(initial: Array<[string | Symbol, any, string?]> = []): Cache & {
    set: jest.Mock;
    get: jest.Mock;
} {
    const store = new Map<string, any>();
    const k = (key: string | Symbol, namespace?: string) =>
        `${String(key)}|${namespace ?? ''}`;
    for (const [key, value, namespace] of initial) {
        store.set(k(key, namespace), value);
    }
    const set = jest.fn(
        async (key: string | Symbol, value: any, _expire?: number, options?: { namespace?: string }) => {
            store.set(k(key, options?.namespace), value);
            return true;
        }
    );
    const get = jest.fn(async (key: string | Symbol, options?: { namespace?: string }) => {
        return store.get(k(key, options?.namespace));
    });
    return { set, get };
}

// post mock routed by URL substring.
function makeHttp(routes: Record<string, () => Promise<any>>): { post: jest.Mock } {
    const post = jest.fn(async (url: string) => {
        const match = Object.keys(routes).find((frag) => url.includes(frag));
        if (!match) {
            throw new Error(`unexpected POST to ${url}`);
        }
        return routes[match]();
    });
    return { post };
}

function makeManager(opts: {
    appType: AppType;
    cache: Cache;
    http: { post: jest.Mock };
    logger?: Logger;
    appSecret?: string;
}) {
    return new TokenManager({
        appId: APP_ID,
        appSecret: opts.appSecret ?? 'app_secret_value',
        cache: opts.cache,
        domain: DOMAIN,
        logger: opts.logger ?? makeLogger(),
        appType: opts.appType,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        httpInstance: opts.http as any,
    });
}

afterEach(() => {
    jest.useRealTimers();
});

describe('TokenManager · getCustomTenantAccessToken (self-build)', () => {
    test('rethrows the original transport error instead of a secondary destructure error', async () => {
        const logger = makeLogger();
        const cache = makeCache();
        const http = makeHttp({
            'tenant_access_token/internal': () => Promise.reject(new Error('EPIPE')),
        });
        const tm = makeManager({ appType: AppType.SelfBuild, cache, http, logger });

        await expect(tm.getCustomTenantAccessToken()).rejects.toThrow('EPIPE');
        await expect(tm.getCustomTenantAccessToken()).rejects.not.toThrow(
            /Cannot destructure property/
        );
        expect(cache.set).not.toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalled();
    });

    test('throws on business error (no token field) and does not cache', async () => {
        const cache = makeCache();
        const http = makeHttp({
            'tenant_access_token/internal': () =>
                Promise.resolve({ code: 99991663, msg: 'app ticket invalid' }),
        });
        const tm = makeManager({ appType: AppType.SelfBuild, cache, http });

        const err = await tm.getCustomTenantAccessToken().then(
            () => null,
            (e) => e
        );
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('99991663');
        expect(err.message).toContain('app ticket invalid');
        expect(cache.set).not.toHaveBeenCalled();
    });

    test('success path is unchanged: returns token and caches with 3-min-earlier expiry', async () => {
        const cache = makeCache();
        const http = makeHttp({
            'tenant_access_token/internal': () =>
                Promise.resolve({ code: 0, tenant_access_token: 't-xxx', expire: 7200 }),
        });
        const tm = makeManager({ appType: AppType.SelfBuild, cache, http });

        const before = Date.now();
        const token = await tm.getCustomTenantAccessToken();
        const after = Date.now();

        expect(token).toBe('t-xxx');
        expect(cache.set).toHaveBeenCalledTimes(1);
        const [key, value, expiry, options] = (cache.set as jest.Mock).mock.calls[0];
        expect(key).toBe(CTenantAccessToken);
        expect(value).toBe('t-xxx');
        expect(options).toEqual({ namespace: APP_ID });
        const offset = 7200 * 1000 - 3 * 60 * 1000;
        expect(expiry).toBeGreaterThanOrEqual(before + offset);
        expect(expiry).toBeLessThanOrEqual(after + offset);
    });

    test('cache hit short-circuits without any request', async () => {
        const cache = makeCache([[CTenantAccessToken, 'cached-t', APP_ID]]);
        const http = makeHttp({});
        const tm = makeManager({ appType: AppType.SelfBuild, cache, http });

        await expect(tm.getCustomTenantAccessToken()).resolves.toBe('cached-t');
        expect(http.post).not.toHaveBeenCalled();
    });

    test('business-error message does not leak credentials', async () => {
        const cache = makeCache();
        const http = makeHttp({
            'tenant_access_token/internal': () => Promise.resolve({ code: 1, msg: 'bad' }),
        });
        const tm = makeManager({
            appType: AppType.SelfBuild,
            cache,
            http,
            appSecret: 'SUPER_SECRET_xyz',
        });

        const err = await tm.getCustomTenantAccessToken().then(
            () => null,
            (e) => e
        );
        expect(err).toBeInstanceOf(Error);
        expect(err.message).not.toContain('SUPER_SECRET_xyz');
    });
});

describe('TokenManager · getMarketTenantAccessToken (ISV)', () => {
    test('rethrows transport error from app_access_token request and does not cache', async () => {
        const cache = makeCache([[CAppTicket, 'ticket-1', APP_ID]]);
        const http = makeHttp({
            'auth/v3/app_access_token': () => Promise.reject(new Error('ETIMEDOUT')),
        });
        const tm = makeManager({ appType: AppType.ISV, cache, http });

        await expect(tm.getMarketTenantAccessToken('tk')).rejects.toThrow('ETIMEDOUT');
        expect(cache.set).not.toHaveBeenCalledWith(
            'larkMarketAccessTokentk',
            expect.anything(),
            expect.anything(),
            expect.anything()
        );
    });

    test('throws when tenant_access_token field missing and does not cache', async () => {
        const cache = makeCache([[CAppTicket, 'ticket-1', APP_ID]]);
        const http = makeHttp({
            'auth/v3/app_access_token': () =>
                Promise.resolve({ code: 0, app_access_token: 'a-xxx' }),
            'auth/v3/tenant_access_token': () => Promise.resolve({ code: 1, msg: 'boom' }),
        });
        const tm = makeManager({ appType: AppType.ISV, cache, http });

        const err = await tm.getMarketTenantAccessToken('tk').then(
            () => null,
            (e) => e
        );
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('1');
        expect(err.message).toContain('boom');
        expect(cache.set).not.toHaveBeenCalledWith(
            'larkMarketAccessTokentk',
            expect.anything(),
            expect.anything(),
            expect.anything()
        );
    });

    test('success path is unchanged: returns tenant token and caches it', async () => {
        const cache = makeCache([[CAppTicket, 'ticket-1', APP_ID]]);
        const http = makeHttp({
            'auth/v3/app_access_token': () =>
                Promise.resolve({ code: 0, app_access_token: 'a-xxx' }),
            'auth/v3/tenant_access_token': () =>
                Promise.resolve({ code: 0, tenant_access_token: 't-yyy', expire: 7200 }),
        });
        const tm = makeManager({ appType: AppType.ISV, cache, http });

        const before = Date.now();
        const token = await tm.getMarketTenantAccessToken('tk');
        const after = Date.now();

        expect(token).toBe('t-yyy');
        const setCall = (cache.set as jest.Mock).mock.calls.find(
            (c) => c[0] === 'larkMarketAccessTokentk'
        );
        expect(setCall).toBeDefined();
        const [, value, expiry, options] = setCall;
        expect(value).toBe('t-yyy');
        expect(options).toEqual({ namespace: APP_ID });
        const offset = 7200 * 1000 - 3 * 60 * 1000;
        expect(expiry).toBeGreaterThanOrEqual(before + offset);
        expect(expiry).toBeLessThanOrEqual(after + offset);
    });

    test('cache hit short-circuits without token request', async () => {
        // seed CAppTicket too so the constructor's checkAppTicket() does not fire a resend POST
        const cache = makeCache([
            ['larkMarketAccessTokentk', 'cached-m', APP_ID],
            [CAppTicket, 'ticket-1', APP_ID],
        ]);
        const http = makeHttp({});
        const tm = makeManager({ appType: AppType.ISV, cache, http });

        await expect(tm.getMarketTenantAccessToken('tk')).resolves.toBe('cached-m');
        expect(http.post).not.toHaveBeenCalled();
    });
});
