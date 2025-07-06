'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ReviewStats } from '@/components/reviews/ReviewStats';
import { BookStats } from '@/components/reviews/BookStats';
import { ReviewFilter, FilterOptions } from '@/components/reviews/ReviewFilter';
import ReviewCard from '@/components/reviews/ReviewCard';
import ReviewSubmissionForm from '@/components/reviews/ReviewSubmissionForm';
import { HeroImage } from '@/components/hero/HeroImage';
import { sampleReviews, overallStats, getHighlightedReviews, getRecentReviews } from '@/data/reviews';
import { Review } from '@/types';

export default function ReviewsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    bookId: 'all',
    rating: 0,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  const [databaseReviews, setDatabaseReviews] = useState<Review[]>([]);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch database reviews on component mount
  useEffect(() => {
    const fetchDatabaseReviews = async () => {
      try {
        const response = await fetch('/api/reviews?approved=true');
        if (response.ok) {
          const data = await response.json();
          // Transform database reviews to match Review interface
          const transformedReviews: Review[] = data.reviews.map((dbReview: any) => ({
            id: dbReview.id,
            name: dbReview.customerName,
            email: dbReview.customerEmail,
            rating: dbReview.rating,
            comment: dbReview.comment,
            date: dbReview.createdAt,
            bookId: dbReview.bookId,
            isHighlighted: false, // Database reviews are not highlighted by default
            isUserSubmitted: true, // Mark as user-submitted for visual distinction
          }));
          setDatabaseReviews(transformedReviews);
        }
      } catch (error) {
        console.error('Error fetching database reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabaseReviews();
  }, []);

  const highlightedReviews = getHighlightedReviews();

  // Combine sample reviews and database reviews
  const allReviews = useMemo(() => {
    return [...sampleReviews, ...databaseReviews];
  }, [databaseReviews]);

  // Filter and sort reviews based on current filters
  const filteredReviews = useMemo(() => {
    let filtered = [...allReviews];

    // Filter by book
    if (filters.bookId !== 'all') {
      filtered = filtered.filter(review => review.bookId === filters.bookId);
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(review => review.rating >= filters.rating);
    }

    // Sort reviews
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'helpful':
          // For now, prioritize highlighted reviews as "most helpful"
          const aHelpful = a.isHighlighted ? 1 : 0;
          const bHelpful = b.isHighlighted ? 1 : 0;
          comparison = aHelpful - bHelpful;
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [filters, allReviews]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleReviewSubmitted = () => {
    // Refresh database reviews after submission
    const fetchDatabaseReviews = async () => {
      try {
        const response = await fetch('/api/reviews?approved=true');
        if (response.ok) {
          const data = await response.json();
          const transformedReviews: Review[] = data.reviews.map((dbReview: any) => ({
            id: dbReview.id,
            name: dbReview.customerName,
            email: dbReview.customerEmail,
            rating: dbReview.rating,
            comment: dbReview.comment,
            date: dbReview.createdAt,
            bookId: dbReview.bookId,
            isHighlighted: false,
            isUserSubmitted: true,
          }));
          setDatabaseReviews(transformedReviews);
        }
      } catch (error) {
        console.error('Error fetching database reviews:', error);
      }
    };
    
    fetchDatabaseReviews();
    setShowSubmissionForm(false);
  };
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Consistent with other pages */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Page Header Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Reader Reviews
            </h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
            <p className="text-lg lg:text-xl font-body leading-relaxed max-w-4xl mx-auto"
               style={{ color: 'var(--charcoal-navy)' }}>
              See what readers are saying about Anna Lea's inspiring Christian stories
            </p>
          </div>
        </div>
      </section>

      {/* Overall Stats Dashboard Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <ReviewStats stats={overallStats} />
        </div>
      </section>

      {/* Book-by-Book Stats Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <BookStats />
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Featured Reviews
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--sage-green)' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {highlightedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="highlighted" />
            ))}
          </div>
        </div>
      </section>

      {/* All Reviews with Filtering Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              All Reviews
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
          </div>
          
          {/* Filter Component */}
          <div className="mb-12">
            <ReviewFilter
              onFilterChange={handleFilterChange}
              totalReviews={allReviews.length}
              filteredCount={filteredReviews.length}
            />
          </div>

          {/* Filtered Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">📝</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  No reviews found
                </h3>
                <p className="text-secondary">
                  Try adjusting your filters to see more reviews.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Submission Section */}
      <section className="py-16 lg:py-20 mt-32 lg:mt-40" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          {!showSubmissionForm ? (
            <div className="text-center">
              <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto border-2"
                   style={{ borderColor: 'var(--sage-green)' }}>
                <h3 className="text-2xl font-bold font-display mb-4"
                    style={{ color: 'var(--charcoal-navy)' }}>
                  Share Your Review
                </h3>
                <p className="text-secondary font-body mb-6">
                  Have you read one of Anna Lea's books? We'd love to hear your thoughts and how the story impacted your faith journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowSubmissionForm(true)}
                    className="px-8 py-4 rounded-lg font-medium font-sans transition-all duration-300 text-white transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sage-green/30 focus:scale-105"
                    style={{ backgroundColor: 'var(--sage-green)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--charcoal-navy)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(107, 124, 89, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--sage-green)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    ✍️ Write a Review
                  </button>
                  <a
                    href="/books"
                    className="px-8 py-4 rounded-lg font-medium font-sans transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sage-green/30 focus:scale-105"
                    style={{ 
                      borderColor: 'var(--sage-green)',
                      color: 'var(--sage-green)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--sage-green)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'var(--sage-green)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(107, 124, 89, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--sage-green)';
                      e.currentTarget.style.borderColor = 'var(--sage-green)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    📚 View All Books
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <ReviewSubmissionForm 
              onSubmit={handleReviewSubmitted}
              onCancel={() => setShowSubmissionForm(false)}
            />
          )}
        </div>
      </section>
    </main>
  );
}