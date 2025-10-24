import React from 'react';
import type { Quote, Country } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

interface InsuranceCardProps {
  quote: Quote;
  country: Country;
  onSelect: () => void;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({ 
  quote, 
  country,
  onSelect 
}) => {
  return (
    <Card className="flex flex-col h-full relative">
      {quote.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="info">Recomendado</Badge>
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className="text-5xl mb-2">{quote.insurerLogo}</div>
        <h3 className="text-xl font-bold text-gray-900">{quote.insurerName}</h3>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-kavak-blue mb-1">
          {formatCurrency(quote.monthlyPrice, country)}
        </div>
        <div className="text-sm text-gray-600">por mes</div>
        <div className="text-xs text-gray-500 mt-1">
          o {formatCurrency(quote.annualPrice, country)} al año
        </div>
      </div>
      
      <div className="flex-1 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Coberturas incluidas:</h4>
        <ul className="space-y-2">
          {quote.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-kavak-teal mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        variant={quote.recommended ? 'primary' : 'outline'}
        fullWidth
        onClick={onSelect}
      >
        Contratar
      </Button>
    </Card>
  );
};

