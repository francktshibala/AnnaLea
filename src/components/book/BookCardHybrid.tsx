'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
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

// Hybrid BookCard that embeds 3D service from external domain
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
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // For now, use the local HTML file. Later we'll deploy to Firebase
    const serviceUrl = '/bookcard-service.html';
    
    // Build URL with book data as query parameters
    const bookCardUrl = `${serviceUrl}?` + new URLSearchParams({
      id: book.id,
      title: encodeURIComponent(book.title),
      author: encodeURIComponent(book.author),
      price: book.price.toString(),
      image: encodeURIComponent(book.image),
      description: encodeURIComponent(book.description),
      size: size
    }).toString();

    useEffect(() => {
      // Listen for messages from the iframe
      const handleMessage = (event: MessageEvent) => {
        // In production, verify event.origin for security
        // if (event.origin !== 'https://your-firebase-domain.web.app') return;
        
        if (event.data.type === 'addToCart' && onAddToCart) {
          onAddToCart(event.data.book);
        }
        
        if (event.data.type === 'resize' && iframeRef.current) {
          iframeRef.current.style.height = `${event.data.height}px`;
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }, [onAddToCart]);

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
      >
        {/* Debug info to see what's happening */}
        <div style={{ 
          fontSize: '12px', 
          color: 'red', 
          marginBottom: '8px',
          padding: '4px',
          background: '#ffe6e6',
          borderRadius: '4px'
        }}>
          🔍 HYBRID DEBUG: Loading iframe from {bookCardUrl}
        </div>
        
        {loading ? (
          // Loading state
          <div className="w-full h-[420px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          // Iframe embedding the 3D service
          <iframe
            ref={iframeRef}
            src={bookCardUrl}
            style={{
              width: '100%',
              height: '420px',
              border: '2px solid red', // Make it visible for debugging
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            title={`Book card for ${book.title}`}
            loading="eager"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => console.log('Iframe loaded:', bookCardUrl)}
            onError={() => console.log('Iframe error:', bookCardUrl)}
          />
        )}
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';