import get from 'lodash.get';
import http, { AxiosRequestConfig } from '@node-sdk/http';
import { Cache, AppType, Domain, LoggerLevel, Logger } from '@node-sdk/typings';
import {
    CTenantKey,
    CWithHelpdeskAuthorization,
    CWithUserAccessToken,
} from '@node-sdk/consts';
import {
    string2Base64,
    internalCache,
    formatDomain,
    assert,
    formatUrl,
} from '@node-sdk/utils';
import RequestTemplate from '@node-sdk/code-gen/client-template';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import { IRequestOptions, IClientParams, IPayload } from './types';
import { TokenManager } from './token-manager';

export class Client extends RequestTemplate {
    appId: string = '';

    appSecret: string = '';

    logger: Logger;

    helpDeskId?: string = '';

    helpDeskToken?: string = '';

    tokenManager: TokenManager;

    cache: Cache;

    disableTokenCache?: boolean;

    appType: AppType = AppType.SelfBuild;

    domain: string;

    constructor(params: IClientParams) {
        super();

        this.logger = new LoggerProxy(
            params.loggerLevel || LoggerLevel.info,
            params.logger || defaultLogger
        );

        this.appId = params.appId;
        this.appSecret = params.appSecret;
        this.disableTokenCache = params.disableTokenCache;

        assert(!this.appId, () => this.logger.error('appId is needed'));
        assert(!this.appSecret, () => this.logger.error('appSecret is needed'));

        this.helpDeskId = params.helpDeskId;
        this.helpDeskToken = params.helpDeskToken;
        this.appType = get(params, 'appType', AppType.SelfBuild);

        this.domain = formatDomain(params.domain || Domain.Feishu);
        this.logger.debug(`use domain url: ${this.domain}`);

        this.cache = params.cache || internalCache;

        this.tokenManager = new TokenManager({
            appId: this.appId,
            appSecret: this.appSecret,
            cache: this.cache,
            domain: this.domain,
            logger: this.logger,
            appType: this.appType,
        });

        this.logger.info('client ready');
    }

    async formatPayload(
        payload?: IPayload,
        options?: IRequestOptions
    ): Promise<Required<IPayload>> {
        const targetOptions = [
            'lark',
            'params',
            'data',
            'headers',
            'path',
        ].reduce((acc, key) => {
            acc[key] = get(options, key, {});
            return acc;
        }, {} as Required<IRequestOptions>);

        const userAccessToken = get(targetOptions.lark, CWithUserAccessToken);

        if (userAccessToken) {
            this.logger.debug('use passed token');
            targetOptions.headers.Authorization = `Bearer ${userAccessToken}`;
        } else if (!this.disableTokenCache) {
            const tenantAccessToken =
                await this.tokenManager.getTenantAccessToken({
                    [CTenantKey]: get(targetOptions.lark, CTenantKey),
                });
            if (tenantAccessToken) {
                targetOptions.headers.Authorization = `Bearer ${tenantAccessToken}`;
            } else {
                this.logger.warn('failed to obtain token');
            }
        }

        // helpDeskCredential
        const withHelpDeskCredential = get(
            targetOptions.lark,
            CWithHelpdeskAuthorization
        );

        if (withHelpDeskCredential) {
            this.logger.debug('generate help desk credential');
            const helpDeskCredential = string2Base64(
                `${this.helpDeskId}:${this.helpDeskToken}`
            );
            targetOptions.headers[
                'X-Lark-Helpdesk-Authorization'
            ] = `Bearer ${helpDeskCredential}`;
        }

        return {
            params: { ...get(payload, 'params', {}), ...targetOptions.params },
            headers: {
                ...get(payload, 'headers', {}),
                ...targetOptions.headers,
            },
            data: { ...get(payload, 'data', {}), ...targetOptions.data },
            path: {
                ...get(payload, 'path', {}),
                ...targetOptions.path,
            },
        };
    }

    async request<T = any>(
        payload: AxiosRequestConfig,
        options?: IRequestOptions
    ) {
        const { data, params, headers, url, ...rest } = payload;
        const formatPayload = await this.formatPayload(
            {
                data,
                params,
                headers,
            },
            options
        );

        this.logger.trace(`send request [${payload.method}]: ${payload.url}`);
        const res = await http
            .request<T, T>({
                ...rest,
                ...{
                    url: /^http/.test(url!)
                        ? url
                        : `${this.domain}/${formatUrl(url)}`,
                    headers: formatPayload.headers,
                    data: formatPayload.data,
                    params: formatPayload.params,
                },
            })
            .catch((e) => {
                this.logger.error(e);
                throw e;
            });

        return res;
    }
}
