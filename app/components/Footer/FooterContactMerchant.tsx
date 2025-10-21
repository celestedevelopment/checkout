interface FooterContactMerchantProps {
  variant?: 'default' | 'popup';
  className?: string;
}

export default function FooterContactMerchant({ variant = 'default', className = '' }: FooterContactMerchantProps) {
  const isPopup = variant === 'popup';
  const textSize = isPopup ? 'text-xs' : 'text-sm';
  const gapSize = isPopup ? 'gap-3' : 'gap-4';

  return (
    <div className={`flex ${gapSize} text-black ${textSize} font-normal ${className}`}>
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
  );
}