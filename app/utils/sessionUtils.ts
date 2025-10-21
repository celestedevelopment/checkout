export interface UserSession {
  email: string;
  customerName: string;
  expiry: number;
}

export const SESSION_DURATION = 30 * 60 * 1000; // 30 minuti in millisecondi
export const SESSION_STORAGE_KEY = 'userSession';

export const saveSession = (email: string, customerName: string): number => {
  const expiryTime = new Date().getTime() + SESSION_DURATION;
  
  const sessionData: UserSession = {
    email,
    customerName,
    expiry: expiryTime
  };
  
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  return expiryTime;
};

export const loadSession = (): UserSession | null => {
  try {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!savedSession) return null;
    
    const sessionData: UserSession = JSON.parse(savedSession);
    const now = new Date().getTime();
    
    // Controlla se la sessione è ancora valida
    if (sessionData.expiry && now < sessionData.expiry) {
      return sessionData;
    } else {
      // Sessione scaduta, rimuovi dal localStorage
      clearSession();
      return null;
    }
  } catch (error) {
    console.error('Errore nel caricamento della sessione:', error);
    clearSession();
    return null;
  }
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

export const isSessionValid = (expiry: number | null): boolean => {
  if (!expiry) return false;
  return new Date().getTime() < expiry;
};