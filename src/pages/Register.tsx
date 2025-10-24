import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import type { Country } from '../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState<Country>('AR');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password, country);
      navigate('/quote');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Registrate en KAVAK SEGUROS"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Input
          type="text"
          label="Nombre completo"
          placeholder="Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          label="Email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          helperText="Mínimo 6 caracteres"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCountry('AR')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                country === 'AR'
                  ? 'bg-kavak-blue text-white border-kavak-blue'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-kavak-blue'
              }`}
            >
              <div className="text-3xl mb-2">🇦🇷</div>
              <div className="font-semibold">Argentina</div>
            </button>
            <button
              type="button"
              onClick={() => setCountry('CL')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                country === 'CL'
                  ? 'bg-kavak-blue text-white border-kavak-blue'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-kavak-blue'
              }`}
            >
              <div className="text-3xl mb-2">🇨🇱</div>
              <div className="font-semibold">Chile</div>
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          Crear cuenta
        </Button>

        <div className="text-center text-sm text-gray-600">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-kavak-blue font-semibold hover:underline">
            Ingresá acá
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

