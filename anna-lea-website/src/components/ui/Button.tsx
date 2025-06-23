import React, { forwardRef } from 'react';
import { cn } from '@/utils';

// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  as?: 'button' | 'a';
  href?: string;
  children: React.ReactNode;
}

// Button component following TDD principles
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      disabled = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      as = 'button',
      href,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Base button classes
    const baseClasses = 'btn';
    
    // Variant classes
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
      ghost: 'btn-ghost',
      danger: 'btn-danger',
    };

    // Size classes
    const sizeClasses = {
      small: 'btn-small',
      medium: 'btn-medium',
      large: 'btn-large',
    };

    // State classes
    const stateClasses = {
      disabled: disabled ? 'btn-disabled' : '',
      loading: loading ? 'btn-loading' : '',
      fullWidth: fullWidth ? 'btn-full-width' : '',
    };

    // Combine all classes
    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      stateClasses.disabled,
      stateClasses.loading,
      stateClasses.fullWidth,
      className
    );

    // Handle click events
    const handleClick = (e: React.MouseEvent) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      onClick?.(e as any);
    };

    // Render content with icon
    const renderContent = () => {
      if (loading) {
        return 'Loading...';
      }

      if (icon) {
        return (
          <>
            {iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
            {iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
          </>
        );
      }

      return children;
    };

    // Render as anchor tag
    if (as === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={buttonClasses}
          onClick={handleClick}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {renderContent()}
        </a>
      );
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';