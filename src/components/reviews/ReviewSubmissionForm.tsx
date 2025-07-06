'use client';

import React, { useState } from 'react';
import StarRating from './StarRating';
import { featuredBooks } from '@/data/books';

interface ReviewSubmissionFormProps {
  onSubmit?: (reviewData: ReviewFormData) => void;
  onCancel?: () => void;
}

export interface ReviewFormData {
  bookId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
}

export default function ReviewSubmissionForm({ onSubmit, onCancel }: ReviewSubmissionFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    bookId: '',
    customerName: '',
    customerEmail: '',
    rating: 0,
    comment: ''
  });
  
  const [errors, setErrors] = useState<Partial<ReviewFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Partial<ReviewFormData> = {};
    
    if (!formData.bookId) {
      newErrors.bookId = 'Please select a book';
    }
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Submit to API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          bookId: '',
          customerName: '',
          customerEmail: '',
          rating: 0,
          comment: ''
        });
        setErrors({});
        
        // Call onSubmit callback if provided
        if (onSubmit) {
          onSubmit(formData);
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReviewFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto border-2"
           style={{ borderColor: 'var(--sage-green)' }}>
        <div className="text-center">
          <div className="text-6xl text-green-500 mb-4">✅</div>
          <h3 className="text-2xl font-bold font-display mb-4"
              style={{ color: 'var(--sage-green)' }}>
            Thank You for Your Review!
          </h3>
          <p className="text-secondary font-body mb-6">
            Your review has been submitted and will appear on the site once approved by Anna Lea.
          </p>
          <button
            onClick={() => {
              setSubmitStatus('idle');
              if (onCancel) onCancel();
            }}
            className="px-6 py-3 rounded-lg font-medium font-sans transition-all duration-300 text-white"
            style={{ backgroundColor: 'var(--sage-green)' }}
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto border-2"
         style={{ borderColor: 'var(--sage-green)' }}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold font-display mb-4"
            style={{ color: 'var(--charcoal-navy)' }}>
          Share Your Review
        </h3>
        <p className="text-secondary font-body">
          Help other readers discover Anna Lea's inspiring stories
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Selection */}
        <div>
          <label className="block text-sm font-medium font-sans mb-2"
                 style={{ color: 'var(--charcoal-navy)' }}>
            Which book are you reviewing? *
          </label>
          <select
            value={formData.bookId}
            onChange={(e) => handleInputChange('bookId', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-sage-green/30 transition-all duration-300"
            style={{ 
              borderColor: errors.bookId ? '#ef4444' : 'var(--sage-green)',
            }}
          >
            <option value="">Select a book...</option>
            {featuredBooks.map(book => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          {errors.bookId && (
            <p className="text-red-500 text-sm mt-1">{errors.bookId}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium font-sans mb-2"
                 style={{ color: 'var(--charcoal-navy)' }}>
            Your Name *
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-sage-green/30 transition-all duration-300"
            style={{ 
              borderColor: errors.customerName ? '#ef4444' : 'var(--sage-green)',
            }}
            placeholder="Enter your name"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium font-sans mb-2"
                 style={{ color: 'var(--charcoal-navy)' }}>
            Email Address *
          </label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-sage-green/30 transition-all duration-300"
            style={{ 
              borderColor: errors.customerEmail ? '#ef4444' : 'var(--sage-green)',
            }}
            placeholder="Enter your email"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your email will not be displayed publicly
          </p>
          {errors.customerEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium font-sans mb-2"
                 style={{ color: 'var(--charcoal-navy)' }}>
            Rating *
          </label>
          <div className="flex items-center space-x-4">
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => handleInputChange('rating', rating)}
              interactive={true}
              size="large"
            />
            <span className="text-sm text-gray-500">
              {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Click to rate'}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium font-sans mb-2"
                 style={{ color: 'var(--charcoal-navy)' }}>
            Your Review *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-sage-green/30 transition-all duration-300 resize-none"
            style={{ 
              borderColor: errors.comment ? '#ef4444' : 'var(--sage-green)',
            }}
            placeholder="Share your thoughts about this book..."
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              Minimum 10 characters
            </span>
            <span className="text-xs text-gray-500">
              {formData.comment.length}/500
            </span>
          </div>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">
              There was an error submitting your review. Please try again.
            </p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 rounded-lg font-medium font-sans transition-all duration-300 text-white transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sage-green/30 focus:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--sage-green)' }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'var(--charcoal-navy)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(107, 124, 89, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'var(--sage-green)';
                e.currentTarget.style.boxShadow = '';
              }
            }}
          >
            {isSubmitting ? '✨ Submitting...' : '✍️ Submit Review'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 rounded-lg font-medium font-sans transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sage-green/30 focus:scale-105"
              style={{ 
                borderColor: 'var(--sage-green)',
                color: 'var(--sage-green)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sage-green)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'var(--sage-green)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(107, 124, 89, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--sage-green)';
                e.currentTarget.style.borderColor = 'var(--sage-green)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}