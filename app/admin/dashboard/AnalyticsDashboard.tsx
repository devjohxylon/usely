'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase-client';
import { User } from '@supabase/supabase-js';

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

interface AnalyticsData {
  totalWaitlist: number;
  todayWaitlist: number;
  weekWaitlist: number;
  growthRate: number;
  activeUsers: number;
}

interface AdminDashboardProps {
  user: User;
}

export default function AnalyticsDashboard({ user }: AdminDashboardProps) {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const recordAdminActivity = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type: 'admin_dashboard_view',
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        // Silent fail for analytics
      }
    };

    recordAdminActivity();

    const updateActiveUsers = async () => {
      try {
        const response = await fetch('/api/analytics/active-users');
        if (response.ok) {
          const data = await response.json();
          setActiveUsers(data.activeUsers || 0);
        }
      } catch (error) {
        const recentActivity = waitlist.filter(entry => {
          const joinTime = new Date(entry.created_at);
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
          return joinTime > fiveMinutesAgo;
        }).length;
        setActiveUsers(Math.max(recentActivity, 1));
      }
    };

    updateActiveUsers();
    const interval = setInterval(updateActiveUsers, 10000);
    return () => clearInterval(interval);
  }, [waitlist]);

  const fetchAnalyticsData = async () => {
    try {
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (waitlistError) {
        return;
      }

      setWaitlist(waitlistData || []);
      calculateAnalytics(waitlistData || []);
    } catch (error) {
      // Silent fail
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAnalytics = (data: WaitlistEntry[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayWaitlist = data.filter(entry => new Date(entry.created_at) >= today).length;
    const weekWaitlist = data.filter(entry => new Date(entry.created_at) >= weekAgo).length;
    
    const totalWaitlist = data.length;
    const growthRate = weekWaitlist > 0 ? Math.round(((todayWaitlist / weekWaitlist) * 100)) : 0;

    const analyticsData: AnalyticsData = {
      totalWaitlist: data.length,
      todayWaitlist,
      weekWaitlist,
      growthRate,
      activeUsers
    };

    setAnalytics(analyticsData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const exportCSV = () => {
    const headers = ['Email', 'Join Date', 'Time'];
    const csvContent = [
      headers.join(','),
      ...waitlist.map(entry => [
        entry.email,
        new Date(entry.created_at).toLocaleDateString(),
        new Date(entry.created_at).toLocaleTimeString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usely-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading || !analytics) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading waitlist analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">Waitlist Analytics</h1>
              <p className="text-gray-400 text-lg">Track your growth and engagement</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">{activeUsers} active users</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Total Waitlist</h3>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-sm">👥</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{analytics.totalWaitlist.toLocaleString()}</p>
            <p className="text-green-400 text-sm font-medium">+{analytics.todayWaitlist} today</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Growth Rate</h3>
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-sm">📈</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{analytics.growthRate}%</p>
            <p className="text-green-400 text-sm font-medium">This week</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Active Users</h3>
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span className="text-orange-400 text-sm">⚡</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{activeUsers}</p>
            <p className="text-orange-400 text-sm font-medium">On site now</p>
          </div>
        </div>

        {/* Quick Actions and Recent Waitlist */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-500">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button
                onClick={exportCSV}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
              >
                Export Waitlist CSV
              </button>
              <button className="w-full px-6 py-4 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-all duration-300 font-medium hover:scale-105">
                View Public Waitlist
              </button>
              <button className="w-full px-6 py-4 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-600/30 transition-all duration-300 font-medium hover:scale-105">
                Share Analytics
              </button>
            </div>
          </div>

          {/* Recent Waitlist Table */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-500">
            <div className="px-6 py-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Recent Joins</h2>
              <span className="text-gray-400 text-sm font-medium">Last 20 members</span>
            </div>
            <div className="overflow-x-auto max-h-80">
              <table className="w-full">
                <thead className="bg-white/5 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {waitlist.slice(0, 20).map((entry) => (
                    <tr key={entry.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(entry.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {waitlist.length > 20 && (
              <div className="px-6 py-4 border-t border-white/10 text-center text-gray-400 font-medium">
                Showing first 20 of {waitlist.length} waitlist members
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 