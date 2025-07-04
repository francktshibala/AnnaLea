'use client';

import React from 'react';

export default function ReviewsPage() {
  // Sample review data for demonstration
  const sampleReviews = [
    {
      id: 1,
      bookTitle: "The Isaiah Tree",
      author: "Sarah M.",
      rating: 5,
      text: "A beautiful exploration of faith and growth. Anna Lea's writing touched my heart deeply.",
      date: "2024-12-15"
    },
    {
      id: 2,
      bookTitle: "Sweet Fruit",
      author: "David K.",
      rating: 5,
      text: "Inspiring and uplifting. This book reminded me of the spiritual fruits we can bear.",
      date: "2024-12-10"
    },
    {
      id: 3,
      bookTitle: "A Missionary Widow",
      author: "Maria L.",
      rating: 5,
      text: "A powerful testament to faith in the face of adversity. Highly recommended.",
      date: "2024-12-05"
    }
  ];

  const averageRating = 4.7;
  
  return (
    <main className="min-h-screen pt-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-primary mb-4">
            Reader Reviews
          </h1>
          <p className="text-xl text-secondary font-body max-w-2xl mx-auto mb-8">
            See what readers are saying about Anna Lea's inspiring Christian stories
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold font-display text-primary">
                {averageRating}
              </div>
              <div className="flex justify-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-2xl" style={{ color: 'var(--golden-honey)' }}>
                    ★
                  </span>
                ))}
              </div>
              <div className="text-sm text-secondary mt-2">
                Based on {sampleReviews.length} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Sample Reviews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold font-display text-primary">
                  {review.bookTitle}
                </h3>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className="text-sm"
                      style={{ color: star <= review.rating ? 'var(--golden-honey)' : '#ccc' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-secondary font-body mb-4 italic">
                "{review.text}"
              </p>
              <div className="flex justify-between items-center text-sm text-secondary">
                <span>- {review.author}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-display text-primary mb-4">
              Share Your Review
            </h3>
            <p className="text-secondary font-body mb-6">
              Have you read one of Anna Lea's books? We'd love to hear your thoughts and how the story impacted your faith journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--sage-green)', 
                  color: 'white'
                }}
              >
                Write a Review
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 border-2"
                style={{ 
                  borderColor: 'var(--sage-green)',
                  color: 'var(--sage-green)',
                  backgroundColor: 'transparent'
                }}
              >
                View All Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}