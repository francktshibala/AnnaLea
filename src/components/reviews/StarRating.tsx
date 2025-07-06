'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg' | 'large';
  showNumber?: boolean;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className = '',
  interactive = false,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const displayRating = interactive ? (hoverRating || rating) : rating;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = !interactive && displayRating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    large: 'text-xl',
  };

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const handleStarHover = (starIndex: number) => {
    if (interactive) {
      setHoverRating(starIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5" onMouseLeave={handleMouseLeave}>
        {/* Render all stars */}
        {[...Array(maxRating)].map((_, index) => {
          const isFilled = index < fullStars;
          const isHalfFilled = index === fullStars && hasHalfStar;
          
          return (
            <div
              key={index}
              className={`relative ${interactive ? 'cursor-pointer transform transition-transform hover:scale-110' : ''}`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
            >
              {isHalfFilled ? (
                // Half star
                <div className="relative">
                  <svg
                    className={`${sizeClasses[size]} text-gray-200 fill-current drop-shadow-sm`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                    <svg
                      className={`${sizeClasses[size]} fill-current drop-shadow-sm`}
                      style={{ color: 'var(--golden-honey)' }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              ) : (
                // Full or empty star
                <svg
                  className={`${sizeClasses[size]} fill-current drop-shadow-sm transition-colors duration-200`}
                  style={{ color: isFilled ? 'var(--golden-honey)' : '#E5E7EB' }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Rating number */}
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-text-secondary font-medium`}>
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;