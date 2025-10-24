export type Country = 'AR' | 'CL';

export interface User {
  id: string;
  email: string;
  name: string;
  country: Country;
}

export interface VehicleData {
  year: number;
  brand: string;
  model: string;
  version: string;
  mileage: number;
  usage: 'personal' | 'commercial';
  vin?: string;
}

export interface DriverData {
  gender: string;
  cuil: string;
  birthDate: string;
  phone: string;
}

export interface AddressData {
  address: string;
  postalCode: string;
}

export interface VehicleTechnicalData {
  chassisNumber: string;
  engineNumber: string;
}

export interface Coverage {
  liability: boolean;
  materialDamage: boolean;
  theft: boolean;
  medical: boolean;
  glass: boolean;
  roadside: boolean;
}

export interface Quote {
  insurerId: string;
  insurerName: string;
  insurerLogo: string;
  monthlyPrice: number;
  annualPrice: number;
  coverages: Coverage;
  recommended?: boolean;
  features: string[];
}

export interface QuoteRequest {
  country: Country;
  vehicle: VehicleData;
  driver: DriverData;
  address: AddressData;
  coverage: Coverage;
}

export interface Policy {
  id: string;
  policyNumber: string;
  quote: Quote;
  request: QuoteRequest;
  createdAt: string;
  status: 'active' | 'pending' | 'cancelled';
}

