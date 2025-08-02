'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

// FAQ data
const faqs = [
  {
    question: 'What models are supported?',
    answer: 'Usely supports OpenAI, Anthropic, Mistral, and any LLM provider compatible with token metering.'
  },
  {
    question: 'How are tokens counted?',
    answer: 'Tokens are metered in real-time based on your usage with full accuracy.'
  },
  {
    question: 'Do I need to change my endpoints?',
    answer: 'No, Usely acts as a proxy; you can keep your existing endpoints with minimal changes.'
  },
  {
    question: 'Can I use my own OpenAI API key?',
    answer: 'Yes, you can connect Usely with your own keys for full control.'
  },
  {
    question: 'Is there a free tier available?',
    answer: 'Yes, we offer a free tier with up to 10,000 tokens per month to get you started.'
  },
  {
    question: 'How does billing work?',
    answer: 'Billing is usage-based with no hidden fees. You only pay for what you use, with transparent pricing per token.'
  }
];

export default function FAQSection() {
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
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#e5e5e5] mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-4"
          variants={itemVariants}
        >
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Disclosure.Button className="w-full bg-[#111111] rounded-md border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] group">
                    <div className={`px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 ${
                      open 
                        ? 'bg-gray-800/20 text-[#e5e5e5]' 
                        : 'text-[#e5e5e5] hover:bg-gray-800/10'
                    }`}>
                      <span className="text-lg font-semibold pr-4">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {open ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </motion.div>
                    </div>
                  </Disclosure.Button>
                  
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-150 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="bg-[#111111] rounded-b-md border-t-0 border border-gray-800/30">
                      <div className="px-6 pb-4">
                        <p className="text-sm text-[#a0a0a0] leading-relaxed pt-2">
                          {faq.answer}
                        </p>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </motion.div>
              )}
            </Disclosure>
          ))}
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <p className="text-[#a0a0a0] text-sm mb-4">
            Still have questions? We're here to help.
          </p>
          <motion.button 
            className="inline-flex items-center gap-2 text-[#e5e5e5] hover:text-white font-medium transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </motion.button>
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