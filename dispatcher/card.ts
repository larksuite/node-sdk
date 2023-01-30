import { CAppTicket, CEventType } from '@node-sdk/consts';
import { Cache, Logger, LoggerLevel } from '@node-sdk/typings';
import { internalCache } from '@node-sdk/utils';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import RequestHandle from './request-handle';

export class CardActionHandler {
    verificationToken: string = '';

    encryptKey: string = '';

    requestHandle?: RequestHandle;

    cardHandler: Function;

    handles: Map<string, Function> = new Map();

    cache: Cache;

    logger: Logger;

    constructor(
        params: {
            verificationToken?: string;
            encryptKey?: string;
            cache?: Cache;
            logger?: Logger;
            loggerLevel?: LoggerLevel;
        },
        cardHandler: Function
    ) {
        const { verificationToken, encryptKey } = params;

        this.encryptKey = encryptKey || '';
        this.verificationToken = verificationToken || '';

        this.cardHandler = cardHandler;

        this.logger = new LoggerProxy(
            params.loggerLevel || LoggerLevel.info,
            params.logger || defaultLogger
        );

        this.requestHandle = new RequestHandle({
            encryptKey,
            verificationToken,
            logger: this.logger,
        });

        this.cache = params.cache || internalCache;

        this.registerAppTicketHandle();

        this.logger.info('card-action-handle is ready');
    }

    private registerAppTicketHandle() {
        this.register({
            app_ticket: async (data) => {
                const { app_ticket, app_id } = data;

                if (app_ticket) {
                    await this.cache.set(CAppTicket, app_ticket, undefined, {
                        namespace: app_id
                    });
                    this.logger.debug('set app ticket');
                } else {
                    this.logger.warn('response not include app ticket');
                }
            },
        });
    }

    private register(handles: Record<string, Function>) {
        Object.keys(handles).forEach((key) => {
            this.handles.set(key, handles[key]);
            this.logger.debug(`register ${key} handle`);
        });

        return this;
    }

    async invoke(data) {
        if (!this.requestHandle?.checkIsCardEventValidated(data)) {
            this.logger.warn('verification failed event');
            return undefined;
        }

        const targetData = this.requestHandle?.parse(data);

        const type = targetData[CEventType];
        if (this.handles.has(type)) {
            try {
                const ret = await this.handles.get(type)!(targetData);
                return ret;
            } catch (e) {
                this.logger.error(e);
                return undefined;
            }
        }

        try {
            const result = await this.cardHandler(targetData);
            this.logger.debug('execute card handle');
            return result;
        } catch (e) {
            this.logger.error(e);
        }

        return undefined;
    }
}
