'use client';

import React from 'react';
import { cn } from '@/utils';

export interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'latest-release' | 'bestseller' | 'award' | 'stat' | 'featured';
  label?: string;
  value?: string | number;
  icon?: React.ReactNode;
  variant?: 'gold' | 'warm' | 'sage' | 'cream';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  type = 'latest-release',
  label,
  value,
  icon,
  variant = 'gold',
  size = 'medium',
  animated = true,
  position = 'top-right',
  className,
  children,
  ...props
}) => {
  // Default labels based on type
  const defaultLabels = {
    'latest-release': 'Latest Release',
    'bestseller': 'Bestseller',
    'award': 'Award Winner',
    'stat': 'Stat',
    'featured': 'Featured'
  };

  // Variant color mapping using design tokens
  const variantStyles = {
    gold: {
      background: 'var(--color-warm-gold)',
      text: 'var(--color-warm-navy)',
      border: 'var(--color-secondary-600)'
    },
    warm: {
      background: 'var(--color-warm-cream)',
      text: 'var(--color-warm-navy)',
      border: 'var(--color-warm-gold)'
    },
    sage: {
      background: 'var(--color-warm-sage)',
      text: 'var(--color-warm-cream)',
      border: 'var(--color-warm-gold)'
    },
    cream: {
      background: 'var(--color-warm-beige)',
      text: 'var(--color-warm-navy)',
      border: 'var(--color-warm-sage)'
    }
  };

  // Size mapping
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  // Position mapping
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2', 
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2'
  };

  const currentVariant = variantStyles[variant];
  const displayLabel = label || defaultLabels[type];

  const badgeClasses = cn(
    'absolute',
    'rounded-full',
    'font-semibold',
    'border-2',
    'shadow-lg',
    'backdrop-blur-sm',
    'transition-all',
    'duration-300',
    'z-10',
    sizeClasses[size],
    positionClasses[position],
    {
      'transform hover:scale-110 hover:shadow-xl': animated,
      'animate-pulse': animated && type === 'latest-release',
    },
    className
  );

  const badgeStyle = {
    background: `linear-gradient(135deg, ${currentVariant.background}, ${currentVariant.background}dd)`,
    color: currentVariant.text,
    borderColor: currentVariant.border,
    boxShadow: `0 4px 12px ${currentVariant.background}40`
  };

  return (
    <div
      className={badgeClasses}
      style={badgeStyle}
      {...props}
    >
      <div className="flex items-center gap-1">
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        <div className="flex flex-col items-center">
          {value && (
            <span className="font-bold leading-none">
              {value}
            </span>
          )}
          <span className={cn('leading-none', { 'text-xs': value })}>
            {displayLabel}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};