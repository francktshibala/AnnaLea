'use client';

import React, { useState, useMemo } from 'react';
import { ReviewStats } from '@/components/reviews/ReviewStats';
import { BookStats } from '@/components/reviews/BookStats';
import { ReviewFilter, FilterOptions } from '@/components/reviews/ReviewFilter';
import ReviewCard from '@/components/reviews/ReviewCard';
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
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-primary mb-4">
            Reader Reviews
          </h1>
          <p className="text-xl text-secondary font-body max-w-2xl mx-auto mb-8">
            See what readers are saying about Anna Lea's inspiring Christian stories
          </p>
        </div>

        {/* Overall Stats Dashboard */}
        <div className="mb-16">
          <ReviewStats stats={overallStats} />
        </div>

        {/* Book-by-Book Stats */}
        <div className="mb-16">
          <BookStats />
        </div>

        {/* Highlighted Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-display text-primary text-center mb-8">
            Featured Reviews
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlightedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="highlighted" />
            ))}
          </div>
        </div>

        {/* All Reviews with Filtering */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-display text-primary text-center mb-8">
            All Reviews
          </h2>
          
          {/* Filter Component */}
          <ReviewFilter
            onFilterChange={handleFilterChange}
            totalReviews={sampleReviews.length}
            filteredCount={filteredReviews.length}
          />

          {/* Filtered Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
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
    </main>
  );
}