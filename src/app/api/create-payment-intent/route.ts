import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe, STRIPE_CONFIG, isStripeConfigured } from '@/lib/stripe';
import { CartItem } from '@/contexts/CartContext';

interface CreatePaymentIntentRequest {
  cartItems: CartItem[];
  customerInfo?: {
    email?: string;
    name?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is properly configured
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json(
        { 
          error: 'Payment processing is not configured. Please contact support.',
          code: 'STRIPE_NOT_CONFIGURED'
        },
        { status: 503 }
      );
    }

    const body: CreatePaymentIntentRequest = await request.json();
    const { cartItems, customerInfo } = body;

    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty or invalid' },
        { status: 400 }
      );
    }

    // Validate each cart item
    for (const item of cartItems) {
      if (!item.id || !item.title || !item.price || !item.quantity) {
        return NextResponse.json(
          { error: 'Invalid cart item structure' },
          { status: 400 }
        );
      }
      
      if (item.price <= 0 || item.quantity <= 0) {
        return NextResponse.json(
          { error: 'Invalid price or quantity' },
          { status: 400 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Validate minimum amount (Stripe minimum is $0.50 USD)
    if (totalAmount < 0.50) {
      return NextResponse.json(
        { error: 'Order total must be at least $0.50' },
        { status: 400 }
      );
    }

    // Convert amount to Stripe format (cents)
    const stripeAmount = formatAmountForStripe(totalAmount, STRIPE_CONFIG.currency);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: STRIPE_CONFIG.currency,
      payment_method_types: ['card'],
      metadata: {
        // Store cart information in metadata
        itemCount: cartItems.length.toString(),
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0).toString(),
        customerEmail: customerInfo?.email || '',
        orderType: 'book_purchase',
      },
      description: `Anna Lea Books - ${cartItems.length} item(s)`,
      ...(customerInfo?.email && {
        receipt_email: customerInfo.email,
      }),
    });

    // Return payment intent client secret and order details
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
      currency: STRIPE_CONFIG.currency,
      orderSummary: {
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          author: item.author,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: totalAmount,
      },
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    
    // Handle specific Stripe errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid API Key')) {
        return NextResponse.json(
          { error: 'Payment service configuration error' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('rate_limit')) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

// Handle GET requests for API documentation/health check
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/create-payment-intent',
    method: 'POST',
    description: 'Creates a Stripe payment intent for cart checkout',
    requiredFields: ['cartItems'],
    optionalFields: ['customerInfo'],
    exampleRequest: {
      cartItems: [
        {
          id: '1',
          title: 'Sample Book',
          author: 'Anna Lea Cannon',
          price: 12.99,
          quantity: 1,
        }
      ],
      customerInfo: {
        email: 'customer@example.com',
        name: 'John Doe',
      }
    },
    stripeMode: STRIPE_CONFIG.mode,
  });
}