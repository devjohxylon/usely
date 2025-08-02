import { createClient } from '../../../lib/supabase-server';
import { redirect } from 'next/navigation';
import AnalyticsDashboard from './AnalyticsDashboard';

export default async function DashboardPage() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/admin/login');
  }

  return <AnalyticsDashboard user={user} />;
} 