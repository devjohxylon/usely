'use client';

import React from 'react';
import { Home, FileText, Zap, DollarSign, Github } from 'lucide-react';
import { NavBar } from "./ui/tubelight-navbar";

interface NavbarProps {
  authModalOpen?: boolean;
  setAuthModalOpen?: (open: boolean) => void;
  authMode?: 'login' | 'register';
  setAuthMode?: (mode: 'login' | 'register') => void;
}

export default function Navbar({ 
  authModalOpen, 
  setAuthModalOpen, 
  authMode, 
  setAuthMode 
}: NavbarProps) {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Features', url: '/features', icon: Zap },
    { name: 'Pricing', url: '/pricing', icon: DollarSign },
    { name: 'FAQ', url: '/faq', icon: FileText },
    { name: 'GitHub', url: 'https://github.com/usely-ai', icon: Github }
  ];

  return (
    <NavBar 
      items={navItems} 
      authModalOpen={authModalOpen}
      setAuthModalOpen={setAuthModalOpen}
      authMode={authMode}
      setAuthMode={setAuthMode}
    />
  );
} 