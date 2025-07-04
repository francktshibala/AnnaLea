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
        {/* Main Footer Content - 2 Column Layout like Cathy Carr */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">

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
                <a href="https://youtube.com/@annaleacannon" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                   style={{ backgroundColor: 'var(--golden-honey)' }}>
                  <span className="text-white text-sm font-bold">yt</span>
                </a>
              </div>
            </div>
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