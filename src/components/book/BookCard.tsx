'use client';

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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

// Simple 3D BookCard component with direct styles
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
    const [hoverCount, setHoverCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Ensure component is mounted before applying transforms (fixes SSR)
    useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleAddToCart = () => {
      if (onAddToCart && !loading) {
        onAddToCart(book);
      }
    };

    // Apply transforms using DOM manipulation for better Next.js compatibility
    useEffect(() => {
      if (!isMounted || !cardRef.current) return;

      const cardElement = cardRef.current.querySelector('.book-card-inner') as HTMLElement;
      const imageElement = cardRef.current.querySelector('.book-image') as HTMLElement;
      const buttonElement = cardRef.current.querySelector('.add-to-cart-btn') as HTMLElement;

      if (!cardElement) return;

      if (isHovered) {
        // Apply hover transforms
        cardElement.style.transform = 'rotateX(25deg) rotateY(-25deg) translateZ(50px) translateY(-20px) scale(1.1)';
        cardElement.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.25)';
        cardElement.style.background = '#ffffff';
        
        if (imageElement) {
          imageElement.style.transform = 'translateZ(15px) scale(1.03)';
        }
        
        if (buttonElement) {
          buttonElement.style.transform = 'translateZ(10px)';
          buttonElement.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)';
        }
      } else {
        // Reset transforms
        cardElement.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        cardElement.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        cardElement.style.background = '#f8fafc';
        
        if (imageElement) {
          imageElement.style.transform = 'translateZ(0)';
        }
        
        if (buttonElement) {
          buttonElement.style.transform = 'translateZ(0)';
          buttonElement.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        }
      }
    }, [isHovered, isMounted]);

    const sizeClasses = {
      small: 'max-w-[200px]',
      medium: 'max-w-[280px]',
      large: 'max-w-[320px]',
    };

    // Don't render with transforms until mounted (prevents SSR mismatch)
    if (!isMounted) {
      return (
        <div
          ref={ref}
          data-testid="book-card"
          className={cn('book-card w-full', sizeClasses[size], className)}
          style={{
            maxWidth: '280px',
            width: '100%',
          }}
          {...props}
        >
          <div className="w-full h-[420px] bg-gray-100 rounded-xl animate-pulse" />
        </div>
      );
    }

    return (
      <div
        ref={cardRef}
        data-testid="book-card"
        className={cn('book-card w-full', sizeClasses[size], className)}
        onMouseEnter={() => {
          setIsHovered(true);
          setHoverCount(prev => prev + 1);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          perspective: '800px',
          transformStyle: 'preserve-3d',
        }}
        {...props}
      >
        <div
          className="book-card-inner relative h-full flex flex-col rounded-xl overflow-hidden"
          style={{
            width: '100%',
            height: '420px',
            background: '#f8fafc',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
            display: 'flex',
            flexDirection: 'column' as const,
          }}
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
              transition: 'transform 0.5s ease-out',
              borderRadius: '12px 12px 0 0',
              transform: 'translateZ(0)',
            }}
          />

          {/* Book Info */}
          <div 
            className="book-info"
            style={{
              padding: '20px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div 
                className="book-title"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '8px',
                  lineHeight: '1.4',
                }}
              >
                {book.title}
              </div>
              <div 
                className="book-author"
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px',
                }}
              >
                by {book.author}
              </div>
              <div 
                className="book-description"
                style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  lineHeight: '1.5',
                  marginBottom: '16px',
                  flex: 1,
                }}
              >
                {book.description}
              </div>
              <div 
                className="book-price"
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '16px',
                }}
              >
                ${book.price.toFixed(2)}
              </div>
              
              {/* Debug Info - REACT TEST WORKS! */}
              <div style={{
                fontSize: '12px',
                color: isHovered ? '#dc2626' : '#16a34a',
                marginTop: '4px',
                fontWeight: 'bold',
                backgroundColor: isHovered ? '#fef2f2' : '#f0fdf4',
                padding: '4px',
                borderRadius: '4px',
                textAlign: 'center',
              }}>
                {isHovered ? `🔥 HOVERING! (${hoverCount})` : `✅ Ready (${hoverCount})`}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="add-to-cart-btn"
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.4s ease-out',
                transform: 'translateZ(0)',
              }}
            >
              {loading ? 'Loading...' : 'Add to Cart'}
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