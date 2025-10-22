'use client';

interface FlagIconProps {
  countryCode: string;
  className?: string;
}

export default function FlagIcon({ countryCode, className = '' }: FlagIconProps) {
  // Mappa i codici lingua ai codici paese per le bandiere
  const languageToCountryMap: { [key: string]: string } = {
    'en': 'gb', // Inglese -> Gran Bretagna
    'de': 'de', // Tedesco -> Germania
    'es': 'es', // Spagnolo -> Spagna
    'fr': 'fr', // Francese -> Francia
    'it': 'it'  // Italiano -> Italia
  };

  const flagCountryCode = languageToCountryMap[countryCode.toLowerCase()] || countryCode.toLowerCase();

  return (
    <span 
      className={`fi fis fi-${flagCountryCode} mr-2 rounded-sm ${className}`}
      style={{ width: '20px', height: '20px' }}
    />
  );
}