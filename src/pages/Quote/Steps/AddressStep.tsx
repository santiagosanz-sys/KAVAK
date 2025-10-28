import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useQuoteStore } from '../../../store/quoteStore';
import type { AddressData } from '../../../types';

export const AddressStep: React.FC = () => {
  const { addressData, setAddressData, nextStep, previousStep } = useQuoteStore();
  const { register, handleSubmit, formState: { errors } } = useForm<AddressData>({
    defaultValues: addressData as AddressData,
  });

  const onSubmit = (data: AddressData) => {
    setAddressData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-kavak-blue/5 border border-kavak-blue/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Datos de Dirección</h3>
        <p className="text-sm text-gray-700">
          Necesitamos tu dirección para completar la cotización.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Dirección"
            placeholder="Ej: Av. Corrientes 1234, CABA"
            {...register('address', { required: 'La dirección es requerida' })}
            error={errors.address?.message}
            helperText="Incluí calle, número y ciudad"
          />
        </div>

        <Input
          label="Código postal"
          placeholder="Ej: 1234"
          {...register('postalCode', { 
            required: 'El código postal es requerido',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Solo números'
            }
          })}
          error={errors.postalCode?.message}
        />
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
