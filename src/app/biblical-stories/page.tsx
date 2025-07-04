'use client';

import React from 'react';

export default function BiblicalStoriesPage() {
  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-primary mb-4">
            Biblical Stories
          </h1>
          <p className="text-xl text-secondary font-body max-w-2xl mx-auto">
            Discover inspiring biblical narratives that bring ancient wisdom to modern life
          </p>
        </div>

        {/* Featured Books Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Isaiah Tree */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold font-display text-primary mb-4">
              The Isaiah Tree
            </h2>
            <p className="text-secondary font-body mb-6">
              A profound exploration of faith, growth, and spiritual transformation through the lens of biblical trees and their symbolic meanings.
            </p>
            <div className="flex gap-4">
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--sage-green)', 
                  color: 'white'
                }}
              >
                Learn More
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: '#FF9500', 
                  color: 'white'
                }}
              >
                Buy on Amazon
              </button>
            </div>
          </div>

          {/* Sweet Fruit */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold font-display text-primary mb-4">
              Sweet Fruit
            </h2>
            <p className="text-secondary font-body mb-6">
              Discover the spiritual fruits that grow from a life rooted in faith, exploring biblical metaphors of harvest and abundance.
            </p>
            <div className="flex gap-4">
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--sage-green)', 
                  color: 'white'
                }}
              >
                Learn More
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: '#FF9500', 
                  color: 'white'
                }}
              >
                Buy on Amazon
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <div className="inline-block p-6 rounded-lg" style={{ backgroundColor: 'var(--sage-green-light)', opacity: '0.1' }}>
            <h3 className="text-lg font-medium text-secondary mb-2">
              More Biblical Stories Coming Soon
            </h3>
            <p className="text-secondary">
              Stay tuned for additional inspiring biblical narratives and spiritual insights.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}