'use client';

import React from 'react';

export default function MissionaryTalesPage() {
  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-primary mb-4">
            Missionary Tales
          </h1>
          <p className="text-xl text-secondary font-body max-w-2xl mx-auto">
            Real stories of faith, courage, and transformation from the mission field
          </p>
        </div>

        {/* Featured Book Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold font-display text-primary mb-4">
                  A Missionary Widow
                </h2>
                <p className="text-secondary font-body mb-6">
                  A powerful testament to faith and resilience in the face of loss. Follow one woman's journey as she continues her missionary calling after profound personal tragedy, discovering that God's love transcends even our deepest pain.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                    True Story
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--burgundy)', color: 'white' }}>
                    Inspirational
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--golden-honey)', color: 'white' }}>
                    Faith Journey
                  </span>
                </div>
                <div className="flex gap-4">
                  <button 
                    className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--sage-green)', 
                      color: 'white'
                    }}
                  >
                    Read Sample
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
              <div className="text-center">
                <div className="w-64 h-80 mx-auto bg-gradient-to-br from-sage-green to-burgundy rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">📖</div>
                    <div className="text-lg font-medium">Book Cover</div>
                    <div className="text-sm opacity-75">Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Impact Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-bold font-display text-primary mb-2">
              Global Impact
            </h3>
            <p className="text-secondary font-body">
              Stories from mission fields across continents
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">❤️</div>
            <h3 className="text-xl font-bold font-display text-primary mb-2">
              Heart for Service
            </h3>
            <p className="text-secondary font-body">
              Real accounts of sacrificial love and service
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl font-bold font-display text-primary mb-2">
              Divine Providence
            </h3>
            <p className="text-secondary font-body">
              Witnessing God's faithfulness in difficult times
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <div className="inline-block p-6 rounded-lg" style={{ backgroundColor: 'var(--burgundy)', opacity: '0.1' }}>
            <h3 className="text-lg font-medium text-secondary mb-2">
              More Missionary Tales Coming Soon
            </h3>
            <p className="text-secondary">
              Additional inspiring stories from the mission field are in development.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}