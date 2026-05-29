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

// // Request interceptor: Attach server-side auth token from cookies
// serverAxios.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('accessToken')?.value;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: On 401, throw error (no refresh on server)
// serverAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // If 401 on server-side, throw error or redirect
//     // Do NOT attempt token refresh on the server
//     if (error.response?.status === 401) {
//       throw new Error('Unauthorized. Please log in again.');
//     }

//     return Promise.reject(error);
//   }
// );

export default serverAxios;
