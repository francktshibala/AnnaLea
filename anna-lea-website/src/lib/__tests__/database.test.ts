import { BookService, OrderService, ReviewService, NewsletterService } from '../database';
import { supabaseTyped } from '../supabase';

// Mock the supabase client
jest.mock('../supabase', () => ({
  supabaseTyped: {
    from: jest.fn(),
    rpc: jest.fn(),
  },
}));

const mockSupabase = supabaseTyped as jest.Mocked<typeof supabaseTyped>;

describe('Database Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('BookService', () => {
    describe('getAllBooks', () => {
      it('should fetch all books successfully', async () => {
        const mockBooks = [
          {
            id: '1',
            title: 'Test Book',
            author: 'Anna Lea Cannon',
            price: 12.99,
            description: 'Test description',
            image_url: '/test.jpg',
            category: 'christian',
            stock_quantity: 10,
            created_at: '2024-01-01',
          },
        ];

        const mockQuery = {
          select: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: mockBooks, error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        const books = await BookService.getAllBooks();

        expect(mockSupabase.from).toHaveBeenCalledWith('books');
        expect(mockQuery.select).toHaveBeenCalledWith('*');
        expect(mockQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
        expect(books).toEqual(mockBooks);
      });

      it('should handle database errors', async () => {
        const mockQuery = {
          select: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await expect(BookService.getAllBooks()).rejects.toThrow('Failed to fetch books');
      });
    });

    describe('getBookById', () => {
      it('should fetch a book by ID successfully', async () => {
        const mockBook = {
          id: '1',
          title: 'Test Book',
          author: 'Anna Lea Cannon',
          price: 12.99,
        };

        const mockQuery = {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: mockBook, error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        const book = await BookService.getBookById('1');

        expect(mockSupabase.from).toHaveBeenCalledWith('books');
        expect(mockQuery.eq).toHaveBeenCalledWith('id', '1');
        expect(book).toEqual(mockBook);
      });

      it('should return null for non-existent book', async () => {
        const mockQuery = {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ 
            data: null, 
            error: { code: 'PGRST116' } 
          }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        const book = await BookService.getBookById('999');

        expect(book).toBeNull();
      });
    });

    describe('searchBooks', () => {
      it('should search books by query', async () => {
        const mockBooks = [
          { id: '1', title: 'Christian Book', author: 'Anna Lea Cannon' },
        ];

        const mockQuery = {
          select: jest.fn().mockReturnThis(),
          or: jest.fn().mockReturnThis(),
          gt: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: mockBooks, error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        const books = await BookService.searchBooks('Christian');

        expect(mockQuery.or).toHaveBeenCalledWith(
          'title.ilike.%Christian%, description.ilike.%Christian%, author.ilike.%Christian%'
        );
        expect(books).toEqual(mockBooks);
      });
    });
  });

  describe('OrderService', () => {
    describe('createOrder', () => {
      it('should create an order successfully', async () => {
        const mockOrder = { id: 'order-1' };
        const orderData = {
          customerEmail: 'test@example.com',
          customerName: 'John Doe',
          totalAmount: 25.98,
          shippingAddress: { street: '123 Main St' },
          items: [
            {
              book: { id: 'book-1', price: 12.99 } as any,
              quantity: 2,
            },
          ],
        };

        const mockOrderQuery = {
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: mockOrder, error: null }),
        };

        const mockItemsQuery = {
          insert: jest.fn().mockResolvedValue({ error: null }),
        };

        mockSupabase.from
          .mockReturnValueOnce(mockOrderQuery as any)
          .mockReturnValueOnce(mockItemsQuery as any);

        const orderId = await OrderService.createOrder(orderData);

        expect(orderId).toBe('order-1');
        expect(mockOrderQuery.insert).toHaveBeenCalled();
        expect(mockItemsQuery.insert).toHaveBeenCalled();
      });

      it('should handle order creation errors', async () => {
        const orderData = {
          customerEmail: 'test@example.com',
          customerName: 'John Doe',
          totalAmount: 25.98,
          shippingAddress: { street: '123 Main St' },
          items: [],
        };

        const mockQuery = {
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ 
            data: null, 
            error: { message: 'Insert failed' } 
          }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await expect(OrderService.createOrder(orderData)).rejects.toThrow('Failed to create order');
      });
    });
  });

  describe('ReviewService', () => {
    describe('submitReview', () => {
      it('should submit a review successfully', async () => {
        const reviewData = {
          bookId: 'book-1',
          customerName: 'Jane Doe',
          customerEmail: 'jane@example.com',
          rating: 5,
          comment: 'Great book!',
        };

        const mockQuery = {
          insert: jest.fn().mockResolvedValue({ error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await expect(ReviewService.submitReview(reviewData)).resolves.not.toThrow();

        expect(mockSupabase.from).toHaveBeenCalledWith('reviews');
        expect(mockQuery.insert).toHaveBeenCalledWith({
          book_id: 'book-1',
          customer_name: 'Jane Doe',
          customer_email: 'jane@example.com',
          rating: 5,
          comment: 'Great book!',
        });
      });

      it('should sanitize review input', async () => {
        const reviewData = {
          bookId: 'book-1',
          customerName: '<script>alert("xss")</script>',
          customerEmail: 'jane@example.com',
          rating: 5,
          comment: 'Great book!',
        };

        const mockQuery = {
          insert: jest.fn().mockResolvedValue({ error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await ReviewService.submitReview(reviewData);

        expect(mockQuery.insert).toHaveBeenCalledWith({
          book_id: 'book-1',
          customer_name: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
          customer_email: 'jane@example.com',
          rating: 5,
          comment: 'Great book!',
        });
      });

      it('should clamp rating between 1 and 5', async () => {
        const reviewData = {
          bookId: 'book-1',
          customerName: 'Jane Doe',
          customerEmail: 'jane@example.com',
          rating: 10, // Invalid rating
          comment: 'Great book!',
        };

        const mockQuery = {
          insert: jest.fn().mockResolvedValue({ error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await ReviewService.submitReview(reviewData);

        expect(mockQuery.insert).toHaveBeenCalledWith(
          expect.objectContaining({
            rating: 5, // Should be clamped to 5
          })
        );
      });
    });
  });

  describe('NewsletterService', () => {
    describe('subscribe', () => {
      it('should subscribe to newsletter successfully', async () => {
        const mockQuery = {
          upsert: jest.fn().mockResolvedValue({ error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await expect(NewsletterService.subscribe('test@example.com', 'John')).resolves.not.toThrow();

        expect(mockSupabase.from).toHaveBeenCalledWith('newsletter_subscribers');
        expect(mockQuery.upsert).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            name: 'John',
            source: 'website',
          },
          { onConflict: 'email' }
        );
      });

      it('should sanitize email input', async () => {
        const mockQuery = {
          upsert: jest.fn().mockResolvedValue({ error: null }),
        };

        mockSupabase.from.mockReturnValue(mockQuery as any);

        await NewsletterService.subscribe('TEST@EXAMPLE.COM');

        expect(mockQuery.upsert).toHaveBeenCalledWith(
          expect.objectContaining({
            email: 'test@example.com', // Should be lowercase
          }),
          { onConflict: 'email' }
        );
      });
    });
  });
});