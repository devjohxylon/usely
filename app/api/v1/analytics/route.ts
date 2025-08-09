import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

interface AnalyticsRequest {
  startDate?: string;
  endDate?: string;
  provider?: string;
  userId?: string;
  groupBy?: 'day' | 'week' | 'month';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
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

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const provider = searchParams.get('provider');
    const groupBy = searchParams.get('groupBy') || 'day';

    // Build query - only get data for the authenticated user
    let query = supabase
      .from('usage_tracking')
      .select('*')
      .eq('user_id', userId);

    // Add filters
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    if (provider) {
      query = query.eq('provider', provider);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Calculate analytics
    const analytics = {
      totalRequests: data.length,
      totalTokens: data.reduce((sum, record) => sum + (record.total_tokens || 0), 0),
      totalCost: data.reduce((sum, record) => sum + (record.cost || 0), 0),
      averageTokensPerRequest: data.length > 0 
        ? data.reduce((sum, record) => sum + (record.total_tokens || 0), 0) / data.length 
        : 0,
      averageCostPerRequest: data.length > 0
        ? data.reduce((sum, record) => sum + (record.cost || 0), 0) / data.length
        : 0,
      providers: {} as Record<string, any>,
      models: {} as Record<string, any>,
      timeSeries: [] as any[]
    };

    // Group by provider
    data.forEach(record => {
      const provider = record.provider;
      if (!analytics.providers[provider]) {
        analytics.providers[provider] = {
          requests: 0,
          tokens: 0,
          cost: 0
        };
      }
      analytics.providers[provider].requests++;
      analytics.providers[provider].tokens += record.total_tokens || 0;
      analytics.providers[provider].cost += record.cost || 0;
    });

    // Group by model
    data.forEach(record => {
      const model = record.model || 'unknown';
      if (!analytics.models[model]) {
        analytics.models[model] = {
          requests: 0,
          tokens: 0,
          cost: 0
        };
      }
      analytics.models[model].requests++;
      analytics.models[model].tokens += record.total_tokens || 0;
      analytics.models[model].cost += record.cost || 0;
    });

    // Simple time series grouping (day)
    const timeSeriesMap = new Map();
    data.forEach(record => {
      const date = new Date(record.created_at).toISOString().split('T')[0];
      if (!timeSeriesMap.has(date)) {
        timeSeriesMap.set(date, {
          date,
          requests: 0,
          tokens: 0,
          cost: 0
        });
      }
      const dayData = timeSeriesMap.get(date);
      dayData.requests++;
      dayData.tokens += record.total_tokens || 0;
      dayData.cost += record.cost || 0;
    });

    analytics.timeSeries = Array.from(timeSeriesMap.values())
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      success: true,
      analytics,
      filters: {
        startDate,
        endDate,
        provider,
        userId,
        groupBy
      }
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 