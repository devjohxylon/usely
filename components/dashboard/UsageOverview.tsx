'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Users, 
  Zap, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Settings,
  Shield,
  DollarSign,
  Clock,
  BarChart3
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface UsageData {
  tokens: number;
  cost: number;
  requests: number;
  providers: {
    name: string;
    tokens: number;
    cost: number;
    status: 'active' | 'inactive';
  }[];
}

export default function UsageOverview() {
  const { user } = useUser();
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsageData = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/dashboard/usage');
      if (!response.ok) {
        throw new Error('Failed to fetch usage data');
      }
      
      const result = await response.json();
      if (result.success) {
        setUsageData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch usage data');
      }
    } catch (error) {
      console.error('Error fetching usage data:', error);
      // Fallback to empty data
      setUsageData({
        tokens: 0,
        cost: 0,
        requests: 0,
        providers: []
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUsageData();
    }
  }, [user, fetchUsageData]);

  const getTokenLimit = useCallback(() => {
    switch (user?.plan) {
      case 'pro': return 1000000;
      case 'enterprise': return Infinity;
      default: return 100000; // free tier
    }
  }, [user?.plan]);

  const getUsagePercentage = useMemo(() => {
    if (!usageData) return 0;
    const limit = getTokenLimit();
    return limit === Infinity ? 0 : Math.min((usageData.tokens / limit) * 100, 100);
  }, [usageData, getTokenLimit]);

  const getStatusColor = useCallback((percentage: number) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-green-400';
  }, []);

  if (loading) {
    return (
      <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-700 rounded"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!usageData) {
    return (
      <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
        <div className="text-center text-gray-400">
          <BarChart3 className="w-8 h-8 mx-auto mb-2" />
          <p>No usage data available</p>
        </div>
      </div>
    );
  }

  const usagePercentage = getUsagePercentage;

  return (
    <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Usage Overview</h3>
          <p className="text-sm text-gray-400">Track your AI usage across all providers</p>
        </div>
        <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
          <Settings className="w-4 h-4" />
          <span>Configure</span>
        </button>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs text-gray-400">This Month</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {usageData.tokens.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">tokens used</div>
          <div className="mt-2">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  usagePercentage >= 90 ? 'bg-red-500' : 
                  usagePercentage >= 75 ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">0</span>
              <span className={`${getStatusColor(usagePercentage)}`}>
                {usagePercentage.toFixed(1)}%
              </span>
              <span className="text-gray-400">{getTokenLimit().toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-xs text-gray-400">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${usageData.cost.toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">this month</div>
          <div className="mt-2 flex items-center text-xs">
            <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
            <span className="text-green-400">+12.5%</span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Provider Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Provider Usage</h4>
        {usageData.providers.map((provider, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg border border-gray-800/30">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${provider.status === 'active' ? 'bg-green-400' : 'bg-gray-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-white">{provider.name}</p>
                <p className="text-xs text-gray-400">{provider.tokens.toLocaleString()} tokens</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">${provider.cost.toFixed(2)}</p>
              <p className="text-xs text-gray-400">
                {((provider.cost / usageData.cost) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 