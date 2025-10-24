import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { useQuoteStore } from '../../../store/quoteStore';
import { genderOptions } from '../../../utils/mockData';
import { formatCUIL, formatPhone } from '../../../utils/formatters';
import type { DriverData } from '../../../types';

export const DriverStep: React.FC = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre completo"
          placeholder="Juan Pérez"
          {...register('fullName', { required: 'El nombre es requerido' })}
          error={errors.fullName?.message}
        />

        <Input
          type="number"
          label="Edad"
          placeholder="Ej: 30"
          {...register('age', { 
            required: 'La edad es requerida',
            valueAsNumber: true,
            min: { value: 18, message: 'Debés ser mayor de 18 años' },
            max: { value: 100, message: 'Edad inválida' }
          })}
          error={errors.age?.message}
        />

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
          label="Dirección"
          placeholder="Ej: Av. Corrientes 1234"
          {...register('address', { required: 'La dirección es requerida' })}
          error={errors.address?.message}
        />

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
          type="email"
          label="Email"
          placeholder="tu@email.com"
          {...register('email', { 
            required: 'El email es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Formato de email inválido'
            }
          })}
          error={errors.email?.message}
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

        <Input
          label="Número de licencia"
          placeholder="Ej: ABC123456"
          {...register('licenseNumber', { required: 'El número de licencia es requerido' })}
          error={errors.licenseNumber?.message}
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

