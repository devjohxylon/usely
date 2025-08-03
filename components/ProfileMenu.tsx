'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation';

interface ProfileMenuProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useUser();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleSettings = () => {
    router.push('/settings');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
             {/* Profile Button */}
       <button
         onClick={() => setIsOpen(!isOpen)}
         className={cn(
           "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200",
           "bg-white/10 hover:bg-white/20 text-white border border-white/20",
           "focus:outline-none focus:ring-2 focus:ring-white/30",
           isOpen && "bg-white/20 border-white/30"
         )}
       >
         {/* Avatar */}
         <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
           {user.avatar ? (
             <img 
               src={user.avatar} 
               alt={user.name}
               className="w-6 h-6 rounded-full object-cover"
             />
           ) : (
             <User size={12} className="text-white" />
           )}
         </div>
         
         {/* User Info */}
         <div className="hidden md:flex flex-col items-start">
           <span className="text-sm font-semibold text-white leading-tight">{user.name}</span>
           <span className="text-xs text-white/60 leading-tight">{user.email}</span>
         </div>
         
         {/* Chevron */}
         <ChevronDown 
           size={12} 
           className={cn(
             "text-white/60 transition-transform duration-200",
             isOpen && "rotate-180"
           )} 
         />
       </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
                                <motion.div
             initial={{ opacity: 0, scale: 0.95, y: -10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: -10 }}
             transition={{ duration: 0.2, ease: "easeOut" }}
             className="absolute right-0 top-full mt-2 w-56 bg-background border border-border/40 rounded-xl shadow-2xl overflow-hidden z-50"
           >
             {/* User Info Header */}
             <div className="p-3 border-b border-border/30">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                   {user.avatar ? (
                     <img 
                       src={user.avatar} 
                       alt={user.name}
                       className="w-8 h-8 rounded-full object-cover"
                     />
                   ) : (
                     <User size={16} className="text-white" />
                   )}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                   <p className="text-xs text-white/60 truncate">{user.email}</p>
                 </div>
               </div>
             </div>

             {/* Menu Items */}
             <div className="p-1.5">
               {/* Settings */}
               <button
                 onClick={handleSettings}
                 className={cn(
                   "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200",
                   "text-white/90 hover:text-white hover:bg-white/8",
                   "focus:outline-none focus:bg-white/8 focus:ring-2 focus:ring-white/20"
                 )}
               >
                 <Settings size={16} className="text-white/70" />
                 <span className="text-sm font-medium">Settings</span>
               </button>

               {/* Logout */}
               <button
                 onClick={handleLogout}
                 className={cn(
                   "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200",
                   "text-red-400 hover:text-red-300 hover:bg-red-500/10",
                   "focus:outline-none focus:bg-red-500/10 focus:ring-2 focus:ring-red-500/20"
                 )}
               >
                 <LogOut size={16} className="text-red-400/80" />
                 <span className="text-sm font-medium">Logout</span>
               </button>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 