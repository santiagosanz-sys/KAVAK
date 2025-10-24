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
        // Mock login - simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock validation
        if (!email || !password) {
          throw new Error('Email y contraseña son requeridos');
        }

        // Mock user data
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          country: 'AR', // Default country
        };

        const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);

        set({ user, token, isAuthenticated: true });
      },

      register: async (name: string, email: string, password: string, country: Country) => {
        // Mock registration - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock validation
        if (!name || !email || !password || !country) {
          throw new Error('Todos los campos son requeridos');
        }

        // Mock user data
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          country,
        };

        const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);

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

