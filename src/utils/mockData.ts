export const carBrands = [
  'Toyota',
  'Volkswagen',
  'Ford',
  'Chevrolet',
  'Renault',
  'Peugeot',
  'Fiat',
  'Honda',
  'Nissan',
  'Hyundai',
  'Kia',
  'Mazda',
  'Citroën',
  'Mercedes-Benz',
  'BMW',
  'Audi',
];

export const carModels: Record<string, string[]> = {
  Toyota: ['Corolla', 'Hilux', 'Etios', 'Yaris', 'RAV4', 'Camry'],
  Volkswagen: ['Gol', 'Polo', 'Vento', 'Amarok', 'Tiguan', 'Golf'],
  Ford: ['Focus', 'Fiesta', 'Ranger', 'EcoSport', 'Ka', 'Mondeo'],
  Chevrolet: ['Onix', 'Cruze', 'S10', 'Tracker', 'Spin', 'Prisma'],
  Renault: ['Sandero', 'Logan', 'Duster', 'Kangoo', 'Clio', 'Captur'],
  Peugeot: ['208', '308', '2008', '3008', '408', 'Partner'],
  Fiat: ['Cronos', 'Argo', 'Toro', 'Mobi', 'Strada', 'Pulse'],
  Honda: ['Civic', 'City', 'HR-V', 'CR-V', 'Fit', 'Accord'],
  Nissan: ['Versa', 'Kicks', 'Frontier', 'Sentra', 'X-Trail', 'March'],
  Hyundai: ['i10', 'i20', 'Elantra', 'Tucson', 'Creta', 'Santa Fe'],
  Kia: ['Rio', 'Sportage', 'Cerato', 'Picanto', 'Sorento', 'Seltos'],
  Mazda: ['2', '3', 'CX-3', 'CX-5', '6', 'CX-30'],
  Citroën: ['C3', 'C4', 'Berlingo', 'C4 Cactus', 'C5 Aircross'],
  'Mercedes-Benz': ['Clase A', 'Clase C', 'Clase E', 'GLA', 'GLC', 'Sprinter'],
  BMW: ['Serie 1', 'Serie 3', 'Serie 5', 'X1', 'X3', 'X5'],
  Audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
};

export const genderOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
  { value: 'prefer-not-to-say', label: 'Prefiero no decir' },
];

export const insurers = [
  {
    id: 'seguros-pro',
    name: 'SegurosPro',
    logo: '🛡️',
    tier: 'premium',
  },
  {
    id: 'auto-seguro',
    name: 'AutoSeguro',
    logo: '🚗',
    tier: 'economic',
  },
  {
    id: 'kavak-seguros',
    name: 'Kavak Seguros',
    logo: '⭐',
    tier: 'balanced',
  },
];

