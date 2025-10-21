'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation data structure
interface Translations {
  [key: string]: string;
}

interface TranslationContextType {
  language: string;
  translations: Translations;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

export function TranslationProvider({ children, initialLanguage = 'en' }: TranslationProviderProps) {
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current language
  const loadTranslations = async (lang: string) => {
    try {
      setIsLoading(true);
      
      // Load common translations
      const response = await fetch(`/locales/${lang}/common.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
      } else {
        // Fallback to English if language file doesn't exist
        const fallbackResponse = await fetch('/locales/en/common.json');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
        }
      }
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Use empty translations as final fallback
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  };

  // Detect user's language on initial load
  useEffect(() => {
    const detectAndSetLanguage = async () => {
      try {
        // First check if language is stored in localStorage
        const storedLanguage = localStorage.getItem('preferred-language');
        if (storedLanguage) {
          setLanguage(storedLanguage);
          await loadTranslations(storedLanguage);
          return;
        }

        // If no stored language, detect from IP
        const response = await fetch('/api/detect-language');
        if (response.ok) {
          const data = await response.json();
          const detectedLanguage = data.language || 'en';
          setLanguage(detectedLanguage);
          localStorage.setItem('preferred-language', detectedLanguage);
          await loadTranslations(detectedLanguage);
        } else {
          // Fallback to initial language
          await loadTranslations(initialLanguage);
        }
      } catch (error) {
        console.error('Language detection failed:', error);
        await loadTranslations(initialLanguage);
      }
    };

    detectAndSetLanguage();
  }, [initialLanguage]);

  // Load translations when language changes
  useEffect(() => {
    if (language) {
      loadTranslations(language);
      localStorage.setItem('preferred-language', language);
    }
  }, [language]);

  // Translation function
  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };

  const value: TranslationContextType = {
    language,
    translations,
    setLanguage,
    t,
    isLoading
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook to use translation context
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// HOC for components that need translations
export function withTranslation<P extends object>(
  Component: React.ComponentType<P>
) {
  return function TranslatedComponent(props: P) {
    return (
      <TranslationProvider>
        <Component {...props} />
      </TranslationProvider>
    );
  };
}

// Export the context for use in hooks
export { TranslationContext };