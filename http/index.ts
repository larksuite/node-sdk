import axios from 'axios';

const httpInstance = axios.create();

httpInstance.interceptors.response.use((resp) => resp.data);

export { AxiosRequestConfig, AxiosError } from 'axios';

export default httpInstance;
