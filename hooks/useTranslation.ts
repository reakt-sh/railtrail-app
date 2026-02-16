import { I18n } from 'i18n-js';
import { useMemo } from 'react';
import { translations } from '../consts/translations';
import { useLanguage } from '../contexts/LanguageContext';

export enum Locale {
  de = 'de',
  en = 'en',
}

export const useTranslation = (): I18n => {
  const { locale } = useLanguage();

  const i18n = useMemo(() => {
    const instance = new I18n(translations);
    instance.enableFallback = true;
    instance.defaultLocale = Locale.de;
    instance.locale = locale;
    return instance;
  }, [locale]);

  return i18n;
};
