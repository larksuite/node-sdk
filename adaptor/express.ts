import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { Logger } from '@node-sdk/typings';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { pickRequestData } from './pick-request-data';
import { generateChallenge } from './services/challenge';
import { createWebhookRequest } from '@node-sdk/dispatcher/webhook-request';

/** Adapt HTTP webhook requests, validating automatic challenge responses. */
export const adaptExpress =
    (
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            logger?: Logger;
            autoChallenge?: boolean;
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

        let webhookRequest;
        try {
            webhookRequest = await createWebhookRequest(dispatcher);
        } catch {
            res.status(403).json({ msg: 'webhook verification failed' });
            return;
        }

        // 是否自动响应challenge事件：
        // https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case
        const autoChallenge = options?.autoChallenge || false;
        if (autoChallenge) {
            let challengeResult;
            try {
                challengeResult = generateChallenge(data, {
                    encryptKey: webhookRequest.encryptKey,
                    verificationToken: webhookRequest.verificationToken,
                });
            } catch {
                res.status(403).json({ msg: 'webhook verification failed' });
                return;
            }

            const { isChallenge, challenge } = challengeResult;
            if (isChallenge) {
                res.json(challenge);
                return;
            }
        }

        const value = await webhookRequest.invoke(data);

        res.json(value);
    };
