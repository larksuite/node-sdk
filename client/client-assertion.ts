/**
 * ClientAssertion (keyless / RFC 7523 `private_key_jwt`) shared module.
 *
 * The SDK does NOT generate, parse, sign or store JWTs. A caller-supplied
 * {@link ClientAssertionProvider} returns a short-lived assertion which the SDK
 * exchanges at the OAuth token endpoint. This module centralizes the public
 * types, error classes, OAuth constants and the three pure helpers (aud
 * extraction, OAuth base-URL resolution, GDPR proxy-URL construction) so they
 * don't leak into the Symbol-style `consts/index.ts`.
 */

// --- Provider contract -----------------------------------------------------

/** GDPR proxy routing info. When present, requests go through the proxy. */
export interface TargetInfo {
    targetService: string;
    targetPrefix?: string;
}

/** What a provider returns: the assertion value plus optional proxy info. */
export interface ClientAssertionToken {
    value: string;
    targetInfo?: TargetInfo;
}

/**
 * Implemented by an external signing service. `aud` is the
 * target audience host the SDK is about to call. Sync or async.
 */
export interface ClientAssertionProvider {
    retrieveToken(
        aud: string
    ): ClientAssertionToken | Promise<ClientAssertionToken>;
}

// --- OAuth constants -------------------------------------------------------

export const OAUTH_TOKEN_URI = '/oauth/v3/token';
export const GRANT_TYPE_JWT_BEARER =
    'urn:ietf:params:oauth:grant-type:jwt-bearer';
export const CLIENT_ASSERTION_TYPE_JWT_BEARER =
    'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
export const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
export const X_TARGET_SERVICE = 'X-Target-Service';

// ClientAssertion error codes.
export const ERR_CODE_CLIENT_ASSERTION_PROVIDER_NOT_CONFIGURED = 7100;
export const ERR_CODE_CLIENT_ASSERTION_TOKEN_EMPTY = 7101;
export const ERR_CODE_CLIENT_ASSERTION_RETRIEVE_FAILED = 7102;
export const ERR_CODE_CLIENT_ASSERTION_MODE_NOT_SUPPORTED = 7103;
export const ERR_CODE_APP_SECRET_AND_CLIENT_ASSERTION_EMPTY = 7104;

/**
 * Official OpenAPI-host → OAuth-base-URL mapping. Frozen and looked up by exact
 * host so a custom/look-alike domain cannot be silently mapped to an official
 * OAuth host.
 */
export const OAUTH_DOMAIN_MAP: Readonly<Record<string, string>> = Object.freeze({
    'open.feishu.cn': 'https://accounts.feishu.cn',
    'open.larksuite.com': 'https://accounts.larksuite.com',
});

// --- Error classes ---------------------------------------------------------

/** Errors of the assertion chain itself (codes 7100–7104, TAT exchange). */
export class ClientAssertionError extends Error {
    code: number;

    msg: string;

    constructor(code: number, msg: string) {
        super(msg);
        this.name = 'ClientAssertionError';
        this.code = code;
        this.msg = msg;
    }
}

/** Non-200 (or token-less) response from the `/oauth/v3/token` endpoint. */
export class AccessTokenError extends Error {
    statusCode: number;

    code: number;

    error: string;

    errorDescription: string;

    constructor(
        statusCode: number,
        code: number,
        error: string,
        errorDescription: string
    ) {
        super(errorDescription || error || 'access token request failed');
        this.name = 'AccessTokenError';
        this.statusCode = statusCode;
        this.code = code;
        this.error = error;
        this.errorDescription = errorDescription;
    }
}

// --- Pure helpers (all URL parsing via `new URL`; no bare host concat) ------

const ensureScheme = (raw: string): string =>
    raw.includes('://') ? raw : `https://${raw}`;

/** Extract the audience host (incl. port) from a URL. Throws if unparseable. */
export function extractAudFromUrl(rawUrl: string): string {
    const parsed = new URL(ensureScheme(rawUrl));
    if (!parsed.host) {
        throw new Error(`invalid url: ${rawUrl}`);
    }
    return parsed.host;
}

interface OAuthConfig {
    oauthBaseUrl?: string;
    domain: string;
}

/**
 * Resolve the OAuth base URL: ① explicit `oauthBaseUrl` (normalized) →
 * ② official domain mapping → ③ otherwise throw (custom domains must
 * configure `oauthBaseUrl` explicitly).
 */
export function resolveOauthBaseUrl(config: OAuthConfig): string {
    if (config.oauthBaseUrl) {
        return ensureScheme(config.oauthBaseUrl).replace(/\/+$/, '');
    }
    const aud = extractAudFromUrl(config.domain);
    const mapped = OAUTH_DOMAIN_MAP[aud];
    if (mapped) {
        return mapped;
    }
    throw new Error(
        'oauthBaseUrl is not configured. When domain is a non-default value ' +
            '(neither open.feishu.cn nor open.larksuite.com), set oauthBaseUrl explicitly.'
    );
}

export function resolveOauthAud(config: OAuthConfig): string {
    return extractAudFromUrl(resolveOauthBaseUrl(config));
}

/**
 * Build the GDPR proxy URL. The assertion (a bearer credential) is sent to
 * `targetService`, so it is validated: must be https (no cleartext exfil),
 * parseable, and carry no userinfo. Path traversal is rejected.
 */
export function buildProxyUrl(targetInfo: TargetInfo, apiPath: string): string {
    const parsed = new URL(ensureScheme(targetInfo.targetService));
    if (parsed.protocol !== 'https:') {
        throw new Error('targetService must use https');
    }
    if (parsed.username || parsed.password) {
        throw new Error('targetService must not contain userinfo');
    }
    const prefix = targetInfo.targetPrefix || '';
    const path = `${prefix}${apiPath}`.replace(/\/{2,}/g, '/');
    if (/(^|\/)\.\.(\/|$)/.test(path)) {
        throw new Error('targetPrefix must not contain path traversal');
    }
    return `${parsed.protocol}//${parsed.host}${path}`;
}
