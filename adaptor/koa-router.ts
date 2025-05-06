import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { Logger } from '@node-sdk/typings';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { pickRequestData } from './pick-request-data';
import { generateChallenge } from './services/challenge';

export const adaptKoaRouter =
    (
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            logger?: Logger;
            autoChallenge?: boolean;
        }
    ) =>
    async (ctx, next) => {
        const { req, request } = ctx;

        const reqData = await (async () => {
            if (request.body) {
                return request.body;
            }
            if (!req.complete) {
                const incomingdata = await pickRequestData(req);
                return incomingdata;
            }
            
            (options?.logger || defaultLogger).error(
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

        // 是否自动响应challange事件：
        // https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case
        const autoChallenge = options?.autoChallenge || false;
        if (autoChallenge) {
            const { isChallenge, challenge } = generateChallenge(data, {
                encryptKey: dispatcher.encryptKey,
            });

            if (isChallenge) {
                ctx.body = challenge;
                await next();
                return;
            }
        }

        const value = await dispatcher.invoke(data);

        ctx.body = JSON.stringify(value);

        await next();
    };
