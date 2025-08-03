'use client';

import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { createClient } from '../../lib/supabase-client';
import { ArrowLeft, User, Shield, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useUser();
  const router = useRouter();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.admin.deleteUser(user?.id || '');
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        await logout();
        router.push('/');
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {message && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* User Info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name || 'User'}</h2>
              <p className="text-white/60">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          <button
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors"
          >
            <Shield size={20} />
            <span>{isLoading ? 'Deleting...' : 'Delete Account'}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 