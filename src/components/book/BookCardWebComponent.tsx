'use client';

import React, { useEffect, useRef } from 'react';

// TypeScript interfaces for BookCard props
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
}

export interface BookCardProps {
  book: Book;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  onAddToCart?: (book: Book) => void;
  className?: string;
}

// Web Component Class - Bypasses Next.js build system entirely
class BookCard3DElement extends HTMLElement {
  private hoverCount = 0;
  private book: Book | null = null;
  private onAddToCart: ((book: Book) => void) | null = null;
  private loading = false;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.addEventListeners();
  }

  static get observedAttributes() {
    return ['book-data', 'loading', 'size'];
  }

  attributeChangedCallback() {
    this.render();
  }

  setBookData(book: Book, onAddToCart?: (book: Book) => void, loading = false) {
    this.book = book;
    this.onAddToCart = onAddToCart || null;
    this.loading = loading;
    this.render();
  }

  addEventListeners() {
    const card = this.shadowRoot?.querySelector('.book-card-3d');
    const button = this.shadowRoot?.querySelector('.add-to-cart-btn');
    const hoverCounter = this.shadowRoot?.querySelector('.hover-count');

    card?.addEventListener('mouseenter', () => {
      this.hoverCount++;
      card.classList.add('hovered');
      if (hoverCounter) {
        hoverCounter.textContent = this.hoverCount.toString();
      }
    });

    card?.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });

    button?.addEventListener('click', () => {
      if (this.book && this.onAddToCart && !this.loading) {
        this.onAddToCart(this.book);
      }
    });
  }

  render() {
    if (!this.shadowRoot || !this.book) return;

    const size = this.getAttribute('size') || 'medium';
    const maxWidth = size === 'small' ? '200px' : size === 'large' ? '320px' : '280px';

    // SHADOW DOM CSS - UNTOUCHABLE BY BUILD TOOLS
    this.shadowRoot.innerHTML = `
      <style>
        /* CSS EMBEDDED IN SHADOW DOM - BYPASSES ALL BUILD OPTIMIZATION */
        :host {
          display: block;
          width: 100%;
          max-width: ${maxWidth};
          perspective: 1000px !important;
          transform-style: preserve-3d !important;
        }

        .book-card-3d {
          position: relative;
          height: 420px;
          width: 100%;
          background: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transform-style: preserve-3d !important;
          perspective: 1000px !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px);
        }

        /* 3D HOVER EFFECTS - PROTECTED IN SHADOW DOM */
        .book-card-3d.hovered {
          transform: perspective(1000px) rotateX(15deg) rotateY(-15deg) translateZ(30px) translateY(-10px) !important;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25) !important;
          background: #ffffff !important;
        }

        .book-image {
          width: 100%;
          height: 60%;
          background-size: cover;
          background-position: center;
          border-radius: 12px 12px 0 0;
          transition: all 0.3s ease;
          transform: translateZ(0px);
        }

        .book-card-3d.hovered .book-image {
          transform: translateZ(15px) scale(1.03) !important;
        }

        .book-info {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .book-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
          line-height: 1.4;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .book-author {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .book-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 16px;
          height: 40px;
          overflow: hidden;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .book-price {
          font-size: 20px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 8px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .debug-info {
          font-size: 12px;
          color: #16a34a;
          margin-bottom: 12px;
          font-weight: bold;
          background-color: #f0fdf4;
          padding: 4px 8px;
          border-radius: 4px;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.3s ease;
          transform: translateZ(0px);
        }

        .book-card-3d.hovered .debug-info {
          transform: translateZ(20px) scale(1.05) !important;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.2s ease;
          transform: translateZ(0px);
        }

        .book-card-3d.hovered .add-to-cart-btn {
          transform: translateZ(10px) !important;
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4) !important;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>

      <div class="book-card-3d" data-testid="book-card">
        <!-- Book Image -->
        <div class="book-image" style="background-image: url('${this.book.image}');"></div>

        <!-- Book Info -->
        <div class="book-info">
          <div>
            <div class="book-title">${this.book.title}</div>
            <div class="book-author">by ${this.book.author}</div>
            <div class="book-description">${this.book.description.substring(0, 80)}...</div>
            <div class="book-price">$${this.book.price.toFixed(2)}</div>
            
            <!-- Debug Info - Shows Web Component working -->
            <div class="debug-info">
              🌐 Web Component • Hover Count: <span class="hover-count">${this.hoverCount}</span>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <button class="add-to-cart-btn" ${this.loading ? 'disabled' : ''}>
            ${this.loading ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
        </div>

        <!-- Loading Overlay -->
        ${this.loading ? '<div class="loading-overlay"><div class="loading-spinner"></div></div>' : ''}
      </div>
    `;

    this.addEventListeners();
  }
}

// Register the Web Component
if (typeof window !== 'undefined' && !customElements.get('book-card-3d')) {
  customElements.define('book-card-3d', BookCard3DElement);
}

// React wrapper for the Web Component
export const BookCard = React.forwardRef<HTMLDivElement, BookCardProps>(
  ({ book, size = 'medium', loading = false, onAddToCart, className }, ref) => {
    const webComponentRef = useRef<BookCard3DElement>(null);

    useEffect(() => {
      if (webComponentRef.current) {
        webComponentRef.current.setBookData(book, onAddToCart, loading);
      }
    }, [book, onAddToCart, loading]);

    return (
      <div ref={ref} className={className} data-testid="book-card-wrapper">
        <book-card-3d
          ref={webComponentRef}
          size={size}
          book-data={JSON.stringify(book)}
          loading={loading ? 'true' : 'false'}
        />
      </div>
    );
  }
);

BookCard.displayName = 'BookCard';

// TypeScript declaration for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'book-card-3d': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          size?: string;
          'book-data'?: string;
          loading?: string;
        },
        HTMLElement
      >;
    }
  }
}