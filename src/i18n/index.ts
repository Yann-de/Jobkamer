import i18n, { resources } from '@/lib/i18n';
import { Locale } from '@/types';

export { i18n, resources };

export async function changeAppLanguage(locale: Locale): Promise<void> {
  await i18n.changeLanguage(locale);
}

export function getCurrentLanguage(): Locale {
  const current = i18n.language;
  return current.startsWith('en') ? 'en' : 'fr';
}
