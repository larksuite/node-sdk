import get from 'lodash.get';
import { CEventType, CAppTicket } from '@node-sdk/consts';
import { Cache, Logger, LoggerLevel } from '@node-sdk/typings';
import { internalCache } from '@node-sdk/utils';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import { IHandles } from '@node-sdk/code-gen/events-template';
import RequestHandle from './request-handle';

const CAppTicketHandle = 'app_ticket';
export class EventDispatcher {
    verificationToken: string = '';

    encryptKey: string = '';

    requestHandle?: RequestHandle;

    handles: Map<string, Function> = new Map();

    cache: Cache;

    logger: Logger;

    constructor(params: {
        verificationToken?: string;
        encryptKey?: string;
        cache?: Cache;
        logger?: Logger;
        loggerLevel?: LoggerLevel;
    }) {
        const { encryptKey, verificationToken } = params;

        this.encryptKey = encryptKey || '';
        this.verificationToken = verificationToken || '';

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

        this.logger.info('event-dispatch is ready');
    }

    private registerAppTicketHandle() {
        this.register({
            app_ticket: async (data) => {
                const { app_ticket, app_id } = data;

                if (app_ticket) {
                    await this.cache.set(CAppTicket, app_ticket, undefined ,{
                        namespace: app_id
                    });
                    this.logger.debug('set app ticket');
                } else {
                    this.logger.warn('response not include app ticket');
                }
            },
        });
    }

    register<T={}>(handles: IHandles & T) {
        Object.keys(handles).forEach((key) => {
            if (this.handles.has(key) && key !== CAppTicketHandle) {
                this.logger.error(`this ${key} handle is registered`);
            }

            this.handles.set(key, handles[key]);
            this.logger.debug(`register ${key} handle`);
        });

        return this;
    }

    async invoke(data, params?: { needCheck?: boolean }) {
        const needCheck = get(params, 'needCheck', true);

        if (needCheck && !this.requestHandle?.checkIsEventValidated(data)) {
            this.logger.warn('verification failed event');
            return undefined;
        }
        const targetData = this.requestHandle?.parse(data);
        const type = targetData[CEventType];
        if (this.handles.has(type)) {
            const ret = await this.handles.get(type)!(targetData);
            this.logger.debug(`execute ${type} handle`);
            return ret;
        }

        this.logger.warn(`no ${type} handle`);
        
        return `no ${type} event handle`;
    }
}
