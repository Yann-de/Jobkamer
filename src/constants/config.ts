import { Locale } from '@/types';

export const APP_CONFIG = {
  name: 'JobKamer',
  tagline: "Le réseau professionnel de l'emploi au Cameroun",
  version: '1.0.0',
  defaultLocale: 'fr' as Locale,
  supportedLocales: ['fr', 'en'] as Locale[],
  defaultCurrency: 'XAF',
  currencySymbol: 'FCFA',
  country: 'Cameroun',
  countryCode: 'CM',
  phonePrefix: '+237',
  cities: ['Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Bamenda', 'Kribi', 'Buea', 'Autre'] as const,
  links: {
    terms: 'https://jobkamer.com/terms',
    privacy: 'https://jobkamer.com/privacy',
    support: 'https://jobkamer.com/support',
  },
} as const;
