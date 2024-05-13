import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

import { baseApi as baseURL } from '@/utils/constants';

// eslint-disable-next-line import/no-cycle
import { handleError } from './common';

// const isServer = typeof window === 'undefined'

const api = axios.create({
  baseURL,
  withCredentials: true,
});

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const newConfig = {
    ...config,
    timeout: 60000,
    // validateStatus: () => true,
  };
  if (!newConfig?.headers['Content-Type']) {
    newConfig.headers['Content-Type'] = 'application/json';
  }

  newConfig.headers.clientTime = new Date().toISOString();
  newConfig.headers.clientMessageId = 4263432;
  return newConfig;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error);
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export default setupInterceptorsTo(api);
