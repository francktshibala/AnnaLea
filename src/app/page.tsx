'use client';

import React, { useState, lazy, Suspense } from 'react';
import { Button } from '@/components/ui';
import { BookCard } from '@/components/book/BookCardClient';
// import { useCart } from '@/contexts/CartContext'; // Disabled for Phase 3
import { featuredBooks } from '@/data/books';

// Dynamic import for BookPreviewModal - loads only when needed
const BookPreviewModal = lazy(() => 
  import('@/components/book/BookPreviewModal').then(module => ({
    default: module.BookPreviewModal
  }))
);

export default function Home() {
  // Cart functionality disabled for Phase 3 - Amazon integration
  // const { addToCart } = useCart();
  
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

  // Cart functionality replaced with Amazon links
  // const handleAddToCart = (book: any) => {
  //   addToCart(book);
  //   console.log('Added to cart:', book);
  // };

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
      {/* Clean Author-Focused Hero */}
      <section className="relative overflow-hidden" style={{ 
        backgroundColor: 'var(--cream)',
        paddingTop: '120px',
        paddingBottom: '80px'
      }}>
        <div className="max-w-6xl mx-auto px-8 text-center">
          {/* Author Name & Title */}
          <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6">
            Anna Lea Cannon
          </h1>
          <p className="text-xl md:text-2xl text-secondary font-body mb-8 max-w-2xl mx-auto">
            Inspirational Christian Storyteller
          </p>
          <p className="text-lg text-secondary font-body mb-12 max-w-3xl mx-auto">
            Weaving together faith, family, and history in captivating stories that touch hearts 
            and strengthen faith communities worldwide.
          </p>

          {/* Simple Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="primary" 
              size="large" 
              className="font-sans"
              onClick={handleExploreBooks}
            >
              Discover My Books
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

          {/* Simple Stats */}
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


      {/* Biblical Stories Section */}
      <section id="books" style={{ 
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
      <section style={{ 
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

      {/* Latest News Preview */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-20)'
      }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-primary mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-secondary font-body max-w-2xl mx-auto">
              Stay connected with Anna Lea's writing journey and latest book developments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Featured News Item */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="text-xl font-bold font-display text-primary">
                    Phase 4 Website Transformation Complete
                  </h3>
                  <p className="text-sm text-secondary">January 2025</p>
                </div>
              </div>
              <p className="text-secondary font-body mb-4">
                New navigation structure and dedicated pages for Biblical Stories and Missionary Tales 
                provide readers with a cleaner, more focused browsing experience.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                  Website Update
                </span>
              </div>
            </div>

            {/* Second News Item */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⭐</span>
                <div>
                  <h3 className="text-xl font-bold font-display text-primary">
                    500+ Books Distributed Milestone
                  </h3>
                  <p className="text-sm text-secondary">December 2024</p>
                </div>
              </div>
              <p className="text-secondary font-body mb-4">
                Anna Lea's inspirational stories have reached over 500 readers globally, 
                inspiring faith communities across different cultures and backgrounds.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--burgundy)', color: 'white' }}>
                  Milestone
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="primary" size="large" as="a" href="/news" className="font-sans">
              View All News & Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Brief About Preview */}
      <section style={{ 
        backgroundColor: 'var(--cream)',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-20)'
      }}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold font-display text-primary mb-6">
            Meet Anna Lea Cannon
          </h2>
          <p className="text-xl text-secondary font-body mb-8 max-w-3xl mx-auto">
            A Christian inspirational storyteller who weaves together faith, family, and history 
            in captivating stories that touch hearts and strengthen faith communities worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large" as="a" href="/about" className="font-sans">
              Read Full Bio
            </Button>
            <Button variant="outline" size="large" as="a" href="/contact" className="font-sans">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)'
      }}>
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h3 className="text-2xl font-bold font-display text-primary mb-4">
            Stay Connected
          </h3>
          <p className="text-secondary font-body mb-8">
            Subscribe to receive updates about new book releases and Anna Lea's writing journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'var(--sage-green)',
                color: 'var(--primary)'
              }}
            />
            <Button 
              variant="primary" 
              size="large" 
              className="font-sans"
              onClick={() => handleNewsletterSignup('test@example.com')}
            >
              Subscribe
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
            // onAddToCart={handleAddToCart} // Disabled for Phase 3 - Amazon integration
          />
        </Suspense>
      )}
    </main>
  );
}

