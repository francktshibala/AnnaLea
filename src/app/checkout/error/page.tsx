'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutErrorPage() {
  const router = useRouter();
  const { cartItems, getTotalItems } = useCart();
  const [savedCart, setSavedCart] = useState<any[]>([]);

  useEffect(() => {
    // Try to recover cart data if it was lost
    const cartBackup = localStorage.getItem('anna-lea-cart-backup');
    if (cartBackup && cartItems.length === 0) {
      try {
        setSavedCart(JSON.parse(cartBackup));
      } catch (error) {
        console.error('Error parsing cart backup:', error);
      }
    } else {
      setSavedCart(cartItems);
    }
  }, [cartItems]);

  const handleReturnToCart = () => {
    // If we have a saved cart and current cart is empty, restore it
    if (savedCart.length > 0 && cartItems.length === 0) {
      localStorage.setItem('anna-lea-cart', JSON.stringify(savedCart));
      // Force a page reload to restore cart state
      window.location.href = '/cart';
    } else {
      router.push('/cart');
    }
  };

  const handleTryAgain = () => {
    // Backup current cart before trying checkout again
    if (cartItems.length > 0) {
      localStorage.setItem('anna-lea-cart-backup', JSON.stringify(cartItems));
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/#books');
  };

  const totalItems = savedCart.length > 0 ? savedCart.reduce((sum, item) => sum + item.quantity, 0) : getTotalItems();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Error Header */}
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          
          <p className="text-gray-600 mb-6">
            We're sorry, but there was an issue processing your payment. 
            Don't worry - your cart has been saved.
          </p>

          {/* Cart Recovery Notice */}
          {totalItems > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Cart Saved</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Your {totalItems} item{totalItems !== 1 ? 's' : ''} {totalItems !== 1 ? 'are' : 'is'} still in your cart and ready for checkout.
              </p>
            </div>
          )}
        </div>

        {/* Common Issues */}
        <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Common Issues & Solutions</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-gray-600">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Card Information</h3>
                <p className="text-sm text-gray-600">Double-check your card number, expiration date, and CVV code.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-gray-600">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Billing Address</h3>
                <p className="text-sm text-gray-600">Ensure your billing address matches your card's registered address.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-gray-600">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Insufficient Funds</h3>
                <p className="text-sm text-gray-600">Make sure you have sufficient balance or credit available.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-gray-600">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Bank Security</h3>
                <p className="text-sm text-gray-600">Your bank may have blocked the transaction for security. Contact them if needed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-50 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you continue to experience issues, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">support@annalea.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">1-800-ANNALEA</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleTryAgain}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Payment Again
          </button>
          <button
            onClick={handleReturnToCart}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
          >
            Return to Cart
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleContinueShopping}
            className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
          >
            Continue Shopping
          </button>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            🔒 Your payment information is secure and was not stored due to the failed transaction.
          </p>
        </div>
      </div>
    </div>
  );
}