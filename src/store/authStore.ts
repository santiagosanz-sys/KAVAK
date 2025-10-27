import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../services/supabase';
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
        // Validate inputs
        if (!email || !password) {
          throw new Error('Email y contraseña son requeridos');
        }

        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message || 'Error al iniciar sesión');
        }

        if (!data.user) {
          throw new Error('No se pudo obtener la información del usuario');
        }

        // Get user data
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          email: data.user.email || email,
          name: profile?.name || data.user.email?.split('@')[0] || 'Usuario',
          country: (profile?.country as Country) || 'AR',
        };

        set({ user, token: data.session?.access_token || null, isAuthenticated: true });
      },

      register: async (name: string, email: string, password: string, country: Country) => {
        // Validate inputs
        if (!name || !email || !password || !country) {
          throw new Error('Todos los campos son requeridos');
        }

        // Sign up with Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined,
            // Don't require email confirmation
          },
        });

        if (authError) {
          console.error('Supabase Auth Error:', authError);
          
          // Handle specific error cases
          if (authError.message.includes('already registered')) {
            throw new Error('Este email ya está registrado. Iniciá sesión en su lugar.');
          } else if (authError.message.includes('Password')) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
          } else if (authError.message.includes('Invalid email')) {
            throw new Error('El formato del email es inválido');
          }
          
          throw new Error(authError.message || 'Error al registrarse');
        }

        if (!authData.user) {
          throw new Error('No se pudo crear el usuario');
        }

        // Try to create user profile in users table (optional)
        try {
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: authData.user.id,
                email,
                name,
                country,
              },
            ]);

          if (profileError) {
            console.warn('Profile Error (non-blocking):', profileError);
            // Don't block registration if profile creation fails
          }
        } catch (profileError) {
          console.warn('Profile creation failed (non-blocking):', profileError);
          // Continue with registration even if profile creation fails
        }

        // Wait for session if it's null but user exists
        if (!authData.session && authData.user) {
          // Try to get the session
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            throw new Error('Error al obtener la sesión: ' + error.message);
          }
          
          if (!session) {
            // If no session, proceed anyway - user is logged in
            console.warn('No session available, but continuing with registration');
          } else {
            authData.session = session;
          }
        }

        const user: User = {
          id: authData.user.id,
          email,
          name,
          country,
        };

        set({ user, token: authData.session?.access_token || null, isAuthenticated: true });
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'kavak-auth-storage',
    }
  )
);

