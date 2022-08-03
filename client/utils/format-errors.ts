import { AxiosError } from '@node-sdk/http';
import get from 'lodash.get';
import pick from 'lodash.pick';

export const formatErrors = (e: any) => {
    if (e instanceof AxiosError) {
        const { message, response, request, config } = pick(e, [
            'message',
            'response',
            'request',
            'config',
        ]);

        const filteredErrorInfo = {
            message,
            config: pick(config, ['data', 'url', 'params', 'method']),
            request: pick(request, ['protocol', 'host', 'path', 'method']),
            response: pick(response, ['data', 'status', 'statusText']),
        };

        const errors = [filteredErrorInfo];
        const specificError = get(e, 'response.data');
        if (specificError) {
            errors.push(specificError);
        }
        return errors;
    }

    return [e];
};
