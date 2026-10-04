import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from '@/i18n/locales/en.json';
import fr from '@/i18n/locales/fr.json';

const deviceLocales = getLocales();
const deviceLanguageCode = deviceLocales[0]?.languageCode ?? 'fr';
const initialLanguage = deviceLanguageCode.startsWith('en') ? 'en' : 'fr';

export const resources = {
  fr: { translation: fr },
  en: { translation: en },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: initialLanguage,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
