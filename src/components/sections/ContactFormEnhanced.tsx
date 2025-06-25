'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

interface ContactFormEnhancedProps {
  onSubmit?: (formData: ContactFormData) => Promise<void>;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactFormEnhanced: React.FC<ContactFormEnhancedProps> = ({
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        return !validateEmail(value) ? 'Please enter a valid email address' : undefined;
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Real-time validation for email
    if (name === 'email' && value) {
      const error = validateField(name, value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    setFocusedField('');
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: ValidationErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'subject') { // subject is optional
        const error = validateField(key, value);
        if (error) newErrors[key as keyof ValidationErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageLength = formData.message.length;
  const maxLength = 500;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${className}`}>
      {/* Contact Info */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Get in Touch
        </h3>
        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl transition-all duration-300 hover:bg-blue-100">
            <span className="text-blue-600 text-2xl">📧</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Email</p>
              <p className="text-gray-600">hello@annaleacannon.com</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl transition-all duration-300 hover:bg-purple-100">
            <span className="text-purple-600 text-2xl">📱</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Speaking Engagements</p>
              <p className="text-gray-600">Available for church events and book clubs</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl transition-all duration-300 hover:bg-indigo-100">
            <span className="text-indigo-600 text-2xl">📖</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Book Discussions</p>
              <p className="text-gray-600">Join our monthly reader's circle</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-xl">📬</span> Newsletter
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Subscribe to receive updates about new books, upcoming events, 
            and inspirational stories directly from Anna Lea.
          </p>
        </div>
      </div>

      {/* Enhanced Contact Form */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-xl">✅</span>
              <p className="text-green-800 font-medium">
                Thank you! Your message has been sent successfully.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`
                w-full px-4 py-3 border rounded-xl transition-all duration-300
                ${focusedField === 'name' ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'border-gray-300'}
                ${errors.name ? 'border-red-500 bg-red-50' : 'hover:border-gray-400'}
                focus:outline-none
              `}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`
                w-full px-4 py-3 border rounded-xl transition-all duration-300
                ${focusedField === 'email' ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'border-gray-300'}
                ${errors.email ? 'border-red-500 bg-red-50' : 'hover:border-gray-400'}
                focus:outline-none
              `}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`
                w-full px-4 py-3 border rounded-xl transition-all duration-300
                ${focusedField === 'subject' ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'border-gray-300'}
                hover:border-gray-400 focus:outline-none
              `}
              placeholder="What's this about?"
            />
          </div>

          {/* Message Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                Message *
              </label>
              <span className={`text-xs ${messageLength > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
                {messageLength}/{maxLength}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              maxLength={maxLength}
              className={`
                w-full px-4 py-3 border rounded-xl transition-all duration-300 resize-none
                ${focusedField === 'message' ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'border-gray-300'}
                ${errors.message ? 'border-red-500 bg-red-50' : 'hover:border-gray-400'}
                focus:outline-none
              `}
              placeholder="Share your thoughts, questions, or feedback..."
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span>⚠️</span> {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="primary" 
            size="large"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`
              w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Message...
              </div>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormEnhanced;