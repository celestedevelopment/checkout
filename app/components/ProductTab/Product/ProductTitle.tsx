import { JSX } from "react/jsx-runtime";

interface ProductTitleProps {
  variant?: 'default' | 'popup';
  className?: string;
}

export default function ProductTitle({ variant = 'default', className = '' }: ProductTitleProps) {
  const isPopup = variant === 'popup';
  
  // Configurazione stili basata sulla variante
  const titleTag = isPopup ? 'h4' : 'h2';
  const titleClass = isPopup 
    ? 'text-sm font-medium text-gray-900 select-none' 
    : 'text-2xl font-bold text-gray-900 mb-4 select-none';

  const TitleComponent = titleTag as keyof JSX.IntrinsicElements;

  return (
    <TitleComponent className={`${titleClass} ${className}`}>
      Maker Division
    </TitleComponent>
  );
}
