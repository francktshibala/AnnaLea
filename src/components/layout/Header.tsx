'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartDropdown } from '@/components/cart/CartDropdown';

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
              backgroundColor: 'rgba(253, 252, 248, 0.95)', 
              borderBottom: '1px solid var(--color-warm-sage)'
            }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                   style={{ backgroundColor: 'var(--color-warm-sage)' }}>
                <span className="font-bold text-lg" style={{ color: 'var(--color-warm-cream)' }}>AL</span>
              </div>
              <h1 className="text-2xl font-bold" 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-warm-navy)' 
                  }}>
                Anna Lea
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <button
              onClick={() => scrollToSection('books')}
              className="relative px-4 py-2 transition-all duration-300 font-medium group"
              style={{ 
                fontFamily: 'var(--font-body-refined)',
                color: 'var(--color-neutral-700)' 
              }}
            >
              Books
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--color-warm-sage)' }}></span>
            </button>
            <a
              href="/about"
              className="relative px-4 py-2 transition-all duration-300 font-medium group"
              style={{ 
                fontFamily: 'var(--font-body-refined)',
                color: 'var(--color-neutral-700)' 
              }}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--color-warm-sage)' }}></span>
            </a>
            <a
              href="/contact"
              className="relative px-4 py-2 transition-all duration-300 font-medium group"
              style={{ 
                fontFamily: 'var(--font-body-refined)',
                color: 'var(--color-neutral-700)' 
              }}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--color-warm-sage)' }}></span>
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button with Badge */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 transition-colors duration-200"
                style={{ color: 'var(--color-neutral-700)' }}
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
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
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
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
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('books')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Books
              </button>
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
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