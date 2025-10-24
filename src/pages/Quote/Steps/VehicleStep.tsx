import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { useQuoteStore } from '../../../store/quoteStore';
import { carBrands, carModels } from '../../../utils/mockData';
import type { VehicleData } from '../../../types';

export const VehicleStep: React.FC = () => {
  const { vehicleData, setVehicleData, nextStep } = useQuoteStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<VehicleData>({
    defaultValues: vehicleData as VehicleData,
  });

  const selectedBrand = watch('brand');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2007 }, (_, i) => currentYear - i);

  const onSubmit = (data: VehicleData) => {
    setVehicleData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Año"
          options={years.map(year => ({ value: year, label: year.toString() }))}
          {...register('year', { 
            required: 'El año es requerido',
            valueAsNumber: true 
          })}
          error={errors.year?.message}
        />

        <Select
          label="Marca"
          options={carBrands.map(brand => ({ value: brand, label: brand }))}
          {...register('brand', { required: 'La marca es requerida' })}
          error={errors.brand?.message}
        />

        <Select
          label="Modelo"
          options={
            selectedBrand && carModels[selectedBrand]
              ? carModels[selectedBrand].map(model => ({ value: model, label: model }))
              : []
          }
          {...register('model', { required: 'El modelo es requerido' })}
          error={errors.model?.message}
          disabled={!selectedBrand}
        />

        <Input
          label="Versión"
          placeholder="Ej: 1.6 GLX"
          {...register('version', { required: 'La versión es requerida' })}
          error={errors.version?.message}
        />

        <Input
          type="number"
          label="Kilometraje"
          placeholder="Ej: 50000"
          {...register('mileage', { 
            required: 'El kilometraje es requerido',
            valueAsNumber: true,
            min: { value: 0, message: 'El kilometraje debe ser positivo' }
          })}
          error={errors.mileage?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uso del vehículo <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="personal"
                {...register('usage', { required: 'El uso es requerido' })}
                className="mr-2"
              />
              Particular
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="commercial"
                {...register('usage', { required: 'El uso es requerido' })}
                className="mr-2"
              />
              Comercial
            </label>
          </div>
          {errors.usage && (
            <p className="mt-1 text-sm text-red-600">{errors.usage.message}</p>
          )}
        </div>

        <Input
          label="VIN (opcional)"
          placeholder="Número de serie del vehículo"
          {...register('vin')}
          helperText="Si no lo conocés, podés dejarlo vacío"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Siguiente
        </Button>
      </div>
    </form>
  );
};

