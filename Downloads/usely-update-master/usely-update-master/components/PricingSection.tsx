'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

// Pricing plans data
const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for getting started',
    price: '$0',
    priceDetails: 'Forever free',
    features: [
      '10,000 tokens per month',
      'Basic usage tracking',
      'Single project support',
      'Community support',
      'API access',
      'Basic analytics'
    ],
    buttonText: 'Get Started Free',
    buttonStyle: 'primary'
  },
  {
    name: 'Pro',
    tagline: 'For growing applications',
    price: '$29',
    priceDetails: 'per month + usage',
    features: [
      '1M tokens per month included',
      'Usage-based billing with Stripe',
      'Multi-project support',
      'Advanced analytics & reporting',
      'Priority support',
      'Team management',
      'Webhook integrations',
      'Custom billing rates'
    ],
    buttonText: 'Buy Pro',
    buttonStyle: 'primary'
  },
  {
    name: 'Enterprise',
    tagline: 'For large-scale deployments',
    price: 'Custom',
    priceDetails: 'tailored pricing',
    features: [
      'Unlimited tokens',
      'Dedicated account manager',
      'Custom SLAs & uptime guarantees',
      'Advanced security features',
      'On-premise deployment options',
      'Custom integrations',
      '24/7 priority support',
      'Compliance certifications'
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'secondary'
  }
];

export default function PricingSection() {
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

  return (
    <section className="pt-16 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#0a0a0a] to-[#050505] relative overflow-hidden">
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
            <ArrowRight className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Pricing</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Start free and scale as you grow. No hidden fees, no surprises. Pay only for what you use.
          </p>
        </motion.div>

        {/* Pricing Plans Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          {plans.map((plan, index) => (
            <motion.article 
              key={index}
              className="relative"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >

              
              <motion.div 
                className={`bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-8 text-center border transition-all duration-300 backdrop-blur-sm relative overflow-hidden h-full flex flex-col border-gray-800/50 hover:border-gray-700/50 hover:shadow-xl hover:shadow-blue-500/5`}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                
                {/* Plan Name */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 relative z-10">
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p className="text-gray-400 text-sm mb-6 relative z-10">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-8 relative z-10">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.priceDetails && (
                    <p className="text-gray-400 text-sm mt-1">
                      {plan.priceDetails}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 relative z-10 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center justify-center gap-2 text-sm text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + featureIndex * 0.1 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + featureIndex * 0.1, type: "spring" }}
                      >
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full md:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] relative z-10 mt-auto ${
                    plan.buttonStyle === 'primary'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
                      : 'bg-transparent text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 focus:ring-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            All plans include real-time token metering, cross-provider support, and zero vendor lock-in. 
            Scale up or down anytime with no hidden fees.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 