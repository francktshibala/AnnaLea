import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
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

// Static BookCard component (no animations yet)
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

    const cardClasses = cn(
      // Base book card classes
      'book-card-3d',
      
      // Size variants
      {
        'book-card-small': size === 'small',
        'book-card-medium': size === 'medium',
        'book-card-large': size === 'large',
      },
      
      // States
      {
        'book-card-loading': loading,
        'book-card-hover': isHovered,
      },
      
      className
    );

    return (
      <div
        ref={ref}
        data-testid="book-card"
        className={cardClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <Card 
          variant="medium" 
          interactive 
          elevation="medium"
          className="h-full flex flex-col"
        >
          {/* Book Image */}
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-lg book-image">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Book Info */}
          <CardBody className="flex-1 flex flex-col justify-between p-4">
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

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-600">
                ${book.price.toFixed(2)}
              </span>
            </div>
          </CardBody>

          {/* Add to Cart Button */}
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              disabled={loading}
              loading={loading}
              className="w-full"
              variant="primary"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';