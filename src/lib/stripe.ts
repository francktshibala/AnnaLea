import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Server-side Stripe instance
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

// Helper function to format currency amounts for Stripe
// Stripe expects amounts in the smallest currency unit (cents for USD)
export const formatAmountForStripe = (amount: number, currency: string = 'usd'): number => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = false;
  
  // Check if currency has zero decimal places (like JPY, KRW)
  const fractionPart = parts.find(part => part.type === 'fraction');
  if (!fractionPart || currency.toLowerCase() === 'jpy' || currency.toLowerCase() === 'krw') {
    zeroDecimalCurrency = true;
  }
  
  return zeroDecimalCurrency ? Math.round(amount) : Math.round(amount * 100);
};

// Helper function to format amounts from Stripe back to display format
export const formatAmountFromStripe = (amount: number, currency: string = 'usd'): number => {
  const zeroDecimalCurrency = currency.toLowerCase() === 'jpy' || currency.toLowerCase() === 'krw';
  return zeroDecimalCurrency ? amount : amount / 100;
};

// Configuration constants
export const STRIPE_CONFIG = {
  currency: 'usd',
  paymentMethodTypes: ['card'] as const,
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'test',
} as const;