import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = params.id;
    
    if (!reviewId) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    console.log('Deleting review:', reviewId);

    // Delete the review from the database
    const { error } = await supabaseTyped
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to delete review', details: error.message },
        { status: 500 }
      );
    }

    console.log('Review deleted successfully:', reviewId);

    return NextResponse.json({
      message: 'Review deleted successfully',
      success: true
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}