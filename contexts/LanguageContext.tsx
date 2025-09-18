import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { en } from '../locales/en';
import { vi } from '../locales/vi';

const translations = { en, vi };
export type Language = keyof typeof translations;

type TranslationFunction = (key: string,
  options?: { [key: string]: string | number }
) => any;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to access nested keys in the translation object
const getNestedTranslation = (obj: any, key: string): any => {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = useCallback((key: string, options?: { [key: string]: string | number }): any => {
    let translatedString = getNestedTranslation(translations[language], key);
    
    if (translatedString === undefined) {
      // Fallback to English if translation is missing in the current language
      translatedString = getNestedTranslation(translations['en'], key);
    }

    if (typeof translatedString === 'string' && options) {
      Object.keys(options).forEach((k) => {
        translatedString = translatedString.replace(`{{${k}}}`, String(options[k]));
      });
    }

    return translatedString || key;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
