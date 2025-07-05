import React from 'react';
import { HeroImage } from '@/components/hero/HeroImage';
import { headers } from 'next/headers';

// Force dynamic rendering to prevent static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AboutPage() {
  // Force dynamic rendering by using headers
  const headersList = headers();
  return (
    <main className="min-h-screen">
      {/* Row 1: Hero Section (exactly same as homepage) */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Row 2: About Anna Lea - Photo + Text Card */}
      <section className="pt-20 pb-20 lg:pt-24 lg:pb-32 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch justify-center">
            
            {/* Photo Container - Left Side */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg" style={{ margin: '1rem' }}>
                <div className="rounded-2xl overflow-hidden relative mx-auto"
                     style={{ 
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.3)',
                       border: '4px solid var(--sage-green)',
                       height: '500px',
                       minHeight: '500px'
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
              <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col justify-center mx-auto" 
                   style={{ 
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.25), 0 8px 24px rgba(139, 74, 107, 0.15)',
                     height: '500px',
                     minHeight: '500px',
                     padding: '2rem',
                     margin: '1rem'
                   }}>
                
                {/* Card Header */}
                <div className="mb-4 text-center lg:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-display mb-3 tracking-tight leading-tight"
                      style={{ color: 'var(--charcoal-navy)' }}>
                    About Anna Lea
                  </h1>
                  <div className="w-12 h-1 rounded-full mx-auto lg:mx-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                </div>
                
                {/* Card Content */}
                <div className="space-y-3 text-sm lg:text-sm xl:text-base font-body leading-relaxed flex-grow text-center lg:text-left overflow-y-auto">
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
                  <div className="lg:ml-4 space-y-2 py-1">
                    <div className="flex items-start gap-2 justify-center lg:justify-start">
                      <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <div className="text-center lg:text-left">
                        <span className="font-bold text-sm lg:text-base" style={{ color: 'var(--burgundy)' }}>
                          Sweet Fruit: The Palm Tree That Was Touched by Jesus
                        </span>
                        <span className="block text-xs mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A biblical allegory about renewal and forgiveness
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 justify-center lg:justify-start">
                      <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <div className="text-center lg:text-left">
                        <span className="font-bold text-sm lg:text-base" style={{ color: 'var(--burgundy)' }}>
                          A Missionary Widow: The Enduring Power of Faith and Love
                        </span>
                        <span className="block text-xs mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A heartfelt adult memoir about faith, grief, and resilience
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mission Statement */}
                  <div className="mt-3 p-2 rounded-lg"
                       style={{ backgroundColor: 'var(--sage-green)', opacity: '0.1' }}>
                    <p className="font-semibold text-xs lg:text-sm text-center" style={{ color: 'var(--sage-green)' }}>
                      Her mission: help families share faith-based stories that make sense to kids.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future rows will be added incrementally - Updated for deployment */}
    </main>
  );
}
