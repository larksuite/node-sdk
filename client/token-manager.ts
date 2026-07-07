import { CTenantKey, CTenantAccessToken } from '@node-sdk/consts';
import { Cache, AppType, Logger } from '@node-sdk/typings';
import { assert } from '@node-sdk/utils';
import AppTicketManager from './app-ticket-manager';
import { HttpInstance } from '@node-sdk/typings/http';
import {
    ClientAssertionError,
    ClientAssertionProvider,
    CLIENT_ASSERTION_TYPE_JWT_BEARER,
    ERR_CODE_CLIENT_ASSERTION_PROVIDER_NOT_CONFIGURED,
    ERR_CODE_CLIENT_ASSERTION_RETRIEVE_FAILED,
    ERR_CODE_CLIENT_ASSERTION_TOKEN_EMPTY,
    GRANT_TYPE_JWT_BEARER,
    OAUTH_TOKEN_URI,
    X_TARGET_SERVICE,
    buildProxyUrl,
    resolveOauthAud,
    resolveOauthBaseUrl,
} from './client-assertion';

interface IParams {
    appId: string;
    appSecret: string;
    cache: Cache;
    domain: string;
    logger: Logger;
    appType: AppType;
    httpInstance: HttpInstance;
    clientAssertionProvider?: ClientAssertionProvider;
    oauthBaseUrl?: string;
}

interface TokenResponse {
    code?: number | string;
    msg?: string;
}

/**
 * Build an error message for a token response that is missing its expected
 * field. Only the API's own `code`/`msg` are echoed back — never request
 * credentials (app_secret, app_ticket, tokens) — so the message is safe to
 * surface to callers and logs.
 */
function buildTokenError(field: string, response?: TokenResponse): string {
    const code = response?.code ?? 'unknown';
    const msg = response?.msg ?? 'no message';
    return `failed to get ${field}, code: ${code}, msg: ${msg}`;
}

export class TokenManager {
    appId: string;

    appSecret: string;

    cache: Cache;

    appTicketManager: AppTicketManager;

    domain: string;

    logger: Logger;

    appType: AppType;

    httpInstance: HttpInstance;

    clientAssertionProvider?: ClientAssertionProvider;

    oauthBaseUrl?: string;

    constructor(params: IParams) {
        this.appId = params.appId;
        this.appSecret = params.appSecret;
        this.cache = params.cache;
        this.domain = params.domain;
        this.logger = params.logger;
        this.appType = params.appType;
        this.httpInstance = params.httpInstance;
        this.clientAssertionProvider = params.clientAssertionProvider;
        this.oauthBaseUrl = params.oauthBaseUrl;

        this.appTicketManager = new AppTicketManager({
            appId: this.appId,
            appSecret: this.appSecret,
            cache: this.cache,
            domain: this.domain,
            logger: this.logger,
            appType: this.appType,
            httpInstance: this.httpInstance,
        });

        this.logger.debug('token manager is ready');
    }

    /**
     * POST a token endpoint and return the validated response body.
     *
     * On transport failure the original error is logged and rethrown — so the
     * caller sees the real cause (EPIPE, timeout, ...) instead of a secondary
     * "Cannot destructure ... of undefined". On an HTTP-200 business failure the
     * required field is absent; we throw an error carrying only the API's
     * code/msg and never cache an undefined token.
     */
    private async requestToken<T extends Record<string, unknown>>(
        url: string,
        body: Record<string, unknown>,
        requiredField: Extract<keyof T, string>
    ): Promise<T & TokenResponse> {
        const response = await this.httpInstance
            .post<T & TokenResponse>(url, body)
            .catch((e) => {
                this.logger.error(e);
                throw e;
            });

        if (!response || !response[requiredField]) {
            throw new Error(buildTokenError(requiredField, response));
        }

        return response;
    }

    async getCustomTenantAccessToken() {
        // Keyless (ClientAssertion) mode forks to a separate OAuth exchange.
        // Without a provider, the legacy app_secret path below is unchanged.
        if (this.clientAssertionProvider) {
            return this.getTenantTokenByClientAssertion();
        }

        const cachedTenantAccessToken = await this.cache?.get(
            CTenantAccessToken,
            {
                namespace: this.appId
            }
        );

        if (cachedTenantAccessToken) {
            this.logger.debug('use cache token');
            return cachedTenantAccessToken;
        }

        this.logger.debug('request token');
        const { tenant_access_token, expire } = await this.requestToken<{
            tenant_access_token?: string;
            expire?: number;
        }>(
            `${this.domain}/open-apis/auth/v3/tenant_access_token/internal`,
            {
                app_id: this.appId,
                app_secret: this.appSecret,
            },
            'tenant_access_token'
        );

        await this.cache?.set(
            CTenantAccessToken,
            tenant_access_token,
            // Due to the time-consuming network, the expiration time needs to be 3 minutes earlier
            new Date().getTime() + expire! * 1000 - 3 * 60 * 1000,
            {
                namespace: this.appId
            }
        );

        return tenant_access_token;
    }

    /**
     * Exchange a ClientAssertion for a tenant access token at the OAuth token
     * endpoint (`jwt-bearer` grant). Credential failures are surfaced as
     * {@link ClientAssertionError} — never swallowed.
     */
    private async getTenantTokenByClientAssertion(): Promise<string> {
        const oauthBaseUrl = resolveOauthBaseUrl({
            oauthBaseUrl: this.oauthBaseUrl,
            domain: this.domain,
        });
        const aud = resolveOauthAud({
            oauthBaseUrl: this.oauthBaseUrl,
            domain: this.domain,
        });

        const cachedTenantAccessToken = await this.cache?.get(
            CTenantAccessToken,
            { namespace: this.appId }
        );
        if (cachedTenantAccessToken) {
            this.logger.debug('use cache token');
            return cachedTenantAccessToken;
        }

        let assertion;
        try {
            assertion = await this.clientAssertionProvider!.retrieveToken(aud);
        } catch (e: any) {
            throw new ClientAssertionError(
                ERR_CODE_CLIENT_ASSERTION_RETRIEVE_FAILED,
                e?.message || 'client assertion provider failed'
            );
        }
        if (!assertion || !assertion.value) {
            throw new ClientAssertionError(
                ERR_CODE_CLIENT_ASSERTION_TOKEN_EMPTY,
                'client assertion token is empty'
            );
        }

        let url = `${oauthBaseUrl}${OAUTH_TOKEN_URI}`;
        const headers: Record<string, string> = {};
        if (assertion.targetInfo) {
            url = buildProxyUrl(assertion.targetInfo, OAUTH_TOKEN_URI);
            headers[X_TARGET_SERVICE] = aud;
        }

        this.logger.debug('request token (client assertion)');
        let resp: any;
        try {
            resp = await this.httpInstance.request({
                method: 'post',
                url,
                headers,
                data: {
                    grant_type: GRANT_TYPE_JWT_BEARER,
                    client_assertion_type: CLIENT_ASSERTION_TYPE_JWT_BEARER,
                    client_assertion: assertion.value,
                    client_id: this.appId,
                },
            });
        } catch (e: any) {
            this.logger.error(e);
            throw new ClientAssertionError(
                e?.response?.data?.code || 0,
                e?.response?.data?.error_description ||
                    e?.response?.data?.error ||
                    'client assertion token exchange failed'
            );
        }

        const tenantAccessToken = resp?.access_token;
        if (!tenantAccessToken) {
            throw new ClientAssertionError(
                resp?.code || 0,
                resp?.error_description ||
                    resp?.error ||
                    'oauth token response missing access token'
            );
        }

        const expiresIn = Number(resp?.expires_in) || 0;
        await this.cache?.set(
            CTenantAccessToken,
            tenantAccessToken,
            // Expire 180s early to absorb network latency.
            new Date().getTime() + Math.max(expiresIn - 180, 0) * 1000,
            { namespace: this.appId }
        );

        return tenantAccessToken;
    }

    async getMarketTenantAccessToken(tenantKey: string) {
        // ISV / marketplace apps depend on app_access_token, which is
        // unavailable in ClientAssertion mode — fail fast.
        if (this.clientAssertionProvider) {
            throw new ClientAssertionError(
                ERR_CODE_CLIENT_ASSERTION_PROVIDER_NOT_CONFIGURED,
                'ClientAssertion mode is not supported for ISV apps'
            );
        }

        if (!tenantKey) {
            this.logger.error('market app request need tenant key');
            return undefined;
        }

        const tenantAccessToken = await this.cache?.get(
            `larkMarketAccessToken${tenantKey}`,
            {
                namespace: this.appId
            }
        );

        if (tenantAccessToken) {
            this.logger.debug('use cache token');
            return tenantAccessToken;
        }

        this.logger.debug('get app ticket');
        const appTicket = await this.appTicketManager.getAppTicket();

        if (!appTicket) {
            this.logger.warn('no app ticket');
            return undefined;
        }

        this.logger.debug('get app access token');
        // 获取app_access_token
        const { app_access_token } = await this.requestToken<{
            app_access_token?: string;
        }>(
            `${this.domain}/open-apis/auth/v3/app_access_token`,
            {
                app_id: this.appId,
                app_secret: this.appSecret,
                app_ticket: appTicket,
            },
            'app_access_token'
        );

        this.logger.debug('get tenant access token');
        // 获取tenant_access_token
        const { tenant_access_token, expire } = await this.requestToken<{
            tenant_access_token?: string;
            expire?: number;
        }>(
            `${this.domain}/open-apis/auth/v3/tenant_access_token`,
            {
                app_access_token,
                tenant_key: tenantKey,
            },
            'tenant_access_token'
        );

        // 设置tenant_access_token
        await this.cache.set(
            `larkMarketAccessToken${tenantKey}`,
            tenant_access_token,
            // Due to the time-consuming network, the expiration time needs to be 3 minutes earlier
            new Date().getTime() + expire! * 1000 - 3 * 60 * 1000,
            {
                namespace: this.appId
            }
        );

        return tenant_access_token;
    }

    async getTenantAccessToken(params?: { [CTenantKey]?: string }) {
        assert(this.appType === AppType.SelfBuild, async () => {
            this.logger.debug('get custom app token');
        });
        assert(this.appType === AppType.ISV, async () => {
            this.logger.debug('get market app token ');
        });

        // prettier-ignore
        const tenantAccessToken =
            this.appType === AppType.SelfBuild
                ? await this.getCustomTenantAccessToken()
                : await this.getMarketTenantAccessToken(params?.[CTenantKey]!);

        return tenantAccessToken;
    }
}
