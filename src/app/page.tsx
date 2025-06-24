'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections';
import { Button } from '@/components/ui';
import { BookCard } from '@/components/book/BookCardClient';
import { BookPreviewModal } from '@/components/book/BookPreviewModal';
import { useCart } from '@/contexts/CartContext';

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

  const handleNewsletterSignup = (email: string) => {
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    // TODO: Integrate with email service
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
      image: '/images/books/sweet-fruit-cover.jpg', // Real book cover
      description: 'Journey with Sweet Fruit through loss and renewal, experiencing Christ\'s triumphal entry and the power of community.',
      sample: `Prologue: The Day Everything Changed

Sweet Fruit had always been the most beautiful palm tree in the village. Her fronds swayed gracefully in the gentle breeze, and her dates were the sweetest anyone had ever tasted. Children would gather beneath her shade, families would rest in her cool shadow, and travelers from far and wide would seek refuge under her protective canopy.

But on this particular day, as the morning sun cast long shadows across the dusty road, Sweet Fruit sensed something extraordinary was about to happen. There was an energy in the air, a anticipation that made her leaves rustle with excitement even when there was no wind.

From her position at the edge of the village, she could see a crowd gathering in the distance. People were laying down their cloaks on the road, and there was singing—beautiful, joyful singing that seemed to make her very roots vibrate with happiness.

Then she saw Him.

Walking among the people was a man unlike any other she had ever seen. His presence was both gentle and powerful, and when He looked up at her with those compassionate eyes, Sweet Fruit felt something she had never experienced before—a touch so profound it reached into the very core of her being.

"Blessed are you, sweet fruit of the earth," His voice carried on the wind, and though the words were soft, they penetrated every fiber of her being. "Your shade has comforted the weary, your fruit has nourished the hungry, and your beauty has reminded all who see you of the goodness of creation."

[Continue reading to discover how this divine encounter transformed Sweet Fruit forever and what it means for all who seek to bear good fruit in their own lives...]`,
    },
    {
      id: '3',
      title: 'A Missionary Widow: The Enduring Power of Faith and Love',
      author: 'Anna Lea Cannon', 
      price: 14.99,
      image: '/images/books/missionary-widow-cover.jpg', // Real book cover (placeholder path)
      description: 'The inspiring true story of Pete and Suzanne Black\'s love story through missionary service and faith commitment.',
      sample: `Chapter 1: Two Hearts, One Mission

Suzanne first met Pete Black on a humid Tuesday morning in July 1987, though she had no idea that this chance encounter would change the course of her entire life. She was twenty-four, fresh out of nursing school, and had just committed to a two-year mission assignment in Guatemala. He was twenty-eight, a seasoned missionary doctor who had already spent three years serving the rural communities in the mountains outside Antigua.

Their eyes met across the dusty courtyard of the mission compound, and Suzanne felt something she had never experienced before—not just attraction, but recognition. It was as if her heart suddenly understood something her mind couldn't yet grasp: that God had been preparing them both for this moment, for each other, for a love that would be tested by circumstances most people couldn't imagine.

"You must be the new nurse," Pete said, approaching with a gentle smile that made his tired eyes light up. His shirt was stained with dirt and medical supplies, and there was something in his manner that spoke of both deep compassion and quiet strength.

"Suzanne," she replied, extending her hand. When their hands touched, she felt a warmth that had nothing to do with the tropical heat. "And you're the doctor everyone's been telling me about."

"All good things, I hope," he laughed, and in that moment, Suzanne knew with absolute certainty that her life was about to become far more complicated—and far more beautiful—than she had ever planned.

What neither of them could foresee was how their love would be tested by tragedy, shaped by faith, and ultimately transformed into something that would inspire countless others to believe in the enduring power of God's love.

[Continue reading to discover how their extraordinary love story unfolded against the backdrop of missionary service, and how Suzanne's faith sustained her through unimaginable loss...]`,
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
            <div style={{ fontSize: '12px', color: 'green', margin: '10px 0' }}>
              📖 PREVIEW READY: Click any book card to read sample chapters
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

