import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip);
    
    if (error) {
      return false;
    }
    
    return (count || 0) >= 1;
  } catch (error) {
    return false;
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
        { error: 'You can only submit one email, I know you\'re excited!' },
        { status: 429 }
      );
    }
    
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
          ip_address: ip,
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