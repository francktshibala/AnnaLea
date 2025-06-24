'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Book } from './BookCardFresh';
import { NewsletterSignup } from '@/components/ui';

interface BookPreviewModalProps {
  book: Book & { sample?: string };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [textSize, setTextSize] = useState(16); // Default 16px
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const sampleContentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(book);
    onClose(); // Close modal after adding to cart
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Load bookmark and reset when modal opens
  useEffect(() => {
    if (isOpen) {
      // Load bookmark if exists
      const bookmarkKey = `anna-lea-bookmark-${book.id}`;
      const savedBookmark = localStorage.getItem(bookmarkKey);
      
      if (savedBookmark) {
        const bookmark = JSON.parse(savedBookmark);
        setIsBookmarked(true);
        
        // Restore scroll position after content loads
        setTimeout(() => {
          if (sampleContentRef.current) {
            sampleContentRef.current.scrollTop = bookmark.scrollPosition || 0;
          }
        }, 100);
      } else {
        setIsBookmarked(false);
        setReadingProgress(0);
      }
    }
  }, [isOpen, book.id]);

  // Track reading progress on scroll
  const handleSampleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    
    if (scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    }
  };

  // Text size controls
  const increaseTextSize = () => {
    setTextSize(prev => Math.min(prev + 2, 24)); // Max 24px
  };

  const decreaseTextSize = () => {
    setTextSize(prev => Math.max(prev - 2, 12)); // Min 12px
  };

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Bookmark functions
  const saveBookmark = () => {
    const bookmarkKey = `anna-lea-bookmark-${book.id}`;
    const scrollPosition = sampleContentRef.current?.scrollTop || 0;
    
    const bookmark = {
      bookId: book.id,
      bookTitle: book.title,
      scrollPosition,
      readingProgress,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(bookmarkKey, JSON.stringify(bookmark));
    setIsBookmarked(true);
  };

  const removeBookmark = () => {
    const bookmarkKey = `anna-lea-bookmark-${book.id}`;
    localStorage.removeItem(bookmarkKey);
    setIsBookmarked(false);
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark();
    } else {
      saveBookmark();
    }
  };

  return (
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
        padding: '20px',
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: isFullscreen ? '0px' : '16px',
          maxWidth: isFullscreen ? '100vw' : '800px',
          width: isFullscreen ? '100vw' : '100%',
          maxHeight: isFullscreen ? '100vh' : '90vh',
          height: isFullscreen ? '100vh' : 'auto',
          overflow: 'auto',
          position: 'relative',
          boxShadow: isFullscreen ? 'none' : '0 25px 50px rgba(0, 0, 0, 0.3)',
          animation: 'modalSlideIn 0.3s ease-out',
          transition: 'all 0.3s ease-in-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading Progress Bar */}
        {book.sample && (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: isFullscreen ? '0' : '16px 16px 0 0',
            overflow: 'hidden',
            zIndex: 10,
          }}>
            <div style={{
              height: '100%',
              width: `${readingProgress}%`,
              backgroundColor: '#3b82f6',
              transition: 'width 0.2s ease',
            }} />
          </div>
        )}

        {/* Header Buttons */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}>
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? '⤓' : '⤢'}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '40px' }}>
          {/* Book Info Header */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '40px',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            }}
          >
            {/* Book Cover */}
            <div
              style={{
                width: '200px',
                height: '300px',
                position: 'relative',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
                margin: window.innerWidth < 768 ? '0 auto' : '0',
                overflow: 'hidden',
              }}
            >
              <Image
                src={book.image}
                alt={`${book.title} book cover`}
                fill
                className="object-cover"
                sizes="200px"
                priority
              />
            </div>

            {/* Book Details */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {book.title}
              </h2>
              
              <p
                style={{
                  fontSize: '18px',
                  color: '#6b7280',
                  marginBottom: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                by {book.author}
              </p>

              <p
                style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {book.description}
              </p>

              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '24px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                ${book.price.toFixed(2)}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={onClose}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Sample Content */}
          {book.sample && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  📖 Book Sample
                </h3>

                {/* Reading Controls */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* Text Size Controls */}
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <button
                      onClick={decreaseTextSize}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                      title="Decrease text size"
                    >
                      A⁻
                    </button>
                    <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '24px', textAlign: 'center' }}>
                      {textSize}px
                    </span>
                    <button
                      onClick={increaseTextSize}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                      title="Increase text size"
                    >
                      A⁺
                    </button>
                  </div>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      backgroundColor: isDarkTheme ? '#374151' : 'white',
                      color: isDarkTheme ? 'white' : '#374151',
                      fontSize: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      marginLeft: '8px',
                    }}
                    title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
                  >
                    {isDarkTheme ? '☀️' : '🌙'}
                  </button>

                  {/* Bookmark Toggle */}
                  <button
                    onClick={toggleBookmark}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      backgroundColor: isBookmarked ? '#3b82f6' : 'white',
                      color: isBookmarked ? 'white' : '#374151',
                      fontSize: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      marginLeft: '4px',
                    }}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark current position'}
                  >
                    {isBookmarked ? '🔖' : '📖'}
                  </button>
                </div>
              </div>

              <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '12px', marginBottom: '20px' }} />
              
              <div
                ref={sampleContentRef}
                onScroll={handleSampleScroll}
                style={{
                  fontSize: `${textSize}px`,
                  lineHeight: '1.8',
                  color: isDarkTheme ? '#e5e7eb' : '#374151',
                  fontFamily: 'Georgia, serif',
                  whiteSpace: 'pre-line',
                  backgroundColor: isDarkTheme ? '#1f2937' : '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                  maxHeight: '400px',
                  overflowY: 'auto',
                  scrollBehavior: 'smooth',
                  transition: 'all 0.3s ease',
                }}
              >
                {book.sample}
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginTop: '16px',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                This is just a sample. Purchase the full book to continue reading!
              </p>
            </div>
          )}

          {/* Newsletter Signup Section */}
          <div style={{ marginTop: '40px', borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
            <NewsletterSignup
              variant="modal"
              title="Stay Updated on New Releases"
              description="Be the first to know when Anna Lea publishes new inspiring stories and get exclusive content."
              buttonText="Subscribe"
              placeholder="Your email address"
              source="book-preview-modal"
            />
          </div>
        </div>

        {/* Inline styles for animations */}
        <style jsx>{`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};