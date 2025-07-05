'use client';

import React, { useState, lazy, Suspense } from 'react';
import { Button } from '@/components/ui';
import { BookCard } from '@/components/book/BookCardClient';
import { featuredBooks } from '@/data/books';
import { HeroImage } from '@/components/hero/HeroImage';

// Dynamic import for BookPreviewModal - loads only when needed
const BookPreviewModal = lazy(() => 
  import('@/components/book/BookPreviewModal').then(module => ({
    default: module.BookPreviewModal
  }))
);

export default function BooksPage() {
  // Modal state for book preview
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* Hero Section - Consistent with Home and About pages */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Page Header */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Anna Lea's Books
            </h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
            <p className="text-lg lg:text-xl font-body leading-relaxed max-w-4xl mx-auto"
               style={{ color: 'var(--charcoal-navy)' }}>
              Discover inspirational Christian stories that weave together faith, family, and history 
              in captivating narratives that touch hearts and strengthen faith communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Biblical Stories Section */}
      <section id="biblical-stories" style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-12)'
      }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-primary mb-4 flex items-center justify-center gap-3">
              <span>🌿</span>
              Biblical Stories
            </h2>
            <p className="text-lg text-secondary font-body max-w-2xl mx-auto">
              Journey with trees that witnessed Christ's presence and discover timeless spiritual truths
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 justify-items-center max-w-4xl mx-auto">
            {featuredBooks.filter(book => ['1', '2'].includes(book.id)).map((book) => (
              <BookCard
                key={book.id}
                book={book}
                size="medium"
                onBookClick={handleBookClick}
                className="w-full justify-self-center"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="large" as="a" href="/biblical-stories" className="font-sans">
              Explore Biblical Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Missionary Tales Section */}
      <section id="missionary-tales" style={{ 
        backgroundColor: 'var(--cream)',
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-20)'
      }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-primary mb-4 flex items-center justify-center gap-3">
              <span>✝️</span>
              Missionary Tales
            </h2>
            <p className="text-lg text-secondary font-body max-w-2xl mx-auto">
              Real stories of faith, courage, and transformation from the mission field
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md">
              {featuredBooks.filter(book => book.id === '3').map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  size="medium"
                  onBookClick={handleBookClick}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="large" as="a" href="/missionary-tales" className="font-sans">
              Explore Missionary Tales
            </Button>
          </div>
        </div>
      </section>

      {/* All Books Collection */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-20)'
      }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-primary mb-4">
              Complete Collection
            </h2>
            <p className="text-lg text-secondary font-body max-w-2xl mx-auto">
              Browse all of Anna Lea's inspirational Christian books
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                size="medium"
                onBookClick={handleBookClick}
                className="w-full justify-self-center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        backgroundColor: 'var(--cream)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)'
      }}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-3xl font-bold font-display text-primary mb-6">
            Start Your Spiritual Journey Today
          </h3>
          <p className="text-lg text-secondary font-body mb-8 max-w-2xl mx-auto">
            Each book offers unique insights into faith, family, and the transformative power 
            of God's love in our daily lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large" as="a" href="/about" className="font-sans">
              About Anna Lea
            </Button>
            <Button variant="outline" size="large" as="a" href="/reviews" className="font-sans">
              Read Reviews
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
          />
        </Suspense>
      )}
    </main>
  );
}