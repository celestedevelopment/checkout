'use client';

import { useContext } from 'react';
import { TranslationContext } from '@/app/contexts/TranslationContext';

// Re-export the hook from context for convenience
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Additional utility hooks for specific translation needs

/**
 * Hook for getting a single translation with fallback
 */
export function useT() {
  const { t } = useTranslation();
  return t;
}

/**
 * Hook for getting current language
 */
export function useLanguage() {
  const { language, setLanguage } = useTranslation();
  return { language, setLanguage };
}

/**
 * Hook for checking if translations are loading
 */
export function useTranslationLoading() {
  const { isLoading } = useTranslation();
  return isLoading;
}

/**
 * Hook for getting all available translations
 */
export function useTranslations() {
  const { translations } = useTranslation();
  return translations;
}