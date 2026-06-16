import { AxiosError } from '@node-sdk/http';
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
            // `response.data` may be a plain string (non-JSON error body); only
            // object payloads get spread + `.error` flattened, strings push as-is.
            if (typeof specificError === 'object') {
                errors.push({
                    ...specificError,
                    ...(specificError.error ? specificError.error : {})
                });
            } else {
                errors.push(specificError);
            }
        }
        return errors;
    }

    return [e];
};
