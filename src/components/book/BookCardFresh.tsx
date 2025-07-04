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
  amazonLink?: string;
  // Alternative retail links for future expansion
  barnesNobleLink?: string;
  appleBooksLink?: string;
}

export interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  book: Book;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  // Cart functionality replaced with Amazon integration
  // onAddToCart?: (book: Book) => void; 
  onBookClick?: (book: Book) => void;
}

// Fresh BookCard - Built from scratch using only verified working effects
export const BookCard = forwardRef<HTMLDivElement, BookCardProps>(
  (
    {
      book,
      size = 'medium',
      loading = false,
      onBookClick,
      className,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleBuyOnAmazon = () => {
      if (book.amazonLink && !loading) {
        window.open(book.amazonLink, '_blank', 'noopener,noreferrer');
      }
    };

    const sizeClasses = {
      small: 'max-w-[280px]',
      medium: 'max-w-[420px]', // Slightly increased from 380px to 420px for better desktop presence
      large: 'max-w-[480px]',  // Increased from 450px to 480px
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
          onClick={() => onBookClick?.(book)}
          style={{
            position: 'relative',
            height: '545px', // Increased by 20px to accommodate image margins
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
              borderRadius: '14px 14px 0 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Image wrapper with margins - mt-4 ml-4 mr-4 */}
            <div
              style={{
                width: 'calc(100% - 32px)', // Subtract left + right margins (16px each)
                height: 'calc(100% - 16px)', // Subtract top margin (16px)
                marginTop: '16px',
                marginLeft: '16px', 
                marginRight: '16px',
                backgroundImage: `url(${book.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                filter: isHovered 
                  ? 'brightness(1.2) contrast(1.2) saturate(1.3)' 
                  : 'brightness(1) contrast(1) saturate(1)',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          </div>

          {/* Book Info Section */}
          <div 
            style={{
              padding: '24px',
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
                marginBottom: '12px',
                lineHeight: '1.4',
                transition: 'color 0.3s ease',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
              }}>
                {book.title}
              </h3>

              {/* Author */}
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '12px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                by {book.author}
              </p>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.5',
                marginBottom: '20px',
                minHeight: '60px',
                overflow: 'hidden',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}>
                {book.description.substring(0, 80)}...
              </p>

              {/* Price */}
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: isHovered ? '#1d4ed8' : '#2563eb',
                marginBottom: '20px',
                transition: 'color 0.3s ease',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                ${book.price.toFixed(2)}
              </div>
            </div>

            {/* Buy on Amazon Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when button is clicked
                handleBuyOnAmazon();
              }}
              disabled={loading || !book.amazonLink}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: isHovered 
                  ? 'linear-gradient(135deg, #FF8F00, #FF6D00)' 
                  : 'linear-gradient(135deg, #FF9500, #FF8F00)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: (loading || !book.amazonLink) ? 'not-allowed' : 'pointer',
                opacity: (loading || !book.amazonLink) ? 0.7 : 1,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0px) scale(1)',
                boxShadow: isHovered 
                  ? '0 12px 35px rgba(255, 149, 0, 0.5)' 
                  : '0 4px 15px rgba(255, 149, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (!loading && book.amazonLink) {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(255, 149, 0, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && book.amazonLink) {
                  e.currentTarget.style.transform = isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0px) scale(1)';
                  e.currentTarget.style.boxShadow = isHovered 
                    ? '0 12px 35px rgba(255, 149, 0, 0.5)' 
                    : '0 4px 15px rgba(255, 149, 0, 0.2)';
                }
              }}
            >
              {/* Amazon icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.045 18.02c9.23 6.806 20.265 6.084 23.358-1.156.404-.948-.615-1.785-1.563-.99-8.28 6.943-19.65 6.35-23.383-1.254-.427-.872-1.67-.3-1.412.768l3-.632zm20.615-9.927c-.51-3.935-4.916-6.495-8.94-5.334.63-2.875 3.19-5.02 6.255-5.02 3.06 0 5.46 2.14 6.15 5.02.13.56.71.88 1.27.71s.88-.71.71-1.27c-.91-3.81-4.24-6.46-8.13-6.46s-7.22 2.65-8.13 6.46c-.17.56.15 1.14.71 1.27s1.14-.15 1.27-.71c.69-2.88 3.09-5.02 6.15-5.02 3.065 0 5.625 2.145 6.255 5.02-4.024-1.161-8.43 1.399-8.94 5.334-.51 3.935 2.77 7.46 6.705 7.97s7.46-2.77 7.97-6.705c.17-.56-.15-1.14-.71-1.27s-1.14.15-1.27.71c-.38 2.935-3.035 5.08-5.97 5.08s-5.59-2.145-5.97-5.08c-.38-2.935 2.77-5.46 5.705-5.84z"/>
              </svg>
              {loading ? 'Opening...' : book.amazonLink ? 'Buy on Amazon' : 'Coming Soon'}
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