import { UseTabVisibilityOptions } from '../../hooks/useTabVisibility';

/**
 * Configurazioni per la visibilità delle tab e gli effetti di attenzione
 */
export const TAB_CONFIG = {
  CHECKOUT: {
    ORIGINAL_TITLE: "Checkout - Pay With Crypto",
    HIDDEN_TITLE: "Non perdere l'offerta! - Crypto Checkout",
    ENABLE_BLINKING: true,
    BLINK_INTERVAL: 800, // ms
    REMINDER_TITLE: "Termina il checkout",
    REMINDER_DELAY: 60000 // 1 minuto
  },
  
  PAYMENT: {
    ORIGINAL_TITLE: "Payment - Crypto Checkout",
    HIDDEN_TITLE: "Completa il pagamento! - Crypto",
    ENABLE_BLINKING: true,
    BLINK_INTERVAL: 1000, // ms
    REMINDER_TITLE: "Finalizza il pagamento",
    REMINDER_DELAY: 45000 // 45 secondi
  },
  
  CONFIRMATION: {
    ORIGINAL_TITLE: "Payment Confirmation",
    HIDDEN_TITLE: "Pagamento completato!",
    ENABLE_BLINKING: false,
    BLINK_INTERVAL: 1000, // ms
    REMINDER_TITLE: "Conferma ricevuta",
    REMINDER_DELAY: 30000 // 30 secondi
  }
} as const;

/**
 * Configurazione per l'effetto "Attention Grabber" del checkout
 */
export const getCheckoutTabConfig = (): UseTabVisibilityOptions => ({
  originalTitle: TAB_CONFIG.CHECKOUT.ORIGINAL_TITLE,
  hiddenTitle: TAB_CONFIG.CHECKOUT.HIDDEN_TITLE,
  enableBlinking: TAB_CONFIG.CHECKOUT.ENABLE_BLINKING,
  blinkInterval: TAB_CONFIG.CHECKOUT.BLINK_INTERVAL,
  checkoutReminderTitle: TAB_CONFIG.CHECKOUT.REMINDER_TITLE,
  checkoutReminderDelay: TAB_CONFIG.CHECKOUT.REMINDER_DELAY
});

export type TabConfigType = keyof typeof TAB_CONFIG;