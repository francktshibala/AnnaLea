'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartDropdown } from '@/components/cart/CartDropdown';

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBooksDropdownOpen, setIsBooksDropdownOpen] = useState(false);
  const totalItems = getTotalItems();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-lg"
            style={{ 
              backgroundColor: 'var(--cream)',
              borderBottom: '1px solid var(--border-light)',
              opacity: '0.98'
            }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                   style={{ backgroundColor: 'var(--sage-green)' }}>
                <span className="font-bold text-lg text-white">AL</span>
              </div>
              <h1 className="text-2xl font-bold font-display text-primary">
                Anna Lea
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button
                className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent flex items-center gap-1"
                onMouseEnter={() => setIsBooksDropdownOpen(true)}
                onMouseLeave={() => setIsBooksDropdownOpen(false)}
              >
                Books
                <svg className={`w-4 h-4 transition-transform duration-200 ${isBooksDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: 'var(--sage-green)' }}></span>
              </button>
              
              {/* Books Dropdown Menu */}
              {isBooksDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 py-2 w-64 rounded-lg shadow-lg z-50"
                  style={{ 
                    backgroundColor: 'var(--cream)',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-medium)'
                  }}
                  onMouseEnter={() => setIsBooksDropdownOpen(true)}
                  onMouseLeave={() => setIsBooksDropdownOpen(false)}
                >
                  <div className="py-1">
                    <a
                      href="/books"
                      className="block px-4 py-2 font-sans text-secondary hover:text-accent transition-colors duration-200"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      All Books
                    </a>
                    <div className="border-t my-1" style={{ borderColor: 'var(--border-light)' }}></div>
                    <a
                      href="/books/biblical-trees"
                      className="block px-4 py-2 font-sans text-secondary hover:text-accent transition-colors duration-200"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div className="flex items-center gap-2">
                        <span>🌿</span>
                        <div>
                          <div className="font-medium">Biblical Trees</div>
                          <div className="text-xs text-muted">Isaiah Tree, Sweet Fruit</div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="/books/missionary-stories"
                      className="block px-4 py-2 font-sans text-secondary hover:text-accent transition-colors duration-200"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div className="flex items-center gap-2">
                        <span>✝️</span>
                        <div>
                          <div className="font-medium">Missionary Stories</div>
                          <div className="text-xs text-muted">True faith journeys</div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="/books/christian-fiction"
                      className="block px-4 py-2 font-sans text-secondary hover:text-accent transition-colors duration-200"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div className="flex items-center gap-2">
                        <span>📖</span>
                        <div>
                          <div className="font-medium">Christian Fiction</div>
                          <div className="text-xs text-muted">Inspirational stories</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <a
              href="/about"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
            <a
              href="/contact"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button with Badge */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 transition-colors duration-200 text-secondary hover:text-accent"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
              {/* Cart Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 9H4m3 4v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 21h6"
                />
              </svg>
              
              {/* Cart Counter Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]"
                      style={{ backgroundColor: 'var(--burgundy)' }}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              </button>

              {/* Cart Dropdown */}
              <CartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex flex-col space-y-4">
              <div>
                <button
                  onClick={() => setIsBooksDropdownOpen(!isBooksDropdownOpen)}
                  className="text-left font-sans text-secondary hover:text-accent transition-colors duration-200 flex items-center gap-1 w-full"
                >
                  Books
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isBooksDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isBooksDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <a
                      href="/books"
                      className="block font-sans text-secondary hover:text-accent transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      All Books
                    </a>
                    <a
                      href="/books/biblical-trees"
                      className="block font-sans text-secondary hover:text-accent transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🌿 Biblical Trees
                    </a>
                    <a
                      href="/books/missionary-stories"
                      className="block font-sans text-secondary hover:text-accent transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✝️ Missionary Stories
                    </a>
                    <a
                      href="/books/christian-fiction"
                      className="block font-sans text-secondary hover:text-accent transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      📖 Christian Fiction
                    </a>
                  </div>
                )}
              </div>
              <a
                href="/about"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};