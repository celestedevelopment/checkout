'use client';

import Image from "next/image";
import { useTabVisibility } from "./hooks/useTabVisibility";
import { useUserSession } from "./hooks/useUserSession";
import { useEmailVerification } from "./hooks/useEmailVerification";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { usePlanSelection } from "./hooks/usePlanSelection";
import { getCheckoutTabConfig } from "./functions/tabVisibilityConfig";
import { createSignOutHandler } from "./functions/authHandlers";
import WalletDropdown from "./components/Payment/WalletDropdown";
import StoreHeader from "./components/Header/StoreHeader";
import FooterDefault from "./components/Footer/FooterDefault";
import ProductTitle from "./components/ProductTab/Product/ProductTitle";
import ProductDescription from "./components/ProductTab/Product/ProductDescription";
import MonthlySubscription from "./components/ProductTab/Subscriptions/MonthlySubscription";
import YearlySubscription from "./components/ProductTab/Subscriptions/YearlySubscription";
import TotalSection from "./components/ProductTab/FooterProduct/TotalSection";
import OrderSummary from "./functions/OrderSummary";
import YourAccountTitle from "./components/ClientAccount/YourAccountTitle";
import EmailInput from "./components/ClientAccount/EmailInput";
import VerificationCode from "./components/ClientAccount/VerificationCode";
import UserProfile from "./components/ClientAccount/UserProfile";

export default function Home() {
  // Implementa l'effetto "Attention Grabber" per attirare l'utente quando cambia tab e il reminder del checkout dopo 1 minuto quando è sulla pagina
  const { isVisible, isBlinking, showCheckoutReminder } = useTabVisibility(getCheckoutTabConfig());
  
  // Hook personalizzati per gestire sessione e verifica email
  const { 
    isEmailVerified, 
    email, 
    customerName, 
    sessionExpiry,
    setEmail,
    setCustomerName,
    createSession,
    clearSession 
  } = useUserSession();

  const {
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
    handleResendCode,
    validateCode,
    sendVerificationCode,
    resetVerificationState
  } = useEmailVerification();
  
  // Hook per gestire la selezione del piano e il popup OrderSummary
  const {
    selectedPlan,
    showOrderDetails,
    setSelectedPlan,
    handleShowOrderDetails,
    handleCloseOrderDetails
  } = usePlanSelection();

  // Hook per bloccare lo scroll del body quando il popup è aperto
  useBodyScrollLock(showOrderDetails);

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
                onShowOrderDetails={handleShowOrderDetails}
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
                    onSignOut={createSignOutHandler(clearSession, resetVerificationState)}
                  />
                )}
                
                {/* Payment Method Box - Always visible but conditionally interactive */}
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment method</h3>
                  </div>
                  
                  {/* Wallet Selection Dropdown */}
                  <WalletDropdown isEmailVerified={isEmailVerified} />
                  
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
        onClose={handleCloseOrderDetails}
        selectedPlan={selectedPlan as 'monthly' | 'yearly'}
      />
    </div>
  );
}
