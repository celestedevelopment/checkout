import { NextRequest, NextResponse } from 'next/server';
import { CURRENCY_API, CURRENCY_CACHE, CURRENCY_DEFAULTS } from '@/app/constants/api/currency';

// Cache for exchange rates (in-memory cache for demo purposes)
let ratesCache: { rates: Record<string, number>; timestamp: number } | null = null;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from') || CURRENCY_DEFAULTS.FROM;
    const to = searchParams.get('to') || CURRENCY_DEFAULTS.TO;
    const amount = parseFloat(searchParams.get('amount') || CURRENCY_DEFAULTS.AMOUNT.toString());

    // Check cache first
    const now = Date.now();
    if (ratesCache && (now - ratesCache.timestamp) < CURRENCY_CACHE.DURATION) {
      const rate = calculateRate(from, to, ratesCache.rates);
      const convertedAmount = amount * rate;
      
      return NextResponse.json({
        success: true,
        from,
        to,
        amount,
        convertedAmount,
        rate,
        timestamp: ratesCache.timestamp
      });
    }

    // Fetch fresh rates
    const response = await fetch(CURRENCY_API.EXCHANGE_API_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    
    // Check if the API response is successful
    if (data.result !== 'success') {
      throw new Error(`ExchangeRate-API error: ${data['error-type'] || 'Unknown error'}`);
    }
    
    // Update cache
    ratesCache = {
      rates: data.conversion_rates,
      timestamp: now
    };

    const rate = calculateRate(from, to, data.conversion_rates);
    const convertedAmount = amount * rate;

    return NextResponse.json({
      success: true,
      from,
      to,
      amount,
      convertedAmount,
      rate,
      timestamp: now
    });

  } catch (error) {
    console.error('Currency conversion error:', error);
    
    // Return fallback rate of 1:1 if API fails
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch exchange rates',
      from: 'USD',
      to: 'USD',
      amount: 1,
      convertedAmount: 1,
      rate: 1,
      timestamp: Date.now()
    }, { status: 500 });
  }
}

/**
 * Calculate exchange rate between two currencies
 */
function calculateRate(from: string, to: string, rates: Record<string, number>): number {
  if (from === to) return 1;
  
  // All rates are relative to USD
  if (from === 'USD') {
    return rates[to] || 1;
  }
  
  if (to === 'USD') {
    return 1 / (rates[from] || 1);
  }
  
  // Convert from -> USD -> to
  const fromToUsd = 1 / (rates[from] || 1);
  const usdToTarget = rates[to] || 1;
  
  return fromToUsd * usdToTarget;
}