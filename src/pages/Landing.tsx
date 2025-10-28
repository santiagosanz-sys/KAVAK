import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useQuoteStore } from '../store/quoteStore';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { setCountry } = useQuoteStore();

  const handleStartQuote = () => {
    setCountry('AR'); // Siempre Argentina
    navigate('/quote');
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
              
              <Button
                variant="secondary"
                onClick={handleStartQuote}
                className="text-lg px-8 py-4"
              >
                Cotizar ahora
              </Button>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-gradient-to-br from-blue-400/20 to-blue-300/20 backdrop-blur-sm rounded-3xl p-8 overflow-hidden">
                  {/* Imagen de fondo con efecto de gotas de agua */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-400/30 rounded-3xl"></div>
                  
                  {/* Contenido */}
                  <div className="relative z-10">
                    <div className="text-6xl mb-4">🚗</div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Tu auto merece el mejor seguro</h3>
                    <p className="text-white/90">
                      Más de 10,000 clientes confían en nosotros para proteger su inversión.
                    </p>
                  </div>
                  
                  {/* Efecto de gotas de agua */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-8 w-2 h-2 bg-white/60 rounded-full"></div>
                    <div className="absolute top-8 right-12 w-1 h-1 bg-white/40 rounded-full"></div>
                    <div className="absolute top-12 right-6 w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                    <div className="absolute top-16 right-10 w-1 h-1 bg-white/30 rounded-full"></div>
                    <div className="absolute top-20 right-14 w-2 h-2 bg-white/40 rounded-full"></div>
                    <div className="absolute top-24 right-8 w-1 h-1 bg-white/50 rounded-full"></div>
                    <div className="absolute top-28 right-12 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                    <div className="absolute top-32 right-6 w-1 h-1 bg-white/40 rounded-full"></div>
                  </div>
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
            onClick={handleStartQuote}
            className="text-lg px-8 py-4"
          >
            Comenzar ahora
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

