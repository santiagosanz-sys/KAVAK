import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Country } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, country: Country) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock login - no validation needed
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!email || !password) {
          throw new Error('Email y contraseña son requeridos');
        }

        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          country: 'AR',
        };

        const token = 'mock-token-' + Math.random().toString(36).substr(2, 9);

        set({ user, token, isAuthenticated: true });
      },

      register: async (name: string, email: string, password: string, country: Country) => {
        // Mock registration - no validation needed
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!name || !email || !password || !country) {
          throw new Error('Todos los campos son requeridos');
        }

        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          country,
        };

        const token = 'mock-token-' + Math.random().toString(36).substr(2, 9);

        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'kavak-auth-storage',
    }
  )
);
