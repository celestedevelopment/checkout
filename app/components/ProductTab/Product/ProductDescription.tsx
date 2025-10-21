import { useState } from 'react';
import { useT } from '../../../hooks/useTranslation';

interface ProductDescriptionProps {
  variant?: 'default' | 'popup';
  className?: string;
}

export default function ProductDescription({ variant = 'default', className = '' }: ProductDescriptionProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const t = useT();
  
  const isPopup = variant === 'popup';
  
  // Testi della descrizione
  const shortDescription = "You're one step away from building a creative business you love...";
  const fullDescription = "You're one step away from building a creative business you love. Next up: Create a portfolio you adore, attract dream clients, and get off the revenue rollercoaster.";
  const popupDescription = "Creative business building course with portfolio creation and client attraction strategies.";
  
  // Configurazione stili basata sulla variante
  const textClass = isPopup 
    ? 'text-xs text-gray-600 mt-1 select-none' 
    : 'text-sm text-gray-600 mb-3 select-none';

  // Se è popup, mostra solo la descrizione breve senza pulsante
  if (isPopup) {
    return (
      <div className={className}>
        <p className={textClass}>
          {popupDescription}
        </p>
      </div>
    );
  }

  // Versione normale con espansione
  return (
    <div className={className}>
      <p className={textClass}>
        {isDescriptionExpanded ? fullDescription : shortDescription}
      </p>
      <button 
        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        className="text-black hover:text-gray-800 text-sm font-medium bg-transparent border-none cursor-pointer"
      >
        {isDescriptionExpanded ? t('seeLess', 'See less') : t('seeMore', 'See more')}
      </button>
    </div>
  );
}