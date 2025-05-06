import get from 'lodash.get';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { CardActionHandler } from '@node-sdk/dispatcher/card';
import { adaptCustom } from './custom';

export const adaptNextjs = 
    (
        dispatcher: EventDispatcher | CardActionHandler,
        options?: {
            autoChallenge?: boolean;
        }
    ) =>
    async (req, res) => {
        if (!req?.body || !req?.headers) {
            return;
        }
        res.end(
            await adaptCustom(dispatcher, {
                autoChallenge: get(options, 'autoChallenge', false),
            })(req.headers, req.body)
        );
    };