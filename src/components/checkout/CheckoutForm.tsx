'use client';

import React, { useState } from 'react';
import {
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from '@/contexts/CartContext';

interface CheckoutFormProps {
  clientSecret: string;
  customerEmail: string;
  totalAmount: number;
}

export default function CheckoutForm({ 
  customerEmail, 
  totalAmount 
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart, cartItems, getTotalPrice } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!customerEmail) {
      setPaymentError('Please enter your email address.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    // Check if we're in demo mode (client secret starts with 'demo_')
    const isDemo = window.location.hostname.includes('localhost') || true; // Enable demo for now

    if (isDemo) {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setPaymentSuccess(true);
      
      // Generate demo order ID
      const orderNumber = `ORDER-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      
      // Calculate totals
      const subtotal = getTotalPrice();
      const shipping = subtotal > 50 ? 0 : 4.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;
      
      // Store complete demo order information for success page
      const orderData = {
        paymentIntentId: 'demo_pi_' + Date.now(),
        orderId: orderNumber,
        amount: totalAmount,
        email: customerEmail,
        status: 'completed',
        timestamp: new Date().toISOString(),
        demoMode: true,
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          author: item.author,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        customer: {
          email: customerEmail,
          firstName: 'Demo',
          lastName: 'Customer',
          address: '123 Demo Street',
          city: 'Demo City',
          state: 'CA',
          zipCode: '90210',
        },
        totals: {
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total,
        },
      };
      
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      clearCart();
      
      // Redirect to success page
      setTimeout(() => {
        window.location.href = '/checkout/success';
      }, 2000);
      
      setIsProcessing(false);
      return;
    }

    if (!stripe || !elements) {
      setPaymentError('Stripe not loaded. Please refresh the page and try again.');
      setIsProcessing(false);
      return;
    }

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
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Demo Mode Notice - Enhanced */}
      <div style={{
        backgroundColor: 'var(--color-warm-cream)',
        border: `2px solid var(--color-warm-sage)`,
        borderRadius: '12px',
        padding: 'var(--space-4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: 'var(--color-warm-sage)', marginRight: 'var(--space-2)' }}>
            ℹ️
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body-refined)',
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--color-warm-navy)',
              marginBottom: 'var(--space-1)'
            }}>
              Demo Mode Active
            </h4>
            <p style={{
              fontFamily: 'var(--font-body-refined)',
              fontSize: '14px',
              color: 'var(--color-neutral-600)'
            }}>
              This is a demonstration of the checkout process. No real payment will be processed.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Payment Method - Enhanced */}
      <div>
        <label style={{
          display: 'block',
          fontFamily: 'var(--font-body-refined)',
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--color-warm-navy)',
          marginBottom: 'var(--space-4)'
        }}>
          Payment Method
        </label>
        <div style={{
          border: `2px solid var(--color-warm-beige)`,
          borderRadius: '12px',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-warm-cream)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-warm-navy)',
                marginBottom: 'var(--space-2)'
              }}>
                Card Number
              </label>
              <div style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid var(--color-warm-beige)`,
                borderRadius: '8px',
                backgroundColor: 'var(--color-warm-cream)',
                color: 'var(--color-neutral-600)',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '16px'
              }}>
                4242 4242 4242 4242 (Demo)
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Expiry Date
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid var(--color-warm-beige)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-warm-cream)',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px'
                }}>
                  12/34
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Security Code
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid var(--color-warm-beige)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-warm-cream)',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px'
                }}>
                  123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Billing Address - Enhanced */}
      <div>
        <label style={{
          display: 'block',
          fontFamily: 'var(--font-body-refined)',
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--color-warm-navy)',
          marginBottom: 'var(--space-4)'
        }}>
          Billing Address
        </label>
        <div style={{
          border: `2px solid var(--color-warm-beige)`,
          borderRadius: '12px',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-warm-cream)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-warm-navy)',
                marginBottom: 'var(--space-2)'
              }}>
                Full Name
              </label>
              <div style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid var(--color-warm-beige)`,
                borderRadius: '8px',
                backgroundColor: 'var(--color-warm-cream)',
                color: 'var(--color-neutral-600)',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '16px'
              }}>
                Demo Customer
              </div>
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-warm-navy)',
                marginBottom: 'var(--space-2)'
              }}>
                Street Address
              </label>
              <div style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid var(--color-warm-beige)`,
                borderRadius: '8px',
                backgroundColor: 'var(--color-warm-cream)',
                color: 'var(--color-neutral-600)',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '16px'
              }}>
                123 Demo Street
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-2)'
                }}>
                  City
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid var(--color-warm-beige)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-warm-cream)',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px'
                }}>
                  Demo City
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-2)'
                }}>
                  State
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid var(--color-warm-beige)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-warm-cream)',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px'
                }}>
                  CA
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ZIP Code
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid var(--color-warm-beige)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-warm-cream)',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px'
                }}>
                  90210
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display - Enhanced */}
      {paymentError && (
        <div style={{
          backgroundColor: 'var(--color-warm-cream)',
          border: `2px solid #dc2626`,
          borderRadius: '12px',
          padding: 'var(--space-4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ color: '#dc2626', marginRight: 'var(--space-2)' }}>
              ⚠️
            </div>
            <p style={{
              fontFamily: 'var(--font-body-refined)',
              fontSize: '14px',
              color: '#dc2626',
              fontWeight: '600'
            }}>
              {paymentError}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button - Enhanced */}
      <button
        type="submit"
        disabled={isProcessing}
        style={{
          width: '100%',
          padding: '16px 24px',
          background: isProcessing 
            ? 'var(--color-neutral-400)' 
            : 'linear-gradient(135deg, var(--color-warm-sage), var(--color-warm-navy))',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: '600',
          fontFamily: 'var(--font-body-refined)',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          boxShadow: isProcessing ? 'none' : '0 4px 16px rgba(156, 169, 134, 0.3)'
        }}
        onMouseEnter={(e) => {
          if (!isProcessing) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(156, 169, 134, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isProcessing) {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(156, 169, 134, 0.3)';
          }
        }}
      >
        {isProcessing ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid white',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Processing Payment...
          </>
        ) : (
          <>
            <span>🔒</span>
            Complete Order - ${totalAmount.toFixed(2)}
          </>
        )}
      </button>

      {/* Security & Trust Indicators - Enhanced */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-3)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-1)',
            fontSize: '12px',
            color: 'var(--color-warm-sage)',
            fontFamily: 'var(--font-body-refined)',
            fontWeight: '600'
          }}>
            <span>🔒</span>
            <span>SSL Encrypted</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-1)',
            fontSize: '12px',
            color: 'var(--color-warm-sage)',
            fontFamily: 'var(--font-body-refined)',
            fontWeight: '600'
          }}>
            <span>✅</span>
            <span>Stripe Secure</span>
          </div>
        </div>
        <p style={{
          fontFamily: 'var(--font-body-refined)',
          fontSize: '12px',
          color: 'var(--color-neutral-600)',
          lineHeight: 'var(--leading-relaxed)'
        }}>
          Your payment information is processed securely by Stripe. We don't store your card details.
        </p>
      </div>
      
      {/* Debug: Payment form styling Step 2 complete */}
      </form>
    </>
  );
}