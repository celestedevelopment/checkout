'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';
import FlagIcon from './FlagIcon';

interface Language {
  key: string;
  name: string;
}

const LANGUAGE_SELECTOR_ID = 'language-selector';

export default function LanguageSelector() {
  const { language: currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);

  // Define available languages with their display names
  const availableLanguages: Language[] = [
    { key: 'en', name: 'English' },
    { key: 'de', name: 'Deutsch' },
    { key: 'es', name: 'Español' },
    { key: 'fr', name: 'Français' },
    { key: 'it', name: 'Italiano' },
    { key: 'ru', name: 'Русский' },
    { key: 'uk', name: 'Українська' },
    { key: 'ar', name: 'العربية' },
    { key: 'en-sg', name: 'Singapore' },
    { key: 'vi', name: 'Tiếng Việt' },
    { key: 'tr', name: 'Türkçe' },
    { key: 'es-ar', name: 'Argentina' },
    { key: 'pt-br', name: 'Português' },
    { key: 'hi', name: 'हिन्दी' }
  ];

  useEffect(() => {
    // Riordina le lingue mettendo quella corrente per prima
    const reorderedLanguages = [...availableLanguages];
    const currentLangIndex = reorderedLanguages.findIndex(lang => lang.key === currentLanguage);
    
    if (currentLangIndex > 0) {
      // Sposta la lingua corrente all'inizio
      const currentLangObj = reorderedLanguages.splice(currentLangIndex, 1)[0];
      reorderedLanguages.unshift(currentLangObj);
    }
    
    setLanguages(reorderedLanguages);
  }, [currentLanguage]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    };

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleLanguageChange = async (language: Language) => {
    await setLanguage(language.key);
    setIsOpen(false);
  };

  const selectedLanguage = languages.find(lang => lang.key === currentLanguage) || languages[0];

  if (!selectedLanguage) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      {/* Language selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        id={LANGUAGE_SELECTOR_ID}
        aria-expanded={isOpen}
      >
        <FlagIcon countryCode={selectedLanguage.key} />
        {selectedLanguage.name}
        <svg
          className={`ms-2 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Language selector dropdown */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-sm bg-white z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={LANGUAGE_SELECTOR_ID}
        >
          <div className="p-2 grid grid-cols-2 gap-2" role="none">
            {languages.map((language, index) => {
              return (
                <button
                  key={language.key}
                  onClick={() => handleLanguageChange(language)}
                  className={`${
                    selectedLanguage.key === language.key
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } block px-2 py-2 text-sm text-start items-center inline-flex hover:bg-gray-100 rounded-md mx-1`}
                  role="menuitem"
                >
                  <FlagIcon countryCode={language.key} />
                  <span className="truncate">{language.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}