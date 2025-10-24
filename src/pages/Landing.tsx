import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useQuoteStore } from '../store/quoteStore';
import type { Country } from '../types';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { setCountry } = useQuoteStore();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleStartQuote = () => {
    if (selectedCountry) {
      setCountry(selectedCountry);
      navigate('/quote');
    }
  };

  const benefits = [
    {
      icon: '💰',
      title: 'Mejor precio',
      description: 'Comparamos múltiples aseguradoras para encontrar la mejor opción para vos.',
    },
    {
      icon: '⚡',
      title: 'Cotización rápida',
      description: 'Obtené tu cotización en menos de 3 minutos, sin complicaciones.',
    },
    {
      icon: '🛡️',
      title: 'Cobertura completa',
      description: 'Elegí entre diferentes tipos de cobertura según tus necesidades.',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kavak-blue via-kavak-blue-light to-kavak-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Protegé tu auto con los mejores seguros del mercado
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Cotizá en segundos y encontrá la cobertura perfecta para vos.
              </p>
              
              {/* Country Selector */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">¿Desde dónde nos contactás?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedCountry('AR')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCountry === 'AR'
                        ? 'bg-white text-kavak-blue border-white'
                        : 'bg-white/10 border-white/30 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-2">🇦🇷</div>
                    <div className="font-semibold">Argentina</div>
                  </button>
                  <button
                    onClick={() => setSelectedCountry('CL')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCountry === 'CL'
                        ? 'bg-white text-kavak-blue border-white'
                        : 'bg-white/10 border-white/30 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-2">🇨🇱</div>
                    <div className="font-semibold">Chile</div>
                  </button>
                </div>
              </div>
              
              <Button
                variant="secondary"
                onClick={handleStartQuote}
                disabled={!selectedCountry}
                className="text-lg px-8 py-4"
              >
                Cotizar ahora
              </Button>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold mb-2">Tu auto merece el mejor seguro</h3>
                  <p className="text-white/90">
                    Más de 10,000 clientes confían en nosotros para proteger su inversión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir KAVAK SEGUROS?
            </h2>
            <p className="text-xl text-gray-600">
              La mejor experiencia en seguros de auto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} hoverable>
                <div className="text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kavak-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para proteger tu auto?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Obtené tu cotización gratis en menos de 3 minutos
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              if (selectedCountry) {
                setCountry(selectedCountry);
                navigate('/quote');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-lg px-8 py-4"
          >
            {selectedCountry ? 'Comenzar ahora' : 'Seleccioná tu país arriba'}
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

