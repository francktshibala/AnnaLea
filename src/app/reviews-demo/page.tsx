'use client';

import React from 'react';
import { ReviewsSection, StarRating, ReviewCard } from '@/components/reviews';
import { sampleReviews, generateBookStats, getReviewsByBookId, getHighlightedReviews } from '@/data/reviews';
import { featuredBooks } from '@/data/books';

const ReviewsDemoPage = () => {
  // Get reviews for the first book as an example
  const firstBook = featuredBooks[0];
  const bookReviews = getReviewsByBookId(firstBook.id);
  const bookStats = generateBookStats(firstBook.id);
  const highlightedReviews = getHighlightedReviews();

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">
            Review System Demo
          </h1>
          <p className="text-xl opacity-90 font-body">
            Anna Lea's Book Review Components
          </p>
        </div>
      </div>

      {/* Individual Star Rating Demo */}
      <section className="py-12 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8 font-display text-center">
            Star Rating Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-bg-primary rounded-lg">
              <h3 className="text-lg font-semibold mb-4 font-display">Small Size</h3>
              <div className="flex justify-center mb-4">
                <StarRating rating={4.5} size="sm" showNumber />
              </div>
              <p className="text-text-secondary">Perfect for compact displays</p>
            </div>
            <div className="text-center p-6 bg-bg-primary rounded-lg">
              <h3 className="text-lg font-semibold mb-4 font-display">Medium Size</h3>
              <div className="flex justify-center mb-4">
                <StarRating rating={4.7} size="md" showNumber />
              </div>
              <p className="text-text-secondary">Standard size for most uses</p>
            </div>
            <div className="text-center p-6 bg-bg-primary rounded-lg">
              <h3 className="text-lg font-semibold mb-4 font-display">Large Size</h3>
              <div className="flex justify-center mb-4">
                <StarRating rating={5.0} size="lg" showNumber />
              </div>
              <p className="text-text-secondary">Prominent display for headers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Review Card Demo */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8 font-display text-center">
            Review Card Variants
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Default variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-display">Default</h3>
              <ReviewCard 
                review={sampleReviews[0]} 
                variant="default"
              />
            </div>
            
            {/* Highlighted variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-display">Highlighted</h3>
              <ReviewCard 
                review={sampleReviews[3]} 
                variant="highlighted"
              />
            </div>
            
            {/* Compact variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-display">Compact</h3>
              <ReviewCard 
                review={sampleReviews[1]} 
                variant="compact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Reviews Section Demo */}
      <section className="py-12 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8 font-display text-center">
            Complete Reviews Section
          </h2>
          <ReviewsSection
            reviews={bookReviews}
            stats={bookStats}
            bookTitle={firstBook.title}
            maxReviews={4}
          />
        </div>
      </section>

      {/* All Reviews Demo */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8 font-display text-center">
            All Books Reviews
          </h2>
          <ReviewsSection
            reviews={sampleReviews}
            stats={{
              averageRating: 4.7,
              totalReviews: sampleReviews.length,
              ratingDistribution: sampleReviews.reduce((acc, review) => {
                acc[review.rating as keyof typeof acc]++;
                return acc;
              }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
            }}
            maxReviews={6}
          />
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-12 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8 font-display text-center">
            How to Use These Components
          </h2>
          <div className="bg-bg-primary rounded-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-semibold mb-4 font-display">Import the components:</h3>
              <pre className="bg-charcoal-navy text-cream p-4 rounded-lg mb-6">
{`import { ReviewsSection, StarRating, ReviewCard } from '@/components/reviews';
import { sampleReviews, generateBookStats } from '@/data/reviews';`}
              </pre>
              
              <h3 className="text-xl font-semibold mb-4 font-display">Basic usage:</h3>
              <pre className="bg-charcoal-navy text-cream p-4 rounded-lg mb-6">
{`// Simple star rating
<StarRating rating={4.5} size="md" showNumber />

// Individual review card
<ReviewCard review={reviewData} variant="default" />

// Complete reviews section
<ReviewsSection
  reviews={bookReviews}
  stats={bookStats}
  bookTitle="Book Title"
  maxReviews={6}
/>`}
              </pre>
              
              <h3 className="text-xl font-semibold mb-4 font-display">Features:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Responsive design that works on all devices</li>
                <li>• Accessible components with proper ARIA labels</li>
                <li>• Matches Anna Lea's established color palette</li>
                <li>• Typography uses Playfair Display, Lora, and Source Sans Pro</li>
                <li>• Support for highlighted/featured reviews</li>
                <li>• Rating distribution charts</li>
                <li>• Show more/less functionality</li>
                <li>• Verified purchase badges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsDemoPage;