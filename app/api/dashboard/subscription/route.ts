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

    // Get user's plan and subscription info
    let userPlan = 'free';
    
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('plan, email, created_at')
        .eq('id', userId)
        .single();

      if (!userError && userData) {
        userPlan = userData.plan || 'free';
      }
    } catch (error) {
      console.log('Users table might not exist yet, using default plan');
    }
    
    // Define plan features and limits
    const planFeatures = {
      free: ['10,000 tokens/month', 'Single project', 'Community support', 'Basic analytics'],
      pro: ['1,000,000 tokens/month', 'Multi-project support', 'Priority support', 'Advanced analytics', 'Team management', 'Custom billing rates'],
      enterprise: ['Unlimited tokens', 'Unlimited projects', '24/7 support', 'Custom integrations', 'Dedicated account manager', 'Compliance certifications']
    };

    const planLimits = {
      free: { tokens: 100000, users: 1, providers: 'Basic', support: 'Community' },
      pro: { tokens: 1000000, users: 'Unlimited', providers: 'All', support: 'Priority' },
      enterprise: { tokens: 'Unlimited', users: 'Unlimited', providers: 'All', support: '24/7' }
    };

    const planPricing = {
      free: { price: 0, name: 'Free Plan' },
      pro: { price: 29, name: 'Pro Plan' },
      enterprise: { price: 299, name: 'Enterprise Plan' }
    };

    const currentPlan = {
      name: planPricing[userPlan as keyof typeof planPricing]?.name || 'Free Plan',
      price: planPricing[userPlan as keyof typeof planPricing]?.price || 0,
      features: planFeatures[userPlan as keyof typeof planFeatures] || planFeatures.free,
      limits: planLimits[userPlan as keyof typeof planLimits] || planLimits.free
    };

    // Get team members from database (for Pro/Enterprise plans)
    let teamMembers: any[] = [];
    
    if (userPlan !== 'free') {
      try {
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select('*')
          .eq('user_id', userId);

        if (!teamError && teamData) {
          // Calculate usage for each team member
          teamMembers = await Promise.all(teamData.map(async (member) => {
            // Get usage for this team member (in a real app, you'd track per-member usage)
            const { data: memberUsage, error: usageError } = await supabase
              .from('usage_tracking')
              .select('total_tokens')
              .eq('user_id', userId)
              .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()); // Last 30 days

            const totalUsage = memberUsage?.reduce((sum, record) => sum + (record.total_tokens || 0), 0) || 0;
            
            return {
              id: member.id,
              name: member.name,
              email: member.email,
              role: member.role,
              status: member.status,
              usage: totalUsage,
              limit: member.usage_limit,
              lastActive: member.updated_at ? new Date(member.updated_at).toLocaleDateString() : 'Never'
            };
          }));
        }
      } catch (error) {
        console.log('Team members table might not exist yet');
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        currentPlan,
        teamMembers
      }
    });

  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 