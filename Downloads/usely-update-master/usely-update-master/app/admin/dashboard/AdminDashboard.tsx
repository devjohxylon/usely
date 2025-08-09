'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase-client';
import { User } from '@supabase/supabase-js';

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [recentSignups, setRecentSignups] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    fetchWaitlistData();
  }, []);

  const fetchWaitlistData = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching waitlist:', error);
        return;
      }

      setWaitlist(data || []);
      setTotalCount(data?.length || 0);

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recent = data?.filter(entry => 
        new Date(entry.created_at) > oneDayAgo
      ) || [];
      setRecentSignups(recent.length);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const exportCSV = () => {
    const headers = ['Email', 'Signup Date'];
    const csvContent = [
      headers.join(','),
      ...waitlist.map(entry => [
        entry.email,
        new Date(entry.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Waitlist Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total Signups</h3>
            <p className="text-3xl font-bold text-white">{totalCount}</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">Last 24 Hours</h3>
            <p className="text-3xl font-bold text-white">{recentSignups}</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">Actions</h3>
            <button
              onClick={exportCSV}
              className="mt-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Recent Signups</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Signup Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {waitlist.slice(0, 50).map((entry) => (
                  <tr key={entry.id} className="hover:bg-black/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {entry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(entry.created_at).toLocaleDateString()} {new Date(entry.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {waitlist.length > 50 && (
            <div className="px-6 py-4 border-t border-white/10 text-center text-gray-400">
              Showing first 50 of {waitlist.length} signups
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 