import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };

    // Try importing supabase
    let supabaseStatus = 'not_loaded';
    let supabaseError = null;
    
    try {
      const { supabaseTyped } = require('@/lib/supabase');
      if (supabaseTyped) {
        supabaseStatus = 'loaded_successfully';
        
        // Try a simple query
        try {
          const { data, error } = await supabaseTyped
            .from('reviews')
            .select('count', { count: 'exact' })
            .limit(0);
          
          if (error) {
            supabaseStatus = 'loaded_but_query_failed';
            supabaseError = error.message;
          } else {
            supabaseStatus = 'loaded_and_working';
          }
        } catch (queryError) {
          supabaseStatus = 'loaded_but_query_errored';
          supabaseError = queryError instanceof Error ? queryError.message : 'Unknown query error';
        }
      } else {
        supabaseStatus = 'loaded_but_null';
      }
    } catch (importError) {
      supabaseStatus = 'import_failed';
      supabaseError = importError instanceof Error ? importError.message : 'Unknown import error';
    }

    return NextResponse.json({
      status: 'debug_endpoint_working',
      environment: envCheck,
      supabase: {
        status: supabaseStatus,
        error: supabaseError
      }
    });

  } catch (error) {
    return NextResponse.json({
      status: 'debug_endpoint_error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}