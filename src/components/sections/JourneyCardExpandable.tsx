'use client';

import React, { useState } from 'react';

interface JourneyCardExpandableProps {
  icon: string;
  title: string;
  subtitle?: string;
  content: string[];
  initiallyExpanded?: boolean;
  className?: string;
}

export const JourneyCardExpandable: React.FC<JourneyCardExpandableProps> = ({
  icon,
  title,
  subtitle,
  content,
  initiallyExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl border border-gray-200 p-10 lg:p-12
        transition-all duration-300 ease-out cursor-pointer
        ${isHovered 
          ? 'transform -translate-y-2 shadow-xl shadow-blue-500/10' 
          : 'transform translate-y-0 shadow-lg'
        }
        ${isExpanded ? 'bg-gradient-to-br from-blue-50/50 to-purple-50/50' : ''}
        ${className}
      `}
      onClick={toggleExpansion}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-6 lg:mb-8">
        <div className="flex items-center gap-6">
          <div className={`
            text-4xl lg:text-5xl transition-transform duration-300 ease-out
            ${isExpanded ? 'transform scale-110' : 'transform scale-100'}
          `}>
            {icon}
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-gray-600 text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Expand/Collapse Indicator */}
        <div className={`
          text-gray-400 text-xl transition-transform duration-300 ease-out
          ${isExpanded ? 'transform rotate-180' : 'transform rotate-0'}
        `}>
          ▼
        </div>
      </div>

      {/* Preview Content (Always Visible) */}
      <div className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 lg:mb-8">
        {content[0]}
      </div>

      {/* Expandable Content */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-out
          ${isExpanded 
            ? 'max-h-96 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-2'
          }
        `}
      >
        <div className="pt-6 lg:pt-8 border-t border-gray-200">
          {content.slice(1).map((paragraph, index) => (
            <p key={index} className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Subtle Interaction Hint */}
      <div className={`
        absolute bottom-4 right-4 text-xs text-gray-400 transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-60'}
      `}>
        {isExpanded ? 'Click to collapse' : 'Click to expand'}
      </div>

      {/* Decorative Elements */}
      <div className={`
        absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl
        transition-opacity duration-300 ease-out
        ${isExpanded ? 'opacity-100' : 'opacity-0'}
      `} />
      
      {/* Floating accent */}
      <div className={`
        absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full
        transition-all duration-300 ease-out
        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
      `} />
    </div>
  );
};

export default JourneyCardExpandable;