'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Simple static stars - much more performant */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute top-1/6 right-1/6 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute bottom-1/6 left-1/6 w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* Simple gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        
        {/* Top badge */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-black/60 border border-white/30 rounded-full text-white/90 text-sm backdrop-blur-sm shadow-lg">
            Usely Waitlist
          </div>
        </motion.div>

        {/* Hero section */}
        <div className="text-center mb-16 max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Track your users.{' '}
            <span className="italic font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Save your margins.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Usely lets you monitor and control customer AI usage before it gets out of hand.
          </motion.p>
        </div>

        {/* Email form */}
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-black/60 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Waitlist
              </motion.button>
            </form>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-green-400 text-3xl mb-6">✓</div>
              <h2 className="text-3xl font-bold text-white mb-4">You're in!</h2>
              <p className="text-gray-300 text-lg">
                We'll notify you at <span className="text-white font-medium">{email}</span> when we launch.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Attribution */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-gray-400 text-sm">
            Crafted by the Usely team
          </p>
        </motion.div>
      </div>
    </div>
  );
} 