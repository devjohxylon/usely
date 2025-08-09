'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Users, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Shield,
  Zap,
  DollarSign,
  UserPlus,
  UserMinus,
  ArrowRight
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface SubscriptionData {
  currentPlan: {
    name: string;
    price: number;
    features: string[];
    limits: {
      tokens: number | string;
      users: number | string;
      providers: string;
      support: string;
    };
  };
  teamMembers: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    usage: number;
    limit: number;
    lastActive: string;
  }[];
}

export default function SubscriptionManagement() {
  const { user } = useUser();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const fetchSubscriptionData = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/dashboard/subscription');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data');
      }
      
      const result = await response.json();
      if (result.success) {
        setSubscriptionData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch subscription data');
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      // Fallback to empty data
      setSubscriptionData({
        currentPlan: {
          name: 'Free Plan',
          price: 0,
          features: ['10,000 tokens/month', 'Single project', 'Community support', 'Basic analytics'],
          limits: { tokens: 100000, users: 1, providers: 'Basic', support: 'Community' }
        },
        teamMembers: []
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user, fetchSubscriptionData]);

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

  if (!subscriptionData) {
    return (
      <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
        <div className="text-center text-gray-400">
          <Crown className="w-8 h-8 mx-auto mb-2" />
          <p>No subscription data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Subscription & Team</h3>
          <p className="text-sm text-gray-400">Manage your plan and team members</p>
        </div>
        <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Current Plan */}
      <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">{subscriptionData.currentPlan.name}</h4>
              <p className="text-xs text-gray-400">Current Plan</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">
              ${subscriptionData.currentPlan.price}
              <span className="text-sm text-gray-400 font-normal">/month</span>
            </p>
          </div>
        </div>

        {/* Plan Features */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {subscriptionData.currentPlan.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
              <span className="text-xs text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-800/30">
          <div className="flex space-x-4 text-xs text-gray-400">
            <span>Tokens: {subscriptionData.currentPlan.limits.tokens.toLocaleString()}</span>
            <span>Users: {subscriptionData.currentPlan.limits.users}</span>
            <span>Support: {subscriptionData.currentPlan.limits.support}</span>
          </div>
          <button className="text-xs text-blue-400 hover:text-blue-300">Upgrade Plan</button>
        </div>
      </div>

      {/* Team Management */}
      {user?.plan !== 'free' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">Team Members</h4>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300"
            >
              <UserPlus className="w-3 h-3" />
              <span>Invite Member</span>
            </button>
          </div>

          <div className="space-y-2">
            {subscriptionData.teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg border border-gray-800/30">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{member.role}</p>
                    <p className="text-xs text-gray-400">Last active: {member.lastActive}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {member.usage.toLocaleString()} / {member.limit.toLocaleString()} tokens
                    </p>
                    <div className="w-16 bg-gray-800 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${Math.min((member.usage / member.limit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-300">
                    <UserMinus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Plan Upgrade CTA */}
      {user?.plan === 'free' && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-gray-400">Get team management, advanced analytics, and priority support</p>
            </div>
            <button className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300">
              <span>Upgrade</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111111] border border-gray-800/50 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Invite Team Member</h3>
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-800/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="colleague@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <select className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-800/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
                    <option value="developer">Developer</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-2 text-sm text-gray-400 border border-gray-800/50 rounded-lg hover:bg-gray-800/50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Send Invite
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 