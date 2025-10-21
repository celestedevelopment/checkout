'use client';

interface TotalSectionProps {
  selectedPlan: 'monthly' | 'yearly';
  onShowOrderDetails: () => void;
}

export default function TotalSection({ selectedPlan, onShowOrderDetails }: TotalSectionProps) {
  return (
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
          onShowOrderDetails();
        }}
      >
        View order details
        <span className="text-xs">→</span>
      </a>
      <p className="text-gray-500 text-xs mt-2 select-none">
        Next payment: {selectedPlan === 'monthly' ? 'Nov 21, 2025' : 'Nov 21, 2026'}
      </p>
    </div>
  );
}