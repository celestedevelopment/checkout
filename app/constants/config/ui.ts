// UI Configuration Constants
export const UI_CONFIG = {
  // Component IDs
  LANGUAGE_SELECTOR_ID: 'language-selector',
  
  // Delays and timeouts
  AUTO_VALIDATION_DELAY: 800, // milliseconds
  
  // Popup dimensions and classes
  POPUP: {
    LOGO_WIDTH: 60,
    LOGO_HEIGHT: 18,
    LOGO_CLASS: 'h-4 w-auto',
    TEXT_SIZE: 'text-xs',
    GAP_SIZE: 'gap-3',
  },
  
  // Default dimensions and classes
  DEFAULT: {
    LOGO_WIDTH: 80,
    LOGO_HEIGHT: 24,
    LOGO_CLASS: 'h-6 w-auto',
    TEXT_SIZE: 'text-sm',
    GAP_SIZE: 'gap-4',
  },
} as const;