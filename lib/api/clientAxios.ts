import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const clientAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: Array<(error?: unknown) => void> = [];

const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const onRefreshFailed = (error: unknown) => {
  refreshSubscribers.forEach((callback) => callback(error));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (error?: unknown) => void) => {
  refreshSubscribers.push(callback);
};

clientAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

  
    if (error.response?.config?.url === "/auth/refresh" && error.response?.status === 401) {
      if (typeof window !== 'undefined' &&
          window.location.pathname !== '/login' &&
          window.location.pathname !== '/register') {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await clientAxios.post("/auth/refresh");
          isRefreshing = false;
          onRefreshed();  
          return clientAxios(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          onRefreshFailed(refreshError);
          if (typeof window !== 'undefined' &&
              window.location.pathname !== '/login' &&
              window.location.pathname !== '/register') {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise<void>((resolve, reject) => {
          addRefreshSubscriber((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }).then(() => clientAxios(originalRequest));
      }
    }

    return Promise.reject(error);
  }
);

export default clientAxios;