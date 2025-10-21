'use client';

import { useCurrency as useCurrencyContext } from '../contexts/CurrencyContext';
import { useState, useCallback, useEffect } from 'react';

// Re-export the main hook from context
export { useCurrency } from '../contexts/CurrencyContext';

/**
 * Hook for simple price formatting
 * Usage: const formatPrice = usePriceFormatter();
 */
export function usePriceFormatter() {
  const { formatAmount } = useCurrencyContext();
  
  return useCallback((amount: number, fromCurrency?: string) => {
    return formatAmount(amount, fromCurrency);
  }, [formatAmount]);
}

/**
 * Hook for price conversion with loading state
 * Usage: const { convertedPrice, isLoading } = usePrice(amount);
 */
export function usePrice(amount: number, fromCurrency?: string) {
  const { formatAmount, isLoading } = useCurrencyContext();
  
  const convertedPrice = formatAmount(amount, fromCurrency);
  
  return {
    convertedPrice,
    isLoading
  };
}

/**
 * Hook for currency conversion
 * Usage: const convertPrice = useCurrencyConverter();
 */
export function useCurrencyConverter() {
  const { convertAmount } = useCurrencyContext();
  
  return useCallback((amount: number, fromCurrency?: string) => {
    return convertAmount(amount, fromCurrency);
  }, [convertAmount]);
}

/**
 * Hook for getting current currency info
 * Usage: const { code, symbol, name } = useCurrencyInfo();
 */
export function useCurrencyInfo() {
  const { currency, baseCurrency, exchangeRate, isLoading } = useCurrencyContext();
  
  return {
    currency,
    baseCurrency,
    exchangeRate,
    isLoading,
    code: currency.code,
    symbol: currency.symbol,
    name: currency.name,
  };
}

/**
 * Hook for batch price conversion
 * Useful for converting multiple prices at once
 */
export function useBatchPriceConverter() {
  const { convertAmount, formatAmount } = useCurrencyContext();
  
  const convertPrices = useCallback((prices: number[], fromCurrency?: string) => {
    return prices.map(price => convertAmount(price, fromCurrency));
  }, [convertAmount]);
  
  const formatPrices = useCallback((prices: number[], fromCurrency?: string) => {
    return prices.map(price => formatAmount(price, fromCurrency));
  }, [formatAmount]);
  
  return { convertPrices, formatPrices };
}

/**
 * Hook for real-time currency rate updates
 * Automatically refreshes rates at specified intervals
 */
export function useCurrencyRateUpdater(intervalMs: number = 300000) { // 5 minutes default
  const { refreshRates, exchangeRate, isLoading } = useCurrencyContext();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshRates();
      setLastUpdate(new Date());
    }, intervalMs);
    
    return () => clearInterval(interval);
  }, [refreshRates, intervalMs]);
  
  return {
    exchangeRate,
    isLoading,
    lastUpdate,
    refreshRates,
  };
}

/**
 * Hook for currency selection
 * Provides utilities for changing currency
 */
export function useCurrencySelector() {
  const { currency, setCurrency, isLoading } = useCurrencyContext();
  const [isChanging, setIsChanging] = useState(false);
  
  const changeCurrency = useCallback(async (newCurrency: { code: string; symbol: string; name: string }) => {
    setIsChanging(true);
    try {
      await setCurrency(newCurrency);
    } finally {
      setIsChanging(false);
    }
  }, [setCurrency]);
  
  return {
    currentCurrency: currency,
    changeCurrency,
    isLoading: isLoading || isChanging,
  };
}

/**
 * Hook for price comparison
 * Useful for showing original vs converted prices
 */
export function usePriceComparison() {
  const { convertAmount, formatAmount, baseCurrency, currency } = useCurrencyContext();
  
  const comparePrice = useCallback((amount: number, fromCurrency?: string) => {
    const originalAmount = amount;
    const convertedAmount = convertAmount(amount, fromCurrency);
    
    return {
      original: {
        amount: originalAmount,
        formatted: formatAmount(originalAmount, baseCurrency.code),
        currency: baseCurrency,
      },
      converted: {
        amount: convertedAmount,
        formatted: formatAmount(convertedAmount, currency.code),
        currency: currency,
      },
      isDifferent: baseCurrency.code !== currency.code,
    };
  }, [convertAmount, formatAmount, baseCurrency, currency]);
  
  return { comparePrice };
}

/**
 * Hook for currency-aware form inputs
 * Handles currency input formatting and validation
 */
export function useCurrencyInput(initialValue: number = 0) {
  const { formatAmount, currency } = useCurrencyContext();
  const [value, setValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState(formatAmount(initialValue));
  
  const updateValue = useCallback((newValue: number) => {
    setValue(newValue);
    setDisplayValue(formatAmount(newValue));
  }, [formatAmount]);
  
  const updateDisplayValue = useCallback((newDisplayValue: string) => {
    setDisplayValue(newDisplayValue);
    // Parse the display value back to number
    const numericValue = parseFloat(newDisplayValue.replace(/[^0-9.-]/g, ''));
    if (!isNaN(numericValue)) {
      setValue(numericValue);
    }
  }, []);
  
  return {
    value,
    displayValue,
    currency,
    updateValue,
    updateDisplayValue,
    setValue: updateValue,
    setDisplayValue: updateDisplayValue,
  };
}