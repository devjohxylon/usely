import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get user ID from session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = user.id;

    // First, ensure user exists in users table
    try {
      await supabase
        .from('users')
        .upsert({
          id: userId,
          email: user.email,
          name: user.user_metadata?.name || user.user_metadata?.full_name,
          plan: 'pro'
        });
    } catch (error) {
      console.log('Users table might not exist yet');
    }

    // Add some sample usage data
    const sampleUsageData = [
      {
        user_id: userId,
        provider: 'OpenAI',
        model: 'gpt-4',
        input_tokens: 1500,
        output_tokens: 800,
        total_tokens: 2300,
        cost: 0.069,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        user_id: userId,
        provider: 'OpenAI',
        model: 'gpt-4',
        input_tokens: 2200,
        output_tokens: 1200,
        total_tokens: 3400,
        cost: 0.102,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      },
      {
        user_id: userId,
        provider: 'Anthropic',
        model: 'claude-3-sonnet',
        input_tokens: 1800,
        output_tokens: 950,
        total_tokens: 2750,
        cost: 0.085,
        created_at: new Date().toISOString() // today
      },
      {
        user_id: userId,
        provider: 'Google',
        model: 'gemini-pro',
        input_tokens: 1200,
        output_tokens: 600,
        total_tokens: 1800,
        cost: 0.045,
        created_at: new Date().toISOString() // today
      }
    ];

    // Insert sample usage data
    try {
      const { error: usageError } = await supabase
        .from('usage_tracking')
        .insert(sampleUsageData);

      if (usageError) {
        console.error('Error inserting usage data:', usageError);
      }
    } catch (error) {
      console.log('Usage tracking table might not exist yet');
    }

    // Add sample billing transaction
    try {
      await supabase
        .from('billing_transactions')
        .insert({
          user_id: userId,
          amount: 29.00,
          status: 'completed',
          type: 'subscription',
          description: 'Pro Plan - Monthly'
        });
    } catch (error) {
      console.log('Billing transactions table might not exist yet');
    }

    return NextResponse.json({
      success: true,
      message: 'Sample data added successfully'
    });

  } catch (error) {
    console.error('Seed data API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 