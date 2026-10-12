import { CAppTicket, CEventType } from '@node-sdk/consts';
import { Cache, Logger, LoggerLevel } from '@node-sdk/typings';
import { internalCache } from '@node-sdk/utils';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import RequestHandle from './request-handle';
import { WebhookCredentialsProvider } from './webhook-credentials';
import { registerWebhookRequestFactory, resolveRequestHandle } from './webhook-request';

export class CardActionHandler {
    verificationToken: string = '';

    encryptKey: string = '';

    requestHandle?: RequestHandle;

    private webhookCredentialsProvider?: WebhookCredentialsProvider;

    cardHandler: Function;

    handles: Map<string, Function> = new Map();

    cache: Cache;

    logger: Logger;

    constructor(
        params: {
            /** Resolve both credentials once per webhook; never called during construction. */
            webhookCredentialsProvider?: WebhookCredentialsProvider;
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

        this.webhookCredentialsProvider = params.webhookCredentialsProvider;
        registerWebhookRequestFactory(this, async () => {
            if (this.webhookCredentialsProvider === undefined) {
                return {
                    encryptKey: this.encryptKey,
                    verificationToken: this.verificationToken,
                    invoke: (data) => this.invoke(data),
                };
            }
            const handle = await this.createRequestHandle();
            return {
                encryptKey: handle?.encryptKey || '',
                verificationToken: handle?.verificationToken,
                invoke: (data) => this.invokeWithHandle(data, handle),
            };
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

    private createRequestHandle() {
        return resolveRequestHandle(
            this.webhookCredentialsProvider,
            this.requestHandle,
            this.logger
        );
    }

    /** Dispatch a card callback using one credential snapshot. */
    async invoke(data) {
        return this.invokeWithHandle(data, await this.createRequestHandle());
    }

    private async invokeWithHandle(data, handle?: RequestHandle) {
        if (!handle?.checkIsCardEventValidated(data)) {
            this.logger.warn('verification failed event');
            return undefined;
        }

        const targetData = handle?.parse(data);

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
