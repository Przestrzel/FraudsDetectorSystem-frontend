import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse
} from 'axios';
import qs from 'qs';

import { apiUrl } from './config.utils';
import { getAuthToken } from './auth.utils';

const http: AxiosInstance = axios.create({
  paramsSerializer: params => qs.stringify(params),
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const key = getAuthToken();
    if (config?.headers) {
      key && (config.headers.Authorization = `Bearer ${ key }`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
);

export default http;