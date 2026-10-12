import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { pickRequestData } from './pick-request-data';
import { generateChallenge } from './services/challenge';
import { createWebhookRequest } from '@node-sdk/dispatcher/webhook-request';

/** Adapt HTTP webhook requests, validating automatic challenge responses. */
export const adaptDefault =
    (
        path: string,
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            autoChallenge?: boolean;
        }
    ) =>
    async (req, res) => {
        if (req.url !== path) {
            return;
        }

        const data = Object.assign(
            Object.create({
                headers: req.headers,
            }),
            await pickRequestData(req)
        );

        let webhookRequest;
        try {
            webhookRequest = await createWebhookRequest(dispatcher);
        } catch {
            res.statusCode = 403;
            res.end(JSON.stringify({ msg: 'webhook verification failed' }));
            return;
        }

        // 是否自动响应challange事件：
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
                res.statusCode = 403;
                res.end(JSON.stringify({ msg: 'webhook verification failed' }));
                return;
            }

            const { isChallenge, challenge } = challengeResult;
            if (isChallenge) {
                res.end(JSON.stringify(challenge));
                return;
            }
        }

        const value = await webhookRequest.invoke(data);

        res.end(JSON.stringify(value));
    };
