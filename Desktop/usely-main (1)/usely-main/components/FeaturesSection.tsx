'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { BarChart3, Globe, CreditCard, Users, Zap } from 'lucide-react';

// Features data with icons
const features = [
  {
    icon: BarChart3,
    title: 'Real-time token metering',
    description: 'Track your LLM usage instantly as it happens.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Globe,
    title: 'Cross-provider support',
    description: 'Compatible with OpenAI, Anthropic, Mistral, and more.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: CreditCard,
    title: 'Stripe billing integration',
    description: 'Seamless billing powered by Stripe for easy payments.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    title: 'Multi-project & team dashboards',
    description: 'Manage multiple projects and teams with clear insights.',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function FeaturesSection() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section className="pt-16 pb-16 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            variants={itemVariants}
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Features</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              meter and bill
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Complete LLM usage tracking and billing solution with real-time insights and seamless integrations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.article 
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm h-full relative overflow-hidden"
                  whileHover={{ 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                  
                  {/* Icon Container */}
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow duration-300`}
                    variants={iconVariants}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Feature Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-full px-4 py-2">
            <motion.div 
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <span className="text-green-400 text-sm font-medium">All features included in every plan</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 