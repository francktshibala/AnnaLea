import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Conditional import to handle missing environment variables during build
let supabaseTyped: any = null;
let supabaseError: string | null = null;
try {
  console.log('Environment check:', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...'
  });
  const { supabaseTyped: supabase } = require('@/lib/supabase');
  supabaseTyped = supabase;
  console.log('Supabase client created successfully');
} catch (error) {
  supabaseError = error instanceof Error ? error.message : 'Unknown error';
  console.error('Supabase initialization error:', supabaseError);
}

// Validation schema for review submission
const reviewSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  customerName: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  customerEmail: z.string().email('Invalid email format').max(255, 'Email too long'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(500, 'Comment too long'),
});

export async function POST(request: NextRequest) {
  try {
    if (!supabaseTyped) {
      return NextResponse.json(
        { error: 'Database not configured', details: supabaseError },
        { status: 503 }
      );
    }

    console.log('API route called');
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate the request body
    const validatedData = reviewSchema.parse(body);
    console.log('Validation passed:', validatedData);
    
    // Insert the review into the database with minimal return
    console.log('Attempting database insert...');
    const { data, error } = await supabaseTyped
      .from('reviews')
      .insert({
        book_id: validatedData.bookId,
        customer_name: validatedData.customerName,
        customer_email: validatedData.customerEmail,
        rating: validatedData.rating,
        comment: validatedData.comment,
        approved: true, // Reviews appear immediately
      }, {
        returning: 'minimal' // This prevents the automatic SELECT that was causing RLS violation
      });

    console.log('Database response:', { data, error });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit review', details: error.message },
        { status: 500 }
      );
    }

    // Return success response (data will be null due to minimal return)
    return NextResponse.json({
      message: 'Review submitted successfully',
      success: true
    });

  } catch (error) {
    console.error('API error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid data provided',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!supabaseTyped) {
      return NextResponse.json(
        { error: 'Database not configured', reviews: [], details: supabaseError },
        { status: 503 }
      );
    }

    console.log('GET API route called');
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');
    const bookId = searchParams.get('bookId');
    console.log('Query params:', { approved, bookId });
    
    // Build query
    let query = supabaseTyped
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Filter by approval status if specified
    if (approved === 'true') {
      query = query.eq('approved', true);
    } else if (approved === 'false') {
      query = query.eq('approved', false);
    }
    // If no approved parameter, return all reviews (for admin page)
    
    // Filter by book ID if specified
    if (bookId) {
      query = query.eq('book_id', bookId);
    }
    
    const { data, error } = await query;
    
    console.log('Database query result:', { data, error, rowCount: data?.length });
    
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }
    
    // Transform data to match frontend expectations
    const reviews = data.map(review => ({
      id: review.id,
      bookId: review.book_id,
      customerName: review.customer_name,
      customerEmail: review.customer_email,
      rating: review.rating,
      comment: review.comment,
      approved: review.approved,
      createdAt: review.created_at,
    }));
    
    console.log('Transformed reviews:', reviews);
    
    return NextResponse.json({ reviews });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}