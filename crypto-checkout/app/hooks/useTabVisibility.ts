'use client';

import { useState, useEffect } from 'react';

export interface UseTabVisibilityOptions {
  originalTitle: string;
  hiddenTitle: string;
  enableBlinking?: boolean;
  blinkInterval?: number;
  checkoutReminderTitle?: string;
  checkoutReminderDelay?: number;
}

export function useTabVisibility({
  originalTitle,
  hiddenTitle,
  enableBlinking = false,
  blinkInterval = 1000,
  checkoutReminderTitle = "Termina il checkout",
  checkoutReminderDelay = 60000 // 1 minuto
}: UseTabVisibilityOptions) {
  const [isVisible, setIsVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showCheckoutReminder, setShowCheckoutReminder] = useState(false);

  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    let checkoutTimer: NodeJS.Timeout;
    let titleState = true;

    // Timer per il reminder del checkout quando l'utente è sulla pagina
    const startCheckoutTimer = () => {
      checkoutTimer = setTimeout(() => {
        if (isVisible) {
          setShowCheckoutReminder(true);
          document.title = checkoutReminderTitle;
        }
      }, checkoutReminderDelay);
    };

    const resetCheckoutTimer = () => {
      if (checkoutTimer) {
        clearTimeout(checkoutTimer);
      }
      setShowCheckoutReminder(false);
      startCheckoutTimer();
    };

    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);

      if (visible) {
        // Tab è diventato visibile - cambio immediato
        if (showCheckoutReminder) {
          document.title = checkoutReminderTitle;
        } else {
          document.title = originalTitle;
        }
        setIsBlinking(false);
        if (blinkTimer) {
          clearInterval(blinkTimer);
        }
        // Riavvia il timer del checkout quando torna sulla pagina
        resetCheckoutTimer();
      } else {
        // Tab è diventato nascosto - ferma il timer del checkout
        if (checkoutTimer) {
          clearTimeout(checkoutTimer);
        }
        setShowCheckoutReminder(false);
        
        // Tab è diventato nascosto - cambio immediato
        document.title = hiddenTitle;
        
        if (enableBlinking) {
          setIsBlinking(true);
          // Inizia il lampeggiamento dopo il primo cambio
          blinkTimer = setInterval(() => {
            titleState = !titleState;
            document.title = titleState ? hiddenTitle : originalTitle;
          }, blinkInterval);
        }
      }
    };

    // Fallback per browser più vecchi - cambio immediato
    const handleWindowBlur = () => {
      setIsVisible(false);
      if (checkoutTimer) {
        clearTimeout(checkoutTimer);
      }
      setShowCheckoutReminder(false);
      
      document.title = hiddenTitle;
      
      if (enableBlinking) {
        setIsBlinking(true);
        blinkTimer = setInterval(() => {
          titleState = !titleState;
          document.title = titleState ? hiddenTitle : originalTitle;
        }, blinkInterval);
      }
    };

    const handleWindowFocus = () => {
      setIsVisible(true);
      if (showCheckoutReminder) {
        document.title = checkoutReminderTitle;
      } else {
        document.title = originalTitle;
      }
      setIsBlinking(false);
      if (blinkTimer) {
        clearInterval(blinkTimer);
      }
      // Riavvia il timer del checkout quando torna sulla pagina
      resetCheckoutTimer();
    };

    // Event listeners principali
    if (typeof document !== 'undefined') {
      // Imposta il titolo iniziale
      document.title = originalTitle;

      // Usa visibilitychange se supportato
      if ('hidden' in document) {
        document.addEventListener('visibilitychange', handleVisibilityChange);
      }

      // Fallback con blur/focus
      window.addEventListener('blur', handleWindowBlur);
      window.addEventListener('focus', handleWindowFocus);
    }

    // Avvia il timer del checkout all'inizio
    startCheckoutTimer();

    // Cleanup
    return () => {
      if (blinkTimer) {
        clearInterval(blinkTimer);
      }
      if (checkoutTimer) {
        clearTimeout(checkoutTimer);
      }
      
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleWindowBlur);
        window.removeEventListener('focus', handleWindowFocus);
        
        // Ripristina il titolo originale
        document.title = originalTitle;
      }
    };
  }, [originalTitle, hiddenTitle, blinkInterval, enableBlinking, checkoutReminderTitle, checkoutReminderDelay, isVisible, showCheckoutReminder]);

  return {
    isVisible,
    isBlinking,
    showCheckoutReminder,
    setTitle: (title: string) => {
      if (typeof document !== 'undefined') {
        document.title = title;
      }
    }
  };
};