import { create } from 'zustand';
import type { User, LoginRequest, RegisterRequest } from '@/types';
import { api } from '@/lib/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.login(credentials);
      const { user, accessToken } = response.data;
      
      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  },

  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      await api.register(data);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.logout();
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Even if logout fails, clear local state
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  fetchCurrentUser: async () => {
    const { accessToken } = get();
    if (!accessToken) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await api.getCurrentUser();
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  refreshAccessToken: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      if (data.success && data.data.accessToken) {
        set({
          accessToken: data.data.accessToken,
          isAuthenticated: true,
        });
        return data.data.accessToken;
      } else {
        throw new Error('Invalid refresh response');
      }
    } catch (error) {
      // Refresh failed, logout the user
      get().logout();
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send reset email',
      });
      throw error;
    }
  },

  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Password reset failed',
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

// Helper functions
export const isAuthenticated = () => useAuthStore.getState().isAuthenticated;
export const isAdmin = () => {
  const { user } = useAuthStore.getState();
  return user?.roles?.includes('Admin') || false;
};
export const getCurrentUser = () => useAuthStore.getState().user;
export const getAccessToken = () => useAuthStore.getState().accessToken;
