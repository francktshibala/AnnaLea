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
        backgroundColor: 'var(--color-warm-cream)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(44, 62, 80, 0.15), 0 8px 16px rgba(44, 62, 80, 0.10)',
        border: `2px solid var(--color-warm-beige)`,
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
          borderBottom: `2px solid var(--color-warm-beige)`
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-author-body)',
            fontWeight: 'bold',
            color: 'var(--color-warm-navy)'
          }}>
            Shopping Cart ({totalItems})
          </h3>
          <button
            onClick={onClose}
            style={{
              color: 'var(--color-warm-sage)',
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
              e.currentTarget.style.backgroundColor = 'var(--color-warm-beige)';
              e.currentTarget.style.color = 'var(--color-warm-navy)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-warm-sage)';
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
              color: 'var(--color-warm-sage)', 
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
              fontFamily: 'var(--font-body-refined)',
              fontSize: '16px',
              color: 'var(--color-neutral-600)'
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

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-gray-200 pt-4">
              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-blue-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    router.push('/cart');
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    router.push('/checkout');
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
      
      {/* Debug: Cart dropdown item cards Step 2 complete */}
    </div>
  );
};