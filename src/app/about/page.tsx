'use client';

import React from 'react';
import { HeroImage } from '@/components/hero/HeroImage';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Row 1: Hero Section (exactly same as homepage) */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Row 2: About Anna Lea - Photo + Text Card */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
            
            {/* Photo Container - Left Side */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 16px 48px rgba(107, 124, 89, 0.25)',
                       border: '4px solid var(--sage-green)'
                     }}>
                  <img 
                    src="/images/anna-lea-bio.jpg" 
                    alt="Anna Lea Cannon - Author Photo"
                    className="w-full h-full object-cover"
                    style={{ 
                      filter: 'brightness(1.05) contrast(1.1)'
                    }}
                  />
                  {/* Photo overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 text-center py-3"
                       style={{ 
                         backgroundColor: 'var(--sage-green)', 
                         backgroundImage: 'linear-gradient(135deg, var(--sage-green) 0%, var(--burgundy) 100%)'
                       }}>
                    <div className="text-sm font-semibold text-white font-sans tracking-wide">
                      Anna Lea Cannon
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Card Container - Right Side */}
            <div className="flex items-stretch lg:justify-start">
              <div className="w-full bg-white rounded-2xl shadow-xl p-8 lg:p-10 flex flex-col justify-center" 
                   style={{ 
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 16px 48px rgba(107, 124, 89, 0.2), 0 4px 16px rgba(139, 74, 107, 0.1)',
                     minHeight: '500px'
                   }}>
                
                {/* Card Header */}
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display mb-4 tracking-tight leading-tight"
                      style={{ color: 'var(--charcoal-navy)' }}>
                    About Anna Lea
                  </h1>
                  <div className="w-16 h-1 rounded-full"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                </div>
                
                {/* Card Content */}
                <div className="space-y-5 text-base lg:text-lg font-body leading-relaxed flex-grow">
                  <p style={{ color: 'var(--charcoal-navy)' }}>
                    Anna Lea Cannon is an American author and educator with a gift for making spiritual truths easy for children to understand.
                  </p>
                  
                  <p style={{ color: 'var(--charcoal-navy)' }}>
                    Her teaching background gives her books a warm, natural style—more like sitting with a caring storyteller than reading a sermon.
                  </p>
                  
                  <p style={{ color: 'var(--charcoal-navy)' }}>
                    She's also the author of:
                  </p>
                  
                  {/* Highlighted Books */}
                  <div className="ml-4 space-y-3 py-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <p>
                        <span className="font-bold text-lg" style={{ color: 'var(--burgundy)' }}>
                          Sweet Fruit: The Palm Tree That Was Touched by Jesus
                        </span>
                        <span className="block text-sm mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A biblical allegory about renewal and forgiveness
                        </span>
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <p>
                        <span className="font-bold text-lg" style={{ color: 'var(--burgundy)' }}>
                          A Missionary Widow: The Enduring Power of Faith and Love
                        </span>
                        <span className="block text-sm mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A heartfelt adult memoir about faith, grief, and resilience
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Mission Statement */}
                  <div className="mt-8 p-4 rounded-lg"
                       style={{ backgroundColor: 'var(--sage-green)', opacity: '0.1' }}>
                    <p className="font-semibold text-lg text-center" style={{ color: 'var(--sage-green)' }}>
                      Her mission is simple: to help families share faith-based stories that make sense to kids.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future rows will be added incrementally */}
    </main>
  );
}