import { UseTabVisibilityOptions } from '../hooks/useTabVisibility';

/**
 * Configurazione per l'effetto "Attention Grabber" del checkout
 * Implementa il comportamento di attirare l'attenzione quando l'utente cambia tab
 * e mostra un reminder dopo 1 minuto
 */
export const getCheckoutTabConfig = (): UseTabVisibilityOptions => ({
  originalTitle: "Checkout - Pay With Crypto",
  hiddenTitle: "Non perdere l'offerta! - Crypto Checkout",
  enableBlinking: true, // Abilitato effetto lampeggiante quando non è sulla tab
  blinkInterval: 800, // Lampeggia più velocemente (0.8 secondi)
  checkoutReminderTitle: "Termina il checkout", // Titolo dopo 1 minuto
  checkoutReminderDelay: 60000 // 1 minuto = 60000ms
});

/**
 * Configurazioni predefinite per diversi tipi di pagina
 */
export const tabConfigs = {
  checkout: getCheckoutTabConfig(),
  
  // Altre configurazioni che potrebbero essere utili in futuro
  payment: {
    originalTitle: "Payment - Crypto Checkout",
    hiddenTitle: "Completa il pagamento! - Crypto",
    enableBlinking: true,
    blinkInterval: 1000,
    checkoutReminderTitle: "Finalizza il pagamento",
    checkoutReminderDelay: 45000 // 45 secondi
  },
  
  confirmation: {
    originalTitle: "Payment Confirmation",
    hiddenTitle: "Pagamento completato!",
    enableBlinking: false,
    blinkInterval: 1000,
    checkoutReminderTitle: "Conferma ricevuta",
    checkoutReminderDelay: 30000 // 30 secondi
  }
} as const;

export type TabConfigType = keyof typeof tabConfigs;