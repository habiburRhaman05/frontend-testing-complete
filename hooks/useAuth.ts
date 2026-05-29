import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, LoginRequest, RegisterRequest } from '@/services/authService';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setUser, setLoading, setError, logout as logoutAction } from '@/lib/redux/authSlice';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const auth = useAppSelector((state) => state.auth);

  // Skip initial auth check on public pages to avoid redirect loop
  const isPublicPage =
    typeof window !== 'undefined' &&
    ['/login', '/register'].some((route) =>
      window.location.pathname.startsWith(route),
    );

  // Fetch current user on mount (skipped on public auth pages like /login, /register)
  const { isLoading: isCheckingAuth } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const user = await authService.getCurrentUser();
        dispatch(setUser(user.data));
        return user;
      } catch (error) {
        dispatch(logoutAction());
        throw error;
      }
    },
    enabled: !isPublicPage,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      dispatch(setLoading(true));
      try {
        const response = await authService.login(credentials);
        localStorage.setItem('authToken', response.accessToken);
        dispatch(setUser(response.user));
        return response.user;
      } catch (error) {
        const errorMessage = (error as any)?.response?.data?.message || 'Login failed';
        dispatch(setError(errorMessage));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      dispatch(setLoading(true));
      try {
        const response = await authService.register(data);
        localStorage.setItem('authToken', response.accessToken);
        dispatch(setUser(response.user));
        return response.user;
      } catch (error) {
        const errorMessage = (error as any)?.response?.data?.message || 'Registration failed';
        dispatch(setError(errorMessage));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await authService.logout();
      } finally {
        localStorage.removeItem('authToken');
        dispatch(logoutAction());
        queryClient.clear();
      }
    },
  });

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading || isCheckingAuth,
    error: auth.error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
};
