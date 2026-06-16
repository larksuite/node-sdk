import { Cache, AppType, Domain, LoggerLevel, Logger } from '@node-sdk/typings';
import {
    CTenantKey,
    CWithHelpdeskAuthorization,
    CWithUserAccessToken,
} from '@node-sdk/consts';
import { HttpInstance } from '@node-sdk/typings/http';
import { ClientAssertionProvider } from './client-assertion';

// 和axios保持一致
export interface IRequestOptions {
    lark?: {
        [CTenantKey]?: string;
        [CWithHelpdeskAuthorization]?: boolean;
        [CWithUserAccessToken]?: string;
    };
    params?: Record<string, string>;
    data?: Record<string, string>;
    headers?: Record<string, string>;
    path?: Record<string, string>;
}

export interface IClientParams {
    appId: string;
    /**
     * App secret. Optional: provide either `appSecret` or
     * `clientAssertionProvider` (at least one). When both are set, the
     * provider takes precedence.
     */
    appSecret?: string;
    /**
     * Keyless (ClientAssertion) credential provider. When set, the SDK
     * exchanges the provider's short-lived assertion for tokens instead of
     * using `appSecret`. Self-build apps only.
     */
    clientAssertionProvider?: ClientAssertionProvider;
    /**
     * OAuth base URL (e.g. `https://accounts.feishu.cn`). Official domains are
     * auto-derived and may be omitted; custom domains must set this.
     */
    oauthBaseUrl?: string;
    domain?: Domain | string;
    loggerLevel?: LoggerLevel;
    logger?: Logger;
    cache?: Cache;
    disableTokenCache?: boolean;
    appType?: AppType;
    helpDeskId?: string;
    helpDeskToken?: string;
    httpInstance?: HttpInstance;
    /** Caller tag appended to User-Agent as `source/<name>`. */
    source?: string;
    /** @internal Extra bare tokens appended to User-Agent, set by sub-modules. */
    extraUaTags?: string[];
}

export interface IPayload {
    params?: Record<string, any>;
    data?: Record<string, any>;
    headers?: Record<string, any>;
    path?: Record<string, any>;
}
