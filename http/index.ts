import axios, { AxiosInstance } from 'axios';

let httpInstance = axios.create();

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

const setHttpInstance = (val: AxiosInstance) => {
    httpInstance = val;
};

export {
    setHttpInstance
};

export { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

export default httpInstance;
