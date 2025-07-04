'use client';

import React from 'react';
import { HeroImage } from '@/components/hero/HeroImage';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Row 1: Hero Section (exactly same as homepage) */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Row 2: About Anna Lea - Photo + Text Card */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch justify-center">
            
            {/* Photo Container - Left Side */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative mx-auto"
                     style={{ 
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.3)',
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
            <div className="flex items-stretch justify-center">
              <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 lg:p-8 xl:p-10 flex flex-col justify-center mx-auto" 
                   style={{ 
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.25), 0 8px 24px rgba(139, 74, 107, 0.15)',
                     minHeight: '500px'
                   }}>
                
                {/* Card Header */}
                <div className="mb-6 text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black font-display mb-4 tracking-tight leading-tight"
                      style={{ color: 'var(--charcoal-navy)' }}>
                    About Anna Lea
                  </h1>
                  <div className="w-16 h-1 rounded-full mx-auto lg:mx-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                </div>
                
                {/* Card Content */}
                <div className="space-y-4 text-sm lg:text-base xl:text-lg font-body leading-relaxed flex-grow text-center lg:text-left">
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
                  <div className="lg:ml-4 space-y-3 py-2">
                    <div className="flex items-start gap-3 justify-center lg:justify-start">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <div className="text-center lg:text-left">
                        <span className="font-bold text-base lg:text-lg" style={{ color: 'var(--burgundy)' }}>
                          Sweet Fruit: The Palm Tree That Was Touched by Jesus
                        </span>
                        <span className="block text-xs lg:text-sm mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A biblical allegory about renewal and forgiveness
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-center lg:justify-start">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <div className="text-center lg:text-left">
                        <span className="font-bold text-base lg:text-lg" style={{ color: 'var(--burgundy)' }}>
                          A Missionary Widow: The Enduring Power of Faith and Love
                        </span>
                        <span className="block text-xs lg:text-sm mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A heartfelt adult memoir about faith, grief, and resilience
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mission Statement */}
                  <div className="mt-6 p-4 rounded-lg"
                       style={{ backgroundColor: 'var(--sage-green)', opacity: '0.1' }}>
                    <p className="font-semibold text-base lg:text-lg text-center" style={{ color: 'var(--sage-green)' }}>
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