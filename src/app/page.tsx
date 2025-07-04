'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { HeroImage } from '@/components/hero/HeroImage';

export default function Home() {
  // Navigation handler functions
  const handleExploreBooks = () => {
    // Navigate to books page
    window.location.href = '/books';
  };


  return (
    <main className="min-h-screen">
      {/* Hero Image with Biblical Elements */}
      <HeroImage variant="biblical-pattern" />

      {/* Call to Action & Stats Section */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)'
      }}>
        <div className="max-w-6xl mx-auto px-8 text-center">
          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="primary" 
              size="large" 
              className="font-sans"
              onClick={handleExploreBooks}
            >
              Explore My Books
            </Button>
            <Button 
              variant="outline" 
              size="large" 
              as="a" 
              href="/about" 
              className="font-sans"
            >
              About Anna Lea
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold font-display text-primary">500+</div>
              <div className="text-sm text-secondary font-sans">Books Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-display text-primary">4.7★</div>
              <div className="text-sm text-secondary font-sans">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-display text-primary">3</div>
              <div className="text-sm text-secondary font-sans">Published Books</div>
            </div>
          </div>
        </div>
      </section>



    </main>
  );
}

