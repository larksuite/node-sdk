import get from 'lodash.get';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { Logger } from '@node-sdk/typings';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { pickRequestData } from './pick-request-data';

export const adaptExpress =
    (
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            logger?: Logger;
        }
    ) =>
    async (req, res) => {
        const reqData = await (async () => {
            if (req.body) {
                return req.body;
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
            res.json(value);
        }
        res.end('');
    };
