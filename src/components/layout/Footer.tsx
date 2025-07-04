'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--charcoal-navy)',
      color: 'var(--cream)',
      paddingTop: 'var(--space-16)',
      paddingBottom: 'var(--space-8)'
    }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About Anna Lea Section */}
          <div>
            <h3 className="text-xl font-bold font-display mb-4" style={{ color: 'var(--golden-honey)' }}>
              About Anna Lea
            </h3>
            <p className="text-sm font-body mb-4 opacity-90">
              Inspirational Christian storyteller weaving together faith, family, and history 
              in captivating stories that touch hearts worldwide.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                   style={{ backgroundColor: 'var(--sage-green)' }}>
                <span className="font-bold text-sm text-white">AL</span>
              </div>
              <span className="font-medium font-display">Anna Lea Cannon</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-display mb-4" style={{ color: 'var(--golden-honey)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a href="/about" className="hover:opacity-75 transition-opacity duration-200">
                  About Anna Lea
                </a>
              </li>
              <li>
                <a href="/books" className="hover:opacity-75 transition-opacity duration-200">
                  All Books
                </a>
              </li>
              <li>
                <a href="/biblical-stories" className="hover:opacity-75 transition-opacity duration-200">
                  Biblical Stories
                </a>
              </li>
              <li>
                <a href="/missionary-tales" className="hover:opacity-75 transition-opacity duration-200">
                  Missionary Tales
                </a>
              </li>
              <li>
                <a href="/reviews" className="hover:opacity-75 transition-opacity duration-200">
                  Reader Reviews
                </a>
              </li>
              <li>
                <a href="/news" className="hover:opacity-75 transition-opacity duration-200">
                  News & Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Anna Lea */}
          <div>
            <h3 className="text-xl font-bold font-display mb-4" style={{ color: 'var(--golden-honey)' }}>
              Connect
            </h3>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a href="/contact" className="hover:opacity-75 transition-opacity duration-200">
                  Contact Anna Lea
                </a>
              </li>
              <li>
                <a href="mailto:contact@annaleacannon.com" className="hover:opacity-75 transition-opacity duration-200">
                  Email: contact@annaleacannon.com
                </a>
              </li>
              <li>
                <a href="tel:+1-555-123-4567" className="hover:opacity-75 transition-opacity duration-200">
                  Phone: (555) 123-4567
                </a>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div className="mt-4">
              <h4 className="font-medium font-display mb-2 text-sm" style={{ color: 'var(--golden-honey)' }}>
                Follow Anna Lea
              </h4>
              <div className="flex gap-3">
                <a href="https://facebook.com/annaleacannon" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                   style={{ backgroundColor: 'var(--sage-green)' }}>
                  <span className="text-white text-sm font-bold">f</span>
                </a>
                <a href="https://instagram.com/annaleacannon" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                   style={{ backgroundColor: 'var(--burgundy)' }}>
                  <span className="text-white text-sm font-bold">ig</span>
                </a>
                <a href="https://twitter.com/annaleacannon" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                   style={{ backgroundColor: 'var(--golden-honey)' }}>
                  <span className="text-white text-sm font-bold">tw</span>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold font-display mb-4" style={{ color: 'var(--golden-honey)' }}>
              Stay Updated
            </h3>
            <p className="text-sm font-body mb-4 opacity-90">
              Subscribe to receive updates about new book releases and Anna Lea's writing journey.
            </p>
            
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--cream)',
                  color: 'var(--charcoal-navy)',
                  borderColor: 'var(--sage-green)'
                }}
              />
              <button 
                className="w-full px-4 py-2 rounded-lg text-sm font-medium font-sans transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--sage-green)',
                  color: 'white'
                }}
              >
                Subscribe
              </button>
            </div>
            
            <p className="text-xs opacity-75 mt-3 font-body">
              No spam, just inspiration and book updates.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
             style={{ borderColor: 'var(--sage-green)', opacity: '0.3' }}>
          
          {/* Copyright */}
          <div className="text-sm font-body opacity-75">
            <p>&copy; 2025 Anna Lea Cannon. All rights reserved.</p>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm font-body">
            <a href="/privacy" className="hover:opacity-75 transition-opacity duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:opacity-75 transition-opacity duration-200">
              Terms of Service
            </a>
            <a href="/accessibility" className="hover:opacity-75 transition-opacity duration-200">
              Accessibility
            </a>
          </div>

          {/* Author Recognition */}
          <div className="text-sm font-body opacity-75">
            <p>Inspirational Christian Author</p>
          </div>
        </div>
      </div>
    </footer>
  );
};