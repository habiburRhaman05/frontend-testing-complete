import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const serverAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

serverAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_Token')?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

serverAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
  
    if (error.response?.status === 401) {
      throw new Error('Unauthorized. Please log in again.');
    }

    return Promise.reject(error);
  }
);

export default serverAxios;
