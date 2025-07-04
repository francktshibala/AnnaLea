'use client';

import React, { useState } from 'react';
// import { useCart } from '@/contexts/CartContext';
// import { CartDropdown } from '@/components/cart/CartDropdown';

export const Header: React.FC = () => {
  // const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const totalItems = getTotalItems();

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu
    setIsMenuOpen(false);
    
    // Check if we're on the homepage
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with section anchor
      window.location.href = `/#${sectionId}`;
    }
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
            <a
              href="/about"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
            <a
              href="/books"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              Books
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
            <a
              href="/biblical-stories"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              Biblical Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
            <a
              href="/missionary-tales"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              Missionary Tales
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
            <a
              href="/news"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              News
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--sage-green)' }}></span>
            </a>
            <a
              href="/reviews"
              className="relative px-4 py-2 transition-all duration-300 font-medium group font-sans text-secondary hover:text-accent"
            >
              Reviews
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

          {/* Mobile Menu Only */}
          <div className="flex items-center space-x-4">
            {/* Cart functionality disabled for Phase 3 - Amazon integration coming
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 transition-colors duration-200 text-secondary hover:text-accent"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
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
              
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]"
                      style={{ backgroundColor: 'var(--burgundy)' }}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              </button>

              <CartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>
            */}

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
              <a
                href="/about"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/books"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </a>
              <a
                href="/biblical-stories"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Biblical Stories
              </a>
              <a
                href="/missionary-tales"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Missionary Tales
              </a>
              <a
                href="/news"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </a>
              <a
                href="/reviews"
                className="font-sans text-secondary hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
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