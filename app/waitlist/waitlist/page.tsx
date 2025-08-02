'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Create stable star positions - reduced for performance
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.9 ? 'w-0.5 h-0.5 bg-white/60' : 
            Math.random() > 0.7 ? 'w-0.5 h-0.5 bg-white/40' : 'w-0.5 h-0.5 bg-white/15',
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className={`absolute rounded-full ${star.size}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Vintage background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
      }}></div>

      {/* Floating nebula effects - more visible */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-blue-500/20 via-cyan-500/15 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-indigo-500/12 via-purple-500/12 to-pink-500/12 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        
        {/* Top badge */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-black/60 border border-white/30 rounded-full text-white/90 text-sm backdrop-blur-md shadow-2xl">
            Usely Waitlist
          </div>
        </motion.div>

        {/* Hero section */}
        <div className="text-center mb-16 max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Track your users.{' '}
            <span className="italic font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Save your margins.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            Usely lets you monitor and control customer AI usage before it gets out of hand.
          </motion.p>
        </div>

        {/* Email form */}
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-black/60 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300 backdrop-blur-md shadow-xl"
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            </form>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
          transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
        >
          <p className="text-gray-400 text-sm">
            Crafted by the Usely team
          </p>
        </motion.div>
      </div>
    </div>
  );
} 