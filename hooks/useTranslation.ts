import { I18n } from 'i18n-js';
import { useMemo } from 'react';
import { Locale, translations } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

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
