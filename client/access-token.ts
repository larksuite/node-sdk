/**
 * `client.accessToken` — credential-agnostic user-access-token (UAT) service.
 *
 * Both methods converge on the OAuth token endpoint (`{oauthBaseUrl}/oauth/v3/token`)
 * and pick the client-auth credential automatically: ClientAssertion provider
 * first, then `appSecret` (`client_secret`), else error 7104.
 *
 * In keyless mode this is the ONLY way to obtain/refresh a UAT; the legacy
 * `client.userAccessToken` (authen oidc, tenant-token-authed) is left unchanged.
 */
import { Logger } from '@node-sdk/typings';
import { HttpInstance } from '@node-sdk/typings/http';
import {
    AccessTokenError,
    ClientAssertionError,
    ClientAssertionProvider,
    CLIENT_ASSERTION_TYPE_JWT_BEARER,
    ERR_CODE_APP_SECRET_AND_CLIENT_ASSERTION_EMPTY,
    ERR_CODE_CLIENT_ASSERTION_RETRIEVE_FAILED,
    ERR_CODE_CLIENT_ASSERTION_TOKEN_EMPTY,
    GRANT_TYPE_AUTHORIZATION_CODE,
    GRANT_TYPE_REFRESH_TOKEN,
    OAUTH_TOKEN_URI,
    X_TARGET_SERVICE,
    buildProxyUrl,
    resolveOauthAud,
    resolveOauthBaseUrl,
} from './client-assertion';

interface IAccessTokenParams {
    appId: string;
    appSecret?: string;
    clientAssertionProvider?: ClientAssertionProvider;
    oauthBaseUrl?: string;
    domain: string;
    httpInstance: HttpInstance;
    logger: Logger;
}

export interface IAuthorizationCodeParams {
    code: string;
    redirectUri?: string;
    codeVerifier?: string;
    scope?: string;
    headers?: Record<string, string>;
}

export interface IRefreshParams {
    refreshToken: string;
    scope?: string;
    headers?: Record<string, string>;
}

export interface AccessTokenResponse {
    accessToken: string;
    tokenType?: string;
    expiresIn?: number;
    refreshToken?: string;
    refreshTokenExpiresIn?: number;
    scope?: string;
}

const valueIfNotEmpty = <T>(value: T): T | undefined =>
    value === '' || value === 0 || value === null || value === undefined
        ? undefined
        : value;

const isErrorResponse = (resp: any): boolean => {
    if (!resp) {
        return true;
    }
    if (resp.error) {
        return true;
    }
    const { code } = resp;
    return code !== undefined && code !== 0 && code !== '0' && code !== '';
};

export class AccessToken {
    private appId: string;

    private appSecret?: string;

    private clientAssertionProvider?: ClientAssertionProvider;

    private oauthBaseUrl?: string;

    private domain: string;

    private httpInstance: HttpInstance;

    private logger: Logger;

    constructor(params: IAccessTokenParams) {
        this.appId = params.appId;
        this.appSecret = params.appSecret;
        this.clientAssertionProvider = params.clientAssertionProvider;
        this.oauthBaseUrl = params.oauthBaseUrl;
        this.domain = params.domain;
        this.httpInstance = params.httpInstance;
        this.logger = params.logger;
    }

    async retrieveByAuthorizationCode(
        params: IAuthorizationCodeParams
    ): Promise<AccessTokenResponse> {
        return this.doRequest(
            {
                grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
                code: params.code,
                redirect_uri: params.redirectUri,
                code_verifier: params.codeVerifier,
                scope: params.scope,
            },
            params.headers
        );
    }

    async refresh(params: IRefreshParams): Promise<AccessTokenResponse> {
        return this.doRequest(
            {
                grant_type: GRANT_TYPE_REFRESH_TOKEN,
                refresh_token: params.refreshToken,
                scope: params.scope,
            },
            params.headers
        );
    }

    private async doRequest(
        rawBody: Record<string, any>,
        callerHeaders?: Record<string, string>
    ): Promise<AccessTokenResponse> {
        const oauthBaseUrl = resolveOauthBaseUrl({
            oauthBaseUrl: this.oauthBaseUrl,
            domain: this.domain,
        });
        const aud = resolveOauthAud({
            oauthBaseUrl: this.oauthBaseUrl,
            domain: this.domain,
        });

        // Drop null/undefined and inject client_id.
        const body: Record<string, any> = { client_id: this.appId };
        for (const [k, v] of Object.entries(rawBody)) {
            if (v !== undefined && v !== null) {
                body[k] = v;
            }
        }

        let url = `${oauthBaseUrl}${OAUTH_TOKEN_URI}`;
        const headers: Record<string, string> = { ...(callerHeaders || {}) };

        if (this.clientAssertionProvider) {
            let assertion;
            try {
                assertion = await this.clientAssertionProvider.retrieveToken(aud);
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
            body.client_assertion_type = CLIENT_ASSERTION_TYPE_JWT_BEARER;
            body.client_assertion = assertion.value;
            if (assertion.targetInfo) {
                url = buildProxyUrl(assertion.targetInfo, OAUTH_TOKEN_URI);
                headers[X_TARGET_SERVICE] = aud;
            }
        } else if (this.appSecret) {
            body.client_secret = this.appSecret;
        } else {
            throw new ClientAssertionError(
                ERR_CODE_APP_SECRET_AND_CLIENT_ASSERTION_EMPTY,
                'appSecret and clientAssertionProvider cannot both be empty for accessToken APIs'
            );
        }

        let status = 200;
        let resp: any;
        try {
            resp = await this.httpInstance.request({
                method: 'post',
                url,
                headers,
                data: body,
            });
        } catch (e: any) {
            this.logger.error(e);
            if (e?.response) {
                status = e.response.status;
                resp = e.response.data;
            } else {
                // Network/transport error with no response: never re-throw the
                // raw AxiosError — its `config.data` still carries the cleartext
                // client_assertion / client_secret / refresh_token. Convert to a
                // self-safe AccessTokenError.
                throw new AccessTokenError(
                    0,
                    0,
                    '',
                    e?.message || 'oauth token request failed'
                );
            }
        }

        if (status !== 200 || isErrorResponse(resp)) {
            throw new AccessTokenError(
                status,
                resp?.code || 0,
                resp?.error || '',
                resp?.error_description || resp?.msg || ''
            );
        }

        const accessToken = valueIfNotEmpty(resp?.access_token);
        if (!accessToken) {
            throw new AccessTokenError(
                status,
                resp?.code || 0,
                resp?.error || '',
                resp?.error_description ||
                    'oauth token response missing access_token'
            );
        }

        return {
            accessToken,
            tokenType: valueIfNotEmpty(resp.token_type),
            expiresIn: valueIfNotEmpty(resp.expires_in),
            refreshToken: valueIfNotEmpty(resp.refresh_token),
            refreshTokenExpiresIn: valueIfNotEmpty(resp.refresh_token_expires_in),
            scope: valueIfNotEmpty(resp.scope),
        };
    }
}
