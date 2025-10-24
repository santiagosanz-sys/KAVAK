import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useQuoteStore } from '../../../store/quoteStore';
import type { Coverage } from '../../../types';

interface CoverageOption {
  key: keyof Coverage;
  label: string;
  description: string;
  required?: boolean;
}

const coverageOptions: CoverageOption[] = [
  {
    key: 'liability',
    label: 'Responsabilidad civil',
    description: 'Cubre daños a terceros (obligatorio)',
    required: true,
  },
  {
    key: 'materialDamage',
    label: 'Daños materiales',
    description: 'Cubre daños a tu vehículo',
  },
  {
    key: 'theft',
    label: 'Robo total y parcial',
    description: 'Protección contra robo del vehículo',
  },
  {
    key: 'medical',
    label: 'Gastos médicos',
    description: 'Cobertura de gastos médicos por accidente',
  },
  {
    key: 'glass',
    label: 'Cristales',
    description: 'Reparación o reemplazo de vidrios',
  },
  {
    key: 'roadside',
    label: 'Asistencia vial 24/7',
    description: 'Grúa, auxilio mecánico y más',
  },
];

export const CoverageStep: React.FC = () => {
  const navigate = useNavigate();
  const { coverage, setCoverage, previousStep } = useQuoteStore();
  const { register, handleSubmit, formState: { errors } } = useForm<Coverage>({
    defaultValues: {
      liability: true,
      ...coverage,
    } as Coverage,
  });

  const onSubmit = (data: Coverage) => {
    setCoverage(data);
    navigate('/results');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coverageOptions.map((option) => (
          <Card key={option.key} className="relative">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                {...register(option.key)}
                disabled={option.required}
                defaultChecked={option.required}
                className="mt-1 mr-3 h-5 w-5 text-kavak-blue rounded focus:ring-kavak-blue"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {option.label}
                  {option.required && (
                    <span className="ml-2 text-xs text-kavak-blue">(Obligatorio)</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </label>
          </Card>
        ))}
      </div>

      {errors.liability && (
        <p className="text-sm text-red-600">{errors.liability.message}</p>
      )}

      <div className="bg-kavak-blue/5 border border-kavak-blue/20 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          💡 <strong>Tip:</strong> Seleccioná todas las coberturas que necesitás. 
          Podés comparar diferentes opciones en el siguiente paso.
        </p>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={previousStep}>
          Anterior
        </Button>
        <Button type="submit" variant="primary">
          Ver cotizaciones
        </Button>
      </div>
    </form>
  );
};

