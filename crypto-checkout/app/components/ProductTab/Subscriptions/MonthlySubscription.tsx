'use client';

interface MonthlySubscriptionProps {
  isSelected: boolean;
  onSelect: () => void;
}

export default function MonthlySubscription({ isSelected, onSelect }: MonthlySubscriptionProps) {
  return (
    <div 
      className={`mt-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-gray-50 border-black' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-black' : 'bg-gray-300'
        }`}>
          {isSelected && (
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
  );
}