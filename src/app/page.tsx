'use client';

import React, { useState, lazy, Suspense } from 'react';
import { HeroSection } from '@/components/sections';
import { Button } from '@/components/ui';
import { BookCard } from '@/components/book/BookCardClient';
import { useCart } from '@/contexts/CartContext';
import { featuredBooks } from '@/data/books';

// Dynamic import for BookPreviewModal - loads only when needed
const BookPreviewModal = lazy(() => 
  import('@/components/book/BookPreviewModal').then(module => ({
    default: module.BookPreviewModal
  }))
);

export default function Home() {
  // Cart functionality
  const { addToCart } = useCart();
  
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

  const handleNewsletterSignup = async (email: string) => {
    try {
      // Call the API endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'hero-section',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Newsletter signup successful:', data);
        
        // Also store in localStorage as backup/mock
        const existingSignups = JSON.parse(localStorage.getItem('anna-lea-newsletter') || '[]');
        const emailExists = existingSignups.some((signup: any) => signup.email === email);
        
        if (!emailExists) {
          const newSignup = {
            email,
            timestamp: new Date().toISOString(),
            source: 'hero-section',
          };
          existingSignups.push(newSignup);
          localStorage.setItem('anna-lea-newsletter', JSON.stringify(existingSignups));
        }
      } else {
        console.error('Newsletter signup failed:', data.error);
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      
      // Fallback to localStorage only
      try {
        const existingSignups = JSON.parse(localStorage.getItem('anna-lea-newsletter') || '[]');
        const emailExists = existingSignups.some((signup: any) => signup.email === email);
        
        if (!emailExists) {
          const newSignup = {
            email,
            timestamp: new Date().toISOString(),
            source: 'hero-section-fallback',
          };
          existingSignups.push(newSignup);
          localStorage.setItem('anna-lea-newsletter', JSON.stringify(existingSignups));
          console.log('Newsletter signup saved to localStorage as fallback');
        }
      } catch (localError) {
        console.error('Failed to save to localStorage:', localError);
      }
    }
  };

  const handleAddToCart = (book: any) => {
    addToCart(book);
    console.log('Added to cart:', book);
  };

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };


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
            <div style={{ fontSize: '12px', color: 'green', margin: '10px 0' }}>
              📖 PREVIEW READY: Click any book card to read sample chapters
              <br />🔍 DEBUG: Testing image deployment - 2025-06-24 02:20
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
                onBookClick={handleBookClick} // All three books now have preview functionality
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
      <section className="py-20" style={{ backgroundColor: 'var(--color-warm-cream)' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold mb-6" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-author-section)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--color-warm-navy)' 
                  }}>
                About Anna Lea
              </h2>
              <p className="mb-6" 
                 style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)' 
                 }}>
                Anna Lea Cannon is a Christian inspirational storyteller who weaves together 
                faith, family, and history in her captivating books. Her stories touch hearts 
                and strengthen faith communities worldwide.
              </p>
              <p className="mb-8" 
                 style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)' 
                 }}>
                With over 500 books distributed and a growing community of readers, Anna Lea 
                continues to inspire through her unique blend of historical context and 
                spiritual insight.
              </p>
              <Button variant="outline" size="large" as="a" href="/about">
                Learn More About Anna Lea
              </Button>
            </div>
            <div className="lg:text-right">
              <div className="inline-block p-8 rounded-2xl" 
                   style={{ backgroundColor: 'var(--color-warm-beige)' }}>
                <div className="w-64 h-64 rounded-xl flex items-center justify-center relative overflow-hidden"
                     style={{ backgroundColor: 'var(--color-warm-sage)' }}>
                  {/* Professional author placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center" style={{ color: 'var(--color-warm-cream)' }}>
                      <div className="text-4xl mb-2">✍️</div>
                      <div className="text-sm font-medium">Author Photo</div>
                      <div className="text-xs opacity-75">Coming Soon</div>
                    </div>
                  </div>
                  {/* Subtle geometric pattern */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 rounded-full opacity-20"
                       style={{ borderColor: 'var(--color-warm-cream)' }}></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-2 opacity-20"
                       style={{ borderColor: 'var(--color-warm-cream)' }}></div>
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

      {/* Book Preview Modal - Dynamically Loaded */}
      {selectedBook && (
        <Suspense 
          fallback={
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '40px',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                  textAlign: 'center',
                  maxWidth: '300px',
                }}
              >
                <div style={{ marginBottom: '16px', fontSize: '24px' }}>📚</div>
                <div style={{ color: '#374151', fontSize: '16px' }}>Loading book preview...</div>
              </div>
            </div>
          }
        >
          <BookPreviewModal
            book={selectedBook}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        </Suspense>
      )}
    </main>
  );
}

