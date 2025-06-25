'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

interface HeroSectionEnhancedProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
  authorName: string;
  authorTitle: string;
}

export const HeroSectionEnhanced: React.FC<HeroSectionEnhancedProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  authorName,
  authorTitle
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Author Content */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed">
              {subtitle}
            </p>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              {description}
            </p>
            
            {/* Enhanced CTA Button */}
            <div
              className={`inline-block transition-all duration-300 ease-out ${
                isCtaHovered ? 'transform scale-105' : 'transform scale-100'
              }`}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
            >
              <Button 
                variant="primary" 
                size="large"
                onClick={onCtaClick}
                className={`
                  px-8 py-4 text-lg font-semibold rounded-xl
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:from-blue-700 hover:to-purple-700
                  transform transition-all duration-300 ease-out
                  shadow-lg hover:shadow-xl
                  ${isCtaHovered ? 'shadow-purple-500/25' : 'shadow-blue-500/25'}
                `}
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Enhanced Author Photo */}
          <div
            className={`lg:text-right transition-all duration-1000 ease-out delay-300 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-block relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-200/30 via-blue-200/30 to-purple-300/30 rounded-3xl blur-xl" />
              
              {/* Main photo container */}
              <div className="relative p-6 bg-gradient-to-br from-purple-50/80 via-blue-50/80 to-white/80 backdrop-blur-sm rounded-2xl shadow-2xl">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center text-blue-600 text-9xl shadow-inner">
                  👩‍💼
                </div>
                
                {/* Author info with enhanced styling */}
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {authorName}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {authorTitle}
                  </p>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionEnhanced;