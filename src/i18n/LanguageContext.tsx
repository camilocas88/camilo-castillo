'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import en from './en.json';
import es from './es.json';

// Define un tipo para las traducciones
type TranslationsType = typeof en;

interface LanguageContextType {
  language: string;
  translations: TranslationsType;
  changeLanguage: (lang: string) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Contexto de lenguaje con valores por defecto
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  translations: en,
  changeLanguage: () => {},
});

// Objeto que mapea los códigos de idioma con sus traducciones
const translations: { [key: string]: TranslationsType } = {
  en: en,
  es: es,
};

// Proveedor del contexto de idioma
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Inicialmente usamos inglés o recuperamos el idioma guardado
  const [language, setLanguageState] = useState('en');
  const [currentTranslations, setCurrentTranslations] = useState(translations.en);

  useEffect(() => {
    // Recuperar el idioma guardado en localStorage si existe
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
      setCurrentTranslations(translations[savedLanguage]);
    }
  }, []);

  // Función para cambiar el idioma
  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      setCurrentTranslations(translations[lang]);
      localStorage.setItem('language', lang);
    }
  };

  const value = {
    language,
    translations: currentTranslations,
    changeLanguage: setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 