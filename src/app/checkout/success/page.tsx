'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface OrderData {
  paymentIntentId?: string;
  orderId?: string;
  amount: number;
  email: string;
  status: string;
  timestamp: string;
  items?: Array<{
    id: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  customer?: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  totals?: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get order data from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        const order = JSON.parse(lastOrder);
        setOrderData(order);
        // Clear the order data after displaying
        localStorage.removeItem('lastOrder');
      } catch (error) {
        console.error('Error parsing order data:', error);
        router.push('/');
      }
    } else {
      // No order data, redirect to home
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handleContinueShopping = () => {
    router.push('/#books');
  };

  const handleViewOrderHistory = () => {
    // This would typically navigate to an order history page
    alert('Order history functionality coming soon!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Order not found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-6">
        {/* Success Header */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 mb-4">
            Thank you for your purchase{orderData.customer?.firstName ? `, ${orderData.customer.firstName}` : ''}!
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-mono font-semibold text-gray-900">
              {orderData.orderId || orderData.paymentIntentId?.substring(0, 16).toUpperCase() || 'N/A'}
            </p>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            A confirmation email has been sent to {orderData.customer?.email || orderData.email}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
          
          {/* Items */}
          {orderData.items && orderData.items.length > 0 && (
            <div className="space-y-4 mb-6">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div
                    className="w-16 h-20 bg-gray-200 rounded flex-shrink-0"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">by {item.author}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4">
            {orderData.totals && (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${orderData.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span>
                    {orderData.totals.shipping === 0 ? 'FREE' : `$${orderData.totals.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-600">Tax:</span>
                  <span>${orderData.totals.tax.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
              <span>Total Paid:</span>
              <span>${(orderData.totals?.total || orderData.amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        {orderData.customer && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
            <div className="text-gray-700">
              <p className="font-medium">
                {orderData.customer.firstName} {orderData.customer.lastName}
              </p>
              <p>{orderData.customer.address}</p>
              <p>
                {orderData.customer.city}, {orderData.customer.state} {orderData.customer.zipCode}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Estimated delivery: 5-7 business days
              </p>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h2>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>You'll receive a shipping confirmation email with tracking information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Your books will be carefully packaged and shipped within 1-2 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Need help? Contact our support team at support@annalea.com</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleContinueShopping}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleViewOrderHistory}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
          >
            View Order History
          </button>
        </div>

        {/* Order Date */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Order placed on {new Date(orderData.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}