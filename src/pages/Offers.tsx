import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuoteStore } from '../store/quoteStore';
import { useAuthStore } from '../store/authStore';

export const Offers: React.FC = () => {
  const navigate = useNavigate();
  const { selectedOffer, setSelectedOffer } = useQuoteStore();
  const { isAuthenticated } = useAuthStore();

  // Mock de 3 ofertas ordenadas de barata a premium
  const offers = [
    {
      id: 'standard',
      name: 'KAVAK Standard',
      price: 8500,
      period: 'mensual',
      policyNumber: 'KVK-2024-001234',
      features: [
        'Responsabilidad Civil',
        'Robo y Hurto',
        'Incendio Total',
        'Cristales',
        'Granizo'
      ],
      color: 'blue',
      description: 'Cobertura esencial para tu tranquilidad'
    },
    {
      id: 'premium',
      name: 'KAVAK Premium',
      price: 12500,
      period: 'mensual',
      policyNumber: 'KVK-2024-001234',
      features: [
        'Todo lo del Standard',
        'Daños Parciales',
        'Responsabilidad Civil Ampliada',
        'Asistencia en Ruta 24/7',
        'Auto de Reemplazo'
      ],
      color: 'blue',
      description: 'La opción más elegida por nuestros clientes'
    },
    {
      id: 'premium-plus',
      name: 'KAVAK Premium +',
      price: 18500,
      period: 'mensual',
      policyNumber: 'KVK-2024-001234',
      features: [
        'Todo lo del Premium',
        'Cobertura Total',
        'Franquicia Reducida',
        'Asistencia Premium',
        'Auto de Reemplazo Premium',
        'Cobertura Internacional'
      ],
      color: 'blue',
      description: 'La máxima protección para tu vehículo'
    }
  ];

  const handleSelectOffer = (offer: typeof offers[0]) => {
    setSelectedOffer({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      period: offer.period,
      policyNumber: offer.policyNumber,
      features: offer.features,
      description: offer.description
    });
    navigate('/vehicle-technical');
  };

  const getColorClasses = (color: string) => {
    return 'border-kavak-blue bg-kavak-blue/5 hover:bg-white hover:border-kavak-blue transition-all duration-300';
  };

  const getButtonColor = (color: string) => {
    return 'bg-kavak-blue hover:bg-kavak-blue-dark';
  };

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/offers' } });
    return null;
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tus cotizaciones están listas
            </h1>
            <p className="text-xl text-gray-600">
              Elegí la cobertura que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {offers.map((offer) => (
              <Card 
                key={offer.id} 
                className={`relative ${getColorClasses(offer.color)} border-2 hover:shadow-xl cursor-pointer`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {offer.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {offer.description}
                    </p>
                    
                    {/* Precio */}
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${offer.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2">/{offer.period}</span>
                    </div>
                    
                    {/* Número de póliza */}
                    <div className="bg-white/50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-600">N° de Póliza</p>
                      <p className="font-mono text-sm font-semibold text-gray-800">
                        {offer.policyNumber}
                      </p>
                    </div>
                  </div>

                  {/* Características */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Coberturas incluidas:</h4>
                    <ul className="space-y-2">
                      {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón */}
                  <Button
                    onClick={() => handleSelectOffer(offer)}
                    className={`w-full ${getButtonColor(offer.color)} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200`}
                  >
                    Seleccionar {offer.name.replace('KAVAK ', '')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Información adicional */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Necesitás ayuda para decidir?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📞</div>
                <h4 className="font-semibold text-gray-900 mb-1">Llamanos</h4>
                <p className="text-sm text-gray-600">0800-123-KAVAK</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                <p className="text-sm text-gray-600">+54 9 11 1234-5678</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <p className="text-sm text-gray-600">seguros@kavak.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
