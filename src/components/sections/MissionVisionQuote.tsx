'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MissionVisionQuoteProps {
  title: string;
  quote: string;
  description: string;
  className?: string;
}

export const MissionVisionQuote: React.FC<MissionVisionQuoteProps> = ({
  title,
  quote,
  description,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`
        relative overflow-hidden
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with subtle animation */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-80 scale-95'}
        ${isHovered ? 'from-blue-100 via-purple-100 to-indigo-100' : ''}
      `} />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-t-3xl" />
      
      {/* Content container */}
      <div className={`
        relative z-10 p-12 text-center
        transition-all duration-800 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        {/* Title */}
        <h3 className={`
          text-3xl lg:text-4xl font-bold text-gray-900 mb-8
          transition-all duration-300 ease-out
          ${isHovered ? 'transform scale-105' : 'transform scale-100'}
        `}>
          {title}
        </h3>

        {/* Decorative opening quote */}
        <div className={`
          text-6xl lg:text-7xl text-blue-300 leading-none mb-6
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 transform rotate-0' : 'opacity-0 transform rotate-12'}
        `}>
          "
        </div>

        {/* Main quote */}
        <blockquote className={`
          text-xl lg:text-2xl text-gray-800 italic font-medium leading-relaxed mb-8
          transition-all duration-700 ease-out delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {quote}
        </blockquote>

        {/* Decorative closing quote */}
        <div className={`
          text-6xl lg:text-7xl text-purple-300 leading-none mb-8 flex justify-end
          transition-all duration-500 ease-out delay-300
          ${isVisible ? 'opacity-100 transform rotate-0' : 'opacity-0 transform -rotate-12'}
        `}>
          "
        </div>

        {/* Description */}
        <p className={`
          text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto
          transition-all duration-800 ease-out delay-400
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {description}
        </p>

        {/* Decorative underline */}
        <div className={`
          mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full
          transition-all duration-600 ease-out delay-500
          ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
        `} />
      </div>

      {/* Floating accent elements */}
      <div className={`
        absolute top-8 right-8 w-4 h-4 bg-blue-400 rounded-full
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-60 animate-pulse' : 'opacity-0'}
      `} />
      <div className={`
        absolute bottom-8 left-8 w-6 h-6 bg-purple-400 rounded-full
        transition-all duration-700 ease-out delay-200
        ${isVisible ? 'opacity-40 animate-pulse' : 'opacity-0'}
      `} />
      <div className={`
        absolute top-1/2 left-4 w-3 h-3 bg-indigo-400 rounded-full
        transition-all duration-700 ease-out delay-400
        ${isVisible ? 'opacity-50 animate-pulse' : 'opacity-0'}
      `} />

      {/* Subtle parallax effect overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-3xl
        transition-opacity duration-500 ease-out
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
    </div>
  );
};

export default MissionVisionQuote;