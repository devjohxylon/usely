'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/UserContext';
import Dashboard from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('Dashboard auth state:', { user, loading });
    if (!loading && !user) {
      console.log('No user found, redirecting to home');
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to home
  }

  return <Dashboard />;
} 