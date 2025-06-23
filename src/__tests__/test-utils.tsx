import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Book, CartItem } from '@/types';

// Test utilities for consistent testing across the application

// Mock cart context provider
const MockCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="cart-provider">{children}</div>;
};

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <MockCartProvider>{children}</MockCartProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock data factories
export const createMockBook = (overrides?: Partial<Book>): Book => ({
  id: 'mock-book-1',
  title: 'Test Book',
  author: 'Anna Lea Cannon',
  price: 12.99,
  description: 'A test book description',
  image_url: '/test-book.jpg',
  category: 'christian',
  stock_quantity: 10,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockCartItem = (overrides?: Partial<CartItem>): CartItem => ({
  book: createMockBook(),
  quantity: 1,
  ...overrides,
});

export const createMockBooks = (count: number = 3): Book[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockBook({
      id: `mock-book-${index + 1}`,
      title: `Test Book ${index + 1}`,
      price: 10 + index * 2.5,
    })
  );
};

// Mock API responses
export const mockApiResponse = <T>(data: T, error?: string) => ({
  data,
  error,
  success: !error,
});

// Common test assertions
export const expectElementToHaveClasses = (element: HTMLElement, classes: string[]) => {
  classes.forEach(className => {
    expect(element).toHaveClass(className);
  });
};

export const expectButtonToBeDisabled = (button: HTMLElement) => {
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-disabled', 'true');
};

export const expectImageToHaveCorrectAttributes = (image: HTMLElement, alt: string, src: string) => {
  expect(image).toHaveAttribute('alt', alt);
  expect(image).toHaveAttribute('src', expect.stringContaining(src));
};

// Mock localStorage for testing
export const mockLocalStorage = () => {
  const storage: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach(key => delete storage[key]);
    }),
  };
};

// Mock window.location
export const mockWindowLocation = (url: string = 'http://localhost:3000') => {
  const location = new URL(url);
  
  Object.defineProperty(window, 'location', {
    value: {
      ...location,
      assign: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
    },
    writable: true,
  });
};

// Mock fetch for API testing
export const mockFetch = (response: any, ok: boolean = true) => {
  return jest.fn().mockResolvedValue({
    ok,
    json: async () => response,
    status: ok ? 200 : 400,
    statusText: ok ? 'OK' : 'Bad Request',
  });
};

// Async utility for waiting for effects
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

// Custom matchers for better test readability
export const customMatchers = {
  toBeInCart: (received: string, cart: CartItem[]) => {
    const isInCart = cart.some(item => item.book.id === received);
    return {
      message: () => `expected book ${received} ${isInCart ? 'not ' : ''}to be in cart`,
      pass: isInCart,
    };
  },
  
  toHaveCorrectPrice: (received: HTMLElement, price: number) => {
    const priceText = received.textContent;
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
    
    const hasCorrectPrice = priceText?.includes(formattedPrice) || false;
    
    return {
      message: () => `expected element to contain price ${formattedPrice}, but got ${priceText}`,
      pass: hasCorrectPrice,
    };
  },
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };