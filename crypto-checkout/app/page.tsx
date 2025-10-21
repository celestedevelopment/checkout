'use client';

import Image from "next/image";
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
  return (
    <div className="flex flex-col md:flex-row h-screen">
        {/* Sezione sinistra (top su mobile) - Store Info */}
        <div className="w-full md:w-1/2 h-1/3 md:h-full p-8 flex flex-col justify-between" style={{backgroundColor: '#FCFAF8'}}>
          {/* Logo e nome store in alto */}
          <div className="flex items-center gap-3">
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

          {/* Powered by Acctual in basso */}
          <div className="flex items-center justify-between">
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
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={140}
              height={30}
              priority
            />
            <ol className="font-mono list-inside list-decimal text-xs md:text-sm/6 text-center sm:text-left">
              <li className="mb-2 tracking-[-.01em]">
                Get started by editing{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded text-xs md:text-sm">
                  app/page.tsx
                </code>
                .
              </li>
              <li className="tracking-[-.01em]">
                Save and see your changes instantly.
              </li>
            </ol>

            <div className="flex gap-2 md:gap-4 items-center flex-col sm:flex-row">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-xs md:text-sm lg:text-base h-8 md:h-10 lg:h-12 px-3 md:px-4 lg:px-5 w-full sm:w-auto"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Deploy now
              </a>
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-xs md:text-sm lg:text-base h-8 md:h-10 lg:h-12 px-3 md:px-4 lg:px-5 w-full sm:w-auto"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read our docs
              </a>
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

            {/* Adding more content to demonstrate scrolling */}
            <div className="space-y-4 md:space-y-8 mt-8 md:mt-16">
              <div className="p-4 md:p-6 border rounded-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Section 1</h2>
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4">
                  This is additional content to demonstrate the scrollable nature of the right side.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div className="p-4 md:p-6 border rounded-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Section 2</h2>
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4">
                  More content to make the right side scrollable. Excepteur sint occaecat 
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              <div className="p-4 md:p-6 border rounded-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Section 3</h2>
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4">
                  Even more content to ensure scrolling functionality. Nemo enim ipsam voluptatem 
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni 
                  dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
                  dolore magnam aliquam quaerat voluptatem.
                </p>
              </div>

              {/* Desktop responsive note */}
              <div className="hidden md:block bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <h3 className="text-base font-semibold text-green-800 mb-3">🖥️ Desktop Layout</h3>
                <p className="text-sm text-green-700">
                  Su desktop il layout è a due colonne: lato sinistro fisso (grigio, 50% larghezza) 
                  e lato destro scrollabile (bianco, 50% larghezza).
                </p>
              </div>
            </div>

            <footer className="flex gap-[12px] md:gap-[24px] flex-wrap items-center justify-center mt-8 md:mt-16 pb-4 md:pb-8">
              <a
                className="flex items-center gap-1 md:gap-2 hover:underline hover:underline-offset-4 text-xs md:text-sm"
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={12}
                  height={12}
                  className="md:w-[16px] md:h-[16px]"
                />
                Learn
              </a>
              <a
                className="flex items-center gap-1 md:gap-2 hover:underline hover:underline-offset-4 text-xs md:text-sm"
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/window.svg"
                  alt="Window icon"
                  width={12}
                  height={12}
                  className="md:w-[16px] md:h-[16px]"
                />
                Examples
              </a>
              <a
                className="flex items-center gap-1 md:gap-2 hover:underline hover:underline-offset-4 text-xs md:text-sm"
                href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/globe.svg"
                  alt="Globe icon"
                  width={12}
                  height={12}
                  className="md:w-[16px] md:h-[16px]"
                />
                Go to nextjs.org →
              </a>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
