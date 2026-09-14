import { CEventType, CAppTicket } from '@node-sdk/consts';
import { Cache, Logger, LoggerLevel } from '@node-sdk/typings';
import { internalCache } from '@node-sdk/utils';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import { IHandles } from '@node-sdk/code-gen/events-template';
import RequestHandle from './request-handle';

const CAppTicketHandle = 'app_ticket';

const duplicateHandleWarning = (key: string) =>
    `${key} handle is already registered and has been replaced, call unregister('${key}') first to replace it explicitly`;

const appTicketUnregisteredWarning = `the built-in ${CAppTicketHandle} handle is unregistered, pushed app tickets are no longer cached and every app_access_token request of an ISV app will miss the cache and trigger an app_ticket resend`;

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

    /**
     * Register a handler for each of the given event keys.
     *
     * Registering a key that already has a handler replaces it. That is a
     * supported operation, but the replacement is easier to spot when it is
     * announced: call `unregister(key)` first and nothing is logged, otherwise
     * a warning flags what would otherwise be an unnoticed overwrite.
     */
    register<T={}>(handles: IHandles & T) {
        Object.keys(handles).forEach((key) => {
            if (this.handles.has(key) && key !== CAppTicketHandle) {
                this.logger.warn(duplicateHandleWarning(key));
            }

            this.handles.set(key, handles[key]);
            this.logger.debug(`register ${key} handle`);
        });

        return this;
    }

    /**
     * Remove the handler registered for each of the given event keys, so that
     * the events are no longer dispatched. Keys without a handler are skipped.
     *
     * Removing the built-in `app_ticket` handle stops the SDK from caching
     * pushed app tickets, which makes every app_access_token request of an ISV
     * app miss the cache and trigger an app_ticket resend -- hence the warning.
     */
    unregister(...keys: string[]) {
        keys.forEach((key) => {
            if (!this.handles.has(key)) {
                this.logger.debug(`no ${key} handle to unregister`);
                return;
            }

            this.handles.delete(key);
            this.logger.debug(`unregister ${key} handle`);

            if (key === CAppTicketHandle) {
                this.logger.warn(appTicketUnregisteredWarning);
            }
        });

        return this;
    }

    async invoke(data, params?: { needCheck?: boolean }) {
        const needCheck = params?.needCheck === false ? false : true;

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
