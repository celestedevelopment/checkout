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
        <div className="p-4 md:p-8">
          <main className="flex flex-col gap-[16px] md:gap-[32px] items-center sm:items-start">
            
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

            {/* Desktop Content - Empty for now, product description is on the left */}
            <div className="hidden md:block w-full">
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout Area</h2>
                <p className="text-gray-600">
                  This area can be used for payment methods, checkout forms, or other content.
                </p>
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
