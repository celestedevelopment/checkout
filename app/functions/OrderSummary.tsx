'use client';

import StoreHeader from "../components/Header/StoreHeader";
import ProductTitle from "../components/ProductTab/Product/ProductTitle";
import ProductDescription from "../components/ProductTab/Product/ProductDescription";
import FooterDefault from "../components/Footer/FooterDefault";

interface OrderSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: 'monthly' | 'yearly';
}

export default function OrderSummary({ isOpen, onClose, selectedPlan }: OrderSummaryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop - only on the left side */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 md:w-1/2"
        onClick={onClose}
      ></div>
      
      {/* Popup Content - slides from left to right */}
      <div 
        className="absolute left-0 top-0 w-full md:w-1/2 h-full overflow-y-auto"
        style={{backgroundColor: '#F7F9FA'}}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Order Summary Content */}
        <div className="p-6">
          {/* Logo e nome store in alto - stesso della sezione principale */}
          <StoreHeader size="small" className="mb-6" />

          <h2 className="text-xl font-bold text-gray-900 mb-4 select-none">Order Summary</h2>

          {/* Product Details */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Product</h3>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <ProductTitle variant="popup" />
              <ProductDescription variant="popup" />
            </div>
          </div>

          {/* Subscription Details */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Subscription</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 select-none">Plan</span>
                <span className="text-sm font-medium text-gray-900 select-none">
                  {selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 select-none">Price</span>
                <span className="text-sm font-medium text-gray-900 select-none">
                  {selectedPlan === 'monthly' ? '$99/month' : '$999/year'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 select-none">Billing Cycle</span>
                <span className="text-sm font-medium text-gray-900 select-none">
                  {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'}
                </span>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 select-none">Savings</span>
                  <span className="text-sm font-medium text-green-600 select-none">15% off</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 select-none">Subtotal</span>
                <span className="text-sm font-medium text-gray-900 select-none">
                  {selectedPlan === 'monthly' ? '$99.00' : '$999.00'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 select-none">Tax</span>
                <span className="text-sm font-medium text-gray-900 select-none">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 select-none">Discount</span>
                <span className="text-sm font-medium text-gray-900 select-none">$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900 select-none">Total</span>
                <span className="text-base font-bold text-gray-900 select-none">
                  {selectedPlan === 'monthly' ? '$99.00 USD' : '$999.00 USD'}
                </span>
              </div>
            </div>
          </div>

          {/* Next Payment */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3 select-none">Next Payment</h3>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700 select-none">Next billing date</span>
                <span className="text-sm font-medium text-blue-900 select-none">
                  {selectedPlan === 'monthly' ? 'Nov 21, 2025' : 'Nov 21, 2026'}
                </span>
              </div>
              <p className="text-xs text-blue-600 mt-1 select-none">
                You will be charged {selectedPlan === 'monthly' ? '$99.00' : '$999.00'} on this date.
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="text-xs text-gray-500 mb-4 select-none">
            <p className="mb-1">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
            <p>
              You can cancel your subscription at any time from your account settings.
            </p>
          </div>

          {/* Footer - powered by Acctual and links */}
          <FooterDefault variant="popup" />
        </div>
      </div>
    </div>
  );
}