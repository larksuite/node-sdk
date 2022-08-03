import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { pickRequestData } from './pick-request-data';

export const adaptDefault =
    (path: string, dispatcher: EventDispatcher | CardActionHandler) =>
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

        const value = await dispatcher.invoke(data);

        // event don't need response
        if (dispatcher instanceof CardActionHandler) {
            res.end(JSON.stringify(value));
        }
        res.end('');
    };
