'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  Settings, 
  BarChart3, 
  Activity,
  ChevronRight,
  Sun,
  Moon,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);
  const [payAsYouGo, setPayAsYouGo] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'providers', label: 'Providers', icon: Activity },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Header */}
      <div className={`sticky top-0 z-50 ${darkMode ? 'bg-black/80 border-b border-white/10' : 'bg-white/80 border-b border-gray-200'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
                Usely Dashboard
              </div>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 min-h-screen ${darkMode ? 'bg-black/60 border-r border-white/10' : 'bg-white/60 border-r border-gray-200'} backdrop-blur-xl`}>
          <div className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`
                        : `${darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Overview</h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Monitor your AI usage and costs across all providers
                  </p>
                </div>

                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Spend</p>
                        <p className="text-2xl font-bold">$0.00</p>
                      </div>
                      <DollarSign className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Users className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>API Calls</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Zap className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Providers</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Activity className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                  </div>
                </div>

                {/* Provider Breakdown */}
                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg mb-8`}>
                  <h3 className="text-lg font-semibold mb-4">Provider Breakdown</h3>
                  <div className="text-center py-12">
                    <Activity className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No provider data available</p>
                  </div>
                </div>

                {/* Top Users */}
                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <h3 className="text-lg font-semibold mb-4">Top Users</h3>
                  <div className="text-center py-12">
                    <Users className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No user data available</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Users</h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Monitor individual user usage and costs
                  </p>
                </div>

                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="text-center py-12">
                    <Users className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No users found</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Providers Tab */}
            {activeTab === 'providers' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Providers</h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your AI provider integrations
                  </p>
                </div>

                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="text-center py-12">
                    <Activity className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No providers configured</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Billing</h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your billing settings and usage limits
                  </p>
                </div>

                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                    <h3 className="text-lg font-semibold mb-4">Usage Limits</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pay-as-you-go overages</span>
                        <button
                          onClick={() => setPayAsYouGo(!payAsYouGo)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            payAsYouGo 
                              ? `${darkMode ? 'bg-blue-600' : 'bg-blue-500'}` 
                              : `${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            payAsYouGo ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                    <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                    <div className="text-center py-12">
                      <CreditCard className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No billing history available</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Settings</h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Configure your Usely dashboard preferences
                  </p>
                </div>

                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        API Key
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your API key"
                        className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                          darkMode 
                            ? 'bg-black/20 border-white/10 text-white placeholder-gray-400 focus:border-white/30' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        placeholder="Enter webhook URL"
                        className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                          darkMode 
                            ? 'bg-black/20 border-white/10 text-white placeholder-gray-400 focus:border-white/30' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 