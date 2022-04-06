import { showError } from "app/notification";
import axios, { AxiosResponse } from "axios";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    showError('Network error');
    throw new Error('Network error');
  }
  const { status } = error.response;
  if (status ===500) {
    showError('Server Error');
    throw new Error('Server Error');
  }
  throw error.response.data;
});

export default class BaseService{
    private readonly BaseURL = process.env.REACT_APP_BASE_URL;

    protected get<T>(url: string):Promise<T> {
        return axios.get(`${this.BaseURL}${url}`).then(responseBody);
    }

    protected postWithConfigHeader<T>(url: string, data: any, config: any):Promise<T> {
        return axios.post(`${this.BaseURL}${url}`, data, config).then(responseBody)
    }

    protected post<T>(url: string, body: {}):Promise<T> {
        return axios.post(`${this.BaseURL}${url}`, body).then(responseBody);
    }

    protected put<T>(url: string, body: {}):Promise<T> {
        return axios.put(`${this.BaseURL}${url}`, body).then(responseBody);
    }

    protected delete<T>(url: string):Promise<T> {
        return axios.delete(`${this.BaseURL}${url}`).then(responseBody);
    }
}