'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for cart functionality
export interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: any) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('anna-lea-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log('Could not load cart from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('anna-lea-cart', JSON.stringify(cartItems));
      } catch (error) {
        console.log('Could not save cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoaded]);

  // Add item to cart
  const addToCart = (book: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add to cart
        return [...prevItems, {
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          image: book.image,
          quantity: 1,
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (bookId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  // Update item quantity
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === bookId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};