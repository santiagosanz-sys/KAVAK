import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para las tablas de Supabase
export interface Quote {
  id?: string;
  user_id?: string;
  country: string;
  vehicle_data: any;
  driver_data: any;
  address_data: any;
  created_at?: string;
}

export interface SelectedOffer {
  id?: string;
  quote_id: string;
  offer_data: any;
  policy_number: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

export interface VehicleTechnical {
  id?: string;
  quote_id: string;
  chassis_number: string;
  engine_number: string;
  created_at?: string;
}

