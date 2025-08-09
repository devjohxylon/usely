import { createClient } from './supabase-server';

interface WebhookPayload {
  id: string;
  type: string;
  data: any;
  created: string;
}

export class WebhookService {
  private static async getActiveWebhooks(eventType: string) {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('webhooks')
      .select('*')
      .eq('is_active', true)
      .contains('events', [eventType]);

    if (error) {
      console.error('Error fetching webhooks:', error);
      return [];
    }

    return data || [];
  }

  private static async sendWebhook(webhook: any, payload: WebhookPayload) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'Usely-Webhooks/1.0'
      };

      // Add webhook secret if provided
      if (webhook.secret) {
        const crypto = require('crypto');
        const signature = crypto
          .createHmac('sha256', webhook.secret)
          .update(JSON.stringify(payload))
          .digest('hex');
        headers['X-Usely-Signature'] = `sha256=${signature}`;
      }

      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      // Log webhook delivery attempt
      const supabase = createClient();
      await supabase
        .from('webhook_deliveries')
        .insert({
          webhook_id: webhook.id,
          event_type: payload.type,
          payload: payload,
          response_status: response.status,
          response_body: await response.text().catch(() => ''),
          delivered_at: new Date().toISOString()
        });

      return response.ok;
    } catch (error) {
      console.error('Webhook delivery failed:', error);
      
      // Log failed delivery
      const supabase = createClient();
      await supabase
        .from('webhook_deliveries')
        .insert({
          webhook_id: webhook.id,
          event_type: payload.type,
          payload: payload,
          response_status: 0,
          response_body: error instanceof Error ? error.message : 'Unknown error',
          delivered_at: new Date().toISOString()
        });

      return false;
    }
  }

  static async sendUsageTrackedEvent(usageData: any) {
    const webhooks = await this.getActiveWebhooks('usage.tracked');
    
    const payload: WebhookPayload = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'usage.tracked',
      data: {
        provider: usageData.provider,
        model: usageData.model,
        tokens: {
          input: usageData.input_tokens,
          output: usageData.output_tokens,
          total: usageData.total_tokens
        },
        cost: usageData.cost,
        userId: usageData.user_id,
        metadata: usageData.metadata,
        timestamp: usageData.created_at
      },
      created: new Date().toISOString()
    };

    // Send to all active webhooks
    const promises = webhooks.map(webhook => this.sendWebhook(webhook, payload));
    await Promise.allSettled(promises);
  }

  static async sendBillingUpdatedEvent(billingData: any) {
    const webhooks = await this.getActiveWebhooks('billing.updated');
    
    const payload: WebhookPayload = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'billing.updated',
      data: billingData,
      created: new Date().toISOString()
    };

    const promises = webhooks.map(webhook => this.sendWebhook(webhook, payload));
    await Promise.allSettled(promises);
  }

  static async sendQuotaExceededEvent(quotaData: any) {
    const webhooks = await this.getActiveWebhooks('quota.exceeded');
    
    const payload: WebhookPayload = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'quota.exceeded',
      data: quotaData,
      created: new Date().toISOString()
    };

    const promises = webhooks.map(webhook => this.sendWebhook(webhook, payload));
    await Promise.allSettled(promises);
  }
} 