'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

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
            <button 
              onClick={handleContinueShopping}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse Books
            </button>
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

                      {/* Price and Quantity */}
                      <div className="text-right flex flex-col items-end gap-3">
                        {/* Price */}
                        <p className="text-lg font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          
                          <span className="px-3 py-1 border-x border-gray-300 text-center min-w-[50px] text-sm">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue shopping
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                
                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Subtotal ({totalItems} items):</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Shipping & handling:</span>
                    <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">Your order qualifies for FREE Shipping</p>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Estimated tax:</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <hr className="my-3" />
                  
                  <div className="flex justify-between text-lg font-bold text-red-700">
                    <span>Order total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleProceedToCheckout}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to checkout'}
                </button>

                {/* Security Notice */}
                <p className="text-xs text-gray-600 text-center mb-4">
                  🔒 Secure transaction
                </p>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-2">We accept:</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">VISA</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">MASTERCARD</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">PAYPAL</span>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}