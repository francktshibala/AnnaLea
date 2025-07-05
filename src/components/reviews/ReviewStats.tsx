'use client';

import React from 'react';
import { ReviewStats as ReviewStatsType } from '@/types';

interface ReviewStatsProps {
  stats: ReviewStatsType;
  title?: string;
  showBookBreakdown?: boolean;
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({ 
  stats, 
  title = "Overall Rating",
  showBookBreakdown = false 
}) => {
  const { averageRating, totalReviews, ratingDistribution } = stats;

  // Calculate percentages for each rating
  const getPercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <h2 className="text-2xl font-bold font-display text-primary mb-6 text-center">
        {title}
      </h2>
      
      {/* Overall Rating Display */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold font-display text-primary mb-2">
          {averageRating.toFixed(1)}
        </div>
        
        {/* Star Display */}
        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className="text-3xl"
              style={{ 
                color: star <= Math.round(averageRating) 
                  ? 'var(--golden-honey)' 
                  : '#e5e7eb' 
              }}
            >
              ★
            </span>
          ))}
        </div>
        
        <div className="text-lg text-secondary font-body">
          Based on <span className="font-semibold">{totalReviews}</span> reviews
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold font-display text-primary mb-4">
          Rating Breakdown
        </h3>
        
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingDistribution[rating as keyof typeof ratingDistribution];
          const percentage = getPercentage(count);
          
          return (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm font-medium text-secondary">{rating}</span>
                <span className="text-sm" style={{ color: 'var(--golden-honey)' }}>★</span>
              </div>
              
              {/* Progress Bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: 'var(--sage-green)'
                  }}
                />
              </div>
              
              <div className="text-sm text-secondary font-medium w-16 text-right">
                {percentage}% ({count})
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold font-display text-primary">
              {ratingDistribution[5] + ratingDistribution[4]}
            </div>
            <div className="text-sm text-secondary">
              4+ Star Reviews
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-primary">
              {getPercentage(ratingDistribution[5] + ratingDistribution[4])}%
            </div>
            <div className="text-sm text-secondary">
              Positive Reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};