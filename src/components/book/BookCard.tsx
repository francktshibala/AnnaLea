import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          perspective: '800px',
          transformStyle: 'preserve-3d',
        }}
        {...props}
      >
        <div
          className="relative h-full flex flex-col rounded-xl overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isHovered 
              ? 'rotateX(15deg) rotateY(-15deg) translateZ(30px) translateY(-10px)' 
              : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
            boxShadow: isHovered 
              ? '0 40px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              : '0 8px 25px rgba(0, 0, 0, 0.1)',
            backgroundColor: isHovered ? '#ffffff' : '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Book Image */}
          <div 
            className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl"
            style={{
              transform: isHovered ? 'translateZ(15px) scale(1.03)' : 'translateZ(0)',
              transition: 'transform 0.5s ease-out',
            }}
          >
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Book Info */}
          <div className="flex-1 flex flex-col justify-between p-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                by {book.author}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                {book.description}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-blue-600">
                ${book.price.toFixed(2)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={loading}
              loading={loading}
              className="w-full"
              variant="primary"
              style={{
                transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
                transition: 'transform 0.4s ease-out',
                backgroundColor: isHovered ? '#1d4ed8' : undefined,
              }}
            >
              Add to Cart
            </Button>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';