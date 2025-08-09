'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  CreditCard,
  Settings,
  Plus,
  UserPlus,
  UserMinus,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  StopCircle,
  PlayCircle,
  PauseCircle,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';

export default function Billing() {
  const [isClient, setIsClient] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/dashboard/billing');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBillingData(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const billingStats = {
    totalUsers: 1, // Current user only
    activeUsers: 1,
    totalRevenue: billingData?.usage?.spent || 0,
    monthlyGrowth: 0,
    averageUsage: billingData?.usage?.spent || 0,
    costPerUser: billingData?.usage?.spent || 0
  };

  // Use real billing data or empty array
  const users = billingData ? [{
    id: 1,
    name: 'Current User',
    email: 'user@example.com',
    plan: billingData.currentPlan?.name || 'Free',
    usage: billingData.usage?.spent || 0,
    limit: billingData.usage?.budget || 50,
    cost: billingData.usage?.spent || 0,
    status: 'active',
    lastBilled: billingData.currentPlan?.nextBilling || 'Unknown',
    billingCycle: 'monthly',
    autoBill: true,
    paymentMethod: 'card',
    lastPayment: 'Unknown'
  }] : [];

  // Use real billing history from transactions
  const billingHistory = billingData?.recentTransactions?.map((txn, index) => ({
    id: txn.id || `bill_${String(index + 1).padStart(3, '0')}`,
    userId: 1,
    userName: 'Current User',
    amount: txn.amount,
    status: txn.status,
    date: txn.date,
    description: txn.description,
    tokens: 0, // Calculate from usage data if needed
    rate: 0 // Calculate rate if needed
  })) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'suspended': return <PauseCircle className="w-4 h-4 text-yellow-400" />;
      case 'stopped': return <StopCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-white/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'suspended': return 'text-yellow-400';
      case 'stopped': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20';
      case 'suspended': return 'bg-yellow-500/20';
      case 'stopped': return 'bg-red-500/20';
      default: return 'bg-white/10';
    }
  };

  if (!isClient) {
    return <div className="text-white">Loading billing data...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading billing data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">User Billing</h1>
        <p className="text-gray-400 text-lg">Manage billing for your users' LLM usage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+0.0%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{billingStats.totalUsers}</h3>
          <p className="text-sm text-white/60">Total Users</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+5.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{billingStats.activeUsers}</h3>
          <p className="text-sm text-white/60">Active Users</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${billingStats.totalRevenue.toFixed(2)}</h3>
          <p className="text-sm text-white/60">Total Revenue</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+15.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${billingStats.costPerUser.toFixed(2)}</h3>
          <p className="text-sm text-white/60">Avg Cost/User</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">User Billing Management</h3>
              <p className="text-sm text-white/60">Manage individual user billing</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-white/60">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">${user.cost.toFixed(2)}</p>
                    <p className="text-xs text-white/60">{user.usage.toLocaleString()} tokens</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(user.status)} ${getStatusColor(user.status)}`}>
                    {getStatusIcon(user.status)}
                    <span className="ml-1 capitalize">{user.status}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-white/60 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
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
              <h3 className="text-lg font-semibold text-white">Billing Controls</h3>
              <p className="text-sm text-white/60">Configure billing settings</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Auto-Billing</p>
                  <p className="text-xs text-white/60">Automatically charge users</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Usage Alerts</p>
                  <p className="text-xs text-white/60">Notify on high usage</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Shield className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Service Control</p>
                  <p className="text-xs text-white/60">Stop services on limits</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Target className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Cost Optimization</p>
                  <p className="text-xs text-white/60">Smart provider routing</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Billing History</h3>
            <p className="text-sm text-white/60">Track all user billing activities</p>
          </div>
          <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Tokens</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-white">{bill.userName}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-white">${bill.amount.toFixed(2)}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-white">{bill.tokens.toLocaleString()}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-white">${bill.rate.toFixed(6)}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(bill.status)} ${getStatusColor(bill.status)}`}>
                      {getStatusIcon(bill.status)}
                      <span className="ml-1 capitalize">{bill.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-white">{bill.date}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-white/60 hover:text-white">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-white/60 hover:text-white">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
} 