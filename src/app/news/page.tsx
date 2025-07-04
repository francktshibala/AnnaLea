'use client';

import React from 'react';

export default function NewsPage() {
  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-primary mb-4">
            Author News & Updates
          </h1>
          <p className="text-xl text-secondary font-body max-w-2xl mx-auto">
            Stay connected with Anna Lea's latest book releases, events, and writing journey
          </p>
        </div>

        {/* Latest News */}
        <div className="space-y-8">
          {/* News Item 1 */}
          <article className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl">📚</div>
              <div>
                <h2 className="text-2xl font-bold font-display text-primary">
                  Phase 4 Website Transformation Complete
                </h2>
                <p className="text-sm text-secondary">January 2025</p>
              </div>
            </div>
            <p className="text-secondary font-body mb-4">
              We're excited to announce the completion of our website transformation, featuring a cleaner navigation structure and dedicated pages for Biblical Stories and Missionary Tales. The new design better reflects Anna Lea's author brand while maintaining the elegant sage green and burgundy color palette readers love.
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                Website Update
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--burgundy)', color: 'white' }}>
                New Features
              </span>
            </div>
          </article>

          {/* News Item 2 */}
          <article className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl">⭐</div>
              <div>
                <h2 className="text-2xl font-bold font-display text-primary">
                  Reader Reviews System Launched
                </h2>
                <p className="text-sm text-secondary">December 2024</p>
              </div>
            </div>
            <p className="text-secondary font-body mb-4">
              Our new review system showcases testimonials from readers across the globe. With an average rating of 4.7 stars, Anna Lea's books continue to touch hearts and strengthen faith communities worldwide. Visit our Reviews page to see what readers are saying!
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--golden-honey)', color: 'white' }}>
                Reader Feedback
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--soft-lavender)', color: 'white' }}>
                4.7 Stars
              </span>
            </div>
          </article>

          {/* News Item 3 */}
          <article className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl">🌍</div>
              <div>
                <h2 className="text-2xl font-bold font-display text-primary">
                  500+ Books Distributed Worldwide
                </h2>
                <p className="text-sm text-secondary">November 2024</p>
              </div>
            </div>
            <p className="text-secondary font-body mb-4">
              Anna Lea's inspirational Christian stories have now reached over 500 readers globally. From "The Isaiah Tree" to "A Missionary Widow," her books continue to inspire faith communities across different cultures and backgrounds. Thank you to all our readers for your continued support!
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                Milestone
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--burgundy)', color: 'white' }}>
                Global Reach
              </span>
            </div>
          </article>

          {/* News Item 4 */}
          <article className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl">📖</div>
              <div>
                <h2 className="text-2xl font-bold font-display text-primary">
                  Amazon Integration Complete
                </h2>
                <p className="text-sm text-secondary">October 2024</p>
              </div>
            </div>
            <p className="text-secondary font-body mb-4">
              All Anna Lea's books are now available for direct purchase through Amazon integration. Readers can easily access both digital and physical copies of "The Isaiah Tree," "Sweet Fruit," and "A Missionary Widow" with just one click.
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#FF9500', color: 'white' }}>
                Amazon
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                Easy Purchase
              </span>
            </div>
          </article>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold font-display text-primary mb-4">
              Stay Updated
            </h3>
            <p className="text-secondary font-body mb-6">
              Subscribe to receive the latest news about new book releases, events, and writing updates directly from Anna Lea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--sage-green)', 
                  color: 'white'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}