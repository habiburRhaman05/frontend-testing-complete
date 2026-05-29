import clientAxios from '@/lib/api/clientAxios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await clientAxios.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await clientAxios.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await clientAxios.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await clientAxios.get('/auth/me');
    return response.data;
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await clientAxios.post('/auth/refresh');
    return response.data;
  },
};
