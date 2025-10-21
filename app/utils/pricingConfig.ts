export interface PricingPlan {
  id: 'monthly' | 'yearly';
  name: string;
  price: number;
  currency: string;
  period: string;
  displayPrice: string;
  fullDisplayPrice: string;
  savings?: {
    percentage: number;
    displayText: string;
  };
  nextBillingDate: string;
}

export interface PricingConfig {
  monthly: PricingPlan;
  yearly: PricingPlan;
}

/**
 * Configurazione centralizzata dei prezzi
 * Modifica questi valori per aggiornare automaticamente tutti i prezzi nell'applicazione
 */
export const pricingConfig: PricingConfig = {
  monthly: {
    id: 'monthly',
    name: 'Monthly subscription',
    price: 99,
    currency: 'USD',
    period: 'month',
    displayPrice: '$99',
    fullDisplayPrice: '$99.00 USD',
    nextBillingDate: 'Nov 21, 2025'
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly subscription',
    price: 999,
    currency: 'USD',
    period: 'year',
    displayPrice: '$189,99',
    fullDisplayPrice: '$999.00 USD',
    savings: {
      percentage: 15,
      displayText: 'Save 15%'
    },
    nextBillingDate: 'Nov 21, 2026'
  }
};

/**
 * Utility functions per lavorare con i prezzi
 */
export const getPlanConfig = (planType: 'monthly' | 'yearly'): PricingPlan => {
  return pricingConfig[planType];
};

export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return `$${price.toFixed(2)} ${currency}`;
};

export const calculateSavings = (monthlyPrice: number, yearlyPrice: number): number => {
  const yearlyEquivalent = monthlyPrice * 12;
  const savings = ((yearlyEquivalent - yearlyPrice) / yearlyEquivalent) * 100;
  return Math.round(savings);
};