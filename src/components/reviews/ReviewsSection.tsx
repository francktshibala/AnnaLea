'use client';

import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';
import { Review, ReviewStats } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
  stats: ReviewStats;
  bookTitle?: string;
  showAll?: boolean;
  maxReviews?: number;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  stats,
  bookTitle,
  showAll = false,
  maxReviews = 6,
  className = '',
}) => {
  const [showAllReviews, setShowAllReviews] = useState(showAll);
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, maxReviews);
  const highlightedReviews = reviews.filter(review => review.isHighlighted);
  const regularReviews = reviews.filter(review => !review.isHighlighted);

  const renderRatingDistribution = () => {
    const maxCount = Math.max(...Object.values(stats.ratingDistribution));
    
    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(rating => {
          const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
          const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center gap-3 text-sm">
              <span className="w-12 text-text-secondary font-medium">
                {rating} star{rating !== 1 ? 's' : ''}
              </span>
              <div className="flex-1 bg-bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-golden-honey rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-text-muted text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4 font-display">
            {bookTitle ? `Reviews for "${bookTitle}"` : "Reader Reviews"}
          </h2>
          <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
            See what readers are saying about Anna Lea's inspiring stories
          </p>
        </div>

        {/* Stats Overview */}
        <div className="bg-bg-secondary rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="text-4xl font-bold text-text-primary">
                  {stats.averageRating.toFixed(1)}
                </span>
                <div>
                  <StarRating rating={stats.averageRating} size="lg" />
                  <p className="text-text-secondary mt-1">
                    Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4 font-display">
                Rating Distribution
              </h3>
              {renderRatingDistribution()}
            </div>
          </div>
        </div>

        {/* Highlighted Reviews */}
        {highlightedReviews.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-text-primary mb-6 font-display">
              Featured Reviews
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {highlightedReviews.map(review => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  variant="highlighted"
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Reviews */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-text-primary mb-6 font-display">
            All Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayedReviews.map(review => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                variant={review.isHighlighted ? "highlighted" : "default"}
              />
            ))}
          </div>
        </div>

        {/* Show More Button */}
        {!showAll && reviews.length > maxReviews && (
          <div className="text-center">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="px-8 py-3 bg-sage-green text-white rounded-lg font-semibold hover:bg-sage-green-dark transition-colors duration-300 font-sans"
            >
              {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;