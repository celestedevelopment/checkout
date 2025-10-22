// Currency API Constants
export const CURRENCY_API = {
  // ExchangeRate-API configuration
  API_KEY: '6cffd2b3c58eb79753ccc34b',
  BASE_URL: 'https://v6.exchangerate-api.com/v6',
  get EXCHANGE_API_URL() {
    return `${this.BASE_URL}/${this.API_KEY}/latest/USD`;
  }
} as const;

// Cache configuration
export const CURRENCY_CACHE = {
  DURATION: 60 * 60 * 1000, // 1 hour in milliseconds
} as const;

// Default values
export const CURRENCY_DEFAULTS = {
  FROM: 'USD',
  TO: 'EUR',
  AMOUNT: 1,
} as const;