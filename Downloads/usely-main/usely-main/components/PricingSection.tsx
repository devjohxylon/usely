'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

// Pricing plans data
const plans = [
  {
    name: 'Free',
    tagline: 'Up to 10,000 tokens',
    price: 'Free',
    features: [
      'No vendor lock-in',
      'Basic metering & billing',
      'Community support'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'primary'
  },
  {
    name: 'Pay-as-you-go',
    tagline: 'Pay only for what you use',
    price: 'Per token / usage',
    features: [
      'All Free plan features',
      'Stripe billing included',
      'Usage-based pricing'
    ],
    buttonText: 'Start Billing',
    buttonStyle: 'primary',
    popular: true
  },
  {
    name: 'Enterprise',
    tagline: 'Custom plans for teams & scale',
    price: 'Contact us',
    features: [
      'Dedicated support',
      'Custom SLAs',
      'Multi-project & team dashboards'
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
        ease: "easeOut"
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
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#e5e5e5] mb-4">
            Fair, scalable pricing.
          </h2>
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
              {/* Popular badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </motion.div>
              )}
              
              <motion.div 
                className={`bg-[#111111] rounded-lg p-8 text-center border border-gray-800/30 hover:border-gray-700/50 transition-all duration-300 backdrop-blur-sm ${
                  plan.popular ? 'ring-2 ring-blue-500/20' : ''
                }`}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Plan Name */}
                <h3 className="text-xl md:text-2xl font-bold text-[#e5e5e5] mb-2">
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p className="text-[#a0a0a0] text-sm mb-6">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-3xl md:text-4xl font-bold text-[#e5e5e5]">
                    {plan.price}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center justify-center gap-2 text-sm text-[#a0a0a0]"
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
                  className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] ${
                    plan.buttonStyle === 'primary'
                      ? 'bg-white text-black hover:bg-gray-100 focus:ring-white'
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
          <p className="text-[#a0a0a0] text-sm max-w-2xl mx-auto">
            All plans include real-time token metering, cross-provider support, and zero vendor lock-in. 
            Scale up or down anytime with no hidden fees.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl"
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