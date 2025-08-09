'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Settings,
  Shield,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  PlayCircle,
  PauseCircle,
  StopCircle,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Filter,
  Search
} from 'lucide-react';

export default function Management() {
  const [isClient, setIsClient] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/dashboard/subscription');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data.teamMembers) {
          setTeamMembers(result.data.teamMembers);
        }
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use real team members data or fallback to empty array
  const users = teamMembers.length > 0 ? teamMembers.map(member => ({
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
    status: member.status,
    plan: 'Pro', // Default plan for team members
    usage: member.usage || 0,
    limit: member.limit || 100000,
    cost: 0, // Calculate based on usage if needed
    lastActive: member.lastActive || 'Never',
    limits: {
      daily: Math.floor((member.limit || 100000) / 30),
      monthly: member.limit || 100000,
      cost: 50.00,
      providers: ['OpenAI', 'Anthropic']
    },
    services: {
      openai: true,
      anthropic: true,
      google: false
    }
  })) : [];

  // Calculate real management stats from team members data
  const managementStats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    suspendedUsers: users.filter(user => user.status === 'suspended').length,
    stoppedUsers: users.filter(user => user.status === 'stopped').length,
    totalLimits: users.length,
    activeLimits: users.filter(user => user.status === 'active').length,
    costSavings: 0, // Calculate from usage data if available
    monthlyGrowth: 0 // Calculate from historical data if available
  };

  const limitTemplates = [
    {
      name: 'Starter Plan',
      daily: 5000,
      monthly: 100000,
      cost: 30.00,
      providers: ['OpenAI'],
      users: 8
    },
    {
      name: 'Pro Plan',
      daily: 10000,
      monthly: 200000,
      cost: 50.00,
      providers: ['OpenAI', 'Anthropic'],
      users: 6
    },
    {
      name: 'Enterprise Plan',
      daily: 25000,
      monthly: 500000,
      cost: 100.00,
      providers: ['OpenAI', 'Anthropic', 'Google'],
      users: 4
    }
  ];

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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (!isClient) {
    return <div className="text-white">Loading management data...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading team management...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400 text-lg">Manage user limits, services, and access controls</p>
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
            <span className="text-sm text-green-400 font-medium">+{managementStats.monthlyGrowth.toFixed(1)}%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{managementStats.totalUsers}</h3>
          <p className="text-sm text-white/60">Total Users</p>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{managementStats.activeLimits}</h3>
          <p className="text-sm text-white/60">Active Limits</p>
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
            <span className="text-sm text-green-400 font-medium">+15.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">${managementStats.costSavings.toFixed(2)}</h3>
          <p className="text-sm text-white/60">Cost Savings</p>
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
            <span className="text-sm text-green-400 font-medium">+5.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{managementStats.activeUsers}</h3>
          <p className="text-sm text-white/60">Service Status</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div
          className="lg:col-span-2 bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">User Management</h3>
              <p className="text-sm text-white/60">Manage user access and limits</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="stopped">Stopped</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-white/60">{user.email} • {user.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{user.usage.toLocaleString()}</p>
                    <p className="text-xs text-white/60">/ {user.limit.toLocaleString()} tokens</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(user.status)} ${getStatusColor(user.status)}`}>
                    {getStatusIcon(user.status)}
                    <span className="ml-1 capitalize">{user.status}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setShowLimitModal(true);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-white/60 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-white/60 hover:text-white">
                      <Settings className="w-4 h-4" />
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
              <h3 className="text-lg font-semibold text-white">Limit Templates</h3>
              <p className="text-sm text-white/60">Predefined limit configurations</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Plus className="w-4 h-4" />
              <span>Add Template</span>
            </button>
          </div>

          <div className="space-y-4">
            {limitTemplates.map((template, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{template.name}</h4>
                  <span className="text-xs text-white/60">{template.users} users</span>
                </div>
                <div className="space-y-1 text-xs text-white/60">
                  <div className="flex justify-between">
                    <span>Daily:</span>
                    <span>{template.daily.toLocaleString()} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly:</span>
                    <span>{template.monthly.toLocaleString()} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Limit:</span>
                    <span>${template.cost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-xs">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button className="text-white/60 hover:text-white text-xs">
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Service Controls</h3>
              <p className="text-sm text-white/60">Manage provider access</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Configure</span>
            </button>
          </div>

          <div className="space-y-4">
            {users.length > 0 ? (
              // Show providers based on actual user data
              ['OpenAI', 'Anthropic', 'Google'].map((provider, index) => {
                const activeUsers = users.filter(user => 
                  user.services && user.services[provider.toLowerCase().replace(' ', '')]
                ).length;
                const isActive = activeUsers > 0;
                
                return (
                  <div key={provider} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${index === 0 ? 'bg-blue-500/20' : index === 1 ? 'bg-purple-500/20' : 'bg-orange-500/20'} rounded-lg`}>
                        <CheckCircle className={`w-4 h-4 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-purple-400' : 'text-orange-400'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{provider}</p>
                        <p className="text-xs text-white/60">{activeUsers} active users</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 ${isActive ? 'bg-green-500' : 'bg-gray-600'} rounded-full relative`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 ${isActive ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Show default providers when no users
              <div className="text-center py-8">
                <p className="text-white/60">No team members found</p>
                <p className="text-xs text-white/40 mt-2">Add team members to see provider usage</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Access Controls</h3>
              <p className="text-sm text-white/60">Security and permissions</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Lock className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Rate Limiting</p>
                  <p className="text-xs text-white/60">Prevent abuse</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Usage Monitoring</p>
                  <p className="text-xs text-white/60">Real-time tracking</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Auto Suspension</p>
                  <p className="text-xs text-white/60">Stop on limits</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Usage Analytics</p>
                  <p className="text-xs text-white/60">Detailed reports</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLimitModal && selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLimitModal(false)}
          >
            <motion.div
              className="bg-background/95 border border-border rounded-2xl p-6 max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Edit User Limits</h3>
                <button
                  onClick={() => setShowLimitModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white mb-2">{selectedUser.name}</p>
                  <p className="text-xs text-white/60">{selectedUser.email}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/60">Daily Token Limit</label>
                    <input
                      type="number"
                      defaultValue={selectedUser.limits.daily}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Monthly Token Limit</label>
                    <input
                      type="number"
                      defaultValue={selectedUser.limits.monthly}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Cost Limit ($)</label>
                    <input
                      type="number"
                      defaultValue={selectedUser.limits.cost}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowLimitModal(false)}
                    className="flex-1 bg-white text-black font-semibold px-4 py-2 rounded-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowLimitModal(false)}
                    className="flex-1 bg-white/10 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 