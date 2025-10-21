import { useState } from 'react';

interface UseEmailVerificationReturn {
  showVerification: boolean;
  verificationError: boolean;
  verificationCode: string[];
  codeError: string;
  isResending: boolean;
  resendCooldown: number;
  resendSuccess: boolean;
  setShowVerification: (show: boolean) => void;
  setVerificationError: (error: boolean) => void;
  setVerificationCode: (code: string[]) => void;
  sendVerificationCode: (emailAddress: string) => Promise<{ success: boolean }>;
  handleResendCode: (email: string) => Promise<void>;
  validateCode: (code: string[], onSuccess: () => void) => void;
  resetVerificationState: () => void;
}

export const useEmailVerification = (): UseEmailVerificationReturn => {
  const [showVerification, setShowVerification] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [codeError, setCodeError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Funzione per simulare l'invio dell'email con il codice
  const sendVerificationCode = async (emailAddress: string) => {
    console.log(`Simulazione invio email a: ${emailAddress}`);
    console.log('Codice di verifica: 000000');
    // Qui andrà la logica vera per l'invio dell'email
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  // Funzione per il resend del codice
  const handleResendCode = async (email: string) => {
    setIsResending(true);
    setCodeError('');
    setResendSuccess(false);
    
    try {
      await sendVerificationCode(email);
      setResendCooldown(30); // 30 secondi di cooldown
      setResendSuccess(true);
      
      // Nascondi il messaggio di successo dopo 3 secondi
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
      
      // Countdown del cooldown
      const countdown = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      setCodeError('Errore nell\'invio del codice. Riprova.');
    } finally {
      setIsResending(false);
    }
  };

  // Funzione per validare il codice
  const validateCode = (code: string[], onSuccess?: () => void) => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      if (fullCode === '000000') {
        setCodeError('');
        setShowVerification(false);
        setVerificationError(false);
        if (onSuccess) {
          onSuccess();
        }
        return true;
      } else {
        setCodeError('Codice non valido. Riprova.');
        setVerificationError(false); // Non usare verificationError per evitare doppie notifiche
        return false;
      }
    }
    return false;
  };

  const resetVerificationState = () => {
    setShowVerification(false);
    setVerificationError(false);
    setVerificationCode(['', '', '', '', '', '']);
    setCodeError('');
    setIsResending(false);
    setResendCooldown(0);
    setResendSuccess(false);
  };

  return {
    showVerification,
    verificationError,
    verificationCode,
    codeError,
    isResending,
    resendCooldown,
    resendSuccess,
    setShowVerification,
    setVerificationError,
    setVerificationCode,
    sendVerificationCode,
    handleResendCode,
    validateCode,
    resetVerificationState
  };
};