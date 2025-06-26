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
      <section id="books" style={{ 
        backgroundColor: 'var(--color-warm-beige)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center mb-20">
            <h2 className="font-bold"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-section)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-8)' 
                }}>
              Featured Books
            </h2>
            <div style={{ fontSize: '12px', color: 'green', margin: '10px 0' }}>
              📖 PREVIEW READY: Click any book card to read sample chapters
              <br />🔍 DEBUG: Wider cards (450px) + improved layout deployed
            </div>
            <p className="max-w-2xl mx-auto"
               style={{ 
                 fontFamily: 'var(--font-body-refined)', 
                 fontSize: 'var(--text-author-body)',
                 lineHeight: 'var(--leading-relaxed)',
                 color: 'var(--color-neutral-600)' 
               }}>
              Discover inspiring Christian stories that touch the heart and strengthen faith
            </p>
          </div>


          {/* 3D BookCard Gallery - Optimized for wider cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center" 
               style={{ 
                 perspective: '1000px',
                 gap: 'clamp(40px, 6vw, 60px)', // Increased gap for wider cards
                 marginBottom: 'var(--space-16)' 
               }}>
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                size="medium"
                onAddToCart={handleAddToCart}
                onBookClick={handleBookClick} // All three books now have preview functionality
                className="w-full max-w-md" // Increased from max-w-sm to max-w-md for better centering
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
      <section style={{ 
        backgroundColor: 'var(--color-warm-cream)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)',
        marginTop: 'var(--space-30)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-author-section)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--color-warm-navy)',
                    marginBottom: 'var(--space-8)' 
                  }}>
                About Anna Lea
              </h2>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-6)' 
                 }}>
                Anna Lea Cannon is a Christian inspirational storyteller who weaves together 
                faith, family, and history in her captivating books. Her stories touch hearts 
                and strengthen faith communities worldwide.
              </p>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-8)' 
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
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', 
                       border: '3px solid var(--color-warm-cream)' 
                     }}>
                  {/* Professional author photo placeholder */}
                  <img 
                    src="/images/author-placeholder.svg" 
                    alt="Anna Lea Cannon - Professional Author Photo Placeholder"
                    className="w-full h-full object-cover"
                    style={{ 
                      transition: 'transform 0.3s ease',
                      filter: 'brightness(1.05) contrast(1.1)' 
                    }}
                  />
                  {/* Elegant overlay for future replacement hint */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 text-white text-center py-2">
                    <div className="text-xs font-medium opacity-90">Professional Photo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section style={{ 
        backgroundColor: 'var(--color-neutral-50)',
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-12)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
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

