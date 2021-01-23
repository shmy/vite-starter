import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import QProgress from 'qier-progress';
import './mock.util';
import {message} from "antd";

const qprogress = new QProgress();
const instance = Axios.create({
  baseURL: '/api'
});

class ResponseError extends Error {
  constructor(private msg: string) {
    super(msg);
  }

  showAlert() {
    message.error(this.msg);
  }
}

export type AfterResponse<T> = [ResponseError | null, T];
instance.interceptors.request.use((request) => {
  qprogress.start();
  const token = window.localStorage.getItem('token');
  if (token) {
    request.headers['Authorization'] = "Bearer " + token;
  }
  return request;
}, error => {
  //
});
instance.interceptors.response.use(((response: AxiosResponse) => {
  qprogress.finish();
  console.info(response.config.url, response.data);
  if (response.data.code !== 0) {
    return [new ResponseError(response.data.info), null];
  }
  return [null, response.data.data];
}) as any, error => {
  qprogress.finish();
  return [new ResponseError('服务器发生错误'), null];
});

class http {
  static request<T>(config: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.request(config);
  }

  static get<T>(url: string, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.get(url, config);
  }

  static post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.post(url, data, config);
  }

  static put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.put(url, data, config);
  }

  static patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.patch(url, data, config);
  }

  static delete<T>(url: string, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.delete(url, config);
  }

  static head<T>(url: string, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.head(url, config);
  }

  static options<T>(url: string, config?: AxiosRequestConfig): Promise<AfterResponse<T>> {
    return instance.options(url, config);
  }
}

export default http;
export const PromiseAllWithAfterResponse = <T>(
  values: Promise<AfterResponse<T>>[]
): Promise<AfterResponse<T[]>> => {
  return new Promise((resolve, reject) => {
    Promise.all(values).then(items => {
      for (const item of items) {
        if (item[0]) {
          resolve([item[0], []]);
          return;
        }
      }
      resolve([null, items.map(item => item[1])])
    });
  });
}
