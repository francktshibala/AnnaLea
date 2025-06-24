'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { cn } from '@/utils';

export interface NewsletterSignupProps {
  onSignup?: (email: string) => void;
  className?: string;
  variant?: 'default' | 'modal' | 'hero';
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  source?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  onSignup,
  className,
  variant = 'default',
  title = 'Get Updates on New Releases',
  description,
  buttonText = 'Get Updates',
  placeholder = 'Enter your email',
  source = 'newsletter-component',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Call parent handler if provided
      if (onSignup) {
        onSignup(email);
      }

      // Store in localStorage as mock email service
      const existingSignups = JSON.parse(localStorage.getItem('anna-lea-newsletter') || '[]');
      
      // Check if email already exists
      const emailExists = existingSignups.some((signup: any) => signup.email === email);
      
      if (emailExists) {
        setMessage({ type: 'error', text: 'This email is already subscribed!' });
        setIsSubmitting(false);
        return;
      }

      // Add new signup
      const newSignup = {
        email,
        timestamp: new Date().toISOString(),
        source,
      };
      
      existingSignups.push(newSignup);
      localStorage.setItem('anna-lea-newsletter', JSON.stringify(existingSignups));

      setEmail('');
      setMessage({ type: 'success', text: 'Successfully subscribed! Thank you for joining our newsletter.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }

    setIsSubmitting(false);
  };

  const containerClasses = cn(
    'newsletter-signup',
    {
      'newsletter-signup-default': variant === 'default',
      'newsletter-signup-modal': variant === 'modal', 
      'newsletter-signup-hero': variant === 'hero',
    },
    className
  );

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20',
          title: 'text-lg font-semibold text-white mb-3',
          form: 'flex flex-col sm:flex-row gap-3',
          input: 'flex-1 bg-white/20 border-white/30 text-white placeholder-white/60',
          button: 'btn-secondary',
        };
      case 'modal':
        return {
          container: 'bg-gray-50 rounded-xl p-6 border border-gray-200',
          title: 'text-lg font-semibold text-gray-900 mb-3',
          form: 'flex flex-col sm:flex-row gap-3',
          input: 'flex-1',
          button: 'btn-primary',
        };
      default:
        return {
          container: 'bg-white rounded-xl p-6 shadow-lg border border-gray-200',
          title: 'text-lg font-semibold text-gray-900 mb-3',
          form: 'flex flex-col sm:flex-row gap-3',
          input: 'flex-1',
          button: 'btn-primary',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={cn(containerClasses, styles.container)}>
      <h3 className={styles.title}>
        {title}
      </h3>
      
      {description && (
        <p className={cn(
          'mb-4 text-sm',
          variant === 'hero' ? 'text-white/80' : 'text-gray-600'
        )}>
          {description}
        </p>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          aria-label="Email address for newsletter signup"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          variant={styles.button.replace('btn-', '') as any}
          disabled={!email.trim() || isSubmitting}
          loading={isSubmitting}
        >
          {buttonText}
        </Button>
      </form>

      {message && (
        <div
          className={cn(
            'mt-3 text-sm',
            message.type === 'success' 
              ? (variant === 'hero' ? 'text-green-300' : 'text-green-600')
              : (variant === 'hero' ? 'text-red-300' : 'text-red-600')
          )}
          role={message.type === 'error' ? 'alert' : 'status'}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};