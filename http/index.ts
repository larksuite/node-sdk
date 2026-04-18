import axios, { AxiosInstance } from 'axios';
import { buildUserAgent } from '@node-sdk/utils/user-agent';

const defaultHttpInstance: AxiosInstance = axios.create();

// Fallback UA for callers that bypass Client/WSClient and hit
// `defaultHttpInstance` directly. Client.formatPayload overrides this with
// a source-enriched UA when a `source` option is configured.
const FALLBACK_UA = buildUserAgent();

defaultHttpInstance.interceptors.request.use(
    (req) => {
        if (req.headers && !req.headers['User-Agent']) {
            req.headers['User-Agent'] = FALLBACK_UA;
        }
        return req;
    },
    undefined,
    { synchronous: true }
);

defaultHttpInstance.interceptors.response.use((resp) => {
    if (resp.config['$return_headers']) {
        return {
            data: resp.data,
            headers: resp.headers
        }
    }
    return resp.data;
});

export { AxiosRequestConfig, AxiosError } from 'axios';

export default defaultHttpInstance;
