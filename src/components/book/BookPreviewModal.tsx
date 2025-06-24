'use client';

import React, { useState } from 'react';
import { Book } from './BookCardFresh';
import { NewsletterSignup } from '@/components/ui';

interface BookPreviewModalProps {
  book: Book & { sample?: string };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(book);
    onClose(); // Close modal after adding to cart
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: isFullscreen ? '0px' : '16px',
          maxWidth: isFullscreen ? '100vw' : '800px',
          width: isFullscreen ? '100vw' : '100%',
          maxHeight: isFullscreen ? '100vh' : '90vh',
          height: isFullscreen ? '100vh' : 'auto',
          overflow: 'auto',
          position: 'relative',
          boxShadow: isFullscreen ? 'none' : '0 25px 50px rgba(0, 0, 0, 0.3)',
          animation: 'modalSlideIn 0.3s ease-out',
          transition: 'all 0.3s ease-in-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Buttons */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}>
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? '⤓' : '⤢'}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '40px' }}>
          {/* Book Info Header */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '40px',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            }}
          >
            {/* Book Cover */}
            <div
              style={{
                width: '200px',
                height: '300px',
                backgroundImage: `url(${book.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
                margin: window.innerWidth < 768 ? '0 auto' : '0',
              }}
            />

            {/* Book Details */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {book.title}
              </h2>
              
              <p
                style={{
                  fontSize: '18px',
                  color: '#6b7280',
                  marginBottom: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                by {book.author}
              </p>

              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {book.description}
              </p>

              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '24px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                ${book.price.toFixed(2)}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={onClose}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Sample Content */}
          {book.sample && (
            <div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '20px',
                  borderBottom: '2px solid #e5e7eb',
                  paddingBottom: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                📖 Book Sample
              </h3>
              
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#374151',
                  fontFamily: 'Georgia, serif',
                  whiteSpace: 'pre-line',
                  backgroundColor: '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                }}
              >
                {book.sample}
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginTop: '16px',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                This is just a sample. Purchase the full book to continue reading!
              </p>
            </div>
          )}

          {/* Newsletter Signup Section */}
          <div style={{ marginTop: '40px', borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
            <NewsletterSignup
              variant="modal"
              title="Stay Updated on New Releases"
              description="Be the first to know when Anna Lea publishes new inspiring stories and get exclusive content."
              buttonText="Subscribe"
              placeholder="Your email address"
              source="book-preview-modal"
            />
          </div>
        </div>

        {/* Inline styles for animations */}
        <style jsx>{`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};