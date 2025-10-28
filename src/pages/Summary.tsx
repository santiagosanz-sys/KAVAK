import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useQuoteStore } from '../store/quoteStore';
import { useAuthStore } from '../store/authStore';

export const Summary: React.FC = () => {
  const navigate = useNavigate();
  const { vehicleData, driverData, addressData } = useQuoteStore();
  const { user } = useAuthStore();

  const handleContinue = () => {
    navigate('/offers');
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Resumen de tu cotización
            </h1>
            <p className="text-lg text-gray-600">
              Revisá los datos ingresados antes de ver las ofertas
            </p>
          </div>

          <div className="space-y-6">
            {/* Datos del vehículo */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">🚗</span>
                Datos del vehículo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Año</p>
                  <p className="font-semibold text-gray-900">{vehicleData.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marca</p>
                  <p className="font-semibold text-gray-900">{vehicleData.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Modelo</p>
                  <p className="font-semibold text-gray-900">{vehicleData.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Versión</p>
                  <p className="font-semibold text-gray-900">{vehicleData.version}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kilometraje</p>
                  <p className="font-semibold text-gray-900">{vehicleData.mileage?.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Uso</p>
                  <p className="font-semibold text-gray-900">
                    {vehicleData.usage === 'personal' ? 'Personal' : 'Comercial'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Datos personales */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">👤</span>
                Datos personales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Género</p>
                  <p className="font-semibold text-gray-900">{driverData.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CUIL</p>
                  <p className="font-semibold text-gray-900">{driverData.cuil}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de nacimiento</p>
                  <p className="font-semibold text-gray-900">
                    {driverData.birthDate ? new Date(driverData.birthDate).toLocaleDateString('es-AR') : ''}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-semibold text-gray-900">{driverData.phone}</p>
                </div>
              </div>
            </Card>

            {/* Datos de dirección */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">📍</span>
                Datos de dirección
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="font-semibold text-gray-900">{addressData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Código postal</p>
                  <p className="font-semibold text-gray-900">{addressData.postalCode}</p>
                </div>
              </div>
            </Card>

            {/* Mensaje de WhatsApp */}
            <Card className="bg-green-50 border-green-200">
              <div className="flex items-start">
                <div className="text-3xl mr-4">📱</div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Te contactaremos por WhatsApp para terminar
                  </h3>
                  <p className="text-green-700 mb-2">
                    Verifica que tu número <strong>{driverData.phone}</strong> sea correcto.
                  </p>
                  <p className="text-sm text-green-600">
                    Nuestro equipo se pondrá en contacto contigo para completar los datos técnicos del vehículo y finalizar tu póliza.
                  </p>
                </div>
              </div>
            </Card>

            {/* Botones */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/quote')}
              >
                Volver a editar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleContinue}
                className="px-8"
              >
                Ver ofertas disponibles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
