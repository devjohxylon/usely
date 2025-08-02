'use client';

import React from 'react';
import { Home, FileText, Zap, DollarSign, Github } from 'lucide-react';
import { NavBar } from "./ui/tubelight-navbar";

export default function Navbar() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Docs', url: '/docs', icon: FileText },
    { name: 'API', url: '/docs/api', icon: Zap },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'GitHub', url: 'https://github.com/usely-ai', icon: Github }
  ];

  return <NavBar items={navItems} />;
} 