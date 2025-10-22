'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { img: 'w-6 h-6', text: 'text-lg' },
  md: { img: 'w-8 h-8', text: 'text-xl' },
  lg: { img: 'w-12 h-12', text: 'text-2xl' }
};

export default function Logo({ 
  size = 'md', 
  showText = true, 
  className = '' 
}: LogoProps) {
  const { img: imgClass, text: textClass } = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${imgClass} flex items-center justify-center`}>
        <img 
          src="/Header/LogoBoomFI.png" 
          alt="BoomFi Logo" 
          className={`${imgClass} object-contain select-none`}
        />
      </div>
      {showText && (
        <span className={`${textClass} font-bold text-gray-900 select-none`}>
          BoomFi
        </span>
      )}
    </div>
  );
}