'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { 
  SiOpenai, 
  SiAnthropic, 
  SiGoogle 
} from 'react-icons/si';
import {
  MistralIcon,
  CohereIcon,
  GroqIcon,
  GeminiIcon,
  PerplexityIcon,
  TogetherIcon
} from './ProviderIcons';

const providers = [
  {
    name: 'OpenAI',
    description: 'GPT-4, GPT-3.5, DALL-E',
    color: 'from-emerald-500 to-emerald-600',
    icon: SiOpenai,
    features: ['GPT-4 Turbo', 'GPT-3.5 Turbo', 'DALL-E 3']
  },
  {
    name: 'Anthropic',
    description: 'Claude 3, Claude 2',
    color: 'from-purple-500 to-purple-600',
    icon: SiAnthropic,
    features: ['Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku']
  },
  {
    name: 'Mistral',
    description: 'Mistral 7B, Mixtral',
    color: 'from-blue-500 to-blue-600',
    icon: MistralIcon,
    features: ['Mistral Large', 'Mixtral 8x7B', 'Mistral 7B']
  },
  {
    name: 'Cohere',
    description: 'Command, Embed',
    color: 'from-orange-500 to-orange-600',
    icon: CohereIcon,
    features: ['Command', 'Command Light', 'Embed']
  },
  {
    name: 'Groq',
    description: 'Ultra-fast inference',
    color: 'from-cyan-500 to-cyan-600',
    icon: GroqIcon,
    features: ['LLaMA2-70B', 'Mixtral-8x7B', 'Gemma-7B']
  },
  {
    name: 'Google',
    description: 'Gemini, PaLM',
    color: 'from-red-500 to-red-600',
    icon: SiGoogle,
    features: ['Gemini Pro', 'Gemini Flash', 'PaLM 2']
  },
  {
    name: 'Perplexity',
    description: 'Search & AI',
    color: 'from-indigo-500 to-indigo-600',
    icon: PerplexityIcon,
    features: ['Perplexity Pro', 'Search API', 'Chat API']
  },
  {
    name: 'Together AI',
    description: 'Open models',
    color: 'from-green-500 to-green-600',
    icon: TogetherIcon,
    features: ['Llama 2', 'CodeLlama', 'Mistral']
  }
];

export default function ProvidersSection() {
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
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="pt-12 pb-12 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
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
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Multi-Provider Support</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Works with your favorite{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              LLM providers
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Seamlessly integrate with OpenAI, Anthropic, Mistral, and more — all from one unified endpoint with real-time metering and billing.
          </p>
        </motion.div>

        {/* Providers Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          {providers.map((provider, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Provider Card */}
              <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
                
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Provider Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <provider.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{provider.name}</h3>
                      <p className="text-gray-400 text-sm">{provider.description}</p>
                    </div>
                  </div>
                  
                  {/* Features List */}
                  <div className="space-y-2">
                    {provider.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="text-center p-6 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl border border-gray-800/50"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">8+ Providers</h3>
            <p className="text-gray-400">Supported out of the box</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl border border-gray-800/50"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">Enterprise Ready</h3>
            <p className="text-gray-400">SOC 2 compliant & secure</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl border border-gray-800/50"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">Global CDN</h3>
            <p className="text-gray-400">99.9% uptime guarantee</p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.button 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View all providers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <p className="text-gray-400 text-sm mt-4">
            Easy integration with just a few lines of code
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 
