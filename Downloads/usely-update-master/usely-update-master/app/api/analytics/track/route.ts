import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { type, timestamp } = await request.json();
    const supabase = createClient();

    const { error } = await supabase
      .from('user_sessions')
      .insert({
        session_type: type,
        timestamp: timestamp,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_address: request.headers.get('x-forwarded-for') || request.ip || 'unknown'
      });

    if (error) {
      // Silent fail for analytics
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 