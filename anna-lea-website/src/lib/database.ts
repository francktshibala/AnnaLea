import { supabaseTyped } from './supabase';
import { Book, Order, Review, CartItem } from '@/types';
import { sanitizeHtml } from '@/utils';

// Book operations
export class BookService {
  static async getAllBooks(): Promise<Book[]> {
    try {
      const { data, error } = await supabaseTyped
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books');
    }
  }

  static async getFeaturedBooks(): Promise<Book[]> {
    try {
      const { data, error } = await supabaseTyped
        .rpc('get_featured_books');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured books:', error);
      throw new Error('Failed to fetch featured books');
    }
  }

  static async getBookById(id: string): Promise<Book | null> {
    try {
      const { data, error } = await supabaseTyped
        .from('books')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // No rows found
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  }

  static async getBooksByCategory(category: string): Promise<Book[]> {
    try {
      const { data, error } = await supabaseTyped
        .from('books')
        .select('*')
        .eq('category', category)
        .gt('stock_quantity', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching books by category:', error);
      throw new Error('Failed to fetch books by category');
    }
  }

  static async searchBooks(query: string): Promise<Book[]> {
    try {
      const { data, error } = await supabaseTyped
        .from('books')
        .select('*')
        .or(`title.ilike.%${query}%, description.ilike.%${query}%, author.ilike.%${query}%`)
        .gt('stock_quantity', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching books:', error);
      throw new Error('Failed to search books');
    }
  }
}

// Order operations
export class OrderService {
  static async createOrder(orderData: {
    customerEmail: string;
    customerName: string;
    totalAmount: number;
    shippingAddress: object;
    billingAddress?: object;
    items: CartItem[];
  }): Promise<string> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...orderData,
        customerName: sanitizeHtml(orderData.customerName),
        customerEmail: sanitizeHtml(orderData.customerEmail),
      };

      // Start transaction
      const { data: order, error: orderError } = await supabaseTyped
        .from('orders')
        .insert({
          customer_email: sanitizedData.customerEmail,
          customer_name: sanitizedData.customerName,
          total_amount: sanitizedData.totalAmount,
          shipping_address: sanitizedData.shippingAddress,
          billing_address: sanitizedData.billingAddress,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = sanitizedData.items.map(item => ({
        order_id: order.id,
        book_id: item.book.id,
        quantity: item.quantity,
        price: item.book.price,
      }));

      const { error: itemsError } = await supabaseTyped
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  static async updateOrderStatus(orderId: string, status: string, paymentIntentId?: string): Promise<void> {
    try {
      const updateData: any = { status };
      if (paymentIntentId) {
        updateData.stripe_payment_intent_id = paymentIntentId;
      }

      const { error } = await supabaseTyped
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  static async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const { data, error } = await supabaseTyped
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            book_id,
            books (*)
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as any;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }
}

// Review operations
export class ReviewService {
  static async getBookReviews(bookId: string): Promise<Review[]> {
    try {
      const { data, error } = await supabaseTyped
        .from('reviews')
        .select('*')
        .eq('book_id', bookId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw new Error('Failed to fetch reviews');
    }
  }

  static async submitReview(reviewData: {
    bookId: string;
    customerName: string;
    customerEmail: string;
    rating: number;
    comment: string;
  }): Promise<void> {
    try {
      // Sanitize input data
      const sanitizedData = {
        book_id: reviewData.bookId,
        customer_name: sanitizeHtml(reviewData.customerName),
        customer_email: sanitizeHtml(reviewData.customerEmail),
        rating: Math.max(1, Math.min(5, reviewData.rating)), // Ensure rating is 1-5
        comment: sanitizeHtml(reviewData.comment),
      };

      const { error } = await supabaseTyped
        .from('reviews')
        .insert(sanitizedData);

      if (error) throw error;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw new Error('Failed to submit review');
    }
  }
}

// Newsletter operations
export class NewsletterService {
  static async subscribe(email: string, name?: string, source?: string): Promise<void> {
    try {
      const sanitizedData = {
        email: sanitizeHtml(email.toLowerCase()),
        name: name ? sanitizeHtml(name) : null,
        source: source ? sanitizeHtml(source) : 'website',
      };

      const { error } = await supabaseTyped
        .from('newsletter_subscribers')
        .upsert(sanitizedData, { onConflict: 'email' });

      if (error) throw error;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw new Error('Failed to subscribe to newsletter');
    }
  }

  static async unsubscribe(email: string): Promise<void> {
    try {
      const { error } = await supabaseTyped
        .from('newsletter_subscribers')
        .update({ subscribed: false })
        .eq('email', email.toLowerCase());

      if (error) throw error;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw new Error('Failed to unsubscribe from newsletter');
    }
  }
}

// Inventory operations
export class InventoryService {
  static async checkStock(bookId: string, quantity: number): Promise<boolean> {
    try {
      const { data, error } = await supabaseTyped
        .from('books')
        .select('stock_quantity')
        .eq('id', bookId)
        .single();

      if (error) throw error;
      return data.stock_quantity >= quantity;
    } catch (error) {
      console.error('Error checking stock:', error);
      return false;
    }
  }

  static async reserveStock(items: CartItem[]): Promise<boolean> {
    try {
      // Check if all items are in stock
      for (const item of items) {
        const inStock = await this.checkStock(item.book.id, item.quantity);
        if (!inStock) return false;
      }

      // Reserve stock (decrease quantity)
      for (const item of items) {
        const { error } = await supabaseTyped
          .from('books')
          .update({ 
            stock_quantity: supabaseTyped.raw(`stock_quantity - ${item.quantity}`)
          })
          .eq('id', item.book.id)
          .gte('stock_quantity', item.quantity);

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Error reserving stock:', error);
      return false;
    }
  }
}