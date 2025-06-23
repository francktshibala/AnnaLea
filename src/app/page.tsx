'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections';
import { Button } from '@/components/ui';
import { BookCard } from '@/components/book/BookCardClient';
import { Simple3DTest } from '@/components/test/Simple3DTest';
import { CSSOnly3DTest } from '@/components/test/CSSOnly3DTest';

export default function Home() {
  // Navigation handler functions
  const handleExploreBooks = () => {
    // Scroll to books section or navigate to books page
    document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchTrailer = () => {
    // Open trailer modal or navigate to video
    console.log('Opening book trailer...');
  };

  const handleNewsletterSignup = (email: string) => {
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    // TODO: Integrate with email service
  };

  const handleAddToCart = (book: any) => {
    console.log('Added to cart:', book);
    // TODO: Integrate with cart system
  };

  // Sample book data
  const featuredBooks = [
    {
      id: '1',
      title: 'Isaiah Tree: The Olive Tree That Jesus Touched',
      author: 'Anna Lea Cannon',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&auto=format',
      description: 'A heartwarming tale of hope and faith centered around an ancient olive tree that witnessed Christ\'s presence.',
    },
    {
      id: '2', 
      title: 'Sweet Fruit: The Palm Tree That Was Touched by Jesus',
      author: 'Anna Lea Cannon',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&auto=format',
      description: 'Journey with Sweet Fruit through loss and renewal, experiencing Christ\'s triumphal entry and the power of community.',
    },
    {
      id: '3',
      title: 'A Missionary Widow: The Enduring Power of Faith and Love',
      author: 'Anna Lea Cannon', 
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format',
      description: 'The inspiring true story of Pete and Suzanne Black\'s love story through missionary service and faith commitment.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Cinematic Hero Section */}
      <HeroSection
        backgroundTheme="divine"
        showStats={true}
        showTestimonials={false}
        onExploreBooks={handleExploreBooks}
        onWatchTrailer={handleWatchTrailer}
        onNewsletterSignup={handleNewsletterSignup}
      />

      {/* 3D Transform Test Section */}
      <Simple3DTest />
      <CSSOnly3DTest />

      {/* Books Preview Section */}
      <section id="books" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Books
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover inspiring Christian stories that touch the heart and strengthen faith
            </p>
          </div>


          {/* 3D BookCard Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 justify-items-center" 
               style={{ perspective: '1000px' }}>
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                size="medium"
                onAddToCart={handleAddToCart}
                className="w-full max-w-sm"
              />
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary" size="large">
              View All Books
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About Anna Lea
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Anna Lea Cannon is a Christian inspirational storyteller who weaves together 
                faith, family, and history in her captivating books. Her stories touch hearts 
                and strengthen faith communities worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                With over 500 books distributed and a growing community of readers, Anna Lea 
                continues to inspire through her unique blend of historical context and 
                spiritual insight.
              </p>
              <Button variant="outline" size="large">
                Learn More About Anna Lea
              </Button>
            </div>
            <div className="lg:text-right">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center text-blue-600 text-6xl">
                  👩‍💼
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="ghost" as="a" href="/design-system">
              View Design System
            </Button>
            <Button variant="ghost" as="a" href="/books">
              Browse Books
            </Button>
            <Button variant="ghost" as="a" href="/about">
              About Anna Lea
            </Button>
            <Button variant="ghost" as="a" href="/contact">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

