import get from 'lodash.get';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { pickRequestData } from './pick-request-data';
import { generateChallenge } from './services/challenge';

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

        // 是否自动响应challange事件：
        // https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case
        const autoChallenge = get(options, 'autoChallenge', false);
        if (autoChallenge) {
            const { isChallenge, challenge } = generateChallenge(data, {
                encryptKey: dispatcher.encryptKey,
            });

            if (isChallenge) {
                res.end(JSON.stringify(challenge));
                return;
            }
        }

        const value = await dispatcher.invoke(data);

        // event don't need response
        if (dispatcher instanceof CardActionHandler) {
            res.end(JSON.stringify(value));
        }
        res.end('');
    };
