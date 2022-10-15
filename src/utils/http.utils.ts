import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse
} from 'axios';
import qs from 'qs';

import { apiUrl } from './config.utils';
import { getAuthToken, setAuthToken } from './auth.utils';
import { refresh } from 'services/auth.service';
import { store } from '../store/store';
import { cloneDeep } from 'lodash';
import { saveUser } from 'store/auth.slice';

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
  (error: AxiosError) => {
    if(error?.response?.status === 401){
      const token = getAuthToken(true);
      if(token){
        refresh(token).then(({ data }) => {
          setAuthToken(data.access_token);
          setAuthToken(data.refresh_token, true);
          const user = cloneDeep(data);
          delete user.access_token;
          delete user.refresh_token;
          store.dispatch(saveUser(user));
        });
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;