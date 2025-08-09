'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import NebulaBackground from './NebulaBackground';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  onLoginClick?: () => void;
}

export default function HeroSection({ onLoginClick }: HeroSectionProps) {
  const { user } = useUser();
  const router = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: easeOut
      }
    }
  };

  const codeVariants = {
    hidden: { opacity: 0, scale: 0.99 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut
      }
    }
  };

  return (
    <section className="pt-20 pb-24 px-6 md:px-12 min-h-screen flex items-center relative">
      <NebulaBackground />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-center lg:text-left space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Meter, analyze and bill your AI usage {' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent shine-text" data-text="instantly">
                  instantly
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl lg:max-w-none"
                variants={itemVariants}
              >
                Usely unifies token tracking and usage based billing for any LLM provider like OpenAI, Anthropic and Mistral
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button 
                className="group bg-white text-black font-semibold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={user ? () => router.push('/dashboard') : onLoginClick}
              >
                {user ? 'Go to Dashboard' : 'Join Usely now'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                className="text-gray-300 hover:text-white font-medium px-8 py-4 rounded-full border border-gray-700 hover:border-gray-500 transition-all duration-300 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/docs')}
              >
                View Docs
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Code Preview */}
          <motion.div 
            className="relative"
            variants={codeVariants}
          >
            <motion.div 
              className="relative bg-[#111111] rounded-2xl p-6 shadow-2xl border border-gray-800/50 overflow-hidden backdrop-blur-sm"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Code header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-500 font-mono">usely-example.js</span>
              </div>
              
              {/* Code content with typing animation */}
              <div className="font-mono text-sm text-gray-300 leading-relaxed">
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className="text-purple-400">import</span>{' '}
                  <span className="text-blue-400">{'{'}</span>
                  <span className="text-green-400">Usely</span>
                  <span className="text-blue-400">{'}'}</span>{' '}
                  <span className="text-purple-400">from</span>{' '}
                  <span className="text-yellow-400">"usely-sdk"</span>
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-green-400">client</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-purple-400">new</span>{' '}
                  <span className="text-green-400">Usely</span>
                  <span className="text-blue-400">({'{'}</span>
                </motion.div>
                
                <motion.div 
                  className="ml-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <span className="text-green-400">apiKey</span>
                  <span className="text-gray-400">:</span>{' '}
                  <span className="text-purple-400">process</span>
                  <span className="text-blue-400">.</span>
                  <span className="text-green-400">env</span>
                  <span className="text-blue-400">.</span>
                  <span className="text-green-400">USELY_API_KEY</span>
                  <span className="text-gray-400">,</span>
                </motion.div>
                
                <motion.div 
                  className="ml-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <span className="text-green-400">baseURL</span>
                  <span className="text-gray-400">:</span>{' '}
                  <span className="text-yellow-400">"https://api.usely.ai/v1/"</span>
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                >
                  <span className="text-blue-400">{'}'}</span>
                  <span className="text-gray-400">)</span>
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-green-400">response</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-purple-400">await</span>{' '}
                  <span className="text-green-400">client</span>
                  <span className="text-blue-400">.</span>
                  <span className="text-green-400">completions</span>
                  <span className="text-blue-400">.</span>
                  <span className="text-green-400">create</span>
                  <span className="text-blue-400">({'{'}</span>
                </motion.div>
                
                <motion.div 
                  className="ml-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                >
                  <span className="text-green-400">model</span>
                  <span className="text-gray-400">:</span>{' '}
                  <span className="text-yellow-400">"gpt-4"</span>
                  <span className="text-gray-400">,</span>
                </motion.div>
                
                <motion.div 
                  className="ml-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                >
                  <span className="text-green-400">prompt</span>
                  <span className="text-gray-400">:</span>{' '}
                  <span className="text-yellow-400">"Hello from Usely!"</span>
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.1, duration: 0.6 }}
                >
                  <span className="text-blue-400">{'}'}</span>
                  <span className="text-gray-400">)</span>
                </motion.div>
                
                <motion.div 
                  className="text-gray-500 text-xs italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3, duration: 0.6 }}
                >
                  // Returns a response with usage data
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 