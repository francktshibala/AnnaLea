'use client';

import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useCart } from '@/contexts/CartContext';

interface CheckoutFormProps {
  clientSecret: string;
  customerEmail: string;
  totalAmount: number;
}

export default function CheckoutForm({ 
  clientSecret, 
  customerEmail, 
  totalAmount 
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError('Stripe not loaded. Please refresh the page and try again.');
      return;
    }

    if (!customerEmail) {
      setPaymentError('Please enter your email address.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          receipt_email: customerEmail,
        },
        redirect: 'if_required',
      });

      if (error) {
        // Handle payment errors
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setPaymentError(error.message || 'Your card was declined.');
        } else {
          setPaymentError('An unexpected error occurred. Please try again.');
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        setPaymentSuccess(true);
        
        // Store order information for success page
        const orderData = {
          paymentIntentId: paymentIntent.id,
          amount: totalAmount,
          email: customerEmail,
          status: 'completed',
          timestamp: new Date().toISOString(),
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Clear cart
        clearCart();
        
        // Redirect to success page
        setTimeout(() => {
          window.location.href = '/checkout/success';
        }, 2000);
      }
    } catch (err) {
      console.error('Payment confirmation error:', err);
      setPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">Thank you for your order. You will be redirected shortly...</p>
        <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Element - Stripe's unified payment form */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <PaymentElement 
            options={{
              layout: 'tabs',
              defaultValues: {
                billingDetails: {
                  email: customerEmail,
                }
              }
            }}
          />
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Billing Address
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <AddressElement 
            options={{
              mode: 'billing',
              defaultValues: {
                name: '',
                address: {
                  line1: '',
                  line2: '',
                  city: '',
                  state: '',
                  postal_code: '',
                  country: 'US',
                }
              }
            }}
          />
        </div>
      </div>

      {/* Error Display */}
      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800 text-sm">{paymentError}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Complete Order - ${totalAmount.toFixed(2)}
          </>
        )}
      </button>

      {/* Security & Trust Indicators */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Stripe Secure</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Your payment information is processed securely by Stripe. We don't store your card details.
        </p>
      </div>
    </form>
  );
}