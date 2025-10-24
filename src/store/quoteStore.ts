import { create } from 'zustand';
import type { VehicleData, DriverData, VehicleTechnicalData, Coverage, Quote, Country } from '../types';

interface QuoteState {
  currentStep: number;
  country: Country | null;
  vehicleData: Partial<VehicleData>;
  driverData: Partial<DriverData>;
  vehicleTechnicalData: Partial<VehicleTechnicalData>;
  coverage: Partial<Coverage>;
  quotes: Quote[];
  selectedQuote: Quote | null;
  
  setCountry: (country: Country) => void;
  setCurrentStep: (step: number) => void;
  setVehicleData: (data: Partial<VehicleData>) => void;
  setDriverData: (data: Partial<DriverData>) => void;
  setVehicleTechnicalData: (data: Partial<VehicleTechnicalData>) => void;
  setCoverage: (data: Partial<Coverage>) => void;
  setQuotes: (quotes: Quote[]) => void;
  setSelectedQuote: (quote: Quote | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  country: null,
  vehicleData: {},
  driverData: {},
  vehicleTechnicalData: {},
  coverage: {
    liability: true, // Always required
  },
  quotes: [],
  selectedQuote: null,
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,

  setCountry: (country) => set({ country }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setVehicleData: (data) => 
    set((state) => ({ 
      vehicleData: { ...state.vehicleData, ...data } 
    })),
  
  setDriverData: (data) => 
    set((state) => ({ 
      driverData: { ...state.driverData, ...data } 
    })),
  
  setVehicleTechnicalData: (data) => 
    set((state) => ({ 
      vehicleTechnicalData: { ...state.vehicleTechnicalData, ...data } 
    })),
  
  setCoverage: (data) => 
    set((state) => ({ 
      coverage: { ...state.coverage, ...data } 
    })),
  
  setQuotes: (quotes) => set({ quotes }),
  
  setSelectedQuote: (quote) => set({ selectedQuote: quote }),
  
  nextStep: () => 
    set((state) => ({ 
      currentStep: Math.min(state.currentStep + 1, 4) 
    })),
  
  previousStep: () => 
    set((state) => ({ 
      currentStep: Math.max(state.currentStep - 1, 1) 
    })),
  
  reset: () => set(initialState),
}));

