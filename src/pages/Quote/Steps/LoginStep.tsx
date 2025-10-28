import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../store/authStore';
import { useQuoteStore } from '../../../store/quoteStore';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginStep: React.FC = () => {
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuthStore();
  const { nextStep, previousStep } = useQuoteStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      if (isRegisterMode) {
        // Register new user - we need name and country from quote store
        const { country } = useQuoteStore.getState();
        await registerUser('Usuario', data.email, data.password, country || 'AR');
      } else {
        await login(data.email, data.password);
      }
      navigate('/summary');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isRegisterMode ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        <p className="text-gray-600">
          {isRegisterMode 
            ? 'Creá tu cuenta para ver las mejores ofertas' 
            : 'Ingresá a tu cuenta para ver las ofertas personalizadas'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Input
          type="email"
          label="Email"
          placeholder="tu@email.com"
          {...register('email', { 
            required: 'El email es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Formato de email inválido'
            }
          })}
          error={errors.email?.message}
        />

        <Input
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          {...register('password', { 
            required: 'La contraseña es requerida',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
          })}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          {isRegisterMode ? 'Crear cuenta' : 'Ingresar'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-kavak-blue hover:underline text-sm"
          >
            {isRegisterMode 
              ? '¿Ya tenés cuenta? Ingresá acá' 
              : '¿No tenés cuenta? Registrate acá'
            }
          </button>
        </div>
      </form>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={previousStep}>
          Anterior
        </Button>
      </div>
    </div>
  );
};
