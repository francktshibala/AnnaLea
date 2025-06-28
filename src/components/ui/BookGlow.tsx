'use client';

import React from 'react';
import { cn } from '@/utils';

export interface BookGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'subtle' | 'medium' | 'strong';
  color?: 'gold' | 'warm' | 'sage';
  animated?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const BookGlow: React.FC<BookGlowProps> = ({
  intensity = 'medium',
  color = 'gold',
  animated = true,
  size = 'medium',
  className,
  children,
  ...props
}) => {
  // Color mapping using design tokens
  const colorMap = {
    gold: 'var(--color-warm-gold)',
    warm: 'var(--color-secondary-400)',
    sage: 'var(--color-warm-sage)'
  };

  // Intensity mapping
  const intensityMap = {
    subtle: '0.2',
    medium: '0.35',
    strong: '0.5'
  };

  // Size mapping for blur radius
  const sizeMap = {
    small: '8px',
    medium: '16px', 
    large: '24px'
  };

  const glowStyles = {
    '--glow-color': colorMap[color],
    '--glow-intensity': intensityMap[intensity],
    '--glow-blur': sizeMap[size],
  } as React.CSSProperties;

  const glowClasses = cn(
    'relative',
    'before:absolute',
    'before:inset-0',
    'before:rounded-inherit',
    'before:blur-md',
    'before:transition-opacity',
    'before:duration-500',
    {
      'before:animate-pulse': animated && intensity !== 'subtle',
      'before:opacity-0 hover:before:opacity-100': intensity === 'subtle',
      'before:opacity-60 hover:before:opacity-100': intensity === 'medium',
      'before:opacity-80 hover:before:opacity-100': intensity === 'strong',
    },
    className
  );

  return (
    <div
      className={glowClasses}
      style={glowStyles}
      {...props}
    >
      <style jsx>{`
        .relative::before {
          background: radial-gradient(
            circle,
            var(--glow-color) 0%,
            transparent 70%
          );
          filter: blur(var(--glow-blur));
          opacity: var(--glow-intensity);
          z-index: -1;
        }
      `}</style>
      {children}
    </div>
  );
};