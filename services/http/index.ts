import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor
} from '@/services/http/interceptors';
import type { IServiceResponse } from '@/types';

class HttpService {
  readonly apiUrl: string
  private axios = {} as AxiosInstance

  constructor (apiUrl: string) {
    this.apiUrl = apiUrl;
    this.createAxiosInstance();
    this.registerInterceptors();
  }

  getErrorResponse(message: string): IServiceResponse {
    return {
      status: 'FAILURE',
      message,
      hostname: '',
      payload: null
    };
  }

  getResponseData(response: AxiosResponse): IServiceResponse {
    if (response.status === 200 || response.status === 201) {
      return response.data as IServiceResponse;
    } else {
      return this.getErrorResponse(response.statusText);
    }
  }

  async get<T> (url: string, config?: AxiosRequestConfig): Promise<IServiceResponse> {
    try {
      const response = await this.axios.get<T>(this.apiUrl + url, config);
      return this.getResponseData(response);
    } catch (error: any) {
      return this.getErrorResponse(error.message || 'Unknown error');
    }
  }

  async put<T> (url: string, payload?: object, config?: AxiosRequestConfig): Promise<IServiceResponse> {
    try {
      const response = await this.axios.put<T>(this.apiUrl + url, payload, config);
      return this.getResponseData(response);
    } catch (error: any) {
      return this.getErrorResponse(error.message || 'Unknown error');
    }
  }

  async post<T> (url: string, payload?: object | string, config?: AxiosRequestConfig): Promise<IServiceResponse> {
    try {
      const response = await this.axios.post<T>(this.apiUrl + url, payload, config);
      return this.getResponseData(response);
    } catch (error: any) {
      return this.getErrorResponse(error.message || 'Unknown error');
    }
  }

  async patch<T> (url: string, payload: object, config?: AxiosRequestConfig): Promise<IServiceResponse> {
    try {
      const response = await this.axios.patch<T>(this.apiUrl + url, payload, config);
      return this.getResponseData(response);
    } catch (error: any) {
      return this.getErrorResponse(error.message || 'Unknown error');
    }
  }

  async delete<T> (url: string, config?: AxiosRequestConfig): Promise<IServiceResponse> {
    try {
      const response = await this.axios.delete<T>(this.apiUrl + url, config);
      return this.getResponseData(response);
    } catch (error: any) {
      return this.getErrorResponse(error.message || 'Unknown error');
    }
  }

  private createAxiosInstance () {
    this.axios = axios.create();
  }

  private registerInterceptors () {
    this.axios.interceptors.response.use(
      (res: AxiosResponse) => responseInterceptor(res),
      (err: AxiosError) => errorInterceptor(err)
    );

    this.axios.interceptors.request.use(requestInterceptor as any);
  }
}

// endpoint should be moved to .env file
export const http = new HttpService('https://restihp.ironhold.net/rest-api');
