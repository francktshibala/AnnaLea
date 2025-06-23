'use client';

import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
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

// Styled Components - These bypass Next.js CSS optimization
const CardContainer = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  width: 100%;
  max-width: ${props => 
    props.$size === 'small' ? '200px' : 
    props.$size === 'large' ? '320px' : '280px'};
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const Card3D = styled.div<{ $isHovered: boolean }>`
  position: relative;
  height: 420px;
  width: 100%;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-style: preserve-3d;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  ${props => props.$isHovered && `
    transform: perspective(1000px) rotateX(15deg) rotateY(-15deg) translateZ(30px) translateY(-10px);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
    background: #ffffff;
  `}
`;

const BookImage = styled.div<{ $imageUrl: string; $isHovered: boolean }>`
  width: 100%;
  height: 60%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
  transition: all 0.3s ease;
  
  ${props => props.$isHovered && `
    transform: translateZ(15px) scale(1.03);
  `}
`;

const BookInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const BookAuthor = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const BookDescription = styled.p`
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 16px;
  height: 40px;
  overflow: hidden;
`;

const BookPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 8px;
`;

const DebugInfo = styled.div`
  font-size: 12px;
  color: #16a34a;
  margin-bottom: 12px;
  font-weight: bold;
  background-color: #f0fdf4;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
`;

const AddToCartButton = styled.button<{ $loading: boolean }>`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$loading ? 0.7 : 1};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
    transform: translateZ(10px);
  }
  
  &:active {
    transform: translateZ(5px) scale(0.98);
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// 3D BookCard component using Styled Components (bypasses CSS build optimization)
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

    const handleAddToCart = () => {
      if (onAddToCart && !loading) {
        onAddToCart(book);
      }
    };

    return (
      <CardContainer
        ref={ref}
        data-testid="book-card"
        className={cn(className)}
        $size={size}
        {...props}
      >
        <Card3D
          $isHovered={isHovered}
          onMouseEnter={() => {
            setIsHovered(true);
            setHoverCount(prev => prev + 1);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Book Image */}
          <BookImage 
            $imageUrl={book.image} 
            $isHovered={isHovered}
          />

          {/* Book Info */}
          <BookInfo>
            <div>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>by {book.author}</BookAuthor>
              <BookDescription>
                {book.description.substring(0, 80)}...
              </BookDescription>
              <BookPrice>${book.price.toFixed(2)}</BookPrice>
              
              {/* Debug Info - Shows Styled Components working */}
              <DebugInfo>
                💎 Styled Components • Hover Count: {hoverCount}
              </DebugInfo>
            </div>

            {/* Add to Cart Button */}
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={loading}
              $loading={loading}
            >
              {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </AddToCartButton>
          </BookInfo>

          {/* Loading Overlay */}
          {loading && (
            <LoadingOverlay>
              <LoadingSpinner />
            </LoadingOverlay>
          )}
        </Card3D>
      </CardContainer>
    );
  }
);

BookCard.displayName = 'BookCard';