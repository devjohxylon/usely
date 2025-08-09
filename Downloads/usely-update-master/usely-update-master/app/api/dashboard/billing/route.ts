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

    // Get user's plan and billing info
    let userPlan = 'free';
    let userCreatedAt = new Date();
    let billingEmail = '';
    
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('plan, billing_email, created_at')
        .eq('id', userId)
        .single();

      if (!userError && userData) {
        userPlan = userData.plan || 'free';
        userCreatedAt = new Date(userData.created_at || new Date());
        billingEmail = userData.billing_email || '';
      }
    } catch (error) {
      console.log('Users table might not exist yet, using default values');
    }
    
    // Calculate plan pricing
    const planPricing = {
      free: { price: 0, name: 'Free Plan' },
      pro: { price: 29, name: 'Pro Plan' },
      enterprise: { price: 299, name: 'Enterprise Plan' }
    };

    const currentPlan = planPricing[userPlan as keyof typeof planPricing] || planPricing.free;

    // Calculate next billing date (monthly)
    const nextBilling = new Date(userCreatedAt);
    nextBilling.setMonth(nextBilling.getMonth() + 1);

    // Get current month's usage cost
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: usageData, error: usageError } = await supabase
      .from('usage_tracking')
      .select('cost')
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    if (usageError) {
      console.error('Database error:', usageError);
      return NextResponse.json(
        { error: 'Failed to fetch usage data' },
        { status: 500 }
      );
    }

    const monthlySpent = usageData?.reduce((sum, record) => sum + (record.cost || 0), 0) || 0;
    
    // Set budget based on plan
    const budgetLimits = {
      free: 50,
      pro: 300,
      enterprise: 2000
    };
    
    const budget = budgetLimits[userPlan as keyof typeof budgetLimits] || budgetLimits.free;
    const remaining = Math.max(0, budget - monthlySpent);

    // Get recent transactions from database
    let recentTransactions: any[] = [];
    
    try {
      const { data: transactionData, error: transactionError } = await supabase
        .from('billing_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!transactionError && transactionData) {
        recentTransactions = transactionData.map(txn => ({
          id: txn.id,
          amount: txn.amount,
          status: txn.status,
          date: new Date(txn.created_at).toISOString().split('T')[0],
          description: txn.description || `${txn.type} transaction`,
          type: txn.type
        }));
      }
    } catch (error) {
      console.log('Billing transactions table might not exist yet');
      
      // Fallback: create a basic subscription transaction if user has a paid plan
      if (currentPlan.price > 0) {
        recentTransactions = [{
          id: 'fallback_001',
          amount: currentPlan.price,
          status: 'completed' as const,
          date: new Date().toISOString().split('T')[0],
          description: `${currentPlan.name} - Monthly`,
          type: 'subscription' as const
        }];
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        currentPlan: {
          name: currentPlan.name,
          price: currentPlan.price,
          nextBilling: nextBilling.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        },
        usage: {
          spent: monthlySpent,
          budget,
          remaining
        },
        recentTransactions
      }
    });

  } catch (error) {
    console.error('Billing API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 