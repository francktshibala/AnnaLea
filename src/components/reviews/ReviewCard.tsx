'use client';

import React from 'react';
import StarRating from './StarRating';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  variant?: 'default' | 'highlighted' | 'compact';
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  variant = 'default',
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const baseClasses = "bg-bg-primary rounded-lg border border-border-light transition-all duration-300 hover:border-border-medium hover:shadow-light";
  
  const variantClasses = {
    default: "p-6",
    highlighted: "p-8 bg-gradient-to-br from-bg-primary to-bg-secondary border-sage-green shadow-medium",
    compact: "p-4"
  };

  const titleClasses = {
    default: "text-lg font-semibold text-text-primary mb-2",
    highlighted: "text-xl font-bold text-text-primary mb-3",
    compact: "text-base font-semibold text-text-primary mb-2"
  };

  const contentClasses = {
    default: "text-text-secondary leading-relaxed mb-4",
    highlighted: "text-text-secondary leading-relaxed mb-6 text-lg",
    compact: "text-text-secondary leading-relaxed mb-3 text-sm"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Header with rating and title */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <StarRating 
              rating={review.rating} 
              size={variant === 'highlighted' ? 'lg' : variant === 'compact' ? 'sm' : 'md'}
            />
            {review.isVerifiedPurchase && (
              <span className="text-xs text-sage-green font-medium bg-sage-green/10 px-2 py-1 rounded-full">
                Verified Purchase
              </span>
            )}
          </div>
          <h3 className={`${titleClasses[variant]} font-display`}>
            {review.title}
          </h3>
        </div>
        
        {variant === 'highlighted' && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-3 h-3 bg-golden-honey rounded-full"></div>
          </div>
        )}
      </div>

      {/* Review content */}
      <blockquote className={`${contentClasses[variant]} font-body`}>
        <p className="italic">"{review.content}"</p>
      </blockquote>

      {/* Footer with reviewer info */}
      <div className="flex items-center justify-between text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-secondary">
            {review.reviewerName}
          </span>
          {review.reviewerLocation && (
            <>
              <span className="text-text-muted">•</span>
              <span>{review.reviewerLocation}</span>
            </>
          )}
        </div>
        <time className="text-text-muted">
          {formatDate(review.date)}
        </time>
      </div>
    </div>
  );
};

export default ReviewCard;