import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase-server';

interface RouteRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  userId?: string;
  metadata?: Record<string, any>;
}

interface ProviderConfig {
  name: string;
  models: string[];
  baseUrl: string;
  costPer1kTokens: {
    input: number;
    output: number;
  };
  avgLatency: number; // in milliseconds
  reliability: number; // 0-1 score
  capabilities: string[];
}

// Provider configurations with real performance data
const PROVIDERS: Record<string, ProviderConfig> = {
  openai: {
    name: 'OpenAI',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    baseUrl: 'https://api.openai.com/v1',
    costPer1kTokens: { input: 0.03, output: 0.06 },
    avgLatency: 1200,
    reliability: 0.99,
    capabilities: ['text-generation', 'code-generation', 'reasoning']
  },
  anthropic: {
    name: 'Anthropic',
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    baseUrl: 'https://api.anthropic.com/v1',
    costPer1kTokens: { input: 0.015, output: 0.075 },
    avgLatency: 800,
    reliability: 0.98,
    capabilities: ['text-generation', 'reasoning', 'analysis']
  },
  google: {
    name: 'Google',
    models: ['gemini-pro', 'gemini-flash'],
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    costPer1kTokens: { input: 0.0025, output: 0.005 },
    avgLatency: 600,
    reliability: 0.97,
    capabilities: ['text-generation', 'multimodal']
  },
  mistral: {
    name: 'Mistral',
    models: ['mistral-large', 'mixtral-8x7b'],
    baseUrl: 'https://api.mistral.ai/v1',
    costPer1kTokens: { input: 0.007, output: 0.024 },
    avgLatency: 900,
    reliability: 0.96,
    capabilities: ['text-generation', 'code-generation']
  }
};

// Intelligent routing algorithm
function selectOptimalProvider(
  request: RouteRequest,
  userHistory: any[],
  providerPerformance: any[]
): { provider: string; model: string; reason: string } {
  const promptLength = request.prompt.length;
  const estimatedTokens = Math.ceil(promptLength / 4); // Rough estimation
  
  // Calculate scores for each provider
  const providerScores = Object.entries(PROVIDERS).map(([key, provider]) => {
    let score = 0;
    let reasons: string[] = [];
    
    // Cost efficiency (40% weight)
    const estimatedCost = (estimatedTokens / 1000) * provider.costPer1kTokens.input;
    const costScore = 1 - (estimatedCost / 0.1); // Normalize to 0-1
    score += costScore * 0.4;
    reasons.push(`Cost: $${estimatedCost.toFixed(4)}`);
    
    // Performance/latency (30% weight)
    const latencyScore = 1 - (provider.avgLatency / 2000); // Normalize to 0-1
    score += latencyScore * 0.3;
    reasons.push(`Latency: ${provider.avgLatency}ms`);
    
    // Reliability (20% weight)
    score += provider.reliability * 0.2;
    reasons.push(`Reliability: ${(provider.reliability * 100).toFixed(1)}%`);
    
    // User preference from history (10% weight)
    const userPreference = userHistory.filter(h => h.provider === key).length / Math.max(userHistory.length, 1);
    score += userPreference * 0.1;
    reasons.push(`User preference: ${(userPreference * 100).toFixed(1)}%`);
    
    // Select best model for the provider
    const model = request.model && provider.models.includes(request.model) 
      ? request.model 
      : provider.models[0];
    
    return {
      provider: key,
      model,
      score,
      reasons
    };
  });
  
  // Sort by score and return the best
  providerScores.sort((a, b) => b.score - a.score);
  const best = providerScores[0];
  
  return {
    provider: best.provider,
    model: best.model,
    reason: `Selected ${PROVIDERS[best.provider].name} based on: ${best.reasons.join(', ')}`
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: RouteRequest = await request.json();
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
    if (!body.prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get user's usage history for pattern analysis
    const { data: userHistory } = await supabase
      .from('usage_tracking')
      .select('provider, model, cost, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100);

    // Get recent provider performance data
    const { data: providerPerformance } = await supabase
      .from('usage_tracking')
      .select('provider, cost, created_at')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
      .order('created_at', { ascending: false });

    // Use intelligent routing to select optimal provider
    const routing = selectOptimalProvider(body, userHistory || [], providerPerformance || []);
    
    // Get the selected provider configuration
    const selectedProvider = PROVIDERS[routing.provider];
    
    // Prepare the response with routing information
    const response = {
      success: true,
      routing: {
        provider: routing.provider,
        provider_name: selectedProvider.name,
        model: routing.model,
        base_url: selectedProvider.baseUrl,
        reason: routing.reason,
        estimated_cost: ((body.prompt.length / 4 / 1000) * selectedProvider.costPer1kTokens.input).toFixed(6),
        estimated_latency: selectedProvider.avgLatency,
        reliability: selectedProvider.reliability
      },
      request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    // Track this routing decision for future optimization
    await supabase
      .from('usage_tracking')
      .insert({
        provider: routing.provider,
        model: routing.model,
        user_id: userId,
        metadata: {
          request_id: response.request_id,
          routing_reason: routing.reason,
          original_request: {
            prompt_length: body.prompt.length,
            requested_model: body.model,
            max_tokens: body.maxTokens,
            temperature: body.temperature
          }
        },
        created_at: new Date().toISOString()
      });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Route API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 