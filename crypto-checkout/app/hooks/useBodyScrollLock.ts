'use client';

import { useEffect } from 'react';

/**
 * Custom hook per gestire il blocco dello scroll del body
 * Utile quando si aprono popup, modal o overlay che richiedono di bloccare lo scroll della pagina
 * 
 * @param isLocked - Booleano che indica se lo scroll deve essere bloccato
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Salva il valore corrente dello scroll per ripristinarlo successivamente
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      // Blocca lo scroll
      document.body.style.overflow = 'hidden';
      
      // Cleanup: ripristina lo scroll quando il componente viene smontato o isLocked diventa false
      return () => {
        document.body.style.overflow = originalStyle;
      };
    } else {
      // Se non è bloccato, assicurati che lo scroll sia abilitato
      document.body.style.overflow = 'unset';
    }
  }, [isLocked]);

  // Cleanup generale quando il componente viene smontato
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
}