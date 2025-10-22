import { UseTabVisibilityOptions } from '../hooks/useTabVisibility';
import { getCheckoutTabConfig, TAB_CONFIG } from '../constants/config/tabs';

/**
 * Configurazione per l'effetto "Attention Grabber" del checkout
 * Implementa il comportamento di attirare l'attenzione quando l'utente cambia tab
 * e mostra un reminder dopo 1 minuto
 */
export { getCheckoutTabConfig };

/**
 * Configurazioni predefinite per diversi tipi di pagina
 */
export const tabConfigs = {
  checkout: getCheckoutTabConfig(),
  
  // Altre configurazioni che potrebbero essere utili in futuro
  payment: {
    originalTitle: TAB_CONFIG.PAYMENT.ORIGINAL_TITLE,
    hiddenTitle: TAB_CONFIG.PAYMENT.HIDDEN_TITLE,
    enableBlinking: TAB_CONFIG.PAYMENT.ENABLE_BLINKING,
    blinkInterval: TAB_CONFIG.PAYMENT.BLINK_INTERVAL,
    checkoutReminderTitle: TAB_CONFIG.PAYMENT.REMINDER_TITLE,
    checkoutReminderDelay: TAB_CONFIG.PAYMENT.REMINDER_DELAY
  },
  
  confirmation: {
    originalTitle: TAB_CONFIG.CONFIRMATION.ORIGINAL_TITLE,
    hiddenTitle: TAB_CONFIG.CONFIRMATION.HIDDEN_TITLE,
    enableBlinking: TAB_CONFIG.CONFIRMATION.ENABLE_BLINKING,
    blinkInterval: TAB_CONFIG.CONFIRMATION.BLINK_INTERVAL,
    checkoutReminderTitle: TAB_CONFIG.CONFIRMATION.REMINDER_TITLE,
    checkoutReminderDelay: TAB_CONFIG.CONFIRMATION.REMINDER_DELAY
  }
} as const;

export type TabConfigType = keyof typeof tabConfigs;