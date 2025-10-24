import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/ui/Card';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { useQuoteStore } from '../../store/quoteStore';
import { useAuthStore } from '../../store/authStore';
import { VehicleStep } from './Steps/VehicleStep';
import { DriverStep } from './Steps/DriverStep';
import { VehicleTechnicalStep } from './Steps/VehicleTechnicalStep';
import { CoverageStep } from './Steps/CoverageStep';

const steps = ['Vehículo', 'Conductor', 'Datos Técnicos', 'Cobertura'];

export const QuoteWizard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { currentStep, country } = useQuoteStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (!country) {
      navigate('/');
    }
  }, [isAuthenticated, country, navigate]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VehicleStep />;
      case 2:
        return <DriverStep />;
      case 3:
        return <VehicleTechnicalStep />;
      case 4:
        return <CoverageStep />;
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

