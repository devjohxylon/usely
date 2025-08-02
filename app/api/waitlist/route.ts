import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return false;
  }
  
  const requests = rateLimitMap.get(ip)!;
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
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