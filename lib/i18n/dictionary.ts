import { Locale } from './config';

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const dictionaries = {
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
