'use client';

import React from 'react';
import { generateBookStats } from '@/data/reviews';
import { featuredBooks } from '@/data/books';

interface BookStatsProps {
  showAll?: boolean;
}

export const BookStats: React.FC<BookStatsProps> = ({ showAll = true }) => {
  const bookData = featuredBooks.map(book => ({
    ...book,
    stats: generateBookStats(book.id)
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-display text-primary text-center mb-8">
        Reviews by Book
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {bookData.map((book) => (
          <div key={book.id} className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-center">
              <h3 className="text-lg font-bold font-display text-primary mb-2">
                {book.title}
              </h3>
              
              {/* Book Rating */}
              <div className="text-3xl font-bold font-display text-primary mb-2">
                {book.stats.totalReviews > 0 ? book.stats.averageRating.toFixed(1) : 'N/A'}
              </div>
              
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className="text-lg"
                    style={{ 
                      color: star <= Math.round(book.stats.averageRating) 
                        ? 'var(--golden-honey)' 
                        : '#e5e7eb' 
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-secondary mb-4">
                {book.stats.totalReviews} reviews
              </div>
              
              {/* Top ratings */}
              <div className="space-y-2">
                {[5, 4].map((rating) => {
                  const count = book.stats.ratingDistribution[rating as keyof typeof book.stats.ratingDistribution];
                  const percentage = book.stats.totalReviews > 0 
                    ? Math.round((count / book.stats.totalReviews) * 100) 
                    : 0;
                  
                  if (count === 0) return null;
                  
                  return (
                    <div key={rating} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{rating}★</span>
                      <span className="text-secondary">{percentage}% ({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};