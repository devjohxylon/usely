import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// In-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const maxRequests = 3; // Max 3 requests per hour per IP

  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count++;
  return false;
}

async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('email', email.toLowerCase().trim());
    
    if (error) {
      console.error('Error checking email:', error);
      return false;
    }
    
    return (count || 0) > 0;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}

function isValidEmail(email: string): boolean {
  // More comprehensive email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Check for common spam patterns
  const spamPatterns = [
    /^test@/i,
    /^admin@/i,
    /^info@/i,
    /^noreply@/i,
    /^no-reply@/i,
    /^mail@/i,
    /^webmaster@/i,
    /^postmaster@/i,
    /^abuse@/i,
    /^spam@/i,
    /^trash@/i,
    /^garbage@/i,
    /^temp@/i,
    /^tmp@/i,
    /^fake@/i,
    /^example@/i,
    /^sample@/i,
    /^demo@/i,
    /^test\d+@/i,
    /^user\d+@/i,
    /^admin\d+@/i,
    /^guest\d+@/i,
    /^anonymous@/i,
    /^nobody@/i,
    /^someone@/i,
    /^anyone@/i,
    /^everyone@/i,
    /^noreply\d+@/i,
    /^no-reply\d+@/i,
    /^mail\d+@/i,
    /^webmaster\d+@/i,
    /^postmaster\d+@/i,
    /^abuse\d+@/i,
    /^spam\d+@/i,
    /^trash\d+@/i,
    /^garbage\d+@/i,
    /^temp\d+@/i,
    /^tmp\d+@/i,
    /^fake\d+@/i,
    /^example\d+@/i,
    /^sample\d+@/i,
    /^demo\d+@/i
  ];
  
  for (const pattern of spamPatterns) {
    if (pattern.test(email)) {
      return false;
    }
  }
  
  // Check for disposable email domains (basic check)
  const disposableDomains = [
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'tempmail.org',
    'throwaway.email',
    'yopmail.com',
    'getairmail.com',
    'mailnesia.com',
    'sharklasers.com',
    'grr.la',
    'guerrillamailblock.com',
    'pokemail.net',
    'spam4.me',
    'bccto.me',
    'chacuo.net',
    'dispostable.com',
    'fakeinbox.com',
    'fakeinbox.net',
    'fakemailgenerator.com',
    'maildrop.cc',
    'mailmetrash.com',
    'mailnull.com',
    'mintemail.com',
    'mytrashmail.com',
    'nwldx.com',
    'sharklasers.com',
    'spamspot.com',
    'tempr.email',
    'tmpeml.com',
    'trashmail.com',
    'trashmail.net',
    'wegwerfemail.de',
    'wegwerfemail.net',
    'wegwerfemail.org'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) {
    return false;
  }
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limiting
    const isRateLimited = await checkRateLimit(ip);
    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const { email } = await request.json();
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }
    
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if email already exists
    const emailExists = await checkEmailExists(cleanEmail);
    if (emailExists) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist!' },
        { status: 409 }
      );
    }
    
    // Insert the email
    const { error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: cleanEmail,
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
      
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 