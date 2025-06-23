'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/utils';

// TypeScript interfaces for BookCard props
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
}

export interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  book: Book;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  onAddToCart?: (book: Book) => void;
}

// Fresh BookCard - Built from scratch using only verified working effects
export const BookCard = forwardRef<HTMLDivElement, BookCardProps>(
  (
    {
      book,
      size = 'medium',
      loading = false,
      onAddToCart,
      className,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = () => {
      if (onAddToCart && !loading) {
        onAddToCart(book);
      }
    };

    const sizeClasses = {
      small: 'max-w-[200px]',
      medium: 'max-w-[280px]',
      large: 'max-w-[320px]',
    };

    return (
      <div
        ref={ref}
        data-testid="book-card"
        className={cn('w-full', sizeClasses[size], className)}
        {...props}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          // Smooth transitions for all effects - more dramatic timing
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          // More dramatic lift effect like HTML test
          transform: isHovered ? 'translateY(-15px) scale(1.08)' : 'translateY(0px) scale(1)',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '420px',
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            background: isHovered 
              ? 'linear-gradient(145deg, #ffffff, #f8fafc)' 
              : 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
            boxShadow: isHovered
              ? '0 40px 80px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.9)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            border: isHovered ? '2px solid #3b82f6' : '2px solid transparent',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'pointer',
          }}
        >
          {/* Book Image with Hover Effects */}
          <div
            style={{
              width: '100%',
              height: '60%',
              backgroundImage: `url(${book.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '14px 14px 0 0',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              filter: isHovered 
                ? 'brightness(1.2) contrast(1.2) saturate(1.3)' 
                : 'brightness(1) contrast(1) saturate(1)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />

          {/* Book Info Section */}
          <div 
            style={{
              padding: '20px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'transparent',
            }}
          >
            <div>
              {/* Book Title */}
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: isHovered ? '#1e40af' : '#1f2937',
                marginBottom: '8px',
                lineHeight: '1.4',
                transition: 'color 0.3s ease',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {book.title}
              </h3>

              {/* Author */}
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                by {book.author}
              </p>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.5',
                marginBottom: '16px',
                height: '40px',
                overflow: 'hidden',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {book.description.substring(0, 80)}...
              </p>

              {/* Price */}
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: isHovered ? '#1d4ed8' : '#2563eb',
                marginBottom: '16px',
                transition: 'color 0.3s ease',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                ${book.price.toFixed(2)}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: isHovered 
                  ? 'linear-gradient(135deg, #1d4ed8, #1e40af)' 
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0px) scale(1)',
                boxShadow: isHovered 
                  ? '0 12px 35px rgba(59, 130, 246, 0.5)' 
                  : '0 4px 15px rgba(59, 130, 246, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(59, 130, 246, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0px) scale(1)';
                  e.currentTarget.style.boxShadow = isHovered 
                    ? '0 12px 35px rgba(59, 130, 246, 0.5)' 
                    : '0 4px 15px rgba(59, 130, 246, 0.2)';
                }
              }}
            >
              {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                transition: 'opacity 0.3s ease',
              }}
            >
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #e5e7eb',
                  borderTop: '4px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          )}
        </div>

        {/* Global styles for animations */}
        <style jsx global>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';