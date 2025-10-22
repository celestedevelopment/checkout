// Geolocation API Constants
export const GEOLOCATION_API = {
  // IP Geolocation service
  IP_API_URL: 'https://ipapi.co/json/',
  REQUEST_OPTIONS: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; checkout-app/1.0)',
    },
    timeout: 5000,
  }
} as const;

// Default values
export const GEOLOCATION_DEFAULTS = {
  LANGUAGE: 'en',
  IP: 'unknown',
  COUNTRY: 'US',
} as const;

// HTTP Headers
export const GEOLOCATION_HEADERS = {
  X_FORWARDED_FOR: 'x-forwarded-for',
  X_REAL_IP: 'x-real-ip',
  ACCEPT_LANGUAGE: 'accept-language',
  USER_AGENT: 'user-agent',
} as const;