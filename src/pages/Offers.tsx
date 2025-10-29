import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuoteStore } from '../store/quoteStore';
import { useAuthStore } from '../store/authStore';
import type { Quote } from '../types';

export const Offers: React.FC = () => {
  const navigate = useNavigate();
  const { selectedOffer, setSelectedOffer, setSelectedQuote } = useQuoteStore();
  const { isAuthenticated } = useAuthStore();
  const [selectedKavakOffer, setSelectedKavakOffer] = useState<string | null>(null);

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

  const handleSelectKavakOffer = (offer: typeof offers[0]) => {
    setSelectedKavakOffer(offer.id);
  };

  // Generar precios de aseguradoras basados en el precio de la oferta KAVAK seleccionada
  const getInsurerPrices = (basePrice: number) => {
    return {
      answer: Math.round(basePrice), // Mismo precio base
      zurich: Math.round(basePrice * 1.10), // 10% más
      lasegunda: Math.round(basePrice * 1.20), // 20% más
    };
  };

  const insurers = [
    {
      id: 'answer',
      name: 'ANSWER',
      logo: '/answer-logo.svg',
      icon: '🚗'
    },
    {
      id: 'zurich',
      name: 'ZURICH',
      logo: '/zurich-logo.svg',
      icon: '🛡️'
    },
    {
      id: 'lasegunda',
      name: 'La Segunda',
      logo: '/lasegunda-logo.svg',
      icon: '🏛️'
    }
  ];

  const handleSelectInsurer = (kavakOffer: typeof offers[0], insurerId: string, price: number) => {
    const insurer = insurers.find(i => i.id === insurerId);
    const annualPrice = Math.round(price * 12 * 0.9);
    
    // Crear un Quote desde el SelectedOffer
    const quote: Quote = {
      insurerId: insurerId,
      insurerName: insurer?.name || '',
      insurerLogo: insurer?.logo || '',
      monthlyPrice: price,
      annualPrice: annualPrice,
      coverages: {
        liability: true, // Siempre incluido
        materialDamage: kavakOffer.features.some(f => f.includes('Daños') || f.includes('Cobertura Total')),
        theft: kavakOffer.features.some(f => f.includes('Robo') || f.includes('Hurto')),
        medical: kavakOffer.features.some(f => f.includes('Médicos') || f.includes('Gastos médicos')),
        glass: kavakOffer.features.some(f => f.includes('Cristales')),
        roadside: kavakOffer.features.some(f => f.includes('Asistencia') || f.includes('Ruta')),
      },
      features: kavakOffer.features,
    };
    
    setSelectedQuote(quote);
    navigate('/checkout');
  };

  const getColorClasses = (color: string) => {
    return 'border-kavak-blue bg-kavak-blue hover:bg-white hover:border-kavak-blue hover:scale-105 transition-all duration-300';
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
                <div className="p-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {offer.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3">
                      {offer.description}
                    </p>
                    
                    {/* Precio */}
                    <div className="mb-3">
                      <span className="text-3xl font-bold text-gray-900">
                        ${offer.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2 text-sm">/{offer.period}</span>
                    </div>
                    
                    {/* Número de póliza */}
                    <div className="bg-gray-100 rounded-lg p-2 mb-3">
                      <p className="text-xs text-gray-600">N° de Póliza</p>
                      <p className="font-mono text-xs font-semibold text-gray-800">
                        {offer.policyNumber}
                      </p>
                    </div>
                  </div>

                  {/* Características */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Coberturas incluidas:</h4>
                    <ul className="space-y-1">
                      {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
                          <span className="text-xs text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón */}
                  <Button
                    onClick={() => handleSelectKavakOffer(offer)}
                    className={`w-full ${getButtonColor(offer.color)} text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm`}
                  >
                    Seleccionar {offer.name.replace('KAVAK ', '')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Tarjetas de aseguradoras cuando se selecciona una opción KAVAK */}
          {selectedKavakOffer && (() => {
            const selectedOffer = offers.find(o => o.id === selectedKavakOffer);
            const basePrice = selectedOffer?.price || 0;
            const prices = getInsurerPrices(basePrice);
            
            // Encontrar el precio más bajo
            const minPrice = Math.min(prices.answer, prices.zurich, prices.lasegunda);
            
            return (
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Comparamos 3 aseguradoras para tu {selectedOffer?.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    Elegí la aseguradora que mejor se adapte a tus necesidades
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {insurers.map((insurer) => {
                    const price = prices[insurer.id as keyof typeof prices];
                    const annualPrice = Math.round(price * 12 * 0.9);
                    const isCheapest = price === minPrice;
                    
                    return (
                      <Card 
                        key={insurer.id} 
                        className={`border-2 transition-all duration-300 ${
                          isCheapest 
                            ? 'border-kavak-teal bg-kavak-teal/5 shadow-xl ring-2 ring-kavak-teal/20' 
                            : 'border-gray-200 hover:border-kavak-blue hover:shadow-xl'
                        }`}
                      >
                        <div className="p-6">
                          {/* Badge de "Mejor precio" si es la más barata */}
                          {isCheapest && (
                            <div className="mb-3 text-center">
                              <span className="inline-block bg-kavak-teal text-white text-xs font-bold px-3 py-1 rounded-full">
                                ⭐ Mejor precio
                              </span>
                            </div>
                          )}
                          
                          {/* Logo y nombre de la aseguradora */}
                          <div className="text-center mb-4">
                            <img 
                              src={insurer.logo} 
                              alt={insurer.name} 
                              className="h-12 mx-auto mb-3"
                            />
                            <h3 className="text-lg font-bold text-gray-900">
                              {insurer.name}
                            </h3>
                          </div>

                          {/* Precio */}
                          <div className="text-center mb-4">
                            <div className="mb-2">
                              <span className="text-3xl font-bold text-kavak-blue">
                                ${price.toLocaleString()}
                              </span>
                              <span className="text-gray-600 ml-2 text-sm">por mes</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              o ${annualPrice.toLocaleString()} al año
                            </p>
                          </div>

                          {/* Coberturas incluidas */}
                          {selectedOffer && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                                Coberturas incluidas:
                              </h4>
                              <ul className="space-y-2">
                                {selectedOffer.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
                                    <span className="text-xs text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Botón Contratar */}
                          <Button
                            onClick={() => selectedOffer && handleSelectInsurer(selectedOffer, insurer.id, price)}
                            className="w-full bg-kavak-blue hover:bg-kavak-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                          >
                            Contratar
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Información adicional */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Necesitás ayuda para decidir? Contactanos de lunes a viernes de 8 a 18
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
