import type { Country } from '../types';

export const formatCurrency = (amount: number, country: Country): string => {
  const locale = country === 'AR' ? 'es-AR' : 'es-CL';
  const currency = country === 'AR' ? 'ARS' : 'CLP';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date, country: Country): string => {
  const locale = country === 'AR' ? 'es-AR' : 'es-CL';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const formatLicenseNumber = (number: string): string => {
  // Remove all non-alphanumeric characters
  const cleaned = number.replace(/[^a-zA-Z0-9]/g, '');
  return cleaned.toUpperCase();
};

export const formatPostalCode = (code: string, country: Country): string => {
  const cleaned = code.replace(/[^0-9]/g, '');
  
  if (country === 'AR') {
    // Argentina: NNNN or ANNNNAAA
    return cleaned.slice(0, 4);
  } else {
    // Chile: NNNNNNN
    return cleaned.slice(0, 7);
  }
};

export const formatCUIL = (value: string): string => {
  // Remover todos los caracteres no numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplicar formato XX-XXXXXXXX-X
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 10) {
    return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
  } else {
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 10)}-${numbers.slice(10, 11)}`;
  }
};

export const formatPhone = (value: string): string => {
  // Remover todos los caracteres no numéricos excepto +
  const cleaned = value.replace(/[^\d+]/g, '');
  
  // Si empieza con +54, formatear como +54 11 1234-5678
  if (cleaned.startsWith('+54')) {
    const numbers = cleaned.slice(3);
    if (numbers.length <= 2) {
      return `+54 ${numbers}`;
    } else if (numbers.length <= 6) {
      return `+54 ${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    } else {
      return `+54 ${numbers.slice(0, 2)} ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
  }
  
  // Si empieza con 54, agregar +
  if (cleaned.startsWith('54')) {
    return formatPhone(`+${cleaned}`);
  }
  
  // Si no tiene código de país, agregar +54
  if (cleaned.length > 0 && !cleaned.startsWith('+')) {
    return formatPhone(`+54${cleaned}`);
  }
  
  return cleaned;
};

