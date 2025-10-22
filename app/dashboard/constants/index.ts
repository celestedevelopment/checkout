// Dashboard Configuration Constants
export const DASHBOARD_CONFIG = {
  // Layout
  SIDEBAR_WIDTH: {
    EXPANDED: 256, // 16rem
    COLLAPSED: 64, // 4rem
  },
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Refresh intervals (in milliseconds)
  STATS_REFRESH_INTERVAL: 30000, // 30 seconds
  NOTIFICATIONS_REFRESH_INTERVAL: 60000, // 1 minute
  
  // Storage keys
  STORAGE_KEYS: {
    SIDEBAR_COLLAPSED: 'dashboard_sidebar_collapsed',
    THEME_PREFERENCE: 'dashboard_theme',
    LANGUAGE_PREFERENCE: 'dashboard_language',
    CURRENCY_PREFERENCE: 'dashboard_currency',
  },
  
  // API endpoints
  API_ENDPOINTS: {
    USER: '/api/dashboard/user',
    STATS: '/api/dashboard/stats',
    TRANSACTIONS: '/api/dashboard/transactions',
    SUBSCRIPTIONS: '/api/dashboard/subscriptions',
    NOTIFICATIONS: '/api/dashboard/notifications',
  },
  
  // Subscription plans
  SUBSCRIPTION_PLANS: {
    FREE: 'free',
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
  },
  
  // Subscription statuses
  SUBSCRIPTION_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  },
  
  // Theme options
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
  
  // Date formats
  DATE_FORMATS: {
    SHORT: 'MMM dd, yyyy',
    LONG: 'MMMM dd, yyyy',
    WITH_TIME: 'MMM dd, yyyy HH:mm',
    TIME_ONLY: 'HH:mm',
  },
  
  // Chart colors
  CHART_COLORS: {
    PRIMARY: '#3B82F6',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    DANGER: '#EF4444',
    INFO: '#6366F1',
    GRAY: '#6B7280',
  },
  
  // Animation durations (in milliseconds)
  ANIMATIONS: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Notification types
  NOTIFICATION_TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  },
  
  // File upload limits
  UPLOAD_LIMITS: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
  },
  
  // Validation rules
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  },
  
  // Currency settings
  CURRENCIES: {
    DEFAULT: 'USD',
    SUPPORTED: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'],
  },
  
  // Language settings
  LANGUAGES: {
    DEFAULT: 'en',
    SUPPORTED: [
      'en', 'de', 'es', 'fr', 'it', 'ru', 'uk', 'ar',
      'en-sg', 'vi', 'tr', 'es-ar', 'pt-br', 'hi', 'pl', 'ja', 'zh', 'ng', 'ph'
    ],
  },
} as const;

// Dashboard Menu Items
export const DASHBOARD_MENU_ITEMS = [
  {
    id: 'dashboard',
    labelKey: 'dashboard',
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    id: 'transactions',
    labelKey: 'transactions',
    icon: 'transactions',
    path: '/dashboard/transactions',
  },
  {
    id: 'subscriptions',
    labelKey: 'subscriptions',
    icon: 'subscriptions',
    path: '/dashboard/subscriptions',
  },
  {
    id: 'analytics',
    labelKey: 'analytics',
    icon: 'analytics',
    path: '/dashboard/analytics',
  },
  {
    id: 'settings',
    labelKey: 'settings',
    icon: 'settings',
    path: '/dashboard/settings',
    children: [
      {
        id: 'profile',
        labelKey: 'profile',
        icon: 'profile',
        path: '/dashboard/settings/profile',
      },
      {
        id: 'preferences',
        labelKey: 'preferences',
        icon: 'preferences',
        path: '/dashboard/settings/preferences',
      },
      {
        id: 'security',
        labelKey: 'security',
        icon: 'security',
        path: '/dashboard/settings/security',
      },
    ],
  },
] as const;

// Dashboard Status Colors
export const STATUS_COLORS = {
  [DASHBOARD_CONFIG.SUBSCRIPTION_STATUS.ACTIVE]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
  },
  [DASHBOARD_CONFIG.SUBSCRIPTION_STATUS.INACTIVE]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
  },
  [DASHBOARD_CONFIG.SUBSCRIPTION_STATUS.CANCELLED]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
  },
  [DASHBOARD_CONFIG.SUBSCRIPTION_STATUS.EXPIRED]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
  },
} as const;

// Export individual sections for easier imports
export const {
  SIDEBAR_WIDTH,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  STATS_REFRESH_INTERVAL,
  NOTIFICATIONS_REFRESH_INTERVAL,
  STORAGE_KEYS,
  API_ENDPOINTS,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_STATUS,
  THEMES,
  DATE_FORMATS,
  CHART_COLORS,
  ANIMATIONS,
  BREAKPOINTS,
  NOTIFICATION_TYPES,
  UPLOAD_LIMITS,
  VALIDATION,
  CURRENCIES,
  LANGUAGES,
} = DASHBOARD_CONFIG;