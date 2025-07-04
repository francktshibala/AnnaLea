'use client';

import React from 'react';
import { Book } from '@/types';
import { ReviewsSection, StarRating } from '@/components/reviews';
import { getReviewsByBookId, generateBookStats } from '@/data/reviews';

interface BookPageWithReviewsProps {
  book: Book;
  className?: string;
}

const BookPageWithReviews: React.FC<BookPageWithReviewsProps> = ({
  book,
  className = '',
}) => {
  const bookReviews = getReviewsByBookId(book.id);
  const bookStats = generateBookStats(book.id);

  return (
    <div className={`min-h-screen bg-bg-primary ${className}`}>
      {/* Book Header */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Book Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>

            {/* Book Details */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4 font-display">
                {book.title}
              </h1>
              <p className="text-xl mb-4 font-body">
                by {book.author}
              </p>
              
              {/* Star Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <StarRating rating={bookStats.averageRating} size="lg" showNumber />
                <span className="text-lg opacity-90">
                  ({bookStats.totalReviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-lg opacity-90 mb-8 font-body max-w-2xl">
                {book.description}
              </p>

              {/* Purchase Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 bg-golden-honey text-charcoal-navy font-semibold rounded-lg hover:bg-golden-honey-dark transition-colors duration-300 font-sans">
                  Buy on Amazon - ${book.price}
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-charcoal-navy transition-colors duration-300 font-sans">
                  Read Sample
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Sample */}
      {book.sample && (
        <section className="py-16 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-primary mb-8 font-display text-center">
              Sample Reading
            </h2>
            <div className="bg-bg-primary rounded-lg p-8 shadow-medium">
              <div className="prose prose-lg max-w-none font-body">
                <div className="whitespace-pre-line text-text-secondary">
                  {book.sample}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <ReviewsSection
        reviews={bookReviews}
        stats={bookStats}
        bookTitle={book.title}
        maxReviews={8}
      />

      {/* Additional Information */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-display">
                Free Shipping
              </h3>
              <p className="text-text-secondary font-body">
                Free shipping on all orders over $25
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burgundy rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-display">
                30-Day Returns
              </h3>
              <p className="text-text-secondary font-body">
                Not satisfied? Return within 30 days
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-golden-honey rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-display">
                Quality Guarantee
              </h3>
              <p className="text-text-secondary font-body">
                High-quality binding and materials
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPageWithReviews;