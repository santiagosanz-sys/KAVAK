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
  fullName: string;
  age: number;
  gender: string;
  cuil: string;
  address: string;
  postalCode: string;
  birthDate: string;
  email: string;
  phone: string;
  licenseNumber: string;
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
  vehicleTechnical: VehicleTechnicalData;
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

