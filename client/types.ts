import { Cache, AppType, Domain, LoggerLevel, Logger } from '@node-sdk/typings';
import {
    CTenantKey,
    CWithHelpdeskAuthorization,
    CWithUserAccessToken,
} from '@node-sdk/consts';
import { HttpInstance } from '@node-sdk/typings/http';

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
    appSecret: string;
    domain?: Domain | string;
    loggerLevel?: LoggerLevel;
    logger?: Logger;
    cache?: Cache;
    disableTokenCache?: boolean;
    appType?: AppType;
    helpDeskId?: string;
    helpDeskToken?: string;
    httpInstance?: HttpInstance;
}

export interface IPayload {
    params?: Record<string, any>;
    data?: Record<string, any>;
    headers?: Record<string, any>;
    path?: Record<string, any>;
}
