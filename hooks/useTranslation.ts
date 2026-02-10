import { translations } from '../values/translations';
// import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

export enum Locale {
  de = 'de',
  en = 'en',
}

export const useTranslation = (): I18n => {
  const i18n = new I18n(translations);

  i18n.enableFallback = true;
  i18n.defaultLocale = Locale.de;

  return i18n;
};
