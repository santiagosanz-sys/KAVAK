import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import { useQuoteStore } from '../store/quoteStore';
import type { VehicleTechnicalData } from '../types';

export const VehicleTechnical: React.FC = () => {
  const navigate = useNavigate();
  const { selectedOffer, vehicleTechnicalData, setVehicleTechnicalData } = useQuoteStore();
  const { register, handleSubmit, formState: { errors } } = useForm<VehicleTechnicalData>({
    defaultValues: vehicleTechnicalData as VehicleTechnicalData,
  });

  const onSubmit = (data: VehicleTechnicalData) => {
    setVehicleTechnicalData(data);
    // Aquí iría la lógica para procesar el pago
    navigate('/checkout');
  };

  if (!selectedOffer) {
    navigate('/offers');
    return null;
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Últimos datos para tu seguro
            </h1>
            <p className="text-xl text-gray-600">
              Necesitamos algunos datos técnicos de tu vehículo
            </p>
          </div>

          {/* Resumen de la oferta seleccionada */}
          <Card className="mb-8 bg-kavak-blue/5 border-kavak-blue/20">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen de tu selección
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Plan seleccionado</p>
                  <p className="font-semibold text-gray-900">{selectedOffer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Precio</p>
                  <p className="font-semibold text-gray-900">
                    ${selectedOffer.price.toLocaleString()}/{selectedOffer.period}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">N° de Póliza</p>
                  <p className="font-mono text-sm font-semibold text-gray-800">
                    {selectedOffer.policyNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coberturas</p>
                  <p className="text-sm text-gray-700">{selectedOffer.features.length} coberturas incluidas</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Formulario de datos técnicos */}
          <Card>
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-kavak-blue/5 border border-kavak-blue/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Información importante:</strong> Estos datos se encuentran en la cédula verde del vehículo o en el título de propiedad.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Número de Chasis"
                    placeholder="Ej: 1HGBH41JXMN109186"
                    {...register('chassisNumber', { 
                      required: 'El número de chasis es requerido',
                      minLength: { value: 17, message: 'El chasis debe tener 17 caracteres' },
                      maxLength: { value: 17, message: 'El chasis debe tener 17 caracteres' }
                    })}
                    error={errors.chassisNumber?.message}
                    helperText="17 caracteres alfanuméricos"
                  />

                  <Input
                    label="Número de Motor"
                    placeholder="Ej: 2JZ-GTE-123456"
                    {...register('engineNumber', { 
                      required: 'El número de motor es requerido',
                      minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                    })}
                    error={errors.engineNumber?.message}
                    helperText="Número que aparece en el motor"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">¿Dónde encontrar estos datos?</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• <strong>Chasis:</strong> En la cédula verde, línea "Número de chasis"</li>
                    <li>• <strong>Motor:</strong> En la cédula verde, línea "Número de motor"</li>
                    <li>• También podés encontrarlos en el título de propiedad del vehículo</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/offers')}
                  >
                    Volver a ofertas
                  </Button>
                  <Button type="submit" variant="primary">
                    Continuar al pago
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
