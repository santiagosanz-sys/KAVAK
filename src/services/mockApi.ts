import type { QuoteRequest, Quote, Coverage } from '../types';
import { insurers } from '../utils/mockData';
import { supabase } from './supabase';
import type { User } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateBasePrice = (request: QuoteRequest): number => {
  const { vehicle, driver, coverage, country } = request;
  
  // Base price calculation
  let basePrice = 5000;
  
  // Vehicle age factor
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - vehicle.year;
  basePrice += vehicleAge * 200;
  
  // Mileage factor
  basePrice += (vehicle.mileage / 10000) * 300;
  
  // Usage factor
  if (vehicle.usage === 'commercial') {
    basePrice *= 1.4;
  }
  
  // Driver age factor (calculate from birth date)
  const birthDate = new Date(driver.birthDate);
  const age = currentYear - birthDate.getFullYear();
  if (age < 25) {
    basePrice *= 1.5;
  } else if (age > 65) {
    basePrice *= 1.3;
  }
  
  // Coverage factors
  const coverageMultiplier = calculateCoverageMultiplier(coverage);
  basePrice *= coverageMultiplier;
  
  // Country factor
  if (country === 'CL') {
    basePrice *= 1.2; // Chile is ~20% more expensive
  }
  
  return Math.round(basePrice);
};

const calculateCoverageMultiplier = (coverage: Coverage): number => {
  let multiplier = 1.0;
  
  if (coverage.materialDamage) multiplier += 0.3;
  if (coverage.theft) multiplier += 0.4;
  if (coverage.medical) multiplier += 0.2;
  if (coverage.glass) multiplier += 0.1;
  if (coverage.roadside) multiplier += 0.15;
  
  return multiplier;
};

const generateQuoteForInsurer = (
  request: QuoteRequest,
  insurerId: string,
  tierMultiplier: number
): Quote => {
  const basePrice = calculateBasePrice(request);
  const monthlyPrice = Math.round(basePrice * tierMultiplier);
  const annualPrice = Math.round(monthlyPrice * 12 * 0.9); // 10% discount for annual
  
  const insurer = insurers.find(i => i.id === insurerId)!;
  
  // Determine which coverages are included based on tier
  const includedCoverages: Coverage = {
    liability: true, // Always included
    materialDamage: request.coverage.materialDamage || false,
    theft: request.coverage.theft || false,
    medical: request.coverage.medical || false,
    glass: request.coverage.glass || false,
    roadside: request.coverage.roadside || false,
  };
  
  // Generate features based on tier
  const features = generateFeatures(insurer.tier, includedCoverages);
  
  return {
    insurerId: insurer.id,
    insurerName: insurer.name,
    insurerLogo: insurer.logo,
    monthlyPrice,
    annualPrice,
    coverages: includedCoverages,
    recommended: insurer.id === 'kavak-seguros',
    features,
  };
};

const generateFeatures = (tier: string, coverages: Coverage): string[] => {
  const baseFeatures = ['Cobertura de responsabilidad civil'];
  
  if (coverages.materialDamage) {
    baseFeatures.push('Daños materiales');
  }
  if (coverages.theft) {
    baseFeatures.push('Robo total y parcial');
  }
  if (coverages.medical) {
    baseFeatures.push('Gastos médicos');
  }
  if (coverages.glass) {
    baseFeatures.push('Cristales');
  }
  if (coverages.roadside) {
    baseFeatures.push('Asistencia vial 24/7');
  }
  
  // Add tier-specific features
  if (tier === 'premium') {
    baseFeatures.push('Auto de reemplazo');
    baseFeatures.push('Cobertura internacional');
    baseFeatures.push('Atención prioritaria');
  } else if (tier === 'balanced') {
    baseFeatures.push('Auto de reemplazo');
    baseFeatures.push('Descuento en talleres afiliados');
  } else {
    baseFeatures.push('Red de talleres afiliados');
  }
  
  return baseFeatures;
};

export const getQuotes = async (request: QuoteRequest, user?: User | null): Promise<Quote[]> => {
  // Simulate API delay
  await delay(1500);
  
  // Validate request
  if (!request.vehicle || !request.driver || !request.coverage) {
    throw new Error('Datos incompletos para generar cotización');
  }
  
  // Generate quotes for each insurer
  const quotes: Quote[] = [
    generateQuoteForInsurer(request, 'seguros-pro', 1.3), // Premium - 30% more expensive
    generateQuoteForInsurer(request, 'auto-seguro', 0.85), // Economic - 15% cheaper
    generateQuoteForInsurer(request, 'kavak-seguros', 1.0), // Balanced - base price
  ];
  
  // Sort by price (cheapest first)
  const sortedQuotes = quotes.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  
  // Save to Supabase if user is authenticated
  if (user?.id) {
    try {
      const { error } = await supabase.from('quotes').insert([
        {
          user_id: user.id,
          country: request.country,
          vehicle_data: request.vehicle,
          driver_data: request.driver,
          address_data: request.address,
        },
      ]);
      
      if (error) {
        console.error('Error saving quote to Supabase:', error);
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  }
  
  return sortedQuotes;
};

export const createPolicy = async (
  offerData: any,
  quoteId?: string,
  user?: User | null
): Promise<string> => {
  // Simulate API delay
  await delay(1000);
  
  // Generate mock policy number
  const policyNumber = `KVK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  // Save to Supabase if user is authenticated
  if (user?.id && quoteId) {
    try {
      const { error } = await supabase.from('selected_offers').insert([
        {
          quote_id: quoteId,
          offer_data: offerData,
          policy_number: policyNumber,
          status: 'pending',
        },
      ]);
      
      if (error) {
        console.error('Error saving selected offer to Supabase:', error);
      }
    } catch (error) {
      console.error('Error saving selected offer:', error);
    }
  }
  
  return policyNumber;
};

export const saveVehicleTechnical = async (
  chassisNumber: string,
  engineNumber: string,
  quoteId?: string,
  user?: User | null
): Promise<void> => {
  if (user?.id && quoteId) {
    try {
      const { error } = await supabase.from('vehicle_technical').insert([
        {
          quote_id: quoteId,
          chassis_number: chassisNumber,
          engine_number: engineNumber,
        },
      ]);
      
      if (error) {
        console.error('Error saving vehicle technical data to Supabase:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error saving vehicle technical data:', error);
      throw error;
    }
  }
};

