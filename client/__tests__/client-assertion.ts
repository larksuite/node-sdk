/**
 * Public module unit tests for `client/client-assertion.ts`: constants,
 * OAuth base-URL / aud resolution, proxy-URL construction and the error classes.
 *
 * SECURITY: only placeholder fake values. Fake JWTs like `aaa.bbb.ccc`.
 */
import {
    OAUTH_TOKEN_URI,
    GRANT_TYPE_JWT_BEARER,
    CLIENT_ASSERTION_TYPE_JWT_BEARER,
    GRANT_TYPE_AUTHORIZATION_CODE,
    GRANT_TYPE_REFRESH_TOKEN,
    X_TARGET_SERVICE,
    ClientAssertionError,
    AccessTokenError,
    extractAudFromUrl,
    resolveOauthBaseUrl,
    buildProxyUrl,
} from '../client-assertion';

// ---------------------------------------------------------------------------
// constant alignment
// ---------------------------------------------------------------------------

describe('constants', () => {
    test('OAuth URI + grant / assertion types are RFC-exact', () => {
        expect(OAUTH_TOKEN_URI).toBe('/oauth/v3/token');
        expect(GRANT_TYPE_JWT_BEARER).toBe(
            'urn:ietf:params:oauth:grant-type:jwt-bearer'
        );
        expect(CLIENT_ASSERTION_TYPE_JWT_BEARER).toBe(
            'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
        );
        expect(GRANT_TYPE_AUTHORIZATION_CODE).toBe('authorization_code');
        expect(GRANT_TYPE_REFRESH_TOKEN).toBe('refresh_token');
    });

    test('X-Target-Service header name is exact', () => {
        expect(X_TARGET_SERVICE).toBe('X-Target-Service');
    });

    test('error classes carry the documented codes (7100–7104)', () => {
        // ClientAssertionError(code, msg)
        expect(new ClientAssertionError(7100, 'm').code).toBe(7100);
        expect(new ClientAssertionError(7101, 'm').code).toBe(7101);
        expect(new ClientAssertionError(7102, 'm').code).toBe(7102);
        expect(new ClientAssertionError(7103, 'm').code).toBe(7103);
        expect(new ClientAssertionError(7104, 'm').code).toBe(7104);
    });
});

// ---------------------------------------------------------------------------
// resolveOauthBaseUrl
// ---------------------------------------------------------------------------

describe('resolveOauthBaseUrl', () => {
    test('explicit oauthBaseUrl is normalized (adds https, strips trailing /)', () => {
        expect(
            resolveOauthBaseUrl({
                oauthBaseUrl: 'accounts.x.cn/',
                domain: 'https://open.feishu.cn',
            })
        ).toBe('https://accounts.x.cn');
    });

    test('official feishu domain derives accounts.feishu.cn', () => {
        expect(
            resolveOauthBaseUrl({ domain: 'https://open.feishu.cn' })
        ).toBe('https://accounts.feishu.cn');
    });

    test('official larksuite domain derives accounts.larksuite.com', () => {
        expect(
            resolveOauthBaseUrl({ domain: 'https://open.larksuite.com' })
        ).toBe('https://accounts.larksuite.com');
    });

    test('custom domain without oauthBaseUrl throws', () => {
        expect(() =>
            resolveOauthBaseUrl({ domain: 'https://open.example.com' })
        ).toThrow();
    });

    test('official mapping cannot be bypassed by a non-official domain', () => {
        // Feeding a custom domain must NOT silently hit the official branch;
        // it must throw (the mapping is fixed, not override-able).
        expect(() =>
            resolveOauthBaseUrl({ domain: 'https://evil.accounts.feishu.cn.attacker.com' })
        ).toThrow();
    });
});

// ---------------------------------------------------------------------------
// extractAudFromUrl
// ---------------------------------------------------------------------------

describe('extractAudFromUrl', () => {
    test('returns host from a full url', () => {
        expect(
            extractAudFromUrl('https://accounts.feishu.cn/oauth/v3/token')
        ).toBe('accounts.feishu.cn');
    });

    test('schemeless input is auto-prefixed then parsed', () => {
        expect(extractAudFromUrl('accounts.feishu.cn')).toBe(
            'accounts.feishu.cn'
        );
    });

    test('host with explicit port keeps the port', () => {
        expect(extractAudFromUrl('host:8443')).toBe('host:8443');
    });

    test('unparseable input throws', () => {
        expect(() => extractAudFromUrl('http://')).toThrow();
    });
});

// ---------------------------------------------------------------------------
// buildProxyUrl (happy path)
// ---------------------------------------------------------------------------

describe('buildProxyUrl normal', () => {
    test('schemeless targetService + prefix + path → normalized https url', () => {
        expect(
            buildProxyUrl(
                { targetService: 'proxy.example.org', targetPrefix: '/proxy/Lark' },
                '/oauth/v3/token'
            )
        ).toBe('https://proxy.example.org/proxy/Lark/oauth/v3/token');
    });

    test('adjacent slashes between prefix and path are collapsed', () => {
        expect(
            buildProxyUrl(
                { targetService: 'proxy.example.org', targetPrefix: '/proxy/Lark/' },
                '/oauth/v3/token'
            )
        ).toBe('https://proxy.example.org/proxy/Lark/oauth/v3/token');
    });
});

// ---------------------------------------------------------------------------
// buildProxyUrl (security): reject plaintext / userinfo / unparseable
// ---------------------------------------------------------------------------

describe('buildProxyUrl security', () => {
    test('plaintext http:// targetService throws (no cleartext exfiltration)', () => {
        expect(() =>
            buildProxyUrl(
                { targetService: 'http://evil.org', targetPrefix: '/proxy/Lark' },
                '/oauth/v3/token'
            )
        ).toThrow();
    });

    test('targetService with userinfo (@) throws', () => {
        expect(() =>
            buildProxyUrl(
                { targetService: 'https://user:pass@evil.org' },
                '/oauth/v3/token'
            )
        ).toThrow();
    });

    test('unparseable targetService throws', () => {
        expect(() =>
            buildProxyUrl({ targetService: ':::' }, '/oauth/v3/token')
        ).toThrow();
    });
});

// ---------------------------------------------------------------------------
// error classes
// ---------------------------------------------------------------------------

describe('error classes', () => {
    test('AccessTokenError preserves the structured fields and message', () => {
        const err = new AccessTokenError(400, 0, 'invalid', 'bad request');
        expect(err.statusCode).toBe(400);
        expect(err.code).toBe(0);
        expect(err.error).toBe('invalid');
        expect(err.errorDescription).toBe('bad request');
        expect(err.message).toBe('bad request');
    });

    test('ClientAssertionError preserves code and msg', () => {
        const err = new ClientAssertionError(7102, 'token empty');
        expect(err.code).toBe(7102);
        expect(err.msg).toBe('token empty');
        expect(err.message).toBe('token empty');
    });

    test('neither error carries a config / request / response reference', () => {
        const a = new AccessTokenError(400, 0, 'e', 'd') as any;
        const c = new ClientAssertionError(7102, 'm') as any;
        for (const e of [a, c]) {
            expect(e.config).toBeUndefined();
            expect(e.request).toBeUndefined();
            expect(e.response).toBeUndefined();
        }
    });
});
