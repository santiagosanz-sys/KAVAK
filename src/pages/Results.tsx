import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { InsuranceCard } from '../components/ui/InsuranceCard';
import { Button } from '../components/ui/Button';
import { useQuoteStore } from '../store/quoteStore';
import { useAuthStore } from '../store/authStore';
import { getQuotes } from '../services/mockApi';
import type { Quote } from '../types';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { 
    country, 
    vehicleData, 
    driverData,
    addressData,
    vehicleTechnicalData,
    coverage, 
    quotes,
    setQuotes,
    setSelectedQuote,
    reset 
  } = useQuoteStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!country || !vehicleData.year || !driverData.cuil || !coverage.liability) {
      navigate('/quote');
      return;
    }

    const fetchQuotes = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const result = await getQuotes(
          {
            country: country,
            vehicle: vehicleData as any,
            driver: driverData as any,
            address: addressData as any,
            coverage: coverage as any,
          },
          user
        );
        setQuotes(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener cotizaciones');
      } finally {
        setIsLoading(false);
      }
    };

    if (quotes.length === 0) {
      fetchQuotes();
    }
  }, [isAuthenticated, country, vehicleData, driverData, coverage, navigate, quotes.length, setQuotes]);

  const handleSelectQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    navigate('/checkout');
  };

  const handleNewQuote = () => {
    reset();
    navigate('/');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-kavak-blue mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Buscando las mejores opciones...
            </h2>
            <p className="text-gray-600">
              Estamos comparando precios de múltiples aseguradoras
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error al obtener cotizaciones
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => navigate('/quote')}>
              Volver a intentar
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-8 mb-6">
              <img src="/answer-logo.svg" alt="ANSWER" className="h-12" />
              <img src="/zurich-logo.svg" alt="ZURICH" className="h-12" />
              <img src="/lasegunda-logo.svg" alt="La Segunda" className="h-12" />
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Comparamos {quotes.length} aseguradoras para tu{' '}
              {vehicleData.brand} {vehicleData.model} {vehicleData.year}
            </p>
            <Button variant="outline" onClick={handleNewQuote}>
              Nueva cotización
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quotes.map((quote) => (
              <InsuranceCard
                key={quote.insurerId}
                quote={quote}
                country={country}
                onSelect={() => handleSelectQuote(quote)}
              />
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Resumen de tu cotización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Vehículo</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {vehicleData.year} {vehicleData.brand} {vehicleData.model}</li>
                  <li>• Versión: {vehicleData.version}</li>
                  <li>• Kilometraje: {vehicleData.mileage?.toLocaleString()} km</li>
                  <li>• Uso: {vehicleData.usage === 'personal' ? 'Particular' : 'Comercial'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Conductor</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {driverData.fullName}</li>
                  <li>• {driverData.age} años</li>
                  <li>• CUIL: {driverData.cuil}</li>
                  <li>• Email: {driverData.email}</li>
                  <li>• Teléfono: {driverData.phone}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Datos Técnicos</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Chasis: {vehicleTechnicalData.chassisNumber}</li>
                  <li>• Motor: {vehicleTechnicalData.engineNumber}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

