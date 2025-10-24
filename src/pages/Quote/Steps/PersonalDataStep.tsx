import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { useQuoteStore } from '../../../store/quoteStore';
import { genderOptions } from '../../../utils/mockData';
import { formatCUIL, formatPhone } from '../../../utils/formatters';
import type { DriverData } from '../../../types';

export const PersonalDataStep: React.FC = () => {
  const { driverData, setDriverData, nextStep, previousStep } = useQuoteStore();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DriverData>({
    defaultValues: driverData as DriverData,
  });
  
  const [cuilValue, setCuilValue] = useState(driverData.cuil || '');
  const [phoneValue, setPhoneValue] = useState(driverData.phone || '');

  const handleCUILChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCUIL(e.target.value);
    setCuilValue(formatted);
    setValue('cuil', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhoneValue(formatted);
    setValue('phone', formatted);
  };

  const onSubmit = (data: DriverData) => {
    // Validar CUIL
    const cuilPattern = /^\d{2}-\d{8}-\d{1}$/;
    if (!cuilPattern.test(cuilValue)) {
      return;
    }
    
    // Validar teléfono
    const phonePattern = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!phonePattern.test(phoneValue)) {
      return;
    }
    
    // Crear objeto con datos formateados
    const formData = {
      ...data,
      cuil: cuilValue,
      phone: phoneValue,
    };
    
    setDriverData(formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-kavak-blue/5 border border-kavak-blue/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Datos Personales</h3>
        <p className="text-sm text-gray-700">
          Necesitamos algunos datos personales para calcular tu cotización.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Género"
          options={genderOptions}
          {...register('gender', { required: 'El género es requerido' })}
          error={errors.gender?.message}
        />

        <Input
          label="CUIL"
          placeholder="Ej: 20-12345678-9"
          value={cuilValue}
          onChange={handleCUILChange}
          error={errors.cuil?.message}
          helperText="Formato: XX-XXXXXXXX-X"
          required
        />

        <Input
          type="date"
          label="Fecha de nacimiento"
          {...register('birthDate', { 
            required: 'La fecha de nacimiento es requerida',
            validate: (value) => {
              const today = new Date();
              const birthDate = new Date(value);
              const age = today.getFullYear() - birthDate.getFullYear();
              return age >= 18 || 'Debés ser mayor de 18 años';
            }
          })}
          error={errors.birthDate?.message}
        />

        <Input
          label="Teléfono"
          placeholder="Ej: +54 11 1234-5678"
          value={phoneValue}
          onChange={handlePhoneChange}
          error={errors.phone?.message}
          helperText="Incluí código de área"
          required
        />
      </div>

      <div className="bg-kavak-blue/5 border border-kavak-blue/20 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          🔒 <strong>Privacidad:</strong> Tus datos están protegidos y solo se utilizan para generar tu cotización de seguro.
        </p>
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
