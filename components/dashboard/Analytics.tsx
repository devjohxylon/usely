'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  Settings,
  Eye,
  Download,
  Filter,
  Calendar,
  BarChart,
  PieChart,
  LineChart
} from 'lucide-react';

export default function Analytics() {
  const [isClient, setIsClient] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [usageResponse, billingResponse] = await Promise.all([
        fetch('/api/dashboard/usage'),
        fetch('/api/dashboard/billing')
      ]);

      if (usageResponse.ok && billingResponse.ok) {
        const usageData = await usageResponse.json();
        const billingData = await billingResponse.json();

        if (usageData.success && billingData.success) {
          const totalTokens = usageData.data.tokens || 0;
          const totalCost = billingData.data.usage?.spent || 0;
          const costPerToken = totalTokens > 0 ? totalCost / totalTokens : 0;

          setAnalyticsData({
            totalTokens,
            totalCost,
            activeUsers: 1, // For now, just the current user
            monthlyGrowth: 0, // Calculate based on historical data
            averageUsage: totalTokens,
            costPerToken,
            providers: usageData.data.providers || []
          });
        }
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyticsStats = analyticsData || {
    totalTokens: 0,
    totalCost: 0,
    activeUsers: 0,
    monthlyGrowth: 0,
    averageUsage: 0,
    costPerToken: 0
  };

  const providerPerformance = analyticsData?.providers?.map(provider => ({
    name: provider.name,
    tokens: provider.tokens,
    cost: provider.cost,
    efficiency: provider.tokens > 0 ? provider.cost / provider.tokens : 0,
    change: '+0%', // Calculate based on historical data
    trend: 'up'
  })) || [];

  const userSegments = [
    {
      segment: 'Current User',
      users: 1,
      usage: analyticsStats.totalTokens,
      cost: analyticsStats.totalCost,
      percentage: 100
    }
  ];

  const costOptimization = [
    {
      metric: 'Token Efficiency',
      current: 0.00196,
      target: 0.0015,
      improvement: '23.5%',
      status: 'good'
    },
    {
      metric: 'Provider Mix',
      current: 85,
      target: 90,
      improvement: '5.9%',
      status: 'warning'
    },
    {
      metric: 'Usage Distribution',
      current: 72,
      target: 80,
      improvement: '11.1%',
      status: 'good'
    }
  ];

  // Use real alerts based on actual usage data
  const recentAlerts = analyticsData ? [
    {
      id: 1,
      type: 'usage_info',
      user: 'Current User',
      message: `Total usage: ${analyticsStats.totalTokens.toLocaleString()} tokens`,
      time: 'Just now',
      status: 'active'
    }
  ] : [];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-400" /> : 
      <TrendingDown className="w-4 h-4 text-red-400" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Clock className="w-4 h-4 text-white/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-yellow-400';
      case 'resolved': return 'text-green-400';
      default: return 'text-white/60';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-yellow-500/20';
      case 'resolved': return 'bg-green-500/20';
      default: return 'bg-white/10';
    }
  };

  if (!isClient) {
    return <div className="text-white">Loading analytics...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400 text-lg">Comprehensive insights into your LLM usage and cost optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analyticsStats.totalTokens.toLocaleString()}</h3>
          <p className="text-sm text-white/60">Total Tokens Used</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+0.0%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${analyticsStats.totalCost.toFixed(2)}</h3>
          <p className="text-sm text-white/60">Total Cost</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+5.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analyticsStats.activeUsers}</h3>
          <p className="text-sm text-white/60">Active Users</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+15.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${analyticsStats.costPerToken.toFixed(4)}</h3>
          <p className="text-sm text-white/60">Cost per Token</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Provider Performance</h3>
              <p className="text-sm text-white/60">Cost and efficiency by provider</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>

          <div className="space-y-4">
            {providerPerformance.map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-white">{provider.name}</p>
                    <p className="text-xs text-white/60">{provider.tokens.toLocaleString()} tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">${provider.cost.toFixed(2)}</p>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(provider.trend)}
                    <span className={`text-xs ${provider.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {provider.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">User Segments</h3>
              <p className="text-sm text-white/60">Usage distribution by user type</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <BarChart className="w-4 h-4" />
              <span>View Chart</span>
            </button>
          </div>

          <div className="space-y-4">
            {userSegments.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{segment.segment}</span>
                  <span className="text-sm text-white/60">{segment.percentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{segment.users} users</span>
                  <span>${segment.cost.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Cost Optimization</h3>
              <p className="text-sm text-white/60">Opportunities for improvement</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Optimize</span>
            </button>
          </div>

          <div className="space-y-4">
            {costOptimization.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{metric.metric}</p>
                  <p className="text-xs text-white/60">Target: {metric.target}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{metric.current}</p>
                  <p className={`text-xs ${metric.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {metric.improvement} improvement
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
              <p className="text-sm text-white/60">System notifications and warnings</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </button>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                {getStatusIcon(alert.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{alert.message}</p>
                  <p className="text-xs text-white/60">{alert.time}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(alert.status)} ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
} 