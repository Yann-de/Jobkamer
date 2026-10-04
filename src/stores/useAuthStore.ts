import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (user: User, token: string) => void;
  updateUser: (data: Partial<User>) => void;
  clearSession: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  setSession: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    }),
  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
  clearSession: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));
