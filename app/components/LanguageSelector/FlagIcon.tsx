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
    'it': 'it', // Italiano -> Italia
    'ru': 'ru', // Russo -> Russia
    'uk': 'ua', // Ucraino -> Ucraina
    'ar': 'ae', // Arabo -> Emirati Arabi Uniti
    'en-sg': 'sg', // Inglese (Singapore) -> Singapore
    'vi': 'vn', // Vietnamita -> Vietnam
    'tr': 'tr', // Turco -> Turchia
    'es-ar': 'ar', // Spagnolo (Argentina) -> Argentina
    'pt-br': 'br', // Portoghese (Brasile) -> Brasile
    'hi': 'in', // Hindi -> India
    'pl': 'pl', // Polacco -> Polonia
    'ja': 'jp', // Giapponese -> Giappone
    'zh': 'cn', // Cinese -> Cina
    'ng': 'ng', // Nigeria -> Nigeria
    'ph': 'ph'  // Filipino -> Filippine
  };

  const flagCountryCode = languageToCountryMap[countryCode.toLowerCase()] || countryCode.toLowerCase();

  return (
    <span 
      className={`fi fis fi-${flagCountryCode} mr-2 rounded-sm ${className}`}
      style={{ width: '20px', height: '20px' }}
    />
  );
}