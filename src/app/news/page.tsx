import React from 'react';
import { HeroImage } from '@/components/hero/HeroImage';
import { headers } from 'next/headers';

// Force dynamic rendering to prevent static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NewsPage() {
  // Force dynamic rendering by using headers
  const headersList = headers();
  return (
    <main className="min-h-screen">
      {/* Row 1: Hero Section (exactly same as about/books pages) */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Row 2: Page Header */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Author News & Updates
            </h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
            <p className="text-lg lg:text-xl font-body leading-relaxed max-w-4xl mx-auto"
               style={{ color: 'var(--charcoal-navy)' }}>
              Stay connected with Anna Lea's latest book releases, events, and writing journey
            </p>
          </div>
        </div>
      </section>

      {/* Row 3: Latest News Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="space-y-12">
            {/* News Item 1 */}
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden"
                     style={{ 
                       border: '3px solid var(--sage-green)',
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                     }}>
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">📚</div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                        style={{ color: 'var(--charcoal-navy)' }}>
                      Phase 4 Website Transformation Complete
                    </h2>
                    <p className="text-sm lg:text-base font-body" style={{ color: 'var(--sage-green)' }}>
                      January 2025
                    </p>
                  </div>
                </div>
                <p className="text-base lg:text-lg font-body leading-relaxed mb-6"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  We're excited to announce the completion of our website transformation, featuring a cleaner navigation structure and dedicated pages for Biblical Stories and Missionary Tales. The new design better reflects Anna Lea's author brand while maintaining the elegant sage green and burgundy color palette readers love.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                    Website Update
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--burgundy)', color: 'white' }}>
                    New Features
                  </span>
                </div>
              </div>
            </article>

            {/* News Item 2 */}
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden"
                     style={{ 
                       border: '3px solid var(--sage-green)',
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                     }}>
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                        style={{ color: 'var(--charcoal-navy)' }}>
                      Reader Reviews System Launched
                    </h2>
                    <p className="text-sm lg:text-base font-body" style={{ color: 'var(--sage-green)' }}>
                      December 2024
                    </p>
                  </div>
                </div>
                <p className="text-base lg:text-lg font-body leading-relaxed mb-6"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Our new review system showcases testimonials from readers across the globe. With an average rating of 4.7 stars, Anna Lea's books continue to touch hearts and strengthen faith communities worldwide. Visit our Reviews page to see what readers are saying!
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--golden-honey)', color: 'white' }}>
                    Reader Feedback
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--soft-lavender)', color: 'white' }}>
                    4.7 Stars
                  </span>
                </div>
              </div>
            </article>

            {/* News Item 3 */}
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden"
                     style={{ 
                       border: '3px solid var(--sage-green)',
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                     }}>
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">🌍</div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                        style={{ color: 'var(--charcoal-navy)' }}>
                      500+ Books Distributed Worldwide
                    </h2>
                    <p className="text-sm lg:text-base font-body" style={{ color: 'var(--sage-green)' }}>
                      November 2024
                    </p>
                  </div>
                </div>
                <p className="text-base lg:text-lg font-body leading-relaxed mb-6"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Anna Lea's inspirational Christian stories have now reached over 500 readers globally. From "The Isaiah Tree" to "A Missionary Widow," her books continue to inspire faith communities across different cultures and backgrounds. Thank you to all our readers for your continued support!
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                    Milestone
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--burgundy)', color: 'white' }}>
                    Global Reach
                  </span>
                </div>
              </div>
            </article>

            {/* News Item 4 */}
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden"
                     style={{ 
                       border: '3px solid var(--sage-green)',
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                     }}>
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">📖</div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                        style={{ color: 'var(--charcoal-navy)' }}>
                      Amazon Integration Complete
                    </h2>
                    <p className="text-sm lg:text-base font-body" style={{ color: 'var(--sage-green)' }}>
                      October 2024
                    </p>
                  </div>
                </div>
                <p className="text-base lg:text-lg font-body leading-relaxed mb-6"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  All Anna Lea's books are now available for direct purchase through Amazon integration. Readers can easily access both digital and physical copies of "The Isaiah Tree," "Sweet Fruit," and "A Missionary Widow" with just one click.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: '#FF9500', color: 'white' }}>
                    Amazon
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium font-sans" 
                        style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                    Easy Purchase
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Row 4: Newsletter Signup Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mx-auto max-w-4xl"
                 style={{ 
                   border: '3px solid var(--sage-green)',
                   boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                 }}>
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl lg:text-3xl font-black font-display mb-4 tracking-tight leading-tight"
                    style={{ color: 'var(--charcoal-navy)' }}>
                  Stay Updated
                </h3>
                <div className="w-16 h-1 rounded-full mx-auto mb-6"
                     style={{ backgroundColor: 'var(--burgundy)' }}></div>
                <p className="text-base lg:text-lg font-body leading-relaxed mb-8 max-w-2xl mx-auto"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Subscribe to receive the latest news about new book releases, events, and writing updates directly from Anna Lea.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 font-body"
                    style={{ 
                      borderColor: 'var(--sage-green)',
                      focusRingColor: 'var(--sage-green)'
                    }}
                  />
                  <button 
                    className="px-6 py-3 rounded-lg font-medium font-sans transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--sage-green)', 
                      color: 'white',
                      backgroundImage: 'linear-gradient(135deg, var(--sage-green) 0%, #5A6B47 100%)'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}