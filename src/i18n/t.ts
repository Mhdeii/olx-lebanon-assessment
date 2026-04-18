import { languageStore } from '../store/language.store';
import { strings, TranslationKey } from './strings';

export const t = (key: TranslationKey, options?: Record<string, string | number>): string => {
  const currentLang = languageStore.lang;
  
  if (!strings[key] || !strings[key][currentLang]) {
    return key as string;
  }
  
  let translated: string = strings[key][currentLang];
  
  if (options) {
    Object.keys(options).forEach(param => {
      translated = translated.replace(`{{${param}}}`, String(options[param]));
    });
  }
  
  return translated;
};
