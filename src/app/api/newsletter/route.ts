import { NextRequest, NextResponse } from 'next/server';

interface NewsletterSignup {
  email: string;
  timestamp: string;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'api' } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, this would be a database operation
    // For now, we'll simulate with server-side storage using headers/cookies
    // since we can't access localStorage on the server side
    
    // For the mock implementation, we'll just validate and return success
    // The actual storage will happen on the client side
    
    const newSignup: NewsletterSignup = {
      email,
      timestamp: new Date().toISOString(),
      source,
    };

    // Simulate async operation (like database save)
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: newSignup.email,
        timestamp: newSignup.timestamp,
      }
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint could be used to get newsletter statistics
  // For security, we won't expose actual email addresses
  
  try {
    // In a real app, this would query the database
    // For now, return mock statistics
    
    return NextResponse.json({
      success: true,
      data: {
        totalSubscribers: 1000, // Mock data
        recentSignups: 25, // Mock data for last 30 days
        message: 'Newsletter statistics retrieved successfully'
      }
    });
  } catch (error) {
    console.error('Newsletter stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}