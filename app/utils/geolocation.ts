// Utility functions for IP-based geolocation and language detection

export interface GeolocationData {
  country: string;
  countryCode: string;
  language: string;
  ip: string;
}

// Country code to language mapping
const countryToLanguage: Record<string, string> = {
  'IT': 'it', // Italy -> Italian
  'ES': 'es', // Spain -> Spanish
  'FR': 'fr', // France -> French
  'DE': 'de', // Germany -> German
  'PT': 'pt', // Portugal -> Portuguese
  'RU': 'ru', // Russia -> Russian
  'CN': 'zh', // China -> Chinese
  'JP': 'ja', // Japan -> Japanese
  'KR': 'ko', // South Korea -> Korean
  'US': 'en', // United States -> English
  'GB': 'en', // United Kingdom -> English
  'CA': 'en', // Canada -> English
  'AU': 'en', // Australia -> English
  // Add more mappings as needed
};

/**
 * Get user's geolocation data based on IP address
 * Uses a free IP geolocation service
 */
export async function getGeolocationFromIP(): Promise<GeolocationData> {
  try {
    // Using ipapi.co as it's free and reliable
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'checkout-app/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch geolocation data');
    }
    
    const data = await response.json();
    
    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'US',
      language: getLanguageFromCountryCode(data.country_code || 'US'),
      ip: data.ip || 'unknown'
    };
  } catch (error) {
    console.warn('Failed to get geolocation data:', error);
    // Fallback to default values
    return {
      country: 'United States',
      countryCode: 'US',
      language: 'en',
      ip: 'unknown'
    };
  }
}

/**
 * Map country code to language code
 */
export function getLanguageFromCountryCode(countryCode: string): string {
  return countryToLanguage[countryCode.toUpperCase()] || 'en';
}

/**
 * Get user's preferred language from browser headers (fallback)
 */
export function getLanguageFromHeaders(acceptLanguage?: string): string {
  if (!acceptLanguage) return 'en';
  
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality = '1'] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(),
        quality: parseFloat(quality)
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find the first supported language
  const supportedLanguages = ['en', 'it', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ja', 'ko'];
  
  for (const lang of languages) {
    if (supportedLanguages.includes(lang.code)) {
      return lang.code;
    }
  }
  
  return 'en'; // Default fallback
}

/**
 * Detect user's preferred language using multiple methods
 * Priority: IP geolocation > Browser headers > Default (en)
 */
export async function detectUserLanguage(acceptLanguage?: string): Promise<string> {
  try {
    // First try IP-based detection
    const geoData = await getGeolocationFromIP();
    return geoData.language;
  } catch (error) {
    console.warn('IP-based language detection failed, falling back to browser headers');
    // Fallback to browser headers
    return getLanguageFromHeaders(acceptLanguage);
  }
}