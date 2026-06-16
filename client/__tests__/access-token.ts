/**
 * Unit tests for the UAT service `client/access-token.ts`.
 *
 * The SDK issues `httpInstance.request({method,url,headers,data})`. axios rejects
 * non-2xx with an AxiosError carrying `.response.status` / `.response.data`; the
 * SDK must translate those into a structured AccessTokenError. We mock both the
 * resolved-body shape (interceptor returns resp.data) and the rejection shape.
 *
 * SECURITY: only placeholder fake values.
 */
import { AccessToken } from '../access-token';
import { AccessTokenError, ClientAssertionError } from '../client-assertion';

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

interface MakeOpts {
    provider?: any;
    appSecret?: string;
    oauthBaseUrl?: string;
    domain?: string;
}

function makeAccessToken(opts: MakeOpts = {}) {
    const request = jest.fn();
    const http = { request, post: jest.fn() };
    const at = new AccessToken({
        appId: APP_ID,
        appSecret: opts.appSecret,
        clientAssertionProvider: opts.provider,
        oauthBaseUrl: opts.oauthBaseUrl,
        domain: opts.domain || 'https://open.feishu.cn',
        httpInstance: http as any,
        logger: makeLogger(),
    } as any);
    return { at, request };
}

const SUCCESS_BODY = {
    access_token: 'fake-uat-1',
    token_type: 'Bearer',
    expires_in: 7200,
    refresh_token: 'fake-rt-1',
    refresh_token_expires_in: 86400,
    scope: 'a b',
};

describe('grant body construction', () => {
    test('authorization_code body carries code/redirect_uri/code_verifier/scope/client_id, undefined dropped', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue(SUCCESS_BODY);

        await at.retrieveByAuthorizationCode({
            code: 'auth-code-1',
            redirectUri: 'https://app.example/cb',
            codeVerifier: 'verifier-1',
            scope: 'a b',
        });

        const body = request.mock.calls.at(-1)![0].data;
        expect(body.grant_type).toBe('authorization_code');
        expect(body.code).toBe('auth-code-1');
        expect(body.redirect_uri).toBe('https://app.example/cb');
        expect(body.code_verifier).toBe('verifier-1');
        expect(body.scope).toBe('a b');
        expect(body.client_id).toBe(APP_ID);
    });

    test('omitted optional fields are not present in the body', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue(SUCCESS_BODY);

        await at.retrieveByAuthorizationCode({ code: 'auth-code-1' });

        const body = request.mock.calls.at(-1)![0].data;
        expect('redirect_uri' in body).toBe(false);
        expect('code_verifier' in body).toBe(false);
        expect('scope' in body).toBe(false);
    });

    test('refresh body carries grant_type=refresh_token + refresh_token + client_id', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue(SUCCESS_BODY);

        await at.refresh({ refreshToken: 'fake-rt-1', scope: 'a' });

        const body = request.mock.calls.at(-1)![0].data;
        expect(body.grant_type).toBe('refresh_token');
        expect(body.refresh_token).toBe('fake-rt-1');
        expect(body.client_id).toBe(APP_ID);
        expect(body.scope).toBe('a');
    });
});

describe('credential selection', () => {
    test('provider mode sends client_assertion_type + client_assertion', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
        };
        const { at, request } = makeAccessToken({ provider });
        request.mockResolvedValue(SUCCESS_BODY);

        await at.retrieveByAuthorizationCode({ code: 'auth-code-1' });

        const body = request.mock.calls.at(-1)![0].data;
        expect(body.client_assertion_type).toBe(
            'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
        );
        expect(body.client_assertion).toBe(FAKE_ASSERTION);
        expect(body.client_secret).toBeUndefined();
    });

    test('secret-only mode sends client_secret', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue(SUCCESS_BODY);

        await at.refresh({ refreshToken: 'fake-rt-1' });

        const body = request.mock.calls.at(-1)![0].data;
        expect(body.client_secret).toBe('fake-secret-1');
        expect(body.client_assertion).toBeUndefined();
    });

    test('neither credential → ClientAssertionError 7104', async () => {
        const { at } = makeAccessToken({});
        await expect(
            at.retrieveByAuthorizationCode({ code: 'auth-code-1' })
        ).rejects.toMatchObject({ code: 7104 });
        await expect(
            at.retrieveByAuthorizationCode({ code: 'auth-code-1' })
        ).rejects.toBeInstanceOf(ClientAssertionError);
    });
});

describe('error translation + success mapping', () => {
    test('axios rejection (non-200) → structured AccessTokenError', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockRejectedValue({
            response: {
                status: 400,
                data: {
                    code: 0,
                    error: 'invalid_grant',
                    error_description: 'x',
                },
            },
        });

        const p = at.refresh({ refreshToken: 'fake-rt-1' });
        await expect(p).rejects.toBeInstanceOf(AccessTokenError);
        await expect(p).rejects.toMatchObject({
            statusCode: 400,
            error: 'invalid_grant',
            errorDescription: 'x',
        });
    });

    test('network error (no response) → self-safe AccessTokenError, no credential leak', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        // AxiosError shape on transport failure: no `response`, but `config.data`
        // still carries the cleartext request body (client_secret/refresh_token).
        request.mockRejectedValue({
            message: 'connect ECONNREFUSED 127.0.0.1:443',
            config: {
                data: JSON.stringify({
                    client_secret: 'fake-secret-1',
                    refresh_token: 'fake-rt-1',
                }),
            },
        });

        const p = at.refresh({ refreshToken: 'fake-rt-1' });
        await expect(p).rejects.toBeInstanceOf(AccessTokenError);

        const thrown = await p.catch((e) => e);
        const serialized = JSON.stringify({
            message: thrown.message,
            ...thrown,
        });
        expect(serialized).not.toContain('fake-secret-1');
        expect(serialized).not.toContain('fake-rt-1');
    });

    test('2xx body containing error still throws AccessTokenError', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue({ error: 'invalid_grant', error_description: 'x' });
        await expect(
            at.refresh({ refreshToken: 'fake-rt-1' })
        ).rejects.toBeInstanceOf(AccessTokenError);
    });

    test('body missing access_token throws AccessTokenError', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue({ token_type: 'Bearer', expires_in: 1 });
        await expect(
            at.refresh({ refreshToken: 'fake-rt-1' })
        ).rejects.toBeInstanceOf(AccessTokenError);
    });

    test('success maps to camelCase fields', async () => {
        const { at, request } = makeAccessToken({ appSecret: 'fake-secret-1' });
        request.mockResolvedValue(SUCCESS_BODY);

        const out = await at.retrieveByAuthorizationCode({ code: 'auth-code-1' });
        expect(out).toMatchObject({
            accessToken: 'fake-uat-1',
            tokenType: 'Bearer',
            expiresIn: 7200,
            refreshToken: 'fake-rt-1',
            refreshTokenExpiresIn: 86400,
            scope: 'a b',
        });
    });
});

describe('proxy + custom headers', () => {
    test('targetInfo proxies url + adds X-Target-Service, caller headers preserved', async () => {
        const provider = {
            retrieveToken: jest.fn().mockResolvedValue({
                value: FAKE_ASSERTION,
                targetInfo: {
                    targetService: 'proxy.example.org',
                    targetPrefix: '/proxy/Lark',
                },
            }),
        };
        const { at, request } = makeAccessToken({ provider });
        request.mockResolvedValue(SUCCESS_BODY);

        await at.retrieveByAuthorizationCode({
            code: 'auth-code-1',
            headers: { 'X-Custom': '1' },
        });

        const cfg = request.mock.calls.at(-1)![0];
        expect(cfg.url).toBe('https://proxy.example.org/proxy/Lark/oauth/v3/token');
        expect(cfg.headers['X-Target-Service']).toBe('accounts.feishu.cn');
        expect(cfg.headers['X-Custom']).toBe('1');
    });
});
