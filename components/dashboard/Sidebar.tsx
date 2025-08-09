'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Settings, 
  FileText, 
  User,
  LogOut,
  Key,
  Crown,
  Users
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export default function Sidebar() {
  const { user, logout } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    if (isClient) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isClient]);

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
    { icon: Users, label: 'Management', href: '/dashboard/management' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-56 bg-[#111111] border-r border-gray-800/50 z-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800/50 h-16">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image 
              src="/uselylogo.png" 
              alt="Usely Logo" 
              width={32} 
              height={32}
              className="transition-all duration-300"
            />
          </div>
          <span className="font-bold text-white text-sm">Usely</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => (
            <motion.li 
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
                          <button
              onClick={() => router.push(item.href)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm w-full text-left ${
                pathname === item.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium truncate">
                  {item.label}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* User Menu */}
      <div className="p-3 border-t border-border/50">
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => isClient && setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-xs font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-white/60 truncate">{user?.email || 'No email'}</p>
            </div>
          </button>

          {isClient && userMenuOpen && (
            <motion.div 
              className="absolute bottom-full left-0 right-0 mb-2 bg-background/95 border border-border rounded-lg shadow-2xl overflow-hidden backdrop-blur-lg"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="py-1">
                <a
                  href="/dashboard/forgot-password"
                  className="flex items-center space-x-3 px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Forgot Password</span>
                </a>
                <a
                  href="/dashboard/subscription"
                  className="flex items-center space-x-3 px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Update Subscription</span>
                </a>
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 