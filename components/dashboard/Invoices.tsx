'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import {
  FileText,
  Download,
  Search,
  Filter,
  Plus,
  DollarSign,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Shield,
  Settings,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Receipt
} from 'lucide-react';

export default function Invoices() {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      const response = await fetch('/api/dashboard/billing');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setInvoiceData(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate billing cycle dates dynamically
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  
  const billingCycle = {
    startDate: startOfMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    endDate: endOfMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    nextBilling: invoiceData?.currentPlan?.nextBilling || nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    totalSpent: invoiceData?.usage?.spent || 0,
    budget: invoiceData?.usage?.budget || 50,
    remaining: invoiceData?.usage?.remaining || 50
  };

  // Use real provider costs from usage data
  const providerCosts = invoiceData?.providerStats?.map(provider => ({
    name: provider.provider,
    cost: provider.cost,
    tokens: provider.tokens,
    rate: provider.cost / provider.tokens,
    change: '+0%', // Calculate from historical data if available
    trend: 'up'
  })) || [];

  // Use real invoice data from billing transactions
  const invoices = invoiceData?.recentTransactions?.map((txn, index) => ({
    id: txn.id || `INV-${String(index + 1).padStart(3, '0')}`,
    customer: user?.name || 'Current User',
    email: user?.email || 'user@example.com',
    amount: txn.amount,
    status: txn.status,
    date: txn.date,
    dueDate: txn.date,
    description: txn.description,
    type: txn.type
  })) || [];

  // Use real user billing data
  const userBilling = invoiceData ? [{
    user: user?.name || 'Current User',
    email: user?.email || 'user@example.com',
    plan: invoiceData.currentPlan?.name || 'Free',
    usage: invoiceData.usage?.spent || 0,
    cost: invoiceData.usage?.spent || 0,
    status: 'active'
  }] : [];

  const stats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter(inv => inv.status === 'completed').length,
    pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
    overdueInvoices: 0, // No overdue invoices for now
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    averageAmount: invoices.length > 0 ? invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length : 0
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-white/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'overdue': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20';
      case 'pending': return 'bg-yellow-500/20';
      case 'overdue': return 'bg-red-500/20';
      default: return 'bg-white/10';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (!isClient) {
    return <div className="text-white">Loading invoices...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Billing & Invoices</h1>
        <p className="text-gray-400 text-lg">Manage your billing, invoices, and user charges</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${billingCycle.totalSpent.toFixed(2)}</h3>
          <p className="text-sm text-white/60">This Cycle</p>
          <div className="mt-2 text-xs text-white/60">
            Budget: ${billingCycle.budget.toFixed(2)} • Remaining: ${billingCycle.remaining.toFixed(2)}
          </div>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+0.0%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stats.totalInvoices}</h3>
          <p className="text-sm text-white/60">Invoices</p>
          <div className="mt-2 text-xs text-white/60">
            {stats.paidInvoices} paid • {stats.pendingInvoices} pending
          </div>
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
            <span className="text-sm text-green-400 font-medium">+15.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{userBilling.length}</h3>
          <p className="text-sm text-white/60">User Billing</p>
          <div className="mt-2 text-xs text-white/60">
            ${stats.totalAmount.toFixed(2)} total • ${stats.averageAmount.toFixed(2)} avg
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
              <h3 className="text-lg font-semibold text-white">Provider Costs</h3>
              <p className="text-sm text-white/60">Breakdown by LLM provider</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>View Trends</span>
            </button>
          </div>

          <div className="space-y-4">
            {providerCosts.map((provider, index) => (
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
                    {provider.trend === 'up' ? 
                      <TrendingUp className="w-3 h-3 text-green-400" /> : 
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    }
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
              <h3 className="text-lg font-semibold text-white">User Billing</h3>
              <p className="text-sm text-white/60">Summary of user charges</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          <div className="space-y-3">
            {userBilling.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{user.user.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.user}</p>
                    <p className="text-xs text-white/60">{user.plan} • {user.usage.toLocaleString()} tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">${user.cost.toFixed(2)}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(user.status)} ${getStatusColor(user.status)}`}>
                    {getStatusIcon(user.status)}
                    <span className="ml-1 capitalize">{user.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Invoice History</h3>
            <p className="text-sm text-white/60">View and manage all invoices</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Invoice</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{invoice.id}</p>
                      <p className="text-xs text-white/60">{invoice.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-white">{invoice.customer}</p>
                      <p className="text-xs text-white/60">{invoice.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-white">${invoice.amount.toFixed(2)}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(invoice.status)} ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1 capitalize">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-white">{invoice.date}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
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