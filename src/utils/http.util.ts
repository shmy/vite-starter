import Axios, {AxiosRequestConfig} from 'axios';
import './mock.util';

const instance = Axios.create({
  baseURL: '/api'
});

instance.interceptors.response.use((response) => {
  console.info(response.config.url, response.data);
  return response.data;
});
class http {
  static request<T>(config: AxiosRequestConfig): Promise<T> {
    return instance.request(config);
  }
  static get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  }
  static post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config);
  }
  static put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config);
  }
  static patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config);
  }
  static delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config);
  }
  static head<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.head(url, config);
  }
  static options<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.options(url, config);
  }
}
export default http;
