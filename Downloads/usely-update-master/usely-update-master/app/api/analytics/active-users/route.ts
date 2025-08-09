import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

export async function GET() {
  try {
    const supabase = createClient();

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { data: activeSessions, error } = await supabase
      .from('user_sessions')
      .select('ip_address')
      .gte('timestamp', fiveMinutesAgo);

    if (error) {
      return NextResponse.json({ activeUsers: 0 });
    }

    const uniqueIPs = new Set(activeSessions?.map(session => session.ip_address) || []);
    const activeUsers = uniqueIPs.size;

    return NextResponse.json({ activeUsers });
  } catch (error) {
    return NextResponse.json({ activeUsers: 0 });
  }
} 