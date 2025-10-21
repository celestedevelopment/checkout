/**
 * Funzioni per gestire le operazioni di autenticazione
 */

/**
 * Gestisce il sign out dell'utente
 * Pulisce la sessione utente e resetta lo stato della verifica email
 * 
 * @param clearSession - Funzione per pulire la sessione utente
 * @param resetVerificationState - Funzione per resettare lo stato della verifica email
 */
export function handleSignOut(
  clearSession: () => void,
  resetVerificationState: () => void
) {
  return () => {
    clearSession();
    resetVerificationState();
  };
}

/**
 * Crea un handler per il sign out con le funzioni necessarie già bindato
 * 
 * @param clearSession - Funzione per pulire la sessione utente
 * @param resetVerificationState - Funzione per resettare lo stato della verifica email
 * @returns Funzione handler per il sign out
 */
export function createSignOutHandler(
  clearSession: () => void,
  resetVerificationState: () => void
) {
  return handleSignOut(clearSession, resetVerificationState);
}