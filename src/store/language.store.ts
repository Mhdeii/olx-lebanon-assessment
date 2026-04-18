import { makeAutoObservable } from 'mobx';
import { I18nManager } from 'react-native';
import { storage } from '../storage/mmkv';

const LANGUAGE_KEY = 'app_language';
type Language = 'en' | 'ar';

class LanguageStore {
  lang: Language = 'en';

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  private hydrate() {
    const savedLang = storage.getString(LANGUAGE_KEY) as Language;
    if (savedLang === 'en' || savedLang === 'ar') {
      this.lang = savedLang;
    }
  }

  get isRTL() {
    return this.lang === 'ar';
  }

  setLanguage(newLang: Language) {
    if (this.lang === newLang) return;
    
    this.lang = newLang;
    storage.set(LANGUAGE_KEY, newLang);
    
    const isArabic = newLang === 'ar';
    I18nManager.forceRTL(isArabic);
    I18nManager.allowRTL(isArabic);
  }

  toggleLanguage() {
    this.setLanguage(this.lang === 'en' ? 'ar' : 'en');
  }
}

export const languageStore = new LanguageStore();
