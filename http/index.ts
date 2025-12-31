import axios, { AxiosInstance } from 'axios';

const defaultHttpInstance: AxiosInstance = axios.create();

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

defaultHttpInstance.interceptors.response.use((resp) => {
    if (resp.config['$return_headers']) {
        return {
            data: resp.data,
            headers: resp.headers
        }
    }
    return resp.data;
});


export default defaultHttpInstance;
