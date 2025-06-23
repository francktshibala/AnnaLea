'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections';
import { Button } from '@/components/ui';
import { BookCard } from '@/components/book/BookCardClient';
import { BookPreviewModal } from '@/components/book/BookPreviewModal';

export default function Home() {
  // Modal state for book preview
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Sample book data
  const featuredBooks = [
    {
      id: '1',
      title: 'Isaiah Tree: The Olive Tree That Jesus Touched',
      author: 'Anna Lea Cannon',
      price: 12.99,
      image: '/images/books/isaiah-tree-cover.jpg', // Real book cover - will fallback to placeholder if needed
      description: 'A heartwarming tale of hope and faith centered around an ancient olive tree that witnessed Christ\'s presence.',
      sample: `Chapter 1: The Ancient Witness

The ancient olive tree stood silent in the garden, its gnarled branches reaching toward heaven like weathered hands in prayer. For over two thousand years, it had witnessed the passage of time, the changing of seasons, and the footsteps of countless pilgrims who came seeking peace in this sacred place.

Isaiah had called this tree home for as long as anyone could remember. The local villagers spoke of him in hushed, reverent tones—not because he was human, but because he was the spirit that dwelt within the ancient olive's twisted trunk. Some said he had been there since the time of Christ himself, a silent guardian of the most precious memories this holy land had ever known.

On this particular morning, as golden sunlight filtered through the olive branches, casting dancing shadows on the weathered stone below, Isaiah felt a stirring deep within his wooden heart. Something was different. After centuries of quiet observation, he sensed that his story was finally ready to be told.

The tree's roots ran deep, deeper than the foundations of the ancient city, deeper than the memories of those who had walked these paths before. And in those depths, Isaiah held secrets that could change the way people understood faith, hope, and the enduring power of God's love.

As a gentle breeze rustled through his silver-green leaves, Isaiah began to remember...

[Continue reading to discover the miraculous events that Isaiah witnessed and how they can transform your own faith journey...]`,
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


      {/* Books Preview Section */}
      <section id="books" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Books
            </h2>
            <div style={{ fontSize: '12px', color: 'red', margin: '10px 0' }}>
              🔄 FRESH DEPLOY: BookCardFresh implementation active
            </div>
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
                onBookClick={book.id === '1' ? handleBookClick : undefined} // Only first book has preview for testing
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

      {/* Book Preview Modal */}
      {selectedBook && (
        <BookPreviewModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </main>
  );
}

