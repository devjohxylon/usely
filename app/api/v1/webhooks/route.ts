import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

interface WebhookRequest {
  url: string;
  events: string[];
  secret?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WebhookRequest = await request.json();
    const supabase = createClient();

    // Get user ID from either session or API key
    let userId: string | null = null;
    
    // Try to get user from session first
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!authError && user) {
      userId = user.id;
    } else {
      // Try API key authentication
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const apiKey = authHeader.substring(7);
        
        // Look up user by API key
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('api_key', apiKey)
          .single();
          
        if (!userError && userData) {
          userId = userData.id;
        }
      }
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!body.url) {
      return NextResponse.json(
        { error: 'Webhook URL is required' },
        { status: 400 }
      );
    }

    if (!body.events || !Array.isArray(body.events) || body.events.length === 0) {
      return NextResponse.json(
        { error: 'At least one event type is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(body.url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid webhook URL format' },
        { status: 400 }
      );
    }

    // Insert webhook subscription
    const { data, error } = await supabase
      .from('webhooks')
      .insert({
        user_id: userId,
        url: body.url,
        events: body.events,
        secret: body.secret || null,
        is_active: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create webhook' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      url: data.url,
      events: data.events,
      created_at: data.created_at
    });

  } catch (error) {
    console.error('Webhook API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get user ID from either session or API key
    let userId: string | null = null;
    
    // Try to get user from session first
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!authError && user) {
      userId = user.id;
    } else {
      // Try API key authentication
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const apiKey = authHeader.substring(7);
        
        // Look up user by API key
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('api_key', apiKey)
          .single();
          
        if (!userError && userData) {
          userId = userData.id;
        }
      }
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('webhooks')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch webhooks' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      webhooks: data
    });

  } catch (error) {
    console.error('Webhook API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 