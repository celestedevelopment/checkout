'use client';

import { useT } from '@/app/hooks/useTranslation';

interface YourAccountTitleProps {
  className?: string;
}

export default function YourAccountTitle({ className = "" }: YourAccountTitleProps) {
  const t = useT();
  
  return (
    <h2 className={`text-2xl font-bold text-gray-900 mb-6 select-none ${className}`}>
      {t('yourAccount', 'Your account')}
    </h2>
  );
}