import StorageUtils from '@/utils/storage';
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { removeParams } from '@/utils/Helper';
import { ApiHandler } from '@/utils/api';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import httpStatusCode from './HttpStatusCode';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from './type-api';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = StorageUtils.get('crf_tk');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return { ...config, params: removeParams(config.params) };
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError) => {
    if (!error.response) {
      return;
    }
    if (error.response) {
      const { status } = error.response;
      if (status === httpStatusCode.UNAUTHORIZED) {
        StorageUtils.remove('crf_tk');
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

class RequestService {
  get<T>(url: string, config?: AxiosRequestConfig) {
    if (config?.isPagination) {
      return axiosClient.get<T>(url, config).then((response: any) => response);
    }
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.get<T>(url, config).then(responseBody);
    }
    return trackPromise(axiosClient.get<T>(url, config).then(responseBody));
  }
  post<T>(url: string, body: {}, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.post<T>(url, body, config).then(responseBody);
    }

    return trackPromise(
      axiosClient.post<T>(url, body, config).then(responseBody)
    );
  }

  patch<T>(url: string, body: {}, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.patch<T>(url, body, config).then(responseBody);
    }
    return trackPromise(
      axiosClient.patch<T>(url, body, config).then(responseBody)
    );
  }

  put<T>(url: string, body: {}, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.put<T>(url, body, config).then(responseBody);
    }
    return trackPromise(
      axiosClient.put<T>(url, body, config).then(responseBody)
    );
  }

  del<T>(url: string, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.delete<T>(url, config).then(responseBody);
    }
    return trackPromise(axiosClient.delete<T>(url, config).then(responseBody));
  }
}

export default new RequestService();
