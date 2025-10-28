import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuoteStore } from '../store/quoteStore';
import { useAuthStore } from '../store/authStore';
import { formatCurrency, formatDate } from '../utils/formatters';

export const Success: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { country, selectedQuote, vehicleData, reset } = useQuoteStore();
  const policyNumber = location.state?.policyNumber;

  useEffect(() => {
    if (!policyNumber || !selectedQuote) {
      navigate('/');
    }
  }, [policyNumber, selectedQuote, navigate]);

  const handleDownloadPolicy = () => {
    // Mock download
    alert('En una aplicación real, aquí se descargaría el PDF de la póliza');
  };

  const handleNewQuote = () => {
    reset();
    navigate('/');
  };

  if (!selectedQuote || !policyNumber) {
    return null;
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ¡Felicitaciones!
            </h1>
            <p className="text-lg text-gray-600">
              Tu seguro ha sido contratado exitosamente
            </p>
          </div>

          <Card className="mb-6">
            <div className="text-center pb-6 mb-6 border-b">
              <div className="text-sm text-gray-600 mb-2">Número de póliza</div>
              <div className="text-2xl font-bold text-kavak-blue font-mono">
                {policyNumber}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Detalles de tu seguro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Aseguradora</div>
                    <div className="font-semibold text-gray-900">
                      {selectedQuote.insurerLogo} {selectedQuote.insurerName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Vehículo</div>
                    <div className="font-semibold text-gray-900">
                      {vehicleData.year} {vehicleData.brand} {vehicleData.model}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Precio mensual</div>
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(selectedQuote.monthlyPrice, country)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Fecha de inicio</div>
                    <div className="font-semibold text-gray-900">
                      {formatDate(new Date(), country)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-kavak-blue/5 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Próximos pasos:
                </h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>Recibirás un email de confirmación en {user?.email}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>Tu póliza estará activa a partir de hoy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>Descargá tu póliza digital usando el botón de abajo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">4.</span>
                    <span>Guardá el número de póliza para futuras consultas</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleDownloadPolicy}
                >
                  📄 Descargar póliza
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleNewQuote}
                >
                  Nueva cotización
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-kavak-blue to-kavak-blue-light text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">
                ¿Necesitás ayuda?
              </h3>
              <p className="mb-4 text-white/90">
                Nuestro equipo está disponible 24/7 para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:08001234567" className="text-white hover:underline">
                  📞 0800-123-4567
                </a>
                <a href="mailto:ayuda@kavakseguros.com" className="text-white hover:underline">
                  ✉️ ayuda@kavakseguros.com
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

