'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        right: '0',
        top: '100%',
        marginTop: '8px',
        width: '400px',
        backgroundColor: 'var(--cream)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-dark)',
        border: `2px solid var(--border-light)`,
        zIndex: 50,
        animation: isOpen ? 'slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'slideUp 0.2s ease-in',
      }}
    >
      <div style={{ padding: 'var(--space-6)' }}>
        {/* Header - Enhanced */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-4)',
          borderBottom: `2px solid var(--border-light)`
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-author-body)',
            fontWeight: 'bold',
            color: 'var(--text-primary)'
          }}>
            Shopping Cart ({totalItems})
          </h3>
          <button
            onClick={onClose}
            style={{
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              e.currentTarget.style.color = 'var(--text-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            aria-label="Close cart"
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            paddingTop: 'var(--space-12)', 
            paddingBottom: 'var(--space-12)' 
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              margin: '0 auto var(--space-6)', 
              color: 'var(--sage-green)', 
              opacity: '0.6' 
            }}>
              <svg
                style={{ width: '100%', height: '100%' }}
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
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--text-muted)'
            }}>
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {/* Items List - Enhanced */}
            <div style={{ 
              maxHeight: '280px', 
              overflowY: 'auto', 
              marginBottom: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)'
            }}>
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-warm-beige)',
                    borderRadius: '12px',
                    border: `1px solid var(--color-warm-beige)`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(44, 62, 80, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Book Image - Enhanced */}
                  <div
                    style={{
                      width: '48px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: 'calc(100% - 4px)',
                        height: 'calc(100% - 2px)',
                        marginTop: '2px',
                        marginLeft: '2px',
                        marginRight: '2px',
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '6px'
                      }}
                    />
                  </div>

                  {/* Book Info - Enhanced */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: 'var(--color-warm-navy)',
                      marginBottom: 'var(--space-1)',
                      lineHeight: '1.3',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-body-refined)',
                      fontSize: '12px',
                      color: 'var(--color-neutral-600)',
                      marginBottom: 'var(--space-2)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      by {item.author}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body-refined)',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--color-warm-sage)'
                    }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls - Enhanced */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-2)', 
                    flexShrink: 0 
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-warm-cream)',
                        border: `2px solid var(--color-warm-beige)`,
                        color: 'var(--color-warm-navy)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-warm-sage)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-warm-cream)';
                        e.currentTarget.style.color = 'var(--color-warm-navy)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    
                    <span style={{
                      minWidth: '24px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-body-refined)',
                      color: 'var(--color-warm-navy)'
                    }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-warm-cream)',
                        border: `2px solid var(--color-warm-beige)`,
                        color: 'var(--color-warm-navy)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-warm-sage)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-warm-cream)';
                        e.currentTarget.style.color = 'var(--color-warm-navy)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        marginLeft: 'var(--space-2)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        border: `2px solid #dc2626`,
                        color: '#dc2626',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        fontSize: '16px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer - Enhanced */}
            <div style={{ 
              borderTop: `2px solid var(--color-warm-beige)`,
              paddingTop: 'var(--space-6)'
            }}>
              {/* Total - Enhanced */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: 'var(--space-6)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-warm-beige)',
                borderRadius: '12px',
                border: `1px solid var(--color-warm-beige)`
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'var(--color-warm-navy)'
                }}>
                  Total:
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'var(--color-warm-sage)'
                }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons - Enhanced */}
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button
                  onClick={() => {
                    router.push('/cart');
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-warm-sage)',
                    border: `2px solid var(--color-warm-sage)`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-body-refined)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-warm-sage)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(156, 169, 134, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-warm-sage)';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    router.push('/checkout');
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: 'linear-gradient(135deg, var(--color-warm-sage), var(--color-warm-navy))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-body-refined)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(156, 169, 134, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(156, 169, 134, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(156, 169, 134, 0.3)';
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Animations - Enhanced */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
        }
      `}</style>
      
      {/* Debug: Cart dropdown complete - All 5 steps enhanced! */}
    </div>
  );
};