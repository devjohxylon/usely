'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { BarChart3, CreditCard, Zap, Shield, Users, Globe, Database, TrendingUp } from 'lucide-react';

const coreFeatures = [
  {
    icon: BarChart3,
    title: 'Usage Tracking',
    description: 'Track token usage, costs, and performance across all AI providers in real-time.',
    details: [
      'Monitor input/output tokens',
      'Real-time cost calculation',
      'Performance analytics',
      'Usage history and trends'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: CreditCard,
    title: 'Usage-Based Billing',
    description: 'Implement pay-per-use billing for your AI services with automatic cost tracking.',
    details: [
      'Stripe integration',
      'Automatic invoicing',
      'Usage-based pricing',
      'Revenue tracking'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Zap,
    title: 'Intelligent Routing',
    description: 'Automatically route requests to optimal providers based on cost and performance.',
    details: [
      'Multi-provider support',
      'Cost optimization',
      'Automatic failover',
      'Load balancing'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Enterprise-grade security with zero data retention of conversation content.',
    details: [
      'SOC 2 compliance',
      'GDPR compliant',
      'API key encryption',
      'Audit logging'
    ],
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Manage multiple projects and teams with granular access controls.',
    details: [
      'Multi-project support',
      'Role-based access',
      'Team analytics',
      'Usage quotas'
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Database,
    title: 'API Integration',
    description: 'Simple REST API and SDKs for easy integration with any application.',
    details: [
      'REST API',
      'TypeScript SDK',
      'Python SDK',
      'Webhook support'
    ],
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function CoreFeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Core Features</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Complete{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI usage tracking
            </span>
            {' '}and billing
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Track usage, optimize costs, and implement usage-based billing for all your AI services in one platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          {coreFeatures.map((feature, index) => {
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
                  className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm h-full relative overflow-hidden"
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
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow duration-300`}
                    variants={iconVariants}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Feature Title */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
            <p className="text-gray-400 mb-6">
              Start tracking your AI usage and implementing usage-based billing in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Get Started Free
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:border-gray-500 hover:text-white transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 