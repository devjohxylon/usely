'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Palette,
  Key,
  Globe,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export default function Settings() {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: '',
    role: '',
    timezone: 'UTC',
    language: 'en'
  });
  const [notifications, setNotifications] = useState({
    usageAlerts: true,
    billingNotifications: true,
    securityAlerts: true,
    productUpdates: false,
    realTimeAlerts: true,
    soundNotifications: false
  });
  const [apiKeys, setApiKeys] = useState([
    {
      id: 'key_1',
      name: 'Production API Key',
      key: 'usely_live_...abc123',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      status: 'active'
    },
    {
      id: 'key_2',
      name: 'Development API Key',
      key: 'usely_dev_...def456',
      created: '2024-01-10',
      lastUsed: '2024-01-18',
      status: 'active'
    }
  ]);

  useEffect(() => {
    setIsClient(true);
    // Update profile data when user changes
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: SettingsIcon }
  ];

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      // Here you would typically make an API call to update the user profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Profile updated:', profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const generateApiKey = () => {
    const newKey = {
      id: `key_${Date.now()}`,
      name: 'New API Key',
      key: `usely_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active' as const
    };
    setApiKeys(prev => [...prev, newKey]);
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };



  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{user?.name || 'User'}</h3>
                <p className="text-sm text-white/60">{user?.email || 'No email'}</p>
                <p className="text-xs text-white/40">Member since {user ? new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Company</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Enter your company name"
                  className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Role</label>
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Enter your role"
                  className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Timezone</label>
                <select
                  value={profileData.timezone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Language</label>
                <select
                  value={profileData.language}
                  onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleProfileSave}
                disabled={saving}
                className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Add an extra layer of security to your account</p>
                  <p className="text-xs text-white/40 mt-1">Currently disabled</p>
                </div>
                <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                  Enable 2FA
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">{apiKey.name}</p>
                      <p className="text-xs text-white/60">Created {apiKey.created} • Last used {apiKey.lastUsed}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={apiKey.key}
                          readOnly
                          className="bg-white/5 border border-white/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none w-48"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(apiKey.key)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Copy to clipboard"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete API key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={generateApiKey}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate New API Key</span>
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your current password"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your new password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Confirm your new password"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-200">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Usage Alerts</p>
                    <p className="text-xs text-white/60">Get notified when approaching limits</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('usageAlerts')}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      notifications.usageAlerts ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      notifications.usageAlerts ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Billing Notifications</p>
                    <p className="text-xs text-white/60">Receive billing updates and invoices</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('billingNotifications')}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      notifications.billingNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      notifications.billingNotifications ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Security Alerts</p>
                    <p className="text-xs text-white/60">Important security notifications</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('securityAlerts')}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      notifications.securityAlerts ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      notifications.securityAlerts ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Product Updates</p>
                    <p className="text-xs text-white/60">New features and improvements</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('productUpdates')}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      notifications.productUpdates ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      notifications.productUpdates ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">In-App Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Real-time Alerts</p>
                    <p className="text-xs text-white/60">Show notifications in the dashboard</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('realTimeAlerts')}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      notifications.realTimeAlerts ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      notifications.realTimeAlerts ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Sound Notifications</p>
                    <p className="text-xs text-white/60">Play sounds for important alerts</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('soundNotifications')}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      notifications.soundNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                      notifications.soundNotifications ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-white">Dark</p>
                  <p className="text-xs text-white/60">Current</p>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-white border-2 border-transparent rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-800">Light</p>
                  <p className="text-xs text-gray-600">Coming soon</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-transparent rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-white">Auto</p>
                  <p className="text-xs text-white/60">Coming soon</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
              <div className="grid grid-cols-6 gap-3">
                {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map((color) => (
                  <div
                    key={color}
                    className="w-12 h-12 rounded-full border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-200"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Account ID</p>
                    <p className="text-xs text-white/60">Unique identifier for your account</p>
                  </div>
                  <code className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                    {user?.id || 'Unknown'}
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Member Since</p>
                    <p className="text-xs text-white/60">When you joined Usely</p>
                  </div>
                  <span className="text-sm text-white/60">
                    {user ? new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Last Login</p>
                    <p className="text-xs text-white/60">Most recent sign-in</p>
                  </div>
                  <span className="text-sm text-white/60">Just now</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Export Usage Data</p>
                    <p className="text-xs text-white/60">Download your usage history as CSV</p>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Export Billing Data</p>
                    <p className="text-xs text-white/60">Download your billing history as CSV</p>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Delete Account</p>
                    <p className="text-xs text-white/60">Permanently delete your account and all data</p>
                  </div>
                  <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      

      default:
        return null;
    }
  };

  if (!isClient) {
    return <div className="text-white">Loading settings...</div>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-lg">Manage your account preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background/5 backdrop-blur-lg border border-border rounded-2xl p-6"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </>
  );
} 