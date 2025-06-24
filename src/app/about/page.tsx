'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Author Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet Anna Lea Cannon
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Christian inspirational storyteller weaving faith, family, and history into 
                heartwarming tales that touch hearts and strengthen faith communities worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                With over 500 books distributed and a growing community of readers, Anna Lea 
                continues to inspire through her unique blend of historical context and 
                spiritual insight.
              </p>
              <Button variant="primary" size="large">
                Contact Anna Lea
              </Button>
            </div>

            {/* Author Photo Placeholder */}
            <div className="lg:text-right">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center text-blue-600 text-8xl">
                  👩‍💼
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Anna Lea Cannon<br />
                  <span className="text-gray-500">Author & Inspirational Writer</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic content placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-lg text-gray-700">
              About page content coming soon...
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}