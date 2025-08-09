interface UselyConfig {
  apiKey: string;
  projectId?: string;
  baseUrl?: string;
}

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

interface AnalyticsRequest {
  startDate?: string;
  endDate?: string;
  provider?: string;
  userId?: string;
  groupBy?: 'day' | 'week' | 'month';
}

interface WebhookRequest {
  url: string;
  events: string[];
  secret?: string;
}

export class Usely {
  private apiKey: string;
  private projectId?: string;
  private baseUrl: string;

  constructor(config: UselyConfig) {
    this.apiKey = config.apiKey;
    this.projectId = config.projectId;
    this.baseUrl = config.baseUrl || 'http://localhost:3000/api/v1';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async route(data: {
    prompt: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
    metadata?: Record<string, any>;
  }) {
    return this.request<{
      success: boolean;
      routing: {
        provider: string;
        provider_name: string;
        model: string;
        base_url: string;
        reason: string;
        estimated_cost: string;
        estimated_latency: number;
        reliability: number;
      };
      request_id: string;
      timestamp: string;
    }>('/route', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async track(data: TrackRequest) {
    return this.request('/track', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAnalytics(params: AnalyticsRequest = {}) {
    const searchParams = new URLSearchParams();
    
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);
    if (params.provider) searchParams.append('provider', params.provider);
    if (params.userId) searchParams.append('userId', params.userId);
    if (params.groupBy) searchParams.append('groupBy', params.groupBy);

    const queryString = searchParams.toString();
    const endpoint = `/analytics${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async createWebhook(data: WebhookRequest) {
    return this.request('/webhooks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getWebhooks() {
    return this.request('/webhooks');
  }

  // Convenience method for tracking OpenAI usage
  async trackOpenAI(params: {
    model: string;
    inputTokens: number;
    outputTokens: number;
    cost?: number;
    userId?: string;
    metadata?: Record<string, any>;
  }) {
    return this.track({
      provider: 'openai',
      model: params.model,
      tokens: {
        input: params.inputTokens,
        output: params.outputTokens,
      },
      cost: params.cost,
      userId: params.userId,
      metadata: params.metadata,
    });
  }

  // Convenience method for tracking Anthropic usage
  async trackAnthropic(params: {
    model: string;
    inputTokens: number;
    outputTokens: number;
    cost?: number;
    userId?: string;
    metadata?: Record<string, any>;
  }) {
    return this.track({
      provider: 'anthropic',
      model: params.model,
      tokens: {
        input: params.inputTokens,
        output: params.outputTokens,
      },
      cost: params.cost,
      userId: params.userId,
      metadata: params.metadata,
    });
  }

  // Convenience method for tracking Google/Gemini usage
  async trackGemini(params: {
    model: string;
    inputTokens: number;
    outputTokens: number;
    cost?: number;
    userId?: string;
    metadata?: Record<string, any>;
  }) {
    return this.track({
      provider: 'google',
      model: params.model,
      tokens: {
        input: params.inputTokens,
        output: params.outputTokens,
      },
      cost: params.cost,
      userId: params.userId,
      metadata: params.metadata,
    });
  }
}

// Export a default instance factory
export function createUsely(config: UselyConfig): Usely {
  return new Usely(config);
} 