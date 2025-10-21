import { useState, useEffect } from 'react';

interface UserSession {
  email: string;
  customerName: string;
  expiry: number;
}

interface UseUserSessionReturn {
  isEmailVerified: boolean;
  email: string;
  customerName: string;
  sessionExpiry: number | null;
  setEmail: (email: string) => void;
  setCustomerName: (name: string) => void;
  createSession: (email: string, customerName: string) => void;
  clearSession: () => void;
}

export const useUserSession = (): UseUserSessionReturn => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [customerName, setCustomerName] = useState('Mattia Vizzi');
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);

  // Carica i dati della sessione dal localStorage al mount del componente
  useEffect(() => {
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      const sessionData: UserSession = JSON.parse(savedSession);
      const now = new Date().getTime();
      
      // Controlla se la sessione è ancora valida
      if (sessionData.expiry && now < sessionData.expiry) {
        setIsEmailVerified(true);
        setEmail(sessionData.email || '');
        setCustomerName(sessionData.customerName || 'Mattia Vizzi');
        setSessionExpiry(sessionData.expiry);
      } else {
        // Sessione scaduta, rimuovi dal localStorage
        localStorage.removeItem('userSession');
      }
    }
  }, []);

  // Gestione del timer di sessione
  useEffect(() => {
    if (sessionExpiry) {
      const checkSession = () => {
        const now = new Date().getTime();
        if (now >= sessionExpiry) {
          // Sessione scaduta, effettua logout
          clearSession();
        }
      };

      // Controlla ogni minuto
      const interval = setInterval(checkSession, 60000);
      
      // Controlla immediatamente
      checkSession();

      return () => clearInterval(interval);
    }
  }, [sessionExpiry]);

  const createSession = (userEmail: string, userName: string) => {
    setIsEmailVerified(true);
    setEmail(userEmail);
    setCustomerName(userName);
    
    // Imposta la scadenza della sessione a 30 minuti da ora
    const expiryTime = new Date().getTime() + (30 * 60 * 1000);
    setSessionExpiry(expiryTime);
    
    // Salva la sessione nel localStorage
    const sessionData: UserSession = {
      email: userEmail,
      customerName: userName,
      expiry: expiryTime
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
  };

  const clearSession = () => {
    setIsEmailVerified(false);
    setSessionExpiry(null);
    setEmail('');
    setCustomerName('Mattia Vizzi');
    localStorage.removeItem('userSession');
  };

  return {
    isEmailVerified,
    email,
    customerName,
    sessionExpiry,
    setEmail,
    setCustomerName,
    createSession,
    clearSession
  };
};