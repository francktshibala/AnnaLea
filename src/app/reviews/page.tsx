'use client';

import React, { useState, useMemo } from 'react';
import { ReviewStats } from '@/components/reviews/ReviewStats';
import { BookStats } from '@/components/reviews/BookStats';
import { ReviewFilter, FilterOptions } from '@/components/reviews/ReviewFilter';
import ReviewCard from '@/components/reviews/ReviewCard';
import { HeroImage } from '@/components/hero/HeroImage';
import { sampleReviews, overallStats, getHighlightedReviews, getRecentReviews } from '@/data/reviews';
import { Review } from '@/types';

export default function ReviewsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    bookId: 'all',
    rating: 0,
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const highlightedReviews = getHighlightedReviews();

  // Filter and sort reviews based on current filters
  const filteredReviews = useMemo(() => {
    let filtered = [...sampleReviews];

    // Filter by book
    if (filters.bookId !== 'all') {
      filtered = filtered.filter(review => review.bookId === filters.bookId);
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(review => review.rating >= filters.rating);
    }

    // Sort reviews
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'helpful':
          // For now, prioritize highlighted reviews as "most helpful"
          const aHelpful = a.isHighlighted ? 1 : 0;
          const bHelpful = b.isHighlighted ? 1 : 0;
          comparison = aHelpful - bHelpful;
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Consistent with other pages */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Page Header Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Reader Reviews
            </h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
            <p className="text-lg lg:text-xl font-body leading-relaxed max-w-4xl mx-auto"
               style={{ color: 'var(--charcoal-navy)' }}>
              See what readers are saying about Anna Lea's inspiring Christian stories
            </p>
          </div>
        </div>
      </section>

      {/* Overall Stats Dashboard Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <ReviewStats stats={overallStats} />
        </div>
      </section>

      {/* Book-by-Book Stats Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <BookStats />
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Featured Reviews
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--sage-green)' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {highlightedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="highlighted" />
            ))}
          </div>
        </div>
      </section>

      {/* All Reviews with Filtering Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              All Reviews
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
          </div>
          
          {/* Filter Component */}
          <div className="mb-12">
            <ReviewFilter
              onFilterChange={handleFilterChange}
              totalReviews={sampleReviews.length}
              filteredCount={filteredReviews.length}
            />
          </div>

          {/* Filtered Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">📝</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  No reviews found
                </h3>
                <p className="text-secondary">
                  Try adjusting your filters to see more reviews.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto border-2"
                 style={{ borderColor: 'var(--sage-green)' }}>
              <h3 className="text-2xl font-bold font-display text-primary mb-4">
                Share Your Review
              </h3>
              <p className="text-secondary font-body mb-6">
                Have you read one of Anna Lea's books? We'd love to hear your thoughts and how the story impacted your faith journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-white"
                  style={{ backgroundColor: 'var(--sage-green)' }}
                >
                  Write a Review
                </a>
                <a
                  href="/books"
                  className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 border-2"
                  style={{ 
                    borderColor: 'var(--sage-green)',
                    color: 'var(--sage-green)',
                    backgroundColor: 'transparent'
                  }}
                >
                  View All Books
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}