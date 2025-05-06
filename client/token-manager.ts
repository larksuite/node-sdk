import { CTenantKey, CTenantAccessToken } from '@node-sdk/consts';
import { Cache, AppType, Logger } from '@node-sdk/typings';
import { assert } from '@node-sdk/utils';
import AppTicketManager from './app-ticket-manager';
import { HttpInstance } from '@node-sdk/typings/http';

interface IParams {
    appId: string;
    appSecret: string;
    cache: Cache;
    domain: string;
    logger: Logger;
    appType: AppType;
    httpInstance: HttpInstance;
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

    constructor(params: IParams) {
        this.appId = params.appId;
        this.appSecret = params.appSecret;
        this.cache = params.cache;
        this.domain = params.domain;
        this.logger = params.logger;
        this.appType = params.appType;
        this.httpInstance = params.httpInstance;

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

    async getCustomTenantAccessToken() {
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
        // @ts-ignore
        const { tenant_access_token, expire } = await this.httpInstance
            .post(
                `${this.domain}/open-apis/auth/v3/tenant_access_token/internal`,
                {
                    app_id: this.appId,
                    app_secret: this.appSecret,
                }
            )
            .catch((e) => {
                this.logger.error(e);
            });

        await this.cache?.set(
            CTenantAccessToken,
            tenant_access_token,
            // Due to the time-consuming network, the expiration time needs to be 3 minutes earlier
            new Date().getTime() + expire * 1000 - 3 * 60 * 1000,
            {
                namespace: this.appId
            }
        );

        return tenant_access_token;
    }

    async getMarketTenantAccessToken(tenantKey: string) {
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
        // @ts-ignore
        const { app_access_token } = await this.httpInstance
            .post<{
                app_access_token: string;
            }>(`${this.domain}/open-apis/auth/v3/app_access_token`, {
                app_id: this.appId,
                app_secret: this.appSecret,
                app_ticket: appTicket,
            })
            .catch((e) => {
                this.logger.error(e);
            });

        this.logger.debug('get tenant access token');
        // 获取tenant_access_token
        // @ts-ignore
        const { tenant_access_token, expire } = await this.httpInstance
            .post(`${this.domain}/open-apis/auth/v3/tenant_access_token`, {
                app_access_token,
                tenant_key: tenantKey,
            })
            .catch((e) => {
                this.logger.error(e);
            });

        // 设置tenant_access_token
        await this.cache.set(
            `larkMarketAccessToken${tenantKey}`,
            tenant_access_token,
            // Due to the time-consuming network, the expiration time needs to be 3 minutes earlier
            new Date().getTime() + expire * 1000 - 3 * 60 * 1000,
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
