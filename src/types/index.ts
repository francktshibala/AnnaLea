// Core book types
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  image_url: string;
  category: BookCategory;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export type BookCategory = 
  | 'christian'
  | 'inspirational'
  | 'historical'
  | 'children'
  | 'romance'
  | 'mystery';

// Shopping cart types
export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Order types
export interface Order {
  id: string;
  customer_email: string;
  total_amount: number;
  status: OrderStatus;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  created_at: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Animation types
export interface AnimationProps {
  duration?: number;
  delay?: number;
  className?: string;
}

// Form validation types
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

// Review types
export interface Review {
  id: string;
  bookId: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  reviewerName: string;
  reviewerLocation?: string;
  isVerifiedPurchase?: boolean;
  isHighlighted?: boolean; // For featured reviews
  date: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}