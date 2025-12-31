import { AxiosError } from 'axios';
import { pick } from '@node-sdk/utils/pick';

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
        const specificError = e?.response?.data;
        if (specificError) {
            errors.push({
                ...specificError,
                ...(specificError.error ? specificError.error : {})
            });
        }
        return errors;
    }

    return [e];
};
