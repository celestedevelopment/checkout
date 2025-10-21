'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTabVisibility } from "./hooks/useTabVisibility";

export default function Home() {
  // Implementa l'effetto "Attention Grabber" per attirare l'utente quando cambia tab
  // E il reminder del checkout dopo 1 minuto quando è sulla pagina
  const { isVisible, isBlinking, showCheckoutReminder } = useTabVisibility({
    originalTitle: "Checkout - Pay With Crypto",
    hiddenTitle: "Non perdere l'offerta! - Crypto Checkout",
    enableBlinking: true, // Abilitato effetto lampeggiante quando non è sulla tab
    blinkInterval: 800, // Lampeggia più velocemente (0.8 secondi)
    checkoutReminderTitle: "Termina il checkout", // Titolo dopo 1 minuto
    checkoutReminderDelay: 60000 // 1 minuto = 60000ms
  });
  
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' or 'yearly'
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Stati per la verifica email
  const [email, setEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [customerName, setCustomerName] = useState('Mattia Vizzi'); // Nome del cliente
  const [sessionExpiry, setSessionExpiry] = useState(null); // Tempo di scadenza della sessione
  
  // Stati per gestione codice e errori
  const [codeError, setCodeError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Carica i dati della sessione dal localStorage al mount del componente
  useEffect(() => {
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
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

  // Versioni della descrizione del prodotto
  const shortDescription = "You're one step away from building a creative business you love...";
  const fullDescription = "You're one step away from building a creative business you love. Next up: Create a portfolio you adore, attract dream clients, and get off the revenue rollercoaster.";

  // Blocca lo scroll del body quando il popup è aperto
  useEffect(() => {
    if (showOrderDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quando il componente viene smontato
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOrderDetails]);

  // Gestione del timer di sessione
  useEffect(() => {
    if (sessionExpiry) {
      const checkSession = () => {
        const now = new Date().getTime();
        if (now >= sessionExpiry) {
          // Sessione scaduta, effettua logout
          setIsEmailVerified(false);
          setSessionExpiry(null);
          setEmail('');
          setShowVerification(false);
          setVerificationError(false);
          setVerificationCode(['', '', '', '', '', '']);
          // Rimuovi la sessione dal localStorage
          localStorage.removeItem('userSession');
        }
      };

      // Controlla ogni minuto
      const interval = setInterval(checkSession, 60000);
      
      // Controlla immediatamente
      checkSession();

      return () => clearInterval(interval);
    }
  }, [sessionExpiry]);

  // Funzione per simulare l'invio dell'email con il codice
  const sendVerificationCode = async (emailAddress) => {
    console.log(`Simulazione invio email a: ${emailAddress}`);
    console.log('Codice di verifica: 000000');
    // Qui andrà la logica vera per l'invio dell'email
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  // Funzione per il resend del codice
  const handleResendCode = async () => {
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
  const validateCode = (code) => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      if (fullCode === '000000') {
        setCodeError('');
        setIsEmailVerified(true);
        setShowVerification(false);
        setVerificationError(false);
        // Imposta la scadenza della sessione a 30 minuti da ora
        const expiryTime = new Date().getTime() + (30 * 60 * 1000);
        setSessionExpiry(expiryTime);
        
        // Salva la sessione nel localStorage
        const sessionData = {
          email: email,
          customerName: customerName,
          expiry: expiryTime
        };
        localStorage.setItem('userSession', JSON.stringify(sessionData));
      } else {
        setCodeError('Codice non valido. Riprova.');
        setVerificationError(false); // Non usare verificationError per evitare doppie notifiche
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
        {/* Sezione sinistra (top su mobile) - Store Info */}
        <div className="w-full md:w-1/2 h-1/3 md:h-full p-8 flex flex-col" style={{backgroundColor: '#F7F9FA'}}>
          {/* Logo e nome store in alto */}
          <div className="flex items-center gap-3 mb-8">
            <a 
              href="https://example-store.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src="/favicon.png"
                alt="Store Logo"
                width={32}
                height={32}
                className="rounded cursor-pointer hover:opacity-80 transition-opacity"
              />
            </a>
            <h1 className="text-black text-xl font-bold select-none">Nome store</h1>
          </div>

          {/* Product Description Section - Desktop Only */}
          <div className="hidden md:block flex-1 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 select-none">Maker Division</h2>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed select-none">
                {isDescriptionExpanded ? fullDescription : shortDescription}
              </p>
              <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-black hover:text-gray-800 text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                {isDescriptionExpanded ? 'See less' : 'See more'}
              </button>
              
              {/* Price Section - Monthly Plan */}
                <div 
                  className={`mt-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedPlan === 'monthly' 
                      ? 'bg-gray-50 border-black' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      selectedPlan === 'monthly' ? 'bg-black' : 'bg-gray-300'
                    }`}>
                      {selectedPlan === 'monthly' && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-gray-900">$99</span>
                      <span className="text-gray-600 text-sm ml-1">/month</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Monthly subscription</p>
                </div>

                {/* Price Section - Yearly Plan */}
                <div 
                  className={`mt-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedPlan === 'yearly' 
                      ? 'bg-gray-50 border-black' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('yearly')}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      selectedPlan === 'yearly' ? 'bg-black' : 'bg-gray-300'
                    }`}>
                      {selectedPlan === 'yearly' && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-gray-900">$999</span>
                      <span className="text-gray-600 text-sm ml-1">/year</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Yearly subscription</p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Save 15%</span>
                  </div>
                </div>



              {/* Total Section */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium select-none">Total due today</span>
                    <span className="text-xl font-bold text-gray-900 select-none">
                      {selectedPlan === 'monthly' ? '$99 USD' : '$999 USD'}
                    </span>
                  </div>
                  <a 
                    href="#" 
                    className="text-black hover:text-gray-800 text-sm flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowOrderDetails(true);
                    }}
                  >
                    View order details
                    <span className="text-xs">→</span>
                  </a>
                  <p className="text-gray-500 text-xs mt-2 select-none">
                    Next payment: {selectedPlan === 'monthly' ? 'Nov 21, 2025' : 'Nov 21, 2026'}
                  </p>
                </div>
            </div>
          </div>

          {/* Powered by Acctual in basso */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-black text-sm font-normal select-none">powered by</span>
              <a 
                href="https://acctual.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Image
                  src="/acctual.com logo.svg"
                  alt="Acctual Logo"
                  width={80}
                  height={24}
                  className="h-6 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            <div className="flex gap-4 text-black text-sm font-normal">
              <a 
                href="https://t.me/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer"
              >
                Telegram
              </a>
              <a 
                href="mailto:info@azienda.com"
                className="hover:underline cursor-pointer"
              >
                Contact
              </a>
              <a 
                href="https://example-store.com/shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer"
              >
                Store
              </a>
            </div>
          </div>
        </div>

      {/* Right side - Scrollable, white background (Desktop) / Bottom section (Mobile) */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full bg-white overflow-y-auto">
        <div className="p-4 md:p-8 md:flex md:flex-col md:justify-start md:pt-16">
          <main className="flex flex-col gap-[16px] md:gap-[32px] items-start">
            
            {/* Mobile Content - Keep existing content for mobile */}
            <div className="md:hidden w-full">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={140}
                height={30}
                priority
              />
              <ol className="font-mono list-inside list-decimal text-xs text-center mt-4">
                <li className="mb-2 tracking-[-.01em]">
                  Get started by editing{" "}
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded text-xs">
                    app/page.tsx
                  </code>
                  .
                </li>
                <li className="tracking-[-.01em]">
                  Save and see your changes instantly.
                </li>
              </ol>
            </div>

            {/* Desktop Content - Your account section */}
            <div className="hidden md:block w-full max-w-md">
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 select-none">Your account</h2>
                
                {!isEmailVerified ? (
                  !showVerification ? (
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 select-none">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          // Controlla automaticamente se l'email è valida con un dominio completo
                          const emailValue = e.target.value;
                          const emailRegex = /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu|gov|co|uk|de|fr|es|ca|au|jp|br|in|ru|cn|mx|nl|se|no|dk|fi|pl|cz|hu|ro|bg|hr|si|sk|lt|lv|ee|ie|pt|gr|tr|il|za|eg|ma|ng|ke|gh|tz|ug|zw|bw|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|st|gw|gn|sl|lr|ci|gh|tg|bj|sn|gm|cv|bi|rw|ug|ke|tz|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|st|gw|gn|sl|lr|ci|gh|tg|bj|sn|gm|cv|bi|rw)$/i;
                          
                          if (emailRegex.test(emailValue)) {
                            setTimeout(async () => {
                              await sendVerificationCode(emailValue);
                              setShowVerification(true);
                            }, 800); // Delay leggermente più lungo per permettere di completare la digitazione
                          }
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu|gov|co|uk|de|fr|es|ca|au|jp|br|in|ru|cn|mx|nl|se|no|dk|fi|pl|cz|hu|ro|bg|hr|si|sk|lt|lv|ee|ie|pt|gr|tr|il|za|eg|ma|ng|ke|gh|tz|ug|zw|bw|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|st|gw|gn|sl|lr|ci|gh|tg|bj|sn|gm|cv|bi|rw)$/i;
                            if (emailRegex.test(email)) {
                              sendVerificationCode(email);
                              setShowVerification(true);
                            }
                          }
                        }}
                        onBlur={() => {
                          // Anche quando l'utente esce dal campo, controlla se l'email è valida
                          const emailRegex = /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu|gov|co|uk|de|fr|es|ca|au|jp|br|in|ru|cn|mx|nl|se|no|dk|fi|pl|cz|hu|ro|bg|hr|si|sk|lt|lv|ee|ie|pt|gr|tr|il|za|eg|ma|ng|ke|gh|tz|ug|zw|bw|mw|zm|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|st|gw|gn|sl|lr|ci|gh|tg|bj|sn|gm|cv|bi|rw)$/i;
                          if (emailRegex.test(email)) {
                            setShowVerification(true);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
                        placeholder=""
                      />
                    </div>
                  ) : (
                  <div className="transition-all duration-300 ease-in-out">
                    <div className="mb-3 py-2 px-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{email}</span>
                        <button 
                          onClick={() => {
                            setShowVerification(false);
                            setVerificationCode(['', '', '', '', '', '']);
                          }}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="text-base font-medium text-gray-900 mb-2">Enter your verification code</h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Enter the code sent to <span className="font-medium text-gray-900">{email}</span> to securely authenticate your account.
                      </p>
                      
                      <div className="flex gap-2 mb-3">
                        {verificationCode.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const newCode = [...verificationCode];
                              newCode[index] = e.target.value;
                              setVerificationCode(newCode);
                              
                              // Reset error when user starts typing
                              if (verificationError || codeError) {
                                setVerificationError(false);
                                setCodeError('');
                              }
                              
                              // Auto-focus next input
                              if (e.target.value && index < 5) {
                                const nextInput = document.getElementById(`code-${index + 1}`);
                                nextInput?.focus();
                              }
                              
                              // Check if code is complete and validate
                              validateCode(newCode);
                            }}
                            onKeyDown={(e) => {
                              // Handle backspace
                              if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                                const prevInput = document.getElementById(`code-${index - 1}`);
                                prevInput?.focus();
                              }
                            }}
                            id={`code-${index}`}
                            className={`w-10 h-10 text-center text-base font-medium border rounded-md focus:outline-none focus:ring-2 text-black ${
                              verificationError || codeError
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Notifica di errore unificata */}
                      {(verificationError || codeError) && (
                        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
                          <div className="flex items-center gap-2">
                            <span className="text-red-500 text-sm">⚠</span>
                            <span className="text-red-700 text-xs font-medium">
                              {codeError || 'Verification code was invalid'}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Notifica di successo per resend code */}
                      {resendSuccess && (
                        <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-md">
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 text-sm">✓</span>
                            <span className="text-green-700 text-xs font-medium">Verification code has been resent to your email.</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-600 mb-2">
                        Didn't receive code? 
                        <button 
                          onClick={handleResendCode}
                          disabled={resendCooldown > 0 || isResending}
                          className={`ml-1 ${
                            resendCooldown > 0 || isResending 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-blue-600 hover:underline'
                          }`}
                        >
                          {isResending 
                            ? 'Sending...' 
                            : resendCooldown > 0 
                              ? `Resend code (${resendCooldown}s)` 
                              : 'Resend code'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                  )
                ) : (
                   <div className="mb-4">
                     {/* Profilo utente verificato */}
                     <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                       {/* Avatar con iniziali */}
                       <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                         <span className="text-white font-semibold text-lg">
                           {customerName.split(' ').map(name => name.charAt(0)).join('')}
                         </span>
                       </div>
                       
                       {/* Informazioni utente */}
                       <div className="flex-1">
                         <h3 className="text-base font-semibold text-gray-900 select-none">{customerName}</h3>
                         <p className="text-sm text-gray-600 select-none">{email}</p>
                       </div>
                       
                       {/* Pulsante Sign out */}
                       <button 
                         onClick={() => {
                           setIsEmailVerified(false);
                           setShowVerification(false);
                           setEmail('');
                           setVerificationCode(['', '', '', '', '', '']);
                           setSessionExpiry(null); // Reset della sessione
                           // Rimuovi la sessione dal localStorage
                           localStorage.removeItem('userSession');
                         }}
                         className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                       >
                         Sign out
                       </button>
                     </div>
                   </div>
                )}
                
                {/* Payment Method Box - Always visible but conditionally interactive */}
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                  </div>
                  
                  {/* Wallet Transfer Option */}
                  <div className={`p-3 border border-gray-200 rounded-lg transition-colors ${
                    isEmailVerified 
                      ? 'hover:bg-gray-50 cursor-pointer' 
                      : 'bg-gray-100 cursor-not-allowed opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L13.09 8.26L19 7L17.74 13.26L24 12L17.74 10.74L19 17L13.09 15.74L12 22L10.91 15.74L5 17L6.26 10.74L0 12L6.26 13.26L5 7L10.91 8.26L12 2Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">Wallet Transfer</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Crypto icons */}
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₿</span>
                        </div>
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Ξ</span>
                        </div>
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message when not verified */}
                  {!isEmailVerified && (
                    <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 text-sm">ℹ</span>
                        <span className="text-blue-700 text-xs font-medium">Complete email verification to enable payment options</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Indicatore visivo per l'effetto Attention Grabber */}
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              !isVisible 
                ? 'bg-orange-100 border-orange-400 text-orange-800' 
                : showCheckoutReminder
                ? 'bg-red-100 border-red-400 text-red-800'
                : 'bg-green-100 border-green-400 text-green-800'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  !isVisible 
                    ? 'bg-orange-500' 
                    : showCheckoutReminder
                    ? 'bg-red-500 animate-pulse'
                    : 'bg-green-500'
                }`}></div>
                <span className="font-semibold">
                  {!isVisible 
                    ? `🔔 Attention Grabber attivo${isBlinking ? ' - LAMPEGGIANTE' : ''}` 
                    : showCheckoutReminder
                    ? '⏰ Reminder Checkout attivo - TERMINA IL CHECKOUT!'
                    : '✅ Utente sulla pagina - Timer checkout attivo'
                  }
                </span>
              </div>
              <p className="text-sm mt-2 opacity-75">
                {!isVisible 
                  ? 'Il titolo della tab sta lampeggiando per attirare l\'attenzione' 
                  : showCheckoutReminder
                  ? 'È passato 1 minuto - Il titolo mostra il reminder del checkout'
                  : 'Dopo 1 minuto di permanenza apparirà il reminder del checkout'
                }
              </p>
            </div>

            {/* Mobile responsive note */}
            <div className="md:hidden bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">📱 Mobile Layout</h3>
              <p className="text-xs text-blue-700">
                Su mobile il layout è a colonna singola: sezione grigia in alto (1/3 altezza) 
                e contenuto scrollabile in basso (2/3 altezza).
              </p>
            </div>

            {/* Desktop responsive note */}
            <div className="hidden md:block bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
              <h3 className="text-base font-semibold text-green-800 mb-3">🖥️ Desktop Layout con Product Description</h3>
              <p className="text-sm text-green-700">
                Su desktop la descrizione del prodotto "Maker Division" è ora nella sezione sinistra 
                sotto il logo e nome store. La sezione destra può contenere form di checkout o altri contenuti.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Order Details Popup */}
      {showOrderDetails && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop - only on the left side */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 md:w-1/2"
            onClick={() => setShowOrderDetails(false)}
          ></div>
          
          {/* Popup Content - slides from left to right */}
          <div 
            className="absolute left-0 top-0 w-full md:w-1/2 h-full overflow-y-auto"
            style={{backgroundColor: '#F7F9FA'}}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowOrderDetails(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Order Summary Content */}
            <div className="p-6">
              {/* Logo e nome store in alto - stesso della sezione principale */}
              <div className="flex items-center gap-2 mb-6">
                <a 
                  href="https://example-store.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src="/favicon.png"
                    alt="Store Logo"
                    width={24}
                    height={24}
                    className="rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </a>
                <h1 className="text-black text-lg font-bold select-none">Nome store</h1>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4 select-none">Order Summary</h2>

              {/* Product Details */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Product</h3>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 select-none">Maker Division</h4>
                  <p className="text-xs text-gray-600 mt-1 select-none">
                    Creative business building course with portfolio creation and client attraction strategies.
                  </p>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Subscription</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 select-none">Plan</span>
                    <span className="text-sm font-medium text-gray-900 select-none">
                      {selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 select-none">Price</span>
                    <span className="text-sm font-medium text-gray-900 select-none">
                      {selectedPlan === 'monthly' ? '$99/month' : '$999/year'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 select-none">Billing Cycle</span>
                    <span className="text-sm font-medium text-gray-900 select-none">
                      {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'}
                    </span>
                  </div>
                  {selectedPlan === 'yearly' && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 select-none">Savings</span>
                      <span className="text-sm font-medium text-green-600 select-none">15% off</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 select-none">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900 select-none">
                      {selectedPlan === 'monthly' ? '$99.00' : '$999.00'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 select-none">Tax</span>
                    <span className="text-sm font-medium text-gray-900 select-none">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 select-none">Discount</span>
                    <span className="text-sm font-medium text-gray-900 select-none">$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900 select-none">Total</span>
                    <span className="text-base font-bold text-gray-900 select-none">
                      {selectedPlan === 'monthly' ? '$99.00 USD' : '$999.00 USD'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Payment */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Next Payment</h3>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700 select-none">Next billing date</span>
                    <span className="text-sm font-medium text-blue-900 select-none">
                      {selectedPlan === 'monthly' ? 'Nov 21, 2025' : 'Nov 21, 2026'}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1 select-none">
                    You will be charged {selectedPlan === 'monthly' ? '$99.00' : '$999.00'} on this date.
                  </p>
                </div>
              </div>

              {/* Terms */}
              <div className="text-xs text-gray-500 mb-4 select-none">
                <p className="mb-1">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
                <p>
                  You can cancel your subscription at any time from your account settings.
                </p>
              </div>

              {/* Footer - powered by Acctual and links */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-black text-xs font-normal select-none">powered by</span>
                  <a 
                    href="https://acctual.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/acctual.com logo.svg"
                      alt="Acctual Logo"
                      width={60}
                      height={18}
                      className="h-4 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
                <div className="flex gap-3 text-black text-xs font-normal">
                  <a 
                    href="https://t.me/example" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline cursor-pointer"
                  >
                    Telegram
                  </a>
                  <a 
                    href="mailto:info@azienda.com"
                    className="hover:underline cursor-pointer"
                  >
                    Contact
                  </a>
                  <a 
                    href="https://example-store.com/shop" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline cursor-pointer"
                  >
                    Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
