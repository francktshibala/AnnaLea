'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
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

// 3D BookCard component using Framer Motion (bypasses CSS build issues)
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
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        {...props}
      >
        <motion.div
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
          whileHover={{
            rotateX: 15,
            rotateY: -15,
            z: 30,
            y: -10,
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.25)',
            background: '#ffffff',
            transition: {
              duration: 0.4,
              ease: [0.175, 0.885, 0.32, 1.275],
            },
          }}
          onMouseEnter={() => setHoverCount(prev => prev + 1)}
          transition={{
            duration: 0.4,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
        >
          {/* Book Image */}
          <motion.div
            className="book-image"
            style={{
              width: '100%',
              height: '60%',
              backgroundImage: `url(${book.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '12px 12px 0 0',
            }}
            whileHover={{
              z: 15,
              scale: 1.03,
              transition: { duration: 0.3 },
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
              
              {/* Debug Info - Shows Framer Motion is working */}
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
                🚀 Framer Motion • Hover Count: {hoverCount}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
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
              }}
              whileHover={{
                z: 10,
                background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
            >
              {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </motion.button>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
              <motion.div 
                style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid #e5e7eb',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';