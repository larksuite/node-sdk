/**
 * TAT acquisition for `client/token-manager.ts` (ClientAssertion behavior).
 *
 * The default httpInstance response interceptor returns `resp.data` (the BODY),
 * so a resolved `.request` / `.post` resolves to the response body. On the
 * assertion TAT flow the SDK issues `httpInstance.request({method,url,headers,data})`
 * (headers are needed for the X-Target-Service proxy branch). We assert on the
 * payload that the mocked httpInstance.request receives.
 *
 * SECURITY: only placeholder fake values.
 */
import { TokenManager } from '../token-manager';
import { ClientAssertionError } from '../client-assertion';
import { AppType } from '@node-sdk/typings';
import { DefaultCache } from '@node-sdk/utils/default-cache';
import { CTenantAccessToken } from '@node-sdk/consts';

const APP_ID = 'cli_ABCDEF0123456789';
const FAKE_ASSERTION = 'aaa.bbb.ccc';

function makeLogger() {
    return {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        trace: jest.fn(),
    };
}

function makeHttp() {
    return {
        // Resolve by default: the ISV app-ticket refresh is fire-and-forget, so
        // post() must return a thenable (the real httpInstance contract) or its
        // .catch would throw asynchronously into an unrelated test.
        post: jest.fn().mockResolvedValue(undefined),
        request: jest.fn(),
    };
}

interface MakeTMOptions {
    appType?: AppType;
    appSecret?: string;
    provider?: any;
    domain?: string;
    oauthBaseUrl?: string;
    cache?: DefaultCache;
    http?: ReturnType<typeof makeHttp>;
}

function makeTokenManager(opts: MakeTMOptions = {}) {
    const http = opts.http || makeHttp();
    const cache = opts.cache || new DefaultCache();
    const logger = makeLogger();
    const tm = new TokenManager({
        appId: APP_ID,
        appSecret: opts.appSecret as any,
        clientAssertionProvider: opts.provider,
        oauthBaseUrl: opts.oauthBaseUrl,
        cache,
        domain: opts.domain || 'https://open.feishu.cn',
        logger,
        appType: opts.appType ?? AppType.SelfBuild,
        httpInstance: http as any,
    } as any);
    return { tm, http, cache, logger };
}

// Returns the single call's payload object, whether the SDK used .request or .post.
function lastTokenCall(http: ReturnType<typeof makeHttp>): {
    url: string;
    body: any;
    headers: Record<string, any>;
} {
    if (http.request.mock.calls.length > 0) {
        const cfg = http.request.mock.calls.at(-1)![0];
        return { url: cfg.url, body: cfg.data, headers: cfg.headers || {} };
    }
    const call = http.post.mock.calls.at(-1)!;
    return { url: call[0], body: call[1], headers: (call[2] || {}) as any };
}

describe('assertion-mode TAT request construction', () => {
    test('hits oauth token uri with jwt-bearer body, no client_secret; provider aud is OAuth host', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http } = makeTokenManager({ provider });
        http.request.mockResolvedValue({
            access_token: 'fake-tat-1',
            expire: 7200,
        });
        http.post.mockResolvedValue({
            access_token: 'fake-tat-1',
            expire: 7200,
        });

        const token = await tm.getCustomTenantAccessToken();
        expect(token).toBe('fake-tat-1');

        const { url, body } = lastTokenCall(http);
        expect(url).toBe('https://accounts.feishu.cn/oauth/v3/token');
        expect(body.grant_type).toBe(
            'urn:ietf:params:oauth:grant-type:jwt-bearer'
        );
        expect(body.client_assertion_type).toBe(
            'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
        );
        expect(body.client_assertion).toBe(FAKE_ASSERTION);
        expect(body.client_id).toBe(APP_ID);
        expect(body.client_secret).toBeUndefined();

        expect(provider.retrieveToken).toHaveBeenCalledWith('accounts.feishu.cn');
    });
});

describe('cache hit skips provider + network', () => {
    test('a cached tenant token returns without calling provider or http', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const cache = new DefaultCache();
        await cache.set(CTenantAccessToken, 'cached-tat', Infinity, {
            namespace: APP_ID,
        });
        const { tm, http } = makeTokenManager({ provider, cache });

        const token = await tm.getCustomTenantAccessToken();
        expect(token).toBe('cached-tat');
        expect(provider.retrieveToken).toHaveBeenCalledTimes(0);
        expect(http.request).toHaveBeenCalledTimes(0);
        expect(http.post).toHaveBeenCalledTimes(0);
    });
});

describe('proxy branch', () => {
    test('targetInfo rewrites url to proxy and adds X-Target-Service header', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({
                value: FAKE_ASSERTION,
                targetInfo: {
                    targetService: 'proxy.example.org',
                    targetPrefix: '/proxy/Lark',
                },
            }),
        };
        const { tm, http } = makeTokenManager({ provider });
        http.request.mockResolvedValue({ access_token: 'fake-tat-1', expire: 7200 });

        await tm.getCustomTenantAccessToken();

        const { url, headers } = lastTokenCall(http);
        expect(url).toBe('https://proxy.example.org/proxy/Lark/oauth/v3/token');
        expect(headers['X-Target-Service']).toBe('accounts.feishu.cn');
    });
});

describe('provider failures map to error codes', () => {
    test('provider throwing → ClientAssertionError 7102', async () => {
        const provider = {
            retrieveToken: jest.fn().mockRejectedValue(new Error('signer down')),
        };
        const { tm } = makeTokenManager({ provider });
        await expect(tm.getCustomTenantAccessToken()).rejects.toMatchObject({
            code: 7102,
        });
    });

    test('provider returning empty value → ClientAssertionError 7101', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: '' }),
        };
        const { tm } = makeTokenManager({ provider });
        await expect(tm.getCustomTenantAccessToken()).rejects.toMatchObject({
            code: 7101,
        });
    });
});

describe('response without access_token', () => {
    test('throws ClientAssertionError carrying error_description', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http } = makeTokenManager({ provider });
        http.request.mockResolvedValue({
            error: 'invalid_client',
            error_description: 'bad',
        });
        http.post.mockResolvedValue({
            error: 'invalid_client',
            error_description: 'bad',
        });

        const p = tm.getCustomTenantAccessToken();
        await expect(p).rejects.toBeInstanceOf(ClientAssertionError);
        await expect(p).rejects.toThrow(/bad/);
    });
});

describe('provider takes priority over appSecret', () => {
    test('with both configured, assertion is used (no client_secret, provider called)', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http } = makeTokenManager({
            provider,
            appSecret: 'fake-secret-1',
        });
        http.request.mockResolvedValue({ access_token: 'fake-tat-1', expire: 7200 });
        http.post.mockResolvedValue({ access_token: 'fake-tat-1', expire: 7200 });

        await tm.getCustomTenantAccessToken();

        const { body } = lastTokenCall(http);
        expect(body.client_assertion).toBe(FAKE_ASSERTION);
        expect(body.client_secret).toBeUndefined();
        expect(provider.retrieveToken).toHaveBeenCalledTimes(1);
    });
});

describe('ISV client assertion', () => {
    test('exchanges once per tenant without app tickets or app tokens', async () => {
        const provider = {
            retrieveToken: jest
                .fn()
                .mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http } = makeTokenManager({
            provider,
            appType: AppType.ISV,
            appSecret: 'unused-secret',
        });
        http.request.mockImplementation(async ({ data }) => ({
            access_token: `token-${data.tenant_key}`,
            expires_in: 7200,
            token_type: 'Bearer',
        }));
        for (const tenant of ['tenant-A', 'tenant-B', 'tenant-A', 'tenant-B']) {
            expect(await tm.getMarketTenantAccessToken(tenant)).toBe(
                `token-${tenant}`
            );
        }
        expect(http.request).toHaveBeenCalledTimes(2);
        expect(provider.retrieveToken).toHaveBeenCalledTimes(2);
        expect(http.post).not.toHaveBeenCalled();
        expect(lastTokenCall(http).body).toEqual({
            grant_type: 'client_credentials',
            client_id: APP_ID,
            client_assertion_type:
                'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            client_assertion: FAKE_ASSERTION,
            tenant_key: 'tenant-B',
        });
    });

    test('requires tenant key before provider invocation', async () => {
        const provider = { retrieveToken: jest.fn() };
        const { tm, http } = makeTokenManager({
            provider,
            appType: AppType.ISV,
        });
        await expect(tm.getMarketTenantAccessToken(' ')).rejects.toThrow(
            /tenant/i
        );
        expect(provider.retrieveToken).not.toHaveBeenCalled();
        expect(http.request).not.toHaveBeenCalled();
    });

    test('preserves proxy routing and isolates cache entries by OAuth endpoint', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({
                value: FAKE_ASSERTION,
                targetInfo: {
                    targetService: 'proxy.example.org',
                    targetPrefix: '/proxy',
                },
            }),
        };
        const cache = new DefaultCache();
        const http = makeHttp();
        http.request.mockResolvedValue({
            access_token: 'proxy-token',
            expires_in: 7200,
            token_type: 'Bearer',
        });
        for (const prefix of ['/region-A', '/region-B', '/region-A']) {
            const { tm } = makeTokenManager({
                provider,
                cache,
                http,
                appType: AppType.ISV,
                oauthBaseUrl: `https://accounts.feishu.cn${prefix}`,
            });
            expect(await tm.getMarketTenantAccessToken('tenant-A')).toBe(
                'proxy-token'
            );
        }
        expect(http.request).toHaveBeenCalledTimes(2);
        expect(lastTokenCall(http).url).toBe(
            'https://proxy.example.org/proxy/oauth/v3/token'
        );
        expect(lastTokenCall(http).headers['X-Target-Service']).toBe(
            'accounts.feishu.cn'
        );
    });

    test.each([
        { code: 400 },
        { error: 'invalid_client' },
        { access_token: '' },
        { expires_in: 0 },
        { token_type: 'Other' },
    ])('rejects failed responses without caching: %j', async (failure) => {
        const provider = {
            retrieveToken: jest
                .fn()
                .mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http, cache, logger } = makeTokenManager({
            provider,
            appType: AppType.ISV,
        });
        const cacheSet = jest.spyOn(cache, 'set');
        http.request.mockResolvedValue({
            access_token: 'test-token',
            expires_in: 7200,
            token_type: 'Bearer',
            ...failure,
        });
        await expect(
            tm.getMarketTenantAccessToken('tenant-A')
        ).rejects.toBeInstanceOf(ClientAssertionError);
        expect(cacheSet).not.toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalled();
        expect(JSON.stringify(logger.warn.mock.calls)).not.toContain(
            FAKE_ASSERTION
        );
        expect(JSON.stringify(logger.warn.mock.calls)).not.toContain(
            'test-token'
        );
    });

    test('preserves cache write failure behavior', async () => {
        const provider = {
            retrieveToken: jest
                .fn()
                .mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http, cache } = makeTokenManager({
            provider,
            appType: AppType.ISV,
        });
        const failure = new Error('cache unavailable');
        jest.spyOn(cache, 'set').mockRejectedValue(failure);
        http.request.mockResolvedValue({
            access_token: 'test-token',
            expires_in: 7200,
            token_type: 'Bearer',
        });
        await expect(tm.getMarketTenantAccessToken('tenant-A')).rejects.toBe(
            failure
        );
    });

    test('HTTP failure logs exclude the assertion in the transport error', async () => {
        const provider = {
            retrieveToken: jest
                .fn()
                .mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http, logger } = makeTokenManager({
            provider,
            appType: AppType.ISV,
        });
        http.request.mockRejectedValue({
            config: { data: { client_assertion: FAKE_ASSERTION } },
            response: {
                status: 401,
                data: { code: 401, error: 'invalid_client' },
            },
        });
        await expect(
            tm.getMarketTenantAccessToken('tenant-A')
        ).rejects.toMatchObject({ code: 401 });
        expect(logger.error).toHaveBeenCalled();
        expect(JSON.stringify(logger.error.mock.calls)).not.toContain(
            FAKE_ASSERTION
        );
    });

    test('short-lived tokens keep the existing cache expiration behavior', async () => {
        const provider = {
            retrieveToken: jest
                .fn()
                .mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { tm, http, cache } = makeTokenManager({
            provider,
            appType: AppType.ISV,
        });
        const set = jest.spyOn(cache, 'set');
        http.request.mockResolvedValue({
            access_token: 'test-token',
            expires_in: 60,
            token_type: 'Bearer',
        });
        const before = Date.now();
        expect(await tm.getMarketTenantAccessToken('tenant-A')).toBe(
            'test-token'
        );
        expect(set).toHaveBeenCalledTimes(1);
        expect(set.mock.calls[0][2]).toBeGreaterThanOrEqual(before);
        expect(set.mock.calls[0][2]).toBeLessThanOrEqual(Date.now());
    });
});

describe('secret-mode regression (no provider)', () => {
    test('still hits internal tenant_access_token endpoint with app_id/app_secret', async () => {
        const { tm, http, cache } = makeTokenManager({
            appSecret: 'fake-secret-1',
        });
        http.post.mockResolvedValue({
            tenant_access_token: 'fake-tat-secret',
            expire: 7200,
        });

        const token = await tm.getCustomTenantAccessToken();
        expect(token).toBe('fake-tat-secret');

        expect(http.post).toHaveBeenCalledTimes(1);
        const [url, body] = http.post.mock.calls[0];
        expect(url).toBe(
            'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
        );
        expect(body).toEqual({ app_id: APP_ID, app_secret: 'fake-secret-1' });
        // assertion-mode request path must not be used in secret mode
        expect(http.request).toHaveBeenCalledTimes(0);

        // cache key + namespace unchanged
        const cached = await cache.get(CTenantAccessToken, { namespace: APP_ID });
        expect(cached).toBe('fake-tat-secret');
    });
});
