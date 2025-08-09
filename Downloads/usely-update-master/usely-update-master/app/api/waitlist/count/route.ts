import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching waitlist count:', error);
      return NextResponse.json({ count: 20 }, { status: 200 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Waitlist count API error:', error);
    return NextResponse.json({ count: 20 }, { status: 200 });
  }
} 