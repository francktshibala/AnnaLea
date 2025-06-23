import React, { forwardRef, useId } from 'react';
import { cn } from '@/utils';

// Input component interface
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helpText?: string;
  error?: string;
  success?: boolean;
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  responsive?: boolean;
}

// Input component with glassmorphism effects
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      success = false,
      size = 'medium',
      leftIcon,
      rightIcon,
      responsive = false,
      className,
      id: providedId,
      required = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helpTextId = `${id}-help`;
    const errorId = `${id}-error`;

    // Determine input classes
    const inputClasses = cn(
      'glass-input',
      
      // Size classes
      {
        'glass-input-small': size === 'small',
        'glass-input-medium': size === 'medium',
        'glass-input-large': size === 'large',
      },
      
      // State classes
      {
        'glass-input-error': !!error,
        'glass-input-success': success && !error,
        'glass-input-with-left-icon': !!leftIcon,
        'glass-input-with-right-icon': !!rightIcon,
        'glass-input-with-both-icons': !!leftIcon && !!rightIcon,
        'glass-input-responsive': responsive,
      },
      
      className
    );

    // Container classes for input with icons
    const containerClasses = cn(
      'glass-input-container',
      {
        'glass-input-container-with-icons': leftIcon || rightIcon,
      }
    );

    // Build aria-describedby attribute
    const describedBy = [];
    if (helpText) describedBy.push(helpTextId);
    if (error) describedBy.push(errorId);

    return (
      <div className="glass-input-wrapper">
        {/* Label */}
        {label && (
          <label 
            htmlFor={id} 
            className="glass-input-label"
          >
            {label}
            {required && <span className="glass-input-required">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className={containerClasses}>
          {/* Left Icon */}
          {leftIcon && (
            <div className="glass-input-icon glass-input-icon-left">
              {leftIcon}
            </div>
          )}

          {/* Input Element */}
          <input
            ref={ref}
            id={id}
            className={inputClasses}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy.length > 0 ? describedBy.join(' ') : undefined}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="glass-input-icon glass-input-icon-right">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Help Text */}
        {helpText && !error && (
          <div id={helpTextId} className="glass-input-help">
            {helpText}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div id={errorId} className="glass-input-error-message">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';