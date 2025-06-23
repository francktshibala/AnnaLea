'use client';

import React, { forwardRef, useState, useRef, useEffect } from 'react';
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

// 3D BookCard component using JavaScript animations (bypasses CSS build issues)
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
    const [hoverCount, setHoverCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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

    // Apply 3D transforms using JavaScript animation
    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;

      if (isHovered) {
        card.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(-15deg) translateZ(30px) translateY(-10px)';
        card.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.25)';
        card.style.background = '#ffffff';
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      } else {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        card.style.background = '#f8fafc';
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
    }, [isHovered]);

    return (
      <div
        ref={ref}
        data-testid="book-card"
        className={cn('w-full', sizeClasses[size], className)}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        {...props}
      >
        <div
          ref={cardRef}
          className="relative h-full flex flex-col rounded-xl overflow-hidden cursor-pointer"
          style={{
            width: '100%',
            height: '420px',
            background: '#f8fafc',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            setHoverCount(prev => prev + 1);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Book Image */}
          <div
            className="book-image"
            style={{
              width: '100%',
              height: '60%',
              backgroundImage: `url(${book.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '12px 12px 0 0',
            }}
          />

          {/* Book Info */}
          <div 
            style={{
              padding: '20px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px',
                lineHeight: '1.4',
              }}>
                {book.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                by {book.author}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.5',
                marginBottom: '16px',
                height: '40px',
                overflow: 'hidden',
              }}>
                {book.description.substring(0, 80)}...
              </p>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: '8px',
              }}>
                ${book.price.toFixed(2)}
              </div>
              
              {/* Debug Info - Shows JavaScript animations working */}
              <div style={{
                fontSize: '12px',
                color: '#16a34a',
                marginBottom: '12px',
                fontWeight: 'bold',
                backgroundColor: '#f0fdf4',
                padding: '4px 8px',
                borderRadius: '4px',
                textAlign: 'center',
              }}>
                🎯 JS Animations • Hover Count: {hoverCount}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
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
                background: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                opacity: 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid #e5e7eb',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';