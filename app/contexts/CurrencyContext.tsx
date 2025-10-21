'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrencyByCountry, formatCurrency, DEFAULT_CURRENCY } from '../utils/currencyUtils';

// Currency information structure
interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

// Exchange rate information
interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}

interface CurrencyContextType {
  currency: CurrencyInfo;
  baseCurrency: CurrencyInfo; // Usually USD for pricing
  exchangeRate: number;
  isLoading: boolean;
  setCurrency: (currency: CurrencyInfo) => void;
  convertAmount: (amount: number, fromCurrency?: string) => number;
  formatAmount: (amount: number, fromCurrency?: string) => string;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
  initialCurrency?: CurrencyInfo;
  baseCurrency?: CurrencyInfo;
}

export function CurrencyProvider({ 
  children, 
  initialCurrency = DEFAULT_CURRENCY,
  baseCurrency = DEFAULT_CURRENCY 
}: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(initialCurrency);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  // Detect currency based on user's location
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        setIsLoading(true);
        
        // Get user's country from the existing detect-language API
        const response = await fetch('/api/detect-language');
        if (response.ok) {
          const data = await response.json();
          if (data.country) {
            const detectedCurrency = getCurrencyByCountry(data.country);
            setCurrencyState(detectedCurrency);
            
            // Fetch exchange rate if currency is different from base
            if (detectedCurrency.code !== baseCurrency.code) {
              await fetchExchangeRate(baseCurrency.code, detectedCurrency.code);
            }
          }
        }
      } catch (error) {
        console.error('Failed to detect currency:', error);
        // Keep default currency
      } finally {
        setIsLoading(false);
      }
    };

    detectCurrency();
  }, [baseCurrency.code]);

  // Fetch exchange rate between two currencies
  const fetchExchangeRate = async (from: string, to: string) => {
    try {
      const response = await fetch(`/api/currency-rates?from=${from}&to=${to}&amount=1`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setExchangeRate(data.rate);
        }
      }
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      setExchangeRate(1); // Fallback to 1:1 rate
    }
  };

  // Set currency manually and fetch new exchange rate
  const setCurrency = async (newCurrency: CurrencyInfo) => {
    setCurrencyState(newCurrency);
    
    if (newCurrency.code !== baseCurrency.code) {
      setIsLoading(true);
      await fetchExchangeRate(baseCurrency.code, newCurrency.code);
      setIsLoading(false);
    } else {
      setExchangeRate(1);
    }
  };

  // Convert amount from base currency to current currency
  const convertAmount = (amount: number, fromCurrency?: string): number => {
    if (!fromCurrency || fromCurrency === currency.code) {
      return amount;
    }
    
    if (fromCurrency === baseCurrency.code) {
      return amount * exchangeRate;
    }
    
    // For other conversions, we'd need to implement more complex logic
    // For now, assume all prices are in base currency
    return amount * exchangeRate;
  };

  // Format amount in current currency
  const formatAmount = (amount: number, fromCurrency?: string): string => {
    const convertedAmount = convertAmount(amount, fromCurrency);
    return formatCurrency(convertedAmount, currency);
  };

  // Refresh exchange rates
  const refreshRates = async () => {
    if (currency.code !== baseCurrency.code) {
      setIsLoading(true);
      await fetchExchangeRate(baseCurrency.code, currency.code);
      setIsLoading(false);
    }
  };

  const contextValue: CurrencyContextType = {
    currency,
    baseCurrency,
    exchangeRate,
    isLoading,
    setCurrency,
    convertAmount,
    formatAmount,
    refreshRates,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Hook to use currency context
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// HOC to wrap components with currency provider
export function withCurrency<P extends object>(
  Component: React.ComponentType<P>
) {
  return function CurrencyWrappedComponent(props: P) {
    return (
      <CurrencyProvider>
        <Component {...props} />
      </CurrencyProvider>
    );
  };
}

// Export the context for advanced usage
export { CurrencyContext };