'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Globe, CreditCard, Users } from 'lucide-react';

// Features data with icons
const features = [
  {
    icon: BarChart3,
    title: 'Real-time token metering',
    description: 'Track your LLM usage instantly as it happens.'
  },
  {
    icon: Globe,
    title: 'Cross-provider support',
    description: 'Compatible with OpenAI, Anthropic, Mistral, and more.'
  },
  {
    icon: CreditCard,
    title: 'Stripe billing integration',
    description: 'Seamless billing powered by Stripe for easy payments.'
  },
  {
    icon: Users,
    title: 'Multi-project & team dashboards',
    description: 'Manage multiple projects and teams with clear insights.'
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
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section className="pt-24 pb-20 px-6 md:px-12 bg-[#0a0a0a]">
      <motion.div 
        className="max-w-7xl mx-auto"
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#e5e5e5] mb-4">
            Everything you need to meter and bill LLM usage.
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={itemVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.article 
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="bg-[#111111] rounded-xl p-8 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm h-full flex flex-col items-center justify-center"
                  whileHover={{ 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon Container */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                    variants={iconVariants}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-blue-400" />
                  </motion.div>

                  {/* Feature Title */}
                  <h3 className="text-xl font-semibold text-[#e5e5e5] mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-[280px] group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 text-[#a0a0a0] text-sm">
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
            <span>All features included in every plan</span>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </motion.div>
    </section>
  );
} 