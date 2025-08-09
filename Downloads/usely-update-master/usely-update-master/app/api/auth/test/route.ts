import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Test if we can connect to Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    return NextResponse.json({
      success: true,
      hasUser: !!user,
      user: user ? {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name
      } : null,
      error: authError?.message || null,
      envVars: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
      }
    });

  } catch (error) {
    console.error('Auth test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      envVars: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
      }
    }, { status: 500 });
  }
} 