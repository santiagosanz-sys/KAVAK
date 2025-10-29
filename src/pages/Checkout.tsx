import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useQuoteStore } from '../store/quoteStore';
import { useAuthStore } from '../store/authStore';
import { formatCurrency } from '../utils/formatters';
import { createPolicy } from '../services/mockApi';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { 
    country, 
    selectedQuote, 
    vehicleData,
    addressData
  } = useQuoteStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit'>('credit');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedQuote || !country) {
      navigate('/offers');
      return;
    }
  }, [isAuthenticated, selectedQuote, country, navigate]);

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    
    try {
      const policyNumber = await createPolicy();
      
      navigate('/success', { state: { policyNumber } });
    } catch (error) {
      alert('Error al procesar la compra. Por favor, intentá nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedQuote) {
    return null;
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Confirmá tu compra
            </h1>
            <p className="text-lg text-gray-600">
              Estás a un paso de proteger tu vehículo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Resumen del seguro
                </h2>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{selectedQuote.insurerLogo}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {selectedQuote.insurerName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicleData.year} {vehicleData.brand} {vehicleData.model}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-kavak-blue">
                      {formatCurrency(selectedQuote.monthlyPrice, country)}
                    </div>
                    <div className="text-sm text-gray-600">por mes</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Coberturas incluidas:
                  </h4>
                  <ul className="space-y-2">
                    {selectedQuote.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 text-kavak-teal mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Método de pago
                </h2>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-kavak-blue">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'credit')}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Tarjeta de crédito</div>
                      <div className="text-sm text-gray-600">Pago en cuotas disponible</div>
                    </div>
                    <div className="text-2xl">💳</div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-kavak-blue">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit"
                      checked={paymentMethod === 'debit'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'debit')}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Tarjeta de débito</div>
                      <div className="text-sm text-gray-600">Pago único</div>
                    </div>
                    <div className="text-2xl">💳</div>
                  </label>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Número de tarjeta"
                    placeholder="1234 5678 9012 3456"
                    disabled
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Vencimiento"
                      placeholder="MM/AA"
                      disabled
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      disabled
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Resumen de pago
                </h3>
                
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio mensual</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedQuote.monthlyPrice, country)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio anual</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedQuote.annualPrice, country)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-kavak-teal">
                    <span>Ahorro anual</span>
                    <span>
                      {formatCurrency(
                        selectedQuote.monthlyPrice * 12 - selectedQuote.annualPrice,
                        country
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total primer mes</span>
                  <span className="text-kavak-blue">
                    {formatCurrency(selectedQuote.monthlyPrice, country)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleConfirmPurchase}
                  isLoading={isProcessing}
                >
                  Confirmar compra
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Al confirmar, aceptás nuestros términos y condiciones
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

