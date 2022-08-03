import get from 'lodash.get';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { Logger } from '@node-sdk/typings';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { pickRequestData } from './pick-request-data';

export const adaptKoa =
    (
        path: string,
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            logger?: Logger;
        }
    ) =>
    async (ctx, next) => {
        const { originalUrl, req, request } = ctx;
        if (originalUrl === path) {
            const reqData = await (async () => {
                if (request.body) {
                    return request.body;
                }
                if (!req.complete) {
                    const incomingdata = await pickRequestData(req);
                    return incomingdata;
                }
                get(options, 'logger', defaultLogger).error(
                    'unable to obtain request body, if parsed it in other middleware, please manually set in ctx.request.body'
                );
                return null;
            })();

            const data = Object.assign(
                Object.create({
                    headers: req.headers,
                }),
                reqData
            );

            const value = await dispatcher.invoke(data);

            // event don't need response
            if (dispatcher instanceof CardActionHandler) {
                ctx.body = JSON.stringify(value);
            } else {
                ctx.body = '';
            }
        }

        await next();
    };
