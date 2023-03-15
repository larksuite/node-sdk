import { Cache, Logger, AppType } from '@node-sdk/typings';
import { CAppTicket } from '@node-sdk/consts';
import { HttpInstance } from '@node-sdk/typings/http';

export interface IParams {
    appId: string;
    appSecret: string;
    cache: Cache;
    domain: string;
    logger: Logger;
    appType: AppType;
    httpInstance: HttpInstance;
}
export default class AppTicketManager {
    appId: string;

    appSecret: string;

    cache?: Cache;

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

        this.logger.debug('app ticket manager is ready');

        this.checkAppTicket();
    }

    async checkAppTicket() {
        if (this.appType === AppType.ISV) {
            const appTicket = await this.cache?.get(CAppTicket, {
                namespace: this.appId
            });
            if (!appTicket) {
                this.requestAppTicket();
            }
        }
    }

    async requestAppTicket() {
        this.logger.debug('request app ticket');
        await this.httpInstance
            .post(`${this.domain}/open-apis/auth/v3/app_ticket/resend`, {
                app_id: this.appId,
                app_secret: this.appSecret,
            })
            .catch((e) => {
                this.logger.error(e);
            });
    }

    async getAppTicket() {
        const appTicket = await this.cache?.get(CAppTicket, {
            namespace: this.appId
        });

        if (appTicket) {
            this.logger.debug('use cache app ticket');
            return appTicket;
        }

        await this.requestAppTicket();

        return undefined;
    }
}
