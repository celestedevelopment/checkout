// Session Configuration Constants
export const SESSION_CONFIG = {
  // Session duration in milliseconds (30 minutes)
  DURATION: 30 * 60 * 1000,
  
  // Local storage key for session data
  STORAGE_KEY: 'userSession',
  
  // Session check interval (1 minute)
  CHECK_INTERVAL: 60000,
} as const;