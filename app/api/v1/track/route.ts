import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';
import { WebhookService } from '../../../../lib/webhook-service';

interface TrackRequest {
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  model?: string;
  tokens?: {
    input: number;
    output: number;
  };
  cost?: number;
  userId?: string;
  metadata?: Record<string, any>;
}

// Privacy-safe metadata fields only
const ALLOWED_METADATA_FIELDS = [
  'request_id',
  'session_id', 
  'feature_name',
  'environment',
  'version'
];

export async function POST(request: NextRequest) {
  try {
    const body: TrackRequest = await request.json();
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
    if (!body.provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      );
    }

    // Validate tokens if provided
    if (body.tokens) {
      if (typeof body.tokens.input !== 'number' || typeof body.tokens.output !== 'number') {
        return NextResponse.json(
          { error: 'Tokens must have input and output as numbers' },
          { status: 400 }
        );
      }
    }

    // Sanitize metadata to only allow privacy-safe fields
    let sanitizedMetadata = {};
    if (body.metadata) {
      for (const [key, value] of Object.entries(body.metadata)) {
        if (ALLOWED_METADATA_FIELDS.includes(key)) {
          sanitizedMetadata[key] = value;
        }
      }
    }

    // Insert usage record
    const { data, error } = await supabase
      .from('usage_tracking')
      .insert({
        provider: body.provider,
        model: body.model || null,
        input_tokens: body.tokens?.input || 0,
        output_tokens: body.tokens?.output || 0,
        total_tokens: (body.tokens?.input || 0) + (body.tokens?.output || 0),
        cost: body.cost || 0,
        user_id: userId,
        metadata: sanitizedMetadata,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to track usage' },
        { status: 500 }
      );
    }

    // Send webhook notification (fire and forget)
    WebhookService.sendUsageTrackedEvent(data).catch(error => {
      console.error('Webhook delivery failed:', error);
    });

    return NextResponse.json({
      success: true,
      id: data.id,
      tracked_at: data.created_at
    });

  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 