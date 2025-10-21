'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTabVisibility } from "./hooks/useTabVisibility";
import StoreHeader from "./components/Header/StoreHeader";
import FooterDefault from "./components/Footer/FooterDefault";
import ProductTitle from "./components/ProductTab/Product/ProductTitle";
import ProductDescription from "./components/ProductTab/Product/ProductDescription";
import MonthlySubscription from "./components/ProductTab/Subscriptions/MonthlySubscription";
import YearlySubscription from "./components/ProductTab/Subscriptions/YearlySubscription";
import TotalSection from "./components/ProductTab/FooterProduct/TotalSection";
import OrderSummary from "./components/PopupSlider/OrderSummary";
import YourAccountTitle from "./components/ClientAccount/YourAccountTitle";
import EmailInput from "./components/ClientAccount/EmailInput";
import VerificationCode from "./components/ClientAccount/VerificationCode";
import UserProfile from "./components/ClientAccount/UserProfile";

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
  
  // Stati per la selezione wallet
  const [selectedWallet, setSelectedWallet] = useState('BTC');
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);

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
  const sendVerificationCode = async (emailAddress: string) => {
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
  const validateCode = (code: string[]) => {
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
          <StoreHeader className="mb-8" />

          {/* Product Description Section - Desktop Only */}
          <div className="hidden md:block flex-1 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md shadow-lg">
              <ProductTitle className="mb-4" />
              <ProductDescription className="mb-4" />
              
              {/* Subscription Plans */}
              <MonthlySubscription 
                isSelected={selectedPlan === 'monthly'}
                onSelect={() => setSelectedPlan('monthly')}
              />
              
              <YearlySubscription 
                isSelected={selectedPlan === 'yearly'}
                onSelect={() => setSelectedPlan('yearly')}
              />

              {/* Total Section */}
              <TotalSection 
                selectedPlan={selectedPlan as 'monthly' | 'yearly'}
                onShowOrderDetails={() => setShowOrderDetails(true)}
              />
            </div>
          </div>

          {/* Powered by Acctual in basso */}
          <FooterDefault />
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
                <YourAccountTitle />
                
                {!isEmailVerified ? (
                  !showVerification ? (
                    <EmailInput 
                      email={email}
                      onEmailChange={setEmail}
                      sendVerificationCode={sendVerificationCode}
                      onVerificationStart={() => setShowVerification(true)}
                    />
                  ) : (
                    <VerificationCode
                      email={email}
                      verificationCode={verificationCode}
                      onCodeChange={setVerificationCode}
                      onBackToEmail={() => setShowVerification(false)}
                      onResendCode={handleResendCode}
                      verificationError={verificationError}
                      codeError={codeError}
                      resendCooldown={resendCooldown}
                      isResending={isResending}
                      resendSuccess={resendSuccess}
                      validateCode={validateCode}
                    />
                  )
                ) : (
                  <UserProfile
                    customerName={customerName}
                    email={email}
                    onSignOut={() => {
                      setIsEmailVerified(false);
                      setShowVerification(false);
                      setEmail('');
                      setVerificationCode(['', '', '', '', '', '']);
                      setSessionExpiry(null);
                      localStorage.removeItem('emailSession');
                    }}
                  />
                )}
                
                {/* Payment Method Box - Always visible but conditionally interactive */}
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment method</h3>
                  </div>
                  
                  {/* Wallet Selection Dropdown */}
                  <div className="relative">
                    <div 
                      className={`p-3 border border-gray-200 rounded-lg transition-colors cursor-pointer ${
                        isEmailVerified 
                          ? 'hover:bg-gray-50' 
                          : 'bg-gray-100 cursor-not-allowed opacity-60'
                      }`}
                      onClick={() => isEmailVerified && setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Dynamic Icon based on selected wallet */}
                          <img 
                            src={
                              selectedWallet === 'BTC' ? "/CryptoIcon/Bitcoin/Bitcoin.png" : 
                              selectedWallet === 'USDT-TRC20' ? "/CryptoIcon/USDT/USDT_Logo.png" :
                              selectedWallet === 'TRX' ? "/CryptoIcon/Other/12114250.png" :
                              "/CryptoIcon/USDC/Circle_USDC_Logo.png"
                            }
                            alt={
                              selectedWallet === 'BTC' ? "Bitcoin" : 
                              selectedWallet === 'USDT-TRC20' ? "USDT Tron" :
                              selectedWallet === 'TRX' ? "TRX Tron" :
                              "USDC Ethereum"
                            }
                            className="w-6 h-6"
                          />
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>
                              {
                                selectedWallet === 'BTC' ? 'Bitcoin' : 
                                selectedWallet === 'USDT-TRC20' ? 'USDT' :
                                selectedWallet === 'TRX' ? 'TRX' :
                                'USDC'
                              }
                            </span>
                            <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>
                              {
                                selectedWallet === 'BTC' ? 'BTC' : 
                                selectedWallet === 'USDT-TRC20' ? 'Tron' :
                                selectedWallet === 'TRX' ? 'Tron' :
                                'Ethereum'
                              }
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Dropdown Arrow */}
                          <svg 
                            width="15" 
                            height="15" 
                            viewBox="0 0 15 15" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className={`ml-2 h-4 w-4 shrink-0 text-black transition-transform duration-200 ${isWalletDropdownOpen ? 'rotate-180' : ''}`}
                          >
                            <path 
                              d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" 
                              fill="currentColor" 
                              fillRule="evenodd" 
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dropdown Menu */}
                     {isWalletDropdownOpen && isEmailVerified && (
                       <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                         {/* Bitcoin Option */}
                         <div 
                           className={`p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg select-none ${selectedWallet === 'BTC' ? 'bg-gray-100 m-2 rounded-lg' : ''}`}
                           onClick={() => {
                             setSelectedWallet('BTC');
                             setIsWalletDropdownOpen(false);
                           }}
                         >
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                               <img 
                                src="/CryptoIcon/Bitcoin/Bitcoin.png" 
                                alt="Bitcoin" 
                                className="w-6 h-6"
                              />
                               <div className="flex items-center gap-1">
                                 <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>Bitcoin</span>
                                 <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>BTC</span>
                               </div>
                             </div>
                             {selectedWallet === 'BTC' && (
                               <svg 
                                 width="16" 
                                 height="16" 
                                 viewBox="0 0 24 24" 
                                 fill="none" 
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-black"
                               >
                                 <path 
                                   d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                                   fill="currentColor"
                                 />
                               </svg>
                             )}
                           </div>
                         </div>
                         
                         {/* USDT Tron Option */}
                         <div 
                           className={`p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg select-none ${selectedWallet === 'USDT-TRC20' ? 'bg-gray-100 m-2 rounded-lg' : ''}`}
                           onClick={() => {
                             setSelectedWallet('USDT-TRC20');
                             setIsWalletDropdownOpen(false);
                           }}
                         >
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                               <img 
                                src="/CryptoIcon/USDT/USDT_Logo.png" 
                                alt="USDT Tron" 
                                className="w-6 h-6"
                              />
                               <div className="flex items-center gap-1">
                                 <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>USDT</span>
                                 <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>Tron</span>
                               </div>
                             </div>
                             {selectedWallet === 'USDT-TRC20' && (
                               <svg 
                                 width="16" 
                                 height="16" 
                                 viewBox="0 0 24 24" 
                                 fill="none" 
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-black"
                               >
                                 <path 
                                   d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                                   fill="currentColor"
                                 />
                               </svg>
                             )}
                           </div>
                         </div>
                         
                         {/* TRX Tron Option */}
                         <div 
                           className={`p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg select-none ${selectedWallet === 'TRX' ? 'bg-gray-100 m-2 rounded-lg' : ''}`}
                           onClick={() => {
                             setSelectedWallet('TRX');
                             setIsWalletDropdownOpen(false);
                           }}
                         >
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                               <img 
                                src="/CryptoIcon/Other/12114250.png" 
                                alt="TRX Tron" 
                                className="w-6 h-6"
                              />
                               <div className="flex items-center gap-1">
                                 <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>TRX</span>
                                 <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>Tron</span>
                               </div>
                             </div>
                             {selectedWallet === 'TRX' && (
                               <svg 
                                 width="16" 
                                 height="16" 
                                 viewBox="0 0 24 24" 
                                 fill="none" 
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-black"
                               >
                                 <path 
                                   d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                                   fill="currentColor"
                                 />
                               </svg>
                             )}
                           </div>
                         </div>
                         
                         {/* USDC Ethereum Option */}
                         <div 
                           className={`p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg select-none ${selectedWallet === 'USDC-ETH' ? 'bg-gray-100 m-2 rounded-lg' : ''}`}
                           onClick={() => {
                             setSelectedWallet('USDC-ETH');
                             setIsWalletDropdownOpen(false);
                           }}
                         >
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                               <img 
                                src="/CryptoIcon/USDC/Circle_USDC_Logo.png" 
                                alt="USDC Ethereum" 
                                className="w-6 h-6"
                              />
                               <div className="flex items-center gap-1">
                                 <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>USDC</span>
                                 <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>Ethereum</span>
                               </div>
                             </div>
                             {selectedWallet === 'USDC-ETH' && (
                               <svg 
                                 width="16" 
                                 height="16" 
                                 viewBox="0 0 24 24" 
                                 fill="none" 
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-black"
                               >
                                 <path 
                                   d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                                   fill="currentColor"
                                 />
                               </svg>
                             )}
                           </div>
                         </div>
                       </div>
                     )}
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

          </main>
        </div>
      </div>

      {/* Order Summary Popup */}
      <OrderSummary 
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        selectedPlan={selectedPlan as 'monthly' | 'yearly'}
      />
    </div>
  );
}
