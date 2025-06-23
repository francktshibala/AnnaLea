import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// Create Supabase client
export const supabase = createClient(
  config.database.supabase.url,
  config.database.supabase.anonKey
);

// Database types
export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          title: string;
          author: string;
          price: number;
          description: string;
          image_url: string;
          category: string;
          stock_quantity: number;
          featured: boolean;
          isbn: string | null;
          pages: number | null;
          publication_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author: string;
          price: number;
          description: string;
          image_url: string;
          category: string;
          stock_quantity: number;
          featured?: boolean;
          isbn?: string | null;
          pages?: number | null;
          publication_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          price?: number;
          description?: string;
          image_url?: string;
          category?: string;
          stock_quantity?: number;
          featured?: boolean;
          isbn?: string | null;
          pages?: number | null;
          publication_date?: string | null;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_email: string;
          customer_name: string;
          total_amount: number;
          status: string;
          stripe_payment_intent_id: string | null;
          shipping_address: object;
          billing_address: object | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_email: string;
          customer_name: string;
          total_amount: number;
          status?: string;
          stripe_payment_intent_id?: string | null;
          shipping_address: object;
          billing_address?: object | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_email?: string;
          customer_name?: string;
          total_amount?: number;
          status?: string;
          stripe_payment_intent_id?: string | null;
          shipping_address?: object;
          billing_address?: object | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          book_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          book_id: string;
          quantity: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          book_id?: string;
          quantity?: number;
          price?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          book_id: string;
          customer_name: string;
          customer_email: string;
          rating: number;
          comment: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          customer_name: string;
          customer_email: string;
          rating: number;
          comment: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          customer_name?: string;
          customer_email?: string;
          rating?: number;
          comment?: string;
          approved?: boolean;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          subscribed: boolean;
          source: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          subscribed?: boolean;
          source?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          subscribed?: boolean;
          source?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}

// Create typed client
export const supabaseTyped = createClient<Database>(
  config.database.supabase.url,
  config.database.supabase.anonKey
);