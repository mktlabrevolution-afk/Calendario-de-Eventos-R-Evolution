
export interface EdTechEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  region: 'Norteamérica' | 'Latinoamérica' | 'España' | 'Virtual/Global';
  type: string;
  relevance: 'Muy Alta' | 'Alta' | 'Media';
  notes: string;
  lat: number;
  lng: number;
  website: string;
}

export interface UserEventState {
  status: 'Ya asistí' | 'Voy a asistir' | '';
  organization: string;
  comment: string;
  financialInfo: string; // New field for costs/expenses
}

export type UserStateMap = Record<number, UserEventState>;

export const ORGANIZATIONS = [
  "Siglo 21", "Cerem", "Social Learning", "Capabilia", "Bitlogic", "Klarway", "Benchlab", "Ninguna"
];

// New Color Palette based on Logo
export const COLORS = {
  primaryDark: '#030712', // Deepest Navy/Black background
  secondaryDark: '#0B1221', // Slightly lighter for cards
  accentGreen: '#00DC82', // Logo Green
  accentBlue: '#0047FF', // Logo Blue
  textLight: '#F8FAFC',
  
  // Region Colors (Adjusted to fit new theme)
  latam: '#00DC82', // Green for Latam
  na: '#3B82F6',    // Blue for NA
  spain: '#F97316', // Orange for Spain (complementary)
  global: '#D946EF', // Pink/Purple for Global

  // Status Colors
  attended: '#EAB308', // Gold
  attending: '#00DC82', // Green
  org: '#A855F7', // Purple
};

// Helper for gradients
export const GRADIENTS = {
  title: 'bg-gradient-to-r from-white via-[#00DC82] to-[#0047FF]',
  primary: 'bg-gradient-to-r from-[#00DC82] to-[#0047FF]',
  gold: 'bg-gradient-to-r from-[#EAB308] to-[#F59E0B]', // For financial stuff
};