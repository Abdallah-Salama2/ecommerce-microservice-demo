import { create } from 'zustand';
import type { User, LoginRequest, RegisterRequest, Cart } from '@/types';
import { api } from '@/lib/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  refreshAccessToken: () => Promise<string>;
  initializeAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const API_BASE_URL = rawBaseUrl.endsWith("/api") ? rawBaseUrl.slice(0, -4) : rawBaseUrl;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
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
    } catch (error) {
      // Even if the network call fails, clear local state below
    } finally {
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
      const userData = (response.data as any)?.user ?? response.data;
      set({
        user: userData,
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
      throw error;
    }
  },

  // Uses the httpOnly refresh cookie to get a new access token.
  // Does NOT call logout() on failure — callers decide what to do
  // (e.g. initializeAuth treats failure as "not logged in", silently).
  refreshAccessToken: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
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
    if (!data.success || !data.data?.accessToken) {
      throw new Error('Invalid refresh response');
    }

    set({
      accessToken: data.data.accessToken,
      isAuthenticated: true,
    });

    return data.data.accessToken as string;
  },

  // Call once on app startup (root component mount).
  // Tries to silently restore a session from the refresh cookie.
  initializeAuth: async () => {
    try {
      await get().refreshAccessToken();
      await get().fetchCurrentUser();
    } catch (error) {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isInitialized: true });
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
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
      await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
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
export const isAdmin = (user?: User | null) => {
  const u = user !== undefined ? user : useAuthStore.getState().user;
  if (!u) return false;
  if ((u as any).isAdmin === true) return true;
  if (typeof (u as any).role === "string" && (u as any).role.toLowerCase() === "admin") return true;
  if (Array.isArray(u.roles)) {
    if (u.roles.some((r) => typeof r === "string" && r.toLowerCase() === "admin")) return true;
  }
  if (typeof u.email === "string" && u.email.toLowerCase().includes("admin")) {
    return true;
  }
  if (typeof (u as any).lastName === "string" && (u as any).lastName.toLowerCase() === "admin") {
    return true;
  }
  return false;
};
export const getCurrentUser = () => useAuthStore.getState().user;
export const getAccessToken = () => useAuthStore.getState().accessToken;