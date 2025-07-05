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
      
      {/* Book 1: Isaiah Tree */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Book Cover - Left Side */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.25)',
                       border: '3px solid var(--sage-green)',
                       aspectRatio: '3/4'
                     }}>
                  <img 
                    src="/images/books-detailed/isaiah-tree-detailed.jpg" 
                    alt="Isaiah Tree: The Olive Tree That Jesus Touched book cover"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05) contrast(1.1)' }}
                  />
                </div>
              </div>
            </div>

            {/* Book Details - Right Side */}
            <div className="space-y-6">
              {/* Title and Subtitle */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                    style={{ color: 'var(--charcoal-navy)' }}>
                  Isaiah Tree
                </h2>
                <h3 className="text-lg lg:text-xl font-semibold font-display mb-4"
                    style={{ color: 'var(--burgundy)' }}>
                  The Olive Tree That Jesus Touched
                </h3>
                <p className="text-base lg:text-lg font-body italic leading-relaxed"
                   style={{ color: 'var(--sage-green)' }}>
                  "A Faith-Based Story That Inspires Readers of All Ages"
                </p>
              </div>

              {/* Synopsis */}
              <div>
                <p className="text-sm lg:text-base font-body leading-relaxed mb-4"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Follow an olive tree near Jerusalem that longs to see the Prince of Peace. Through generations, 
                  it becomes part of a community where "old roots, neighboring branches, and new trees were all 
                  interconnected as they supported each other and grew."
                </p>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  The tree finally witnesses Jesus in the Garden of Gethsemane and asks: "Could Isaiah Tree 
                  somehow pass on that light from the Prince of Peace to the world?"
                </p>
              </div>

              {/* Target Audience & Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Perfect for:</strong> Children 6-12, teens, and adult faith groups
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Key Themes:</strong> Faith, hope, interconnectedness, Christ's love, legacy
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Great for:</strong> Families, Sunday school, homeschool, bedtime reading
                  </p>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  className="px-6 py-3 rounded-lg font-sans font-semibold text-white transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    backgroundColor: '#FF9500',
                    boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)'
                  }}
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                >
                  Buy on Amazon
                </button>
                <button 
                  className="px-6 py-3 rounded-lg font-sans font-semibold border-2 transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    color: 'var(--sage-green)',
                    borderColor: 'var(--sage-green)',
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                >
                  Order Local
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book 2: Sweet Fruit */}
      <section className="py-16 lg:py-20 mt-8 lg:mt-12" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Book Details - Left Side (Reversed) */}
            <div className="space-y-6 order-2 lg:order-1">
              {/* Title and Subtitle */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                    style={{ color: 'var(--charcoal-navy)' }}>
                  Sweet Fruit
                </h2>
                <h3 className="text-lg lg:text-xl font-semibold font-display mb-4"
                    style={{ color: 'var(--burgundy)' }}>
                  The Palm Tree That Was Touched by Jesus
                </h3>
                <p className="text-base lg:text-lg font-body italic leading-relaxed"
                   style={{ color: 'var(--sage-green)' }}>
                  "A Biblical Allegory About Renewal and Forgiveness"
                </p>
              </div>

              {/* Synopsis */}
              <div>
                <p className="text-sm lg:text-base font-body leading-relaxed mb-4"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Discover the gentle story of a palm tree that experiences Jesus's transformative touch. 
                  This heartwarming tale explores themes of redemption, second chances, and the healing 
                  power of Christ's love.
                </p>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Perfect for families seeking meaningful conversations about forgiveness and God's 
                  restorative grace in our lives.
                </p>
              </div>

              {/* Target Audience & Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Perfect for:</strong> Children, families, and faith communities
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Key Themes:</strong> Renewal, forgiveness, transformation, hope
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Great for:</strong> Teaching forgiveness, family devotions, gift-giving
                  </p>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  className="px-6 py-3 rounded-lg font-sans font-semibold text-white transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    backgroundColor: '#FF9500',
                    boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)'
                  }}
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                >
                  Buy on Amazon
                </button>
                <button 
                  className="px-6 py-3 rounded-lg font-sans font-semibold border-2 transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    color: 'var(--sage-green)',
                    borderColor: 'var(--sage-green)',
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                >
                  Order Local
                </button>
              </div>
            </div>

            {/* Book Cover - Right Side */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.25)',
                       border: '3px solid var(--sage-green)',
                       aspectRatio: '3/4'
                     }}>
                  <img 
                    src="/images/books-detailed/sweet-fruit-detailed.jpg" 
                    alt="Sweet Fruit: The Palm Tree That Was Touched by Jesus book cover"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05) contrast(1.1)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book 3: A Missionary Widow */}
      <section className="py-16 lg:py-20 mt-8 lg:mt-12" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Book Cover - Left Side */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.25)',
                       border: '3px solid var(--sage-green)',
                       aspectRatio: '3/4'
                     }}>
                  <img 
                    src="/images/books-detailed/missionary-widow-detailed.png" 
                    alt="A Missionary Widow: The Enduring Power of Faith and Love book cover"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05) contrast(1.1)' }}
                  />
                </div>
              </div>
            </div>

            {/* Book Details - Right Side */}
            <div className="space-y-6">
              {/* Title and Subtitle */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-black font-display mb-2 tracking-tight leading-tight"
                    style={{ color: 'var(--charcoal-navy)' }}>
                  A Missionary Widow
                </h2>
                <h3 className="text-lg lg:text-xl font-semibold font-display mb-4"
                    style={{ color: 'var(--burgundy)' }}>
                  The Enduring Power of Faith and Love
                </h3>
                <p className="text-base lg:text-lg font-body italic leading-relaxed"
                   style={{ color: 'var(--sage-green)' }}>
                  "A Heartfelt Adult Memoir About Faith, Grief, and Resilience"
                </p>
              </div>

              {/* Synopsis */}
              <div>
                <p className="text-sm lg:text-base font-body leading-relaxed mb-4"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  A deeply personal account of faith tested by loss and strengthened by community. 
                  This memoir chronicles the journey of a missionary widow finding hope and purpose 
                  through life's most challenging seasons.
                </p>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Real stories of courage and transformation from the mission field, offering 
                  encouragement to anyone facing grief or life transitions.
                </p>
              </div>

              {/* Target Audience & Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Perfect for:</strong> Adults, ministry leaders, and those facing loss
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Key Themes:</strong> Faith, grief, resilience, missionary life, hope
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                  <p className="text-sm lg:text-base font-body"
                     style={{ color: 'var(--charcoal-navy)' }}>
                    <strong>Great for:</strong> Book clubs, adult faith groups, personal reflection
                  </p>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  className="px-6 py-3 rounded-lg font-sans font-semibold text-white transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    backgroundColor: '#FF9500',
                    boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)'
                  }}
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                >
                  Buy on Amazon
                </button>
                <button 
                  className="px-6 py-3 rounded-lg font-sans font-semibold border-2 transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    color: 'var(--sage-green)',
                    borderColor: 'var(--sage-green)',
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                >
                  Order Local
                </button>
              </div>
            </div>
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