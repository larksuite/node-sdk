import get from 'lodash.get';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { generateChallenge } from './services/challenge';

export const adaptCustom = 
    (
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            autoChallenge?: boolean;
        }
    ) =>
    async (headers, body) => {
        if (!body || !headers) {
            return;
        }
        
        const data = Object.assign(
            Object.create({
                headers: headers,
            }),
            body
        );

        const autoChallenge = get(options, 'autoChallenge', false);
        if (autoChallenge) {
            const { isChallenge, challenge } = generateChallenge(data, {
                encryptKey: dispatcher.encryptKey,
            });

            if (isChallenge) {
                return JSON.stringify(challenge);
            }
        }

        const value = await dispatcher.invoke(data);

        // event don't need response
        if (dispatcher instanceof CardActionHandler) {
            return JSON.stringify(value);
        }
        return '';
    };