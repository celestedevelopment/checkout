// Currency mapping based on country codes
export const COUNTRY_CURRENCY_MAP: Record<string, { code: string; symbol: string; name: string }> = {
  // Europe - Euro
  'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
  'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'ES': { code: 'EUR', symbol: '€', name: 'Euro' },
  'AT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'BE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'NL': { code: 'EUR', symbol: '€', name: 'Euro' },
  'PT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'IE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FI': { code: 'EUR', symbol: '€', name: 'Euro' },
  'GR': { code: 'EUR', symbol: '€', name: 'Euro' },
  
  // North America
  'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  'MX': { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  
  // United Kingdom
  'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
  
  // Switzerland
  'CH': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  
  // Japan
  'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  
  // Australia & New Zealand
  'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'NZ': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  
  // South America
  'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  'AR': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  'CL': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  'CO': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  
  // Asia
  'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'KR': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'HK': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  
  // Nordic countries
  'SE': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'NO': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'DK': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  
  // Eastern Europe
  'PL': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  'CZ': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  'HU': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  'RO': { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  
  // Middle East
  'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  'IL': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  
  // Africa
  'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  'EG': { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  'NG': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
};

// Default currency (fallback)
export const DEFAULT_CURRENCY = { code: 'USD', symbol: '$', name: 'US Dollar' };

/**
 * Get currency information based on country code
 */
export function getCurrencyByCountry(countryCode: string) {
  return COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] || DEFAULT_CURRENCY;
}

/**
 * Format currency amount with proper symbol and formatting
 */
export function formatCurrency(amount: number, currency: { code: string; symbol: string }) {
  // Use Intl.NumberFormat for proper currency formatting
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback to manual formatting if currency code is not supported
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

/**
 * Get all supported currencies
 */
export function getSupportedCurrencies() {
  const currencies = new Map();
  Object.values(COUNTRY_CURRENCY_MAP).forEach(currency => {
    currencies.set(currency.code, currency);
  });
  return Array.from(currencies.values());
}

/**
 * Check if a currency is supported
 */
export function isCurrencySupported(currencyCode: string): boolean {
  return Object.values(COUNTRY_CURRENCY_MAP).some(currency => 
    currency.code === currencyCode.toUpperCase()
  );
}