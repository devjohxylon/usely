'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Download, 
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Shield,
  Settings,
  TrendingUp,
  TrendingDown,
  Receipt,
  Crown
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface BillingData {
  currentPlan: {
    name: string;
    price: number;
    nextBilling: string;
  };
  usage: {
    spent: number;
    budget: number;
    remaining: number;
  };
  recentTransactions: {
    id: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    description: string;
    type: 'subscription' | 'usage';
  }[];
}

export default function BillingDetails() {
  const { user } = useUser();
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBillingData = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/dashboard/billing');
      if (!response.ok) {
        throw new Error('Failed to fetch billing data');
      }
      
      const result = await response.json();
      if (result.success) {
        setBillingData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch billing data');
      }
    } catch (error) {
      console.error('Error fetching billing data:', error);
      // Fallback to empty data
      setBillingData({
        currentPlan: {
          name: 'Free Plan',
          price: 0,
          nextBilling: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        },
        usage: {
          spent: 0,
          budget: 50,
          remaining: 50
        },
        recentTransactions: []
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchBillingData();
    }
  }, [user, fetchBillingData]);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  }, []);

  const budgetPercentage = useMemo(() => {
    if (!billingData) return 0;
    return (billingData.usage.spent / billingData.usage.budget) * 100;
  }, [billingData]);

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

  if (!billingData) {
    return (
      <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
        <div className="text-center text-gray-400">
          <Receipt className="w-8 h-8 mx-auto mb-2" />
          <p>No billing data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Billing & Usage</h3>
          <p className="text-sm text-gray-400">Manage your subscription and payments</p>
        </div>
        <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Current Plan */}
      <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">{billingData.currentPlan.name}</h4>
              <p className="text-xs text-gray-400">Current Plan</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">
              ${billingData.currentPlan.price}
              <span className="text-sm text-gray-400 font-normal">/month</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Next billing: {billingData.currentPlan.nextBilling}</span>
          <button className="text-blue-400 hover:text-blue-300">Manage Plan</button>
        </div>
      </div>

      {/* Usage & Budget */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-xs text-gray-400">Spent</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${billingData.usage.spent.toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">this month</div>
          <div className="mt-2">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  budgetPercentage >= 90 ? 'bg-red-500' : 
                  budgetPercentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">$0</span>
              <span className={budgetPercentage >= 90 ? 'text-red-400' : budgetPercentage >= 75 ? 'text-yellow-400' : 'text-green-400'}>
                {budgetPercentage.toFixed(1)}%
              </span>
              <span className="text-gray-400">${billingData.usage.budget}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs text-gray-400">Remaining</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${billingData.usage.remaining.toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">budget left</div>
          <div className="mt-2 flex items-center text-xs">
            <TrendingDown className="w-3 h-3 text-green-400 mr-1" />
                            <span className="text-green-400">-0.0%</span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white">Recent Transactions</h4>
          <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
        </div>
        <div className="space-y-2">
          {billingData.recentTransactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg border border-gray-800/30">
              <div className="flex items-center space-x-3">
                {getStatusIcon(transaction.status)}
                <div>
                  <p className="text-sm font-medium text-white">{transaction.description}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">${transaction.amount.toFixed(2)}</p>
                <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Payment Method</span>
          </div>
          <button className="text-xs text-blue-400 hover:text-blue-300">Update</button>
        </div>
      </div>
    </div>
  );
} 