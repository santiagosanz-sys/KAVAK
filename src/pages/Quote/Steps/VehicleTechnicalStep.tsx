import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useQuoteStore } from '../../../store/quoteStore';
import type { VehicleTechnicalData } from '../../../types';

export const VehicleTechnicalStep: React.FC = () => {
  const { vehicleTechnicalData, setVehicleTechnicalData, nextStep, previousStep } = useQuoteStore();
  const { register, handleSubmit, formState: { errors } } = useForm<VehicleTechnicalData>({
    defaultValues: vehicleTechnicalData as VehicleTechnicalData,
  });

  const onSubmit = (data: VehicleTechnicalData) => {
    setVehicleTechnicalData(data);
    nextStep();
  };

  return (
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
        <Button type="button" variant="outline" onClick={previousStep}>
          Anterior
        </Button>
        <Button type="submit" variant="primary">
          Siguiente
        </Button>
      </div>
    </form>
  );
};