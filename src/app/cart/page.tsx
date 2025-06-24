'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 50 ? 0 : 4.99; // Free shipping over $50
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  const handleProceedToCheckout = () => {
    setIsProcessing(true);
    // TODO: Integrate with payment system
    setTimeout(() => {
      alert('Checkout integration coming soon! This will connect to Stripe or similar payment processor.');
      setIsProcessing(false);
    }, 1000);
  };

  const handleContinueShopping = () => {
    window.location.href = '/#books';
  };

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-sm text-gray-600">
            {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 9H4m3 4v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 21h6"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover Anna Lea's inspiring Christian books</p>
            <Button onClick={handleContinueShopping} variant="primary" size="large">
              Browse Books
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg">
                {/* Cart Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-6 flex items-start gap-4"
                    >
                      {/* Book Image */}
                      <div
                        className="w-20 h-28 bg-gray-200 rounded flex-shrink-0"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-blue-600 hover:text-blue-800 cursor-pointer mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">by {item.author}</p>
                        <p className="text-sm text-green-600 mb-2">In Stock</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Delete
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-blue-600 hover:text-blue-800 hover:underline">
                            Save for later
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-12 text-center text-lg font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[80px]">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Button onClick={handleContinueShopping} variant="outline" size="large">
                  ← Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    {shipping === 0 && (
                      <p className="text-sm text-green-600">🎉 Free shipping on orders over $50!</p>
                    )}
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={handleProceedToCheckout}
                    variant="primary"
                    size="large"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>

                  {/* Security Notice */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      🔒 Secure checkout with SSL encryption
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">We accept:</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium text-gray-600">
                        VISA
                      </div>
                      <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium text-gray-600">
                        MASTERCARD
                      </div>
                      <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium text-gray-600">
                        PAYPAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}