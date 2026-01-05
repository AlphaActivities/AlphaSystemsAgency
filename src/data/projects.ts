export interface Project {
  name: string;
  kickoffDate: string;
}

export const projects: Record<string, Project> = {
  'aksarben-locksmiths': {
    name: 'Aksarben Locksmiths',
    kickoffDate: '2025-04-03',
  },
  'elite-barbershop': {
    name: 'Elite Barbershop',
    kickoffDate: '2024-06-01',
  },
  'centre-dentaire': {
    name: 'Centre Dentaire',
    kickoffDate: '2024-12-01',
  },
  'culture-barbershop': {
    name: 'Culture Barbershop',
    kickoffDate: '2024-12-01',
  },
  'classy-roofs': {
    name: 'Classy Roofs',
    kickoffDate: '2024-12-01',
  },
  'triple-w-rentals': {
    name: 'Triple W Rentals',
    kickoffDate: '2025-01-01',
  },
  'rocket-baller': {
    name: 'Rocket Baller',
    kickoffDate: '2025-01-01',
  },
  'remax': {
    name: 'Remax',
    kickoffDate: '2025-01-01',
  },
};

export function calculateWeeksLive(kickoffDate: string): number {
  return Math.max(0, Math.floor((Date.now() - new Date(kickoffDate).getTime()) / (1000*60*60*24*7)));
}
