import React, { forwardRef } from 'react';
import { cn } from '@/utils';

// Card component interfaces
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'medium' | 'strong';
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  border?: 'light' | 'medium' | 'strong';
  elevation?: 'low' | 'medium' | 'high';
  responsive?: boolean;
  mobileVariant?: 'compact' | 'full';
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted' | 'minimal';
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;
  padding?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between';
  bordered?: boolean;
  children: React.ReactNode;
}

// Main Card component with glassmorphism effects
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'medium',
      size = 'medium',
      interactive = false,
      border = 'light',
      elevation = 'medium',
      responsive = false,
      mobileVariant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cardClasses = cn(
      // Base glass card styles
      'glass-card',
      
      // Variant classes
      {
        'glass-card-light': variant === 'light',
        'glass-card-medium': variant === 'medium',
        'glass-card-strong': variant === 'strong',
      },
      
      // Size classes
      {
        'glass-card-small': size === 'small',
        'glass-card-medium': size === 'medium',
        'glass-card-large': size === 'large',
      },
      
      // Interactive state
      {
        'glass-card-interactive': interactive,
      },
      
      // Border classes
      {
        'glass-border-light': border === 'light',
        'glass-border-medium': border === 'medium',
        'glass-border-strong': border === 'strong',
      },
      
      // Elevation classes
      {
        'glass-elevation-low': elevation === 'low',
        'glass-elevation-medium': elevation === 'medium',
        'glass-elevation-high': elevation === 'high',
      },
      
      // Responsive classes
      {
        'glass-card-responsive': responsive,
        'glass-card-mobile-compact': mobileVariant === 'compact',
        'glass-card-mobile-full': mobileVariant === 'full',
      },
      
      className
    );

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// CardHeader component
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const headerClasses = cn(
      'glass-card-header',
      {
        'glass-card-header-highlighted': variant === 'highlighted',
        'glass-card-header-minimal': variant === 'minimal',
      },
      className
    );

    return (
      <div ref={ref} className={headerClasses} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// CardBody component
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (
    { scrollable = false, padding = 'medium', className, children, ...props },
    ref
  ) => {
    const bodyClasses = cn(
      'glass-card-body',
      {
        'glass-card-body-scrollable': scrollable,
        'glass-card-body-padding-small': padding === 'small',
        'glass-card-body-padding-medium': padding === 'medium',
        'glass-card-body-padding-large': padding === 'large',
      },
      className
    );

    return (
      <div ref={ref} className={bodyClasses} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// CardFooter component
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (
    { align = 'left', bordered = false, className, children, ...props },
    ref
  ) => {
    const footerClasses = cn(
      'glass-card-footer',
      {
        'glass-card-footer-left': align === 'left',
        'glass-card-footer-center': align === 'center',
        'glass-card-footer-right': align === 'right',
        'glass-card-footer-between': align === 'between',
        'glass-card-footer-bordered': bordered,
      },
      className
    );

    return (
      <div ref={ref} className={footerClasses} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';