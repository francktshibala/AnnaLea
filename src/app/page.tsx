'use client';

import React from 'react';
import { HeroSection } from '@/components/sections';
import { Button, Card, CardHeader, CardBody } from '@/components/ui';

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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover inspiring Christian stories that touch the heart and strengthen faith
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Isaiah Tree */}
            <Card variant="medium" interactive className="h-full">
              <CardHeader>
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4">
                  <div className="w-full h-full flex items-center justify-center text-blue-600">
                    📖 Book Cover
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Isaiah Tree</h3>
                <p className="text-gray-600">The Olive Tree That Jesus Touched</p>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 mb-4">
                  A heartwarming tale of hope and faith centered around an ancient olive tree 
                  that witnessed Christ&apos;s presence.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>500+ copies distributed</span>
                  <span className="font-semibold text-blue-600">$12.99</span>
                </div>
              </CardBody>
            </Card>

            {/* Sweet Fruit */}
            <Card variant="medium" interactive className="h-full">
              <CardHeader>
                <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4">
                  <div className="w-full h-full flex items-center justify-center text-green-600">
                    🌴 Book Cover
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sweet Fruit</h3>
                <p className="text-gray-600">The Palm Tree That Was Touched by Jesus</p>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 mb-4">
                  Journey with Sweet Fruit through loss and renewal, experiencing Christ&apos;s 
                  triumphal entry and the power of community.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>New Release</span>
                  <span className="font-semibold text-blue-600">$11.99</span>
                </div>
              </CardBody>
            </Card>

            {/* Missionary Widow */}
            <Card variant="medium" interactive className="h-full">
              <CardHeader>
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4">
                  <div className="w-full h-full flex items-center justify-center text-purple-600">
                    💝 Book Cover
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">A Missionary Widow</h3>
                <p className="text-gray-600">The Enduring Power of Faith and Love</p>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 mb-4">
                  The inspiring true story of Pete and Suzanne Black&apos;s love story through 
                  missionary service and faith commitment.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Historical Biography</span>
                  <span className="font-semibold text-blue-600">$14.99</span>
                </div>
              </CardBody>
            </Card>
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
