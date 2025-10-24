import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/ui/Card';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { useQuoteStore } from '../../store/quoteStore';
import { useAuthStore } from '../../store/authStore';
import { VehicleStep } from './Steps/VehicleStep';
import { PersonalDataStep } from './Steps/PersonalDataStep';
import { AddressStep } from './Steps/AddressStep';
import { CoverageStep } from './Steps/CoverageStep';
import { LoginStep } from './Steps/LoginStep';

const steps = ['Vehículo', 'Datos Personales', 'Dirección', 'Cobertura', 'Login'];

export const QuoteWizard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { currentStep, country } = useQuoteStore();

  useEffect(() => {
    if (!country) {
      navigate('/');
    }
  }, [country, navigate]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VehicleStep />;
      case 2:
        return <PersonalDataStep />;
      case 3:
        return <AddressStep />;
      case 4:
        return <CoverageStep />;
      case 5:
        return <LoginStep />;
      default:
        return <VehicleStep />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Cotizá tu seguro
            </h1>
            <p className="text-lg text-gray-600">
              Completá los siguientes datos para obtener tu cotización
            </p>
          </div>

          <Card>
            <StepIndicator 
              currentStep={currentStep} 
              totalSteps={steps.length}
              steps={steps}
            />

            <div className="mt-8">
              {renderStep()}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

