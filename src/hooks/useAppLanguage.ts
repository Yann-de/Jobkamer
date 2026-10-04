import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage, getCurrentLanguage } from '@/i18n';
import { Locale } from '@/types';

export function useAppLanguage() {
  const { t, i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<Locale>(getCurrentLanguage());

  const switchLanguage = async (locale: Locale) => {
    await changeAppLanguage(locale);
    setCurrentLocale(locale);
  };

  return {
    t,
    currentLocale,
    switchLanguage,
    isFrench: currentLocale === 'fr',
    isEnglish: currentLocale === 'en',
    i18n,
  };
}
