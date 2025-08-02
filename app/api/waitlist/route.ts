import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

const MAX_REQUESTS_PER_MINUTE = 3;

async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    
    const { count, error } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('endpoint', 'waitlist')
      .gte('window_start', oneMinuteAgo);
    
    if (error) {
      return false;
    }
    
    return (count || 0) >= MAX_REQUESTS_PER_MINUTE;
  } catch (error) {
    return false;
  }
}

async function recordRequest(ip: string): Promise<void> {
  try {
    await supabase
      .from('rate_limits')
      .insert([
        {
          ip_address: ip,
          endpoint: 'waitlist',
          request_count: 1,
          window_start: new Date().toISOString()
        }
      ]);
  } catch (error) {
    // Silent fail for rate limiting
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    const isLimited = await checkRateLimit(ip);
    if (isLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    await recordRequest(ip);
    
    const { email } = await request.json();
    
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }
    
    const { error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: email.trim().toLowerCase(),
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist!' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 