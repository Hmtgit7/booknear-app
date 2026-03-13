import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IUser, AuthTokens, UserRole } from '@/types';

interface AuthState {
  user: IUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;

  // Actions
  setUser: (user: IUser) => void;
  setTokens: (tokens: AuthTokens) => void;
  login: (user: IUser, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (partial: Partial<IUser>) => void;
  setHasHydrated: (value: boolean) => void;

  // Helpers
  hasRole: (role: UserRole) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setTokens: (tokens) => set({ tokens }),

      login: (user, tokens) => set({ user, tokens, isAuthenticated: true, isLoading: false }),

      logout: () => set({ user: null, tokens: null, isAuthenticated: false }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),

      setHasHydrated: (value) => set({ hasHydrated: value }),

      hasRole: (role) => get().user?.role === role,
    }),
    {
      name: 'docnear-auth',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : ({} as Storage),
      ),
      // Only persist safe fields — never persist tokens in localStorage in production
      // For production, use httpOnly cookies for tokens
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
