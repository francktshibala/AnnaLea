'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/checkout/CheckoutForm';

// Only initialize Stripe if the publishable key is available
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null);

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, getTotalItems } = useCart();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState('');

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      window.location.href = '/cart';
      return;
    }

    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems,
            customerInfo: {
              email: customerEmail,
            },
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.code === 'STRIPE_NOT_CONFIGURED') {
            throw new Error('Payment processing is temporarily unavailable. Please try again later or contact support.');
          }
          throw new Error(data.error || 'Failed to create payment intent');
        }

        setClientSecret(data.clientSecret);
        
        // Log demo mode status for development
        if (data.demoMode) {
          console.log('🎭 Demo Mode Active:', data.message);
        }
      } catch (err) {
        console.error('Payment intent error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize payment');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [cartItems, customerEmail]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) {
    return (
      <>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <main className="min-h-screen" style={{ backgroundColor: 'var(--color-warm-beige)' }}>
          <div className="mx-auto" style={{ 
            maxWidth: '1200px',
            paddingLeft: 'clamp(24px, 7.5vw, 120px)',
            paddingRight: 'clamp(24px, 7.5vw, 120px)',
            paddingTop: 'var(--space-25)'
          }}>
            <div className="text-center" style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-20)' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: `3px solid var(--color-warm-sage)`,
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                margin: '0 auto var(--space-6)',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{
                fontFamily: 'var(--font-body-refined)',
                fontSize: 'var(--text-author-body)',
                color: 'var(--color-neutral-600)'
              }}>
                Setting up your secure checkout...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: 'var(--color-warm-beige)' }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)',
          paddingTop: 'var(--space-25)'
        }}>
          <div style={{
            backgroundColor: 'var(--color-warm-cream)',
            border: `2px solid var(--color-warm-beige)`,
            borderRadius: '16px',
            padding: 'var(--space-12)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: 'var(--space-4)'
              }}>
                ⚠️
              </div>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-author-section)',
              fontWeight: 'bold',
              color: 'var(--color-warm-navy)',
              marginBottom: 'var(--space-4)'
            }}>
              Checkout Error
            </h2>
            <p style={{
              fontFamily: 'var(--font-body-refined)',
              fontSize: 'var(--text-author-body)',
              color: 'var(--color-neutral-600)',
              marginBottom: 'var(--space-8)',
              lineHeight: 'var(--leading-relaxed)'
            }}>
              {error}
            </p>
            <button
              onClick={() => window.location.href = '/cart'}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, var(--color-warm-sage), var(--color-warm-navy))',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'var(--font-body-refined)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(156, 169, 134, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Return to Cart
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return <div>Redirecting...</div>;
  }

  return (
    <main className="min-h-screen">
      
      {/* Checkout Header Section */}
      <section style={{ 
        backgroundColor: 'var(--color-warm-cream)',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-16)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center">
            <h1 className="font-bold" 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-hero)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-6)' 
                }}>
              Secure Checkout
            </h1>
            <p style={{ 
                 fontFamily: 'var(--font-body-refined)', 
                 fontSize: 'var(--text-author-body)',
                 lineHeight: 'var(--leading-relaxed)',
                 color: 'var(--color-neutral-600)',
                 marginBottom: 'var(--space-4)' 
               }}>
              Complete your order for Anna Lea's inspiring books
            </p>
            <p style={{ 
                 fontFamily: 'var(--font-body-refined)', 
                 fontSize: '16px',
                 color: 'var(--color-warm-sage)',
                 fontWeight: '600'
               }}>
              🔒 Safe & Secure Payment Processing
            </p>
            {/* Debug: Checkout enhancement deployed $(date) */}
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <section style={{ 
        backgroundColor: 'var(--color-warm-beige)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary - Enhanced with design system */}
          <div style={{ 
            backgroundColor: 'var(--color-warm-cream)', 
            border: `2px solid var(--color-warm-beige)`,
            borderRadius: '16px',
            padding: 'var(--space-8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 className="font-bold" 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-body)',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-6)'
                }}>
              Order Summary
            </h2>
            
            {/* Items List - Enhanced */}
            <div style={{ marginBottom: 'var(--space-8)', gap: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-warm-beige)',
                  borderRadius: '12px',
                  border: `1px solid var(--color-warm-beige)`
                }}>
                  <div 
                    style={{
                      width: '64px',
                      height: '80px',
                      flexShrink: 0,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: 'calc(100% - 8px)',
                        height: 'calc(100% - 4px)',
                        marginTop: '4px',
                        marginLeft: '4px', 
                        marginRight: '4px',
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '6px'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'var(--color-warm-navy)',
                        marginBottom: 'var(--space-1)',
                        lineHeight: '1.4'
                      }}>
                      {item.title}
                    </h3>
                    <p style={{
                        fontFamily: 'var(--font-body-refined)',
                        fontSize: '14px',
                        color: 'var(--color-neutral-600)',
                        marginBottom: 'var(--space-1)'
                      }}>
                      by {item.author}
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-body-refined)',
                        fontSize: '14px',
                        color: 'var(--color-warm-sage)',
                        fontWeight: '600'
                      }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'var(--color-warm-navy)'
                      }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown - Enhanced */}
            <div style={{ 
              borderTop: `2px solid var(--color-warm-beige)`,
              paddingTop: 'var(--space-6)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 'var(--space-4)',
                padding: 'var(--space-3) 0',
                borderBottom: `1px solid var(--color-warm-beige)`
              }}>
                <span style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px',
                  color: 'var(--color-neutral-700)'
                }}>
                  Subtotal ({totalItems} items):
                </span>
                <span style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)'
                }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 'var(--space-3)',
                padding: 'var(--space-3) 0'
              }}>
                <span style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px',
                  color: 'var(--color-neutral-700)'
                }}>
                  Shipping & handling:
                </span>
                <span style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: shipping === 0 ? 'var(--color-warm-sage)' : 'var(--color-warm-navy)'
                }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              {shipping === 0 && (
                <p style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '14px',
                  color: 'var(--color-warm-sage)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-3)',
                  textAlign: 'center',
                  padding: 'var(--space-2)',
                  backgroundColor: 'var(--color-warm-beige)',
                  borderRadius: '8px'
                }}>
                  ✨ Your order qualifies for FREE Shipping
                </p>
              )}
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 'var(--space-6)',
                padding: 'var(--space-3) 0',
                borderBottom: `1px solid var(--color-warm-beige)`
              }}>
                <span style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px',
                  color: 'var(--color-neutral-700)'
                }}>
                  Estimated tax:
                </span>
                <span style={{
                  fontFamily: 'var(--font-body-refined)',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-warm-navy)'
                }}>
                  ${tax.toFixed(2)}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-warm-beige)',
                borderRadius: '12px',
                marginBottom: 'var(--space-8)'
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--color-warm-navy)'
                }}>
                  Order total:
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--color-warm-navy)'
                }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Security Notice - Enhanced */}
            <p style={{
              fontFamily: 'var(--font-body-refined)',
              fontSize: '14px',
              color: 'var(--color-warm-sage)',
              textAlign: 'center',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>🔒</span>
              <span>Secure SSL encrypted checkout</span>
            </p>
          </div>

          {/* Payment Form - Enhanced with design system */}
          <div style={{ 
            backgroundColor: 'var(--color-warm-cream)', 
            border: `2px solid var(--color-warm-beige)`,
            borderRadius: '16px',
            padding: 'var(--space-8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 className="font-bold" 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-body)',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-6)'
                }}>
              Payment Information
            </h2>
            
            {/* Customer Email - Enhanced */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <label htmlFor="email" style={{
                display: 'block',
                fontFamily: 'var(--font-body-refined)',
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--color-warm-navy)',
                marginBottom: 'var(--space-2)'
              }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid var(--color-warm-beige)`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'var(--font-body-refined)',
                  backgroundColor: 'var(--color-warm-cream)',
                  color: 'var(--color-warm-navy)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
                placeholder="your@email.com"
                required
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-warm-sage)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(156, 169, 134, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-warm-beige)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <p style={{
                fontFamily: 'var(--font-body-refined)',
                fontSize: '14px',
                color: 'var(--color-neutral-600)',
                marginTop: 'var(--space-2)'
              }}>
                Receipt will be sent to this email
              </p>
            </div>

            {/* Stripe Elements */}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm 
                  clientSecret={clientSecret}
                  customerEmail={customerEmail}
                  totalAmount={total}
                />
              </Elements>
            )}
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}