import { AxiosError } from '@node-sdk/http';
import { formatErrors } from '../format-errors';

describe('formatErrors', () => {
    test('format axios error', () => {
        const error = new AxiosError(
            'message',
            '400',
            {
                data: 'config-data',
                url: 'config-url',
                params: 'config-params',
                method: 'config-method',
            },
            {
                protocol: 'request-protocol',
                host: 'request-host',
                path: 'request-path',
                method: 'request-method',
            },
            {
                headers: {},
                config: {},
                // A real Feishu error body is an object; formatErrors spreads it
                // (and merges a nested `error` field) into the appended entry.
                data: { code: 400, msg: 'response-msg' },
                status: 400,
                statusText: 'response-statusText',
            }
        );

        expect(formatErrors(error)).toEqual([
            {
                message: 'message',
                config: {
                    data: 'config-data',
                    url: 'config-url',
                    params: 'config-params',
                    method: 'config-method',
                },
                request: {
                    protocol: 'request-protocol',
                    host: 'request-host',
                    path: 'request-path',
                    method: 'request-method',
                },
                response: {
                    data: { code: 400, msg: 'response-msg' },
                    status: 400,
                    statusText: 'response-statusText',
                },
            },
            { code: 400, msg: 'response-msg' },
        ]);
    });

    test('format right', () => {
        expect(formatErrors({ a: 'a' })).toEqual([{ a: 'a' }]);
    });
});
