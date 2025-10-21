import Image from 'next/image';
import dynamic from 'next/dynamic';

const FooterContactMerchant = dynamic(() => import('./FooterContactMerchant'), {
  ssr: false,
  loading: () => null,
});

interface FooterDefaultProps {
  variant?: 'default' | 'popup';
  className?: string;
}

export default function FooterDefault({ variant = 'default', className = '' }: FooterDefaultProps) {
  const isPopup = variant === 'popup';
  const logoWidth = isPopup ? 60 : 80;
  const logoHeight = isPopup ? 18 : 24;
  const logoClass = isPopup ? 'h-4 w-auto' : 'h-6 w-auto';
  const textSize = isPopup ? 'text-xs' : 'text-sm';
  const containerClass = isPopup 
    ? 'flex items-center justify-between mt-4 pt-3 border-t border-gray-200' 
    : 'flex items-center justify-between mt-auto';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="flex items-center gap-2">
        <span className={`text-black ${textSize} font-normal select-none`}>powered by</span>
        <a 
          href="https://acctual.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image
            src="/Footer/acctual.com logo.svg"
            alt="Acctual Logo"
            width={logoWidth}
            height={logoHeight}
            className={`${logoClass} cursor-pointer hover:opacity-80 transition-opacity`}
          />
        </a>
      </div>
      <FooterContactMerchant variant={variant} />
    </div>
  );
}