import { CartItem } from '@/contexts/CartContext';

// Order status types
export type OrderStatus = 
  | 'pending'           // Payment intent created, awaiting payment
  | 'processing'        // Payment confirmed, order being processed
  | 'completed'         // Order fulfilled
  | 'failed'            // Payment failed
  | 'cancelled'         // Order cancelled
  | 'refunded';         // Order refunded

// Customer information interface
export interface CustomerInfo {
  email: string;
  name: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  phone?: string;
}

// Order item interface (based on cart items)
export interface OrderItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string;
}

// Complete order interface
export interface Order {
  orderId: string;
  paymentIntentId: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  orderSummary: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    currency: string;
  };
  status: OrderStatus;
  timestamps: {
    created: string;
    updated: string;
    completed?: string;
  };
  metadata?: {
    source: string;
    notes?: string;
    [key: string]: any;
  };
}

// Generate unique order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `AL-${timestamp}-${randomStr}`.toUpperCase();
};

// Convert cart items to order items
export const convertCartToOrderItems = (cartItems: CartItem[]): OrderItem[] => {
  return cartItems.map(item => ({
    id: item.id,
    title: item.title,
    author: item.author,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
    image: item.image,
  }));
};

// Calculate order totals
export const calculateOrderTotals = (items: OrderItem[], taxRate: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * taxRate;
  const shipping = 0; // Free shipping for digital books
  const total = subtotal + tax + shipping;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

// Create new order
export const createOrder = (
  paymentIntentId: string,
  customerInfo: CustomerInfo,
  cartItems: CartItem[],
  taxRate: number = 0
): Order => {
  const orderId = generateOrderId();
  const items = convertCartToOrderItems(cartItems);
  const orderSummary = calculateOrderTotals(items, taxRate);
  const now = new Date().toISOString();

  return {
    orderId,
    paymentIntentId,
    customerInfo,
    items,
    orderSummary: {
      ...orderSummary,
      currency: 'usd',
    },
    status: 'pending',
    timestamps: {
      created: now,
      updated: now,
    },
    metadata: {
      source: 'web',
      notes: 'Anna Lea book purchase',
    },
  };
};

// Order storage functions (using localStorage for now)
const ORDERS_STORAGE_KEY = 'anna-lea-orders';

// Save order to localStorage
export const saveOrder = (order: Order): void => {
  try {
    const existingOrders = getStoredOrders();
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Failed to save order:', error);
    throw new Error('Could not save order data');
  }
};

// Get all stored orders
export const getStoredOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve orders:', error);
    return [];
  }
};

// Get order by ID
export const getOrderById = (orderId: string): Order | null => {
  try {
    const orders = getStoredOrders();
    return orders.find(order => order.orderId === orderId) || null;
  } catch (error) {
    console.error('Failed to retrieve order:', error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = (orderId: string, status: OrderStatus): void => {
  try {
    const orders = getStoredOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    orders[orderIndex].status = status;
    orders[orderIndex].timestamps.updated = new Date().toISOString();
    
    if (status === 'completed') {
      orders[orderIndex].timestamps.completed = new Date().toISOString();
    }

    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw new Error('Could not update order status');
  }
};

// Get orders by customer email
export const getOrdersByCustomer = (email: string): Order[] => {
  try {
    const orders = getStoredOrders();
    return orders.filter(order => 
      order.customerInfo.email.toLowerCase() === email.toLowerCase()
    );
  } catch (error) {
    console.error('Failed to retrieve customer orders:', error);
    return [];
  }
};

// Order validation functions
export const validateOrderData = (order: Partial<Order>): string[] => {
  const errors: string[] = [];

  if (!order.customerInfo?.email) {
    errors.push('Customer email is required');
  }

  if (!order.customerInfo?.name) {
    errors.push('Customer name is required');
  }

  if (!order.items || order.items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (order.items) {
    order.items.forEach((item, index) => {
      if (!item.id || !item.title || !item.price || !item.quantity) {
        errors.push(`Item ${index + 1} is missing required fields`);
      }
      
      if (item.price <= 0 || item.quantity <= 0) {
        errors.push(`Item ${index + 1} has invalid price or quantity`);
      }
    });
  }

  return errors;
};

// Format order for display
export const formatOrderForDisplay = (order: Order) => {
  return {
    orderNumber: order.orderId,
    date: new Date(order.timestamps.created).toLocaleDateString(),
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
    total: `$${order.orderSummary.total.toFixed(2)}`,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    items: order.items.map(item => ({
      title: item.title,
      author: item.author,
      quantity: item.quantity,
      price: `$${item.price.toFixed(2)}`,
      subtotal: `$${item.subtotal.toFixed(2)}`,
    })),
  };
};