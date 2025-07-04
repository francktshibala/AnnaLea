'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Row 1: Anna Lea Bio + Photo */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Photo on Left */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/images/anna-lea-bio.jpg" 
                  alt="Anna Lea Cannon - Author Photo"
                  className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
                  style={{ 
                    aspectRatio: '3/4',
                    filter: 'brightness(1.05) contrast(1.1)',
                    border: '4px solid var(--sage-green)',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>

            {/* Bio Text on Right */}
            <div className="space-y-6 lg:pl-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-primary mb-6 tracking-tight leading-tight">
                About Anna Lea
              </h1>
              
              <div className="space-y-4 text-lg font-body text-secondary leading-relaxed">
                <p>
                  Anna Lea Cannon is an American author and educator with a gift for making spiritual truths easy for children to understand.
                </p>
                
                <p>
                  Her teaching background gives her books a warm, natural style—more like sitting with a caring storyteller than reading a sermon.
                </p>
                
                <p>
                  She's also the author of:
                </p>
                
                <div className="ml-4 space-y-2">
                  <p>
                    <span className="font-semibold" style={{ color: 'var(--burgundy)' }}>
                      Sweet Fruit: The Palm Tree That Was Touched by Jesus
                    </span> – A biblical allegory about renewal and forgiveness
                  </p>
                  
                  <p>
                    <span className="font-semibold" style={{ color: 'var(--burgundy)' }}>
                      A Missionary Widow: The Enduring Power of Faith and Love
                    </span> – A heartfelt adult memoir about faith, grief, and resilience
                  </p>
                </div>
                
                <p className="pt-4 font-medium" style={{ color: 'var(--sage-green)' }}>
                  Her mission is simple: to help families share faith-based stories that make sense to kids.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future rows will be added incrementally */}
    </main>
  );
}