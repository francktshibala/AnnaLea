'use client';

import React, { useState, useEffect } from 'react';
import { HeroImage } from '@/components/hero/HeroImage';
import StarRating from '@/components/reviews/StarRating';

interface Review {
  id: string;
  bookId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

interface Book {
  id: string;
  title: string;
}

const books: Book[] = [
  { id: '1', title: 'Isaiah Tree: The Olive Tree That Jesus Touched' },
  { id: '2', title: 'Sweet Fruit: The Palm Tree That Was Touched by Jesus' },
  { id: '3', title: 'A Missionary Widow: The Enduring Power of Faith and Love' }
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      // Fetch ALL reviews (approved and unapproved)
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setDeleting(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the review from the list
        setReviews(reviews.filter(review => review.id !== reviewId));
        alert('Review deleted successfully');
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    } finally {
      setDeleting(null);
    }
  };

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : `Book ${bookId}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <HeroImage variant="biblical-pattern" />
        <div className="py-20 text-center">
          <div className="text-xl">Loading reviews...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroImage variant="biblical-pattern" />
      
      {/* Header Section */}
      <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              📝 Review Management
            </h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-8"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
            <p className="text-lg lg:text-xl font-body leading-relaxed max-w-4xl mx-auto"
               style={{ color: 'var(--charcoal-navy)' }}>
              Manage user-submitted reviews. Reviews appear immediately on the site, and you can delete any inappropriate ones here.
            </p>
            <div className="mt-8 text-center">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
                Total Reviews: {reviews.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Management Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          
          {reviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl text-gray-300 mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--charcoal-navy)' }}>
                No reviews yet
              </h3>
              <p className="text-gray-600">
                User reviews will appear here once people start submitting them.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ borderColor: 'var(--sage-green)' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <StarRating rating={review.rating} size="md" />
                        <span className="text-sm px-3 py-1 rounded-full"
                              style={{ 
                                backgroundColor: review.approved ? 'var(--sage-green)' : '#f3f4f6',
                                color: review.approved ? 'white' : 'var(--charcoal-navy)'
                              }}>
                          {review.approved ? 'Published' : 'Pending'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-display mb-1"
                          style={{ color: 'var(--charcoal-navy)' }}>
                        {getBookTitle(review.bookId)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        by {review.customerName} • {formatDate(review.createdAt)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => deleteReview(review.id)}
                      disabled={deleting === review.id}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {deleting === review.id ? 'Deleting...' : '🗑️ Delete'}
                    </button>
                  </div>
                  
                  <blockquote className="text-base leading-relaxed font-body mb-4 pl-4 border-l-4"
                              style={{ 
                                color: 'var(--charcoal-navy)',
                                borderLeftColor: 'var(--golden-honey)'
                              }}>
                    "{review.comment}"
                  </blockquote>
                  
                  <div className="text-sm text-gray-500">
                    <strong>Email:</strong> {review.customerEmail}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="bg-white rounded-lg p-8 shadow-lg border-2"
               style={{ borderColor: 'var(--sage-green)' }}>
            <h3 className="text-2xl font-bold font-display mb-4"
                style={{ color: 'var(--charcoal-navy)' }}>
              📋 How This Works
            </h3>
            <div className="space-y-4 text-base font-body"
                 style={{ color: 'var(--charcoal-navy)' }}>
              <p>• <strong>Automatic Publishing:</strong> All reviews now appear immediately on your website</p>
              <p>• <strong>Easy Management:</strong> If you see an inappropriate review, simply click "Delete" to remove it</p>
              <p>• <strong>No Technical Skills Needed:</strong> Just bookmark this page: <code>/admin/reviews</code></p>
              <p>• <strong>Email Notifications:</strong> Consider setting up email alerts when new reviews are submitted</p>
            </div>
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--sage-green)', color: 'white' }}>
              <p className="text-sm">
                <strong>💡 Tip:</strong> Bookmark this page for easy access to review management. 
                Check it weekly to ensure all reviews maintain your site's quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}