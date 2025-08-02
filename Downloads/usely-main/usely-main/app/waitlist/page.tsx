'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter } from 'lucide-react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(1247);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setWaitlistCount(prev => prev + 1);
  };

  const stars = useMemo(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.9 ? 'w-0.5 h-0.5 bg-white/60' : 
            Math.random() > 0.7 ? 'w-0.5 h-0.5 bg-white/40' : 'w-0.5 h-0.5 bg-white/15',
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    })), []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
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
        
        <motion.div 
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/35 via-pink-500/30 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.3, 0.8, 1.1, 1],
            rotate: [0, 90, -45, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] bg-gradient-to-tl from-blue-500/35 via-cyan-500/30 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -60, 40, -30, 0],
            y: [0, 30, -20, 40, 0],
            scale: [1, 1.2, 0.7, 1.15, 1],
            rotate: [0, -90, 45, -180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-pink-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.4, 0.6, 1.2, 1],
            rotate: [0, 270, 180, 360, 720],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-b from-purple-500/30 via-pink-500/25 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-100, 50, -30, 20, -100],
            y: [0, 40, -20, 30, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            rotate: [0, 120, -60, 240, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gradient-to-l from-blue-500/30 via-cyan-500/25 to-transparent rounded-full blur-3xl"
          animate={{
            x: [100, -40, 30, -20, 100],
            y: [0, 30, -15, 25, 0],
            scale: [1, 1.15, 0.85, 1.05, 1],
            rotate: [0, -150, 75, -300, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-gradient-to-tr from-indigo-500/30 via-purple-500/25 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 35, -25, 15, 0],
            y: [100, -30, 20, -25, 100],
            scale: [1, 1.25, 0.75, 1.15, 1],
            rotate: [0, 200, -100, 400, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-gradient-to-r from-pink-500/30 via-purple-500/25 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-80, 45, -35, 25, -80],
            y: [-80, -25, 15, -20, -80],
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, 180, -90, 360, 0],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-b from-cyan-500/30 via-blue-500/25 to-transparent rounded-full blur-3xl"
          animate={{
            x: [80, -30, 20, -15, 80],
            y: [-60, 35, -25, 30, -60],
            scale: [1, 1.3, 0.7, 1.2, 1],
            rotate: [0, -120, 60, -240, 0],
          }}
          transition={{
            duration: 31,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
                 <div className="w-full max-w-4xl rounded-3xl p-12 bg-[#0a0a0a] backdrop-blur-xl border border-gray-800/50 relative overflow-hidden shadow-2xl">

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111111]/5 to-[#111111]/10 pointer-events-none"></div>
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
          }}></div>

          <motion.div 
            className="relative z-10 flex flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="mb-12"
              variants={itemVariants}
            >
              <div className="inline-flex items-center px-6 py-3 bg-[#111111] border border-gray-700/50 rounded-full text-[#e5e5e5] text-sm shadow-2xl">
                Usely Waitlist
              </div>
            </motion.div>

            <div className="max-w-3xl mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e5e5e5] mb-8 leading-tight"
                variants={itemVariants}
              >
                Track your users{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  <br />
                  Save your margins
                </span>
              </motion.h1>
             
              <motion.p 
                className="text-lg md:text-xl text-[#a0a0a0] leading-relaxed"
                variants={itemVariants}
              >
                Usely lets you monitor and control customer AI usage before it gets out of hand.
              </motion.p>
            </div>

            <motion.div 
              className="w-full max-w-lg mb-6"
              variants={itemVariants}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 bg-[#111111] border border-gray-700/50 rounded-xl text-[#e5e5e5] placeholder-[#a0a0a0] focus:outline-none focus:border-gray-600/50 transition-all duration-300 shadow-xl"
                  />
                  <motion.button
                    type="submit"
                    className="group bg-white text-[#0a0a0a] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Waitlist
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <h2 className="text-3xl font-bold text-[#e5e5e5] mb-4">You're in!</h2>
                  <p className="text-[#a0a0a0] text-lg">
                    We'll notify you at <span className="text-[#e5e5e5] font-medium">{email}</span> when we launch.
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className="mb-12"
              variants={itemVariants}
            >
              <p className="text-sm font-medium text-[#a0a0a0]">
                <span className="text-[#e5e5e5]">
                  {waitlistCount.toLocaleString()}
                </span>
                <span className="ml-2">amazing people waiting</span>
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <p className="text-[#a0a0a0] text-sm mb-6">
                Crafted by the Usely team
              </p>
              
              <div className="flex justify-center items-center gap-6">
                <motion.a
                  href="https://github.com/usely"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#111111] border border-gray-700/50 rounded-xl hover:bg-[#1a1a1a] transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6 text-[#a0a0a0] group-hover:text-[#e5e5e5] transition-colors" />
                </motion.a>
                
                <motion.a
                  href="https://twitter.com/usely"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#111111] border border-gray-700/50 rounded-xl hover:bg-[#1a1a1a] transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-6 h-6 text-[#a0a0a0] group-hover:text-[#e5e5e5] transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 