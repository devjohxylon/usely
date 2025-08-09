import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

export async function GET(request: NextRequest) {
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

    // Get current month's usage
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: usageData, error: usageError } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    if (usageError) {
      console.error('Database error:', usageError);
      return NextResponse.json(
        { error: 'Failed to fetch usage data' },
        { status: 500 }
      );
    }

    // Calculate totals
    const totalTokens = usageData?.reduce((sum, record) => sum + (record.total_tokens || 0), 0) || 0;
    const totalCost = usageData?.reduce((sum, record) => sum + (record.cost || 0), 0) || 0;
    const totalRequests = usageData?.length || 0;

    // Group by provider
    const providerStats = usageData?.reduce((acc, record) => {
      const provider = record.provider || 'Unknown';
      if (!acc[provider]) {
        acc[provider] = {
          name: provider,
          tokens: 0,
          cost: 0,
          status: 'active'
        };
      }
      acc[provider].tokens += record.total_tokens || 0;
      acc[provider].cost += record.cost || 0;
      return acc;
    }, {} as Record<string, any>) || {};

    const providers = Object.values(providerStats);

    // Get user's plan from users table
    let userPlan = 'free';
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('plan')
        .eq('id', userId)
        .single();

      if (!userError && userData) {
        userPlan = userData.plan || 'free';
      }
    } catch (error) {
      console.log('Users table might not exist yet, using default plan');
    }

    return NextResponse.json({
      success: true,
      data: {
        tokens: totalTokens,
        cost: totalCost,
        requests: totalRequests,
        providers,
        plan: userPlan
      }
    });

  } catch (error) {
    console.error('Usage API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 