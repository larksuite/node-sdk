import axios, { AxiosInstance } from 'axios';
import { HttpInstance } from '@node-sdk/typings/http';

let defaultHttpInstance: AxiosInstance = axios.create();

defaultHttpInstance.interceptors.request.use(
    (req) => {
        if (req.headers) {
            req.headers['User-Agent'] = 'oapi-node-sdk/1.0.0';
        }
        return req;
    },
    undefined,
    { synchronous: true }
);

defaultHttpInstance.interceptors.response.use((resp) => resp.data);

let httpInstance: HttpInstance = defaultHttpInstance;
const setHttpInstance = (val: HttpInstance) => {
    httpInstance = val;
};

export {
    httpInstance,
    setHttpInstance
};

export { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

export default httpInstance;
