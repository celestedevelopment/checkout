import { SESSION_CONFIG } from '@/app/constants/config/session';

export interface UserSession {
  email: string;
  expiry: number;
}

// Salva la sessione utente nel localStorage
export const saveUserSession = (email: string): void => {
  const expiryTime = new Date().getTime() + SESSION_CONFIG.DURATION;
  
  const sessionData: UserSession = {
    email,
    expiry: expiryTime,
  };

  localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
  // return expiryTime; // removed to match void return type
};

export const loadSession = (): UserSession | null => {
  try {
    const savedSession = localStorage.getItem(SESSION_CONFIG.STORAGE_KEY);
    if (!savedSession) return null;
    
    const sessionData: UserSession = JSON.parse(savedSession);
    const now = new Date().getTime();
    
    // Controlla se la sessione è ancora valida
    if (sessionData.expiry && now < sessionData.expiry) {
      return sessionData;
    } else {
      // Sessione scaduta, rimuovi dal localStorage
      clearUserSession();
      return null;
    }
  } catch (error) {
    console.error('Errore nel caricamento della sessione:', error);
    clearUserSession();
    return null;
  }
};

// Rimuove la sessione utente dal localStorage
export const clearUserSession = (): void => {
  localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
};

export const isSessionValid = (expiry: number | null): boolean => {
  if (!expiry) return false;
  return new Date().getTime() < expiry;
};