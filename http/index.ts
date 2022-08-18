import axios from 'axios';

const httpInstance = axios.create();

httpInstance.interceptors.request.use(
    (req) => {
        if (req.headers) {
            req.headers['User-Agent'] = 'oapi-node-sdk/1.0.0';
        }
        return req;
    },
    undefined,
    { synchronous: true }
);

httpInstance.interceptors.response.use((resp) => resp.data);

export { AxiosRequestConfig, AxiosError } from 'axios';

export default httpInstance;
