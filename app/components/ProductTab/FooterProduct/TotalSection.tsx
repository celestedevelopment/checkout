'use client';

import { getPlanConfig } from '../../../utils/pricingConfig';
import { usePrice } from '../../../hooks/useCurrency';
import { useT } from '../../../hooks/useTranslation';

interface TotalSectionProps {
  selectedPlan: 'monthly' | 'yearly';
  onShowOrderDetails: () => void;
}

export default function TotalSection({ selectedPlan, onShowOrderDetails }: TotalSectionProps) {
  const planConfig = getPlanConfig(selectedPlan);
  const { convertedPrice, isLoading } = usePrice(planConfig.price);
  const t = useT();
  
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-900 font-medium select-none">{t('totalDueToday', 'Total due today')}</span>
        <span className="text-xl font-bold text-gray-900 select-none">
          {isLoading ? planConfig.displayPrice : convertedPrice}
        </span>
      </div>
      <a 
        href="#" 
        className="text-black hover:text-gray-800 text-sm flex items-center gap-1 select-none"
        onClick={(e) => {
          e.preventDefault();
          onShowOrderDetails();
        }}
      >
        {t('viewOrderDetails', 'View order details')}
        <span className="text-xs select-none">→</span>
      </a>
      <div className="text-xs text-gray-500 mt-2 select-none">
        {t('nextPaymentDate', 'Next payment')}: {selectedPlan === 'monthly' ? 'Nov 21, 2025' : 'Nov 21, 2026'}
      </div>
    </div>
  );
}