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

  const baseClasses = "bg-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group";
  
  const variantClasses = {
    default: "p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-sage-green/30 hover:scale-[1.02]",
    highlighted: "p-10 bg-gradient-to-br from-white to-cream shadow-xl border-2 hover:shadow-2xl border-sage-green/30 hover:border-sage-green/50",
    compact: "p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-sage-green/20"
  };

  const titleClasses = {
    default: "text-xl font-semibold text-text-primary mb-3 group-hover:text-sage-green transition-colors duration-200",
    highlighted: "text-2xl font-bold text-text-primary mb-4 group-hover:text-sage-green transition-colors duration-200",
    compact: "text-lg font-semibold text-text-primary mb-2 group-hover:text-sage-green transition-colors duration-200"
  };

  const contentClasses = {
    default: "text-text-secondary leading-loose mb-6",
    highlighted: "text-text-secondary leading-loose mb-8 text-lg",
    compact: "text-text-secondary leading-relaxed mb-4 text-sm"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Header with rating and title */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <StarRating 
              rating={review.rating} 
              size={variant === 'highlighted' ? 'lg' : variant === 'compact' ? 'sm' : 'md'}
            />
            {review.isVerifiedPurchase && (
              <span className="text-xs text-sage-green font-medium bg-sage-green/10 px-3 py-1.5 rounded-full transition-all duration-200 group-hover:bg-sage-green/20 group-hover:scale-105">
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
            <div className="w-3 h-3 bg-golden-honey rounded-full transition-all duration-200 group-hover:scale-125 group-hover:shadow-lg"></div>
          </div>
        )}
      </div>

      {/* Review content */}
      <blockquote className={`${contentClasses[variant]} font-body`}>
        <p className="italic text-base leading-relaxed" style={{ color: 'var(--charcoal-navy)' }}>
          "{review.content}"
        </p>
      </blockquote>

      {/* Footer with reviewer info */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-base font-display" style={{ color: 'var(--charcoal-navy)' }}>
            {review.reviewerName}
          </span>
          {review.reviewerLocation && (
            <span className="text-sm" style={{ color: 'var(--sage-green)' }}>
              {review.reviewerLocation}
            </span>
          )}
        </div>
        <time className="text-sm font-medium" style={{ color: 'var(--burgundy)' }}>
          {formatDate(review.date)}
        </time>
      </div>
    </div>
  );
};

export default ReviewCard;