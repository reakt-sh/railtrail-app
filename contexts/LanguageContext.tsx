import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Locale } from '../hooks/useTranslation';

const LANGUAGE_STORAGE_KEY = '@app_language';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(Locale.de);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLocale && Object.values(Locale).includes(savedLocale as Locale)) {
          setLocaleState(savedLocale as Locale);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const setLocale = async (newLocale: Locale) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale);
      setLocaleState(newLocale);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
