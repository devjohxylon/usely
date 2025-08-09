'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';

// FAQ data
const faqs = [
  {
    question: 'How does usage-based billing work?',
    answer: 'We track your AI usage in real-time and automatically calculate costs based on token consumption. You can set custom billing rates for your customers and we handle the Stripe integration, invoicing, and payment processing. You only pay for what you use with transparent pricing.',
    category: 'Billing'
  },
  {
    question: 'What AI providers do you support?',
    answer: 'We support all major AI providers including OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), Mistral, and many others. You can also add custom providers. We track usage across all providers from a single dashboard.',
    category: 'Integration'
  },
  {
    question: 'Do you store my conversation data?',
    answer: 'No, we never store conversation content, prompts, or responses. We only track usage metadata like token counts, costs, and provider information. Your conversations remain private and are never processed or stored by our system.',
    category: 'Privacy'
  },
  {
    question: 'How do I integrate Usely into my application?',
    answer: 'Integration is simple. Install our SDK (TypeScript/JavaScript or Python) or use our REST API. Add a single line of code to track usage after each AI request. We provide detailed documentation and examples for quick setup.',
    category: 'Setup'
  },
  {
    question: 'Can I implement my own pricing for customers?',
    answer: 'Yes! You can set custom billing rates for different customers, features, or usage tiers. Our system automatically calculates costs based on your pricing rules and handles the billing through Stripe. You have full control over your pricing strategy.',
    category: 'Billing'
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'For the free tier, you\'ll be notified when approaching the 10,000 token limit. For Pro plans, you can continue using the service and will be billed for overages. You can upgrade your plan anytime or set usage alerts to monitor consumption.',
    category: 'Pricing'
  },
  {
    question: 'Do you offer team and multi-project support?',
    answer: 'Yes! Pro and Enterprise plans include multi-project support, team management, role-based access controls, and usage quotas. You can manage multiple applications and teams from a single dashboard with detailed analytics per project.',
    category: 'Features'
  },
  {
    question: 'How accurate is the usage tracking?',
    answer: 'Our tracking is highly accurate and matches the billing from AI providers. We track both input and output tokens in real-time, calculate costs using current provider rates, and provide detailed breakdowns. All data is available through our API and dashboard.',
    category: 'Features'
  },
  {
    question: 'Is there a setup fee or long-term commitment?',
    answer: 'No setup fees or long-term commitments. You can start with the free tier and upgrade when needed. All plans are month-to-month with no hidden fees. You can cancel anytime and only pay for what you use.',
    category: 'Pricing'
  },
  {
    question: 'What kind of analytics and reporting do you provide?',
    answer: 'We provide comprehensive analytics including usage trends, cost analysis, performance metrics, and customer billing data. You can view real-time dashboards, export reports, and set up webhooks for custom integrations. All data is available through our API.',
    category: 'Features'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-16 pb-16 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
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
            className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2 mb-6"
            variants={itemVariants}
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm font-medium">FAQ</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Usely. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="space-y-3"
          variants={itemVariants}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <motion.div
                className={`relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                  openIndex === index
                    ? 'border-gray-600 bg-gray-900/30'
                    : 'border-gray-800 bg-gray-900/20 hover:border-gray-700 hover:bg-gray-900/30'
                }`}
                whileHover={{ y: -1 }}
                onClick={() => toggleAccordion(index)}
              >
                {/* Question Header */}
                <div className="relative z-10 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          faq.category === 'Integration' ? 'bg-blue-500/10 text-blue-400' :
                          faq.category === 'Billing' ? 'bg-green-500/10 text-green-400' :
                          faq.category === 'Setup' ? 'bg-purple-500/10 text-purple-400' :
                          faq.category === 'Privacy' ? 'bg-red-500/10 text-red-400' :
                          faq.category === 'Features' ? 'bg-cyan-500/10 text-cyan-400' :
                          faq.category === 'Pricing' ? 'bg-orange-500/10 text-orange-400' :
                          'bg-gray-500/10 text-gray-400'
                        }`}>
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-base font-medium text-white pr-8">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex-shrink-0"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === index 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700 group-hover:text-gray-400'
                      }`}>
                        {openIndex === index ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Answer Panel */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <div className="pt-3 border-t border-gray-800">
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gray-800 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-white font-medium text-base mb-2">Still have questions?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Our support team is here to help you get started with Usely.
            </p>
            <motion.button 
              className="inline-flex items-center gap-2 bg-gray-800 text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Support
              <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 