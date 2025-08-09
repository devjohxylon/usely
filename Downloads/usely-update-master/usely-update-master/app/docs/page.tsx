'use client';

import React, { useState } from 'react';
import { Search, BookOpen, Zap, CreditCard, Shield, BarChart3, ArrowLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: '#overview' },
      { title: 'Quickstart', href: '#quickstart' },
      { title: 'Installation', href: '#installation' },
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'API Documentation', href: '/docs/api' },
      { title: 'Track Usage', href: '#track-usage' },
      { title: 'Get Analytics', href: '#analytics' },
      { title: 'Webhooks', href: '#webhooks' },
      { title: 'Rate Limiting', href: '#rate-limiting' },
    ]
  },
  {
    title: 'SDK',
    items: [
      { title: 'TypeScript/JavaScript', href: '#typescript' },
      { title: 'Python', href: '#python' },
      { title: 'cURL', href: '#curl' },
    ]
  }
];

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      // External link - navigate to new page
      router.push(href);
    } else {
      // Internal link - scroll to section
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 lg:ml-0 flex items-center gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">Documentation</h1>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static lg:block lg:w-64 h-screen bg-[#111111] border-r border-gray-800/50 overflow-y-auto z-40
          ${sidebarOpen ? 'block' : 'hidden lg:block'}
        `}>
          <div className="p-6">
            <nav className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <button
                          onClick={() => handleNavigation(item.href)}
                          className={`
                            w-full text-left px-3 py-2 text-sm rounded-md transition-colors
                            ${item.href.startsWith('/') 
                              ? 'text-gray-400 hover:text-white hover:bg-white/10'
                              : activeSection === item.href.replace('#', '')
                                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white font-medium border border-blue-500/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }
                          `}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DocsContent activeSection={activeSection} />
          </div>
        </main>
      </div>
    </div>
  );
}

function DocsContent({ activeSection }: { activeSection: string }) {
  const sections = {
    'overview': (
      <section id="overview" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Overview</h1>
          <p className="text-xl text-gray-400 mb-8">
            Usely is a comprehensive AI usage tracking and intelligent routing platform that helps you monitor, analyze, and optimize your LLM costs across multiple providers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Intelligent Routing</h3>
            <p className="text-gray-400">Automatically route requests to the optimal AI provider based on cost, latency, and performance</p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Usage Tracking</h3>
            <p className="text-gray-400">Track token usage, costs, and performance across OpenAI, Anthropic, Google, and more</p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Usage-Based Billing</h3>
            <p className="text-gray-400">Implement pay-per-use billing for your AI services with real-time cost tracking</p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Privacy First</h3>
            <p className="text-gray-400">We only track usage data, never personal information or conversation content</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">How It Works</h3>
          <p className="text-blue-300 mb-4">
            Usely acts as a smart proxy between your application and AI providers. Here's the flow:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-blue-300">Your app sends requests to Usely's unified API endpoint</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <span className="text-blue-300">Usely intelligently routes to the best provider based on your request</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-blue-300">We track usage, costs, and performance in real-time</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <span className="text-blue-300">You get detailed analytics and billing insights</span>
            </div>
          </div>
        </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Key Benefits</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-green-300">Reduce costs by 20-40% through intelligent routing</div>
                <div className="text-green-300">Single API endpoint for all providers</div>
                <div className="text-green-300">Real-time usage monitoring</div>
              </div>
              <div className="space-y-3">
                <div className="text-green-300">Automatic failover and load balancing</div>
                <div className="text-green-300">Usage-based billing for your customers</div>
                <div className="text-green-300">Detailed analytics and insights</div>
              </div>
            </div>
          </div>
      </section>
    ),

    'quickstart': (
      <section id="quickstart" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Quickstart</h1>
          <p className="text-xl text-gray-400">
            Get started with Usely in under 5 minutes. This guide will show you how to set up usage tracking and intelligent routing.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Create Your Account</h2>
            <p className="text-gray-400 mb-4">
              Sign up at <a href="/" className="text-blue-400 hover:text-blue-300">usely.dev</a> to get your API key and dashboard access.
            </p>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="text-green-400 font-medium mb-2">Free Tier Available</div>
              <p className="text-green-300 text-sm">Start with 10,000 tokens per month free. No credit card required.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Install the SDK</h2>
            <p className="text-gray-400 mb-4">Choose your preferred language:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">Node.js / TypeScript</span>
                </div>
                <pre className="text-green-400 text-sm">npm install @usely/sdk</pre>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">Python</span>
                </div>
                <pre className="text-green-400 text-sm">pip install usely-sdk</pre>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Initialize the Client</h2>
            <p className="text-gray-400 mb-4">Set up your API key and configure the client:</p>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`import { Usely } from '@usely/sdk';

const usely = new Usely({
  apiKey: process.env.USELY_API_KEY,
  projectId: 'your-project-id' // Optional
});`}</pre>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
              <div className="text-yellow-400 font-medium mb-2">Security Tip</div>
              <p className="text-yellow-300 text-sm">Always use environment variables for your API key. Never commit it to version control.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Track Your First Usage</h2>
            <p className="text-gray-400 mb-4">Start monitoring your AI usage:</p>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`// Track OpenAI usage
await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: {
    input: 150,
    output: 75
  },
  cost: 0.0025,
  userId: 'user-123',
  metadata: {
    feature: 'chat-completion',
    session_id: 'session-456'
  }
});`}</pre>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Use Intelligent Routing</h2>
            <p className="text-gray-400 mb-4">Let Usely automatically choose the best provider:</p>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`// Get routing recommendation
const routing = await usely.route({
  prompt: 'Explain quantum computing in simple terms',
  model: 'gpt-4', // Optional: preferred model
  maxTokens: 500,
  temperature: 0.7
});

console.log(routing);
// {
//   provider: 'openai',
//   provider_name: 'OpenAI',
//   model: 'gpt-4',
//   reason: 'Selected OpenAI based on: Cost: $0.0012, Latency: 1200ms, Reliability: 99%',
//   estimated_cost: '0.001200',
//   estimated_latency: 1200,
//   reliability: 0.99
// }`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-2">You're All Set!</h3>
            <p className="text-green-300 mb-4">
              Your AI usage tracking is now live. Check your dashboard to see real-time analytics and cost insights.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-green-300">Real-time Analytics</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-300">Cost Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-purple-300">Smart Routing</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),

    'installation': (
      <section id="installation" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Installation</h1>
          <p className="text-xl text-gray-400">
            Choose your preferred method to install and configure Usely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Node.js / TypeScript</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">npm install @usely/sdk</pre>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Perfect for backend services and Node.js applications.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Python</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">pip install usely-sdk</pre>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Native Python SDK for ML and data science workflows.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">REST API</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`curl -X POST https://api.usely.dev/v1/track \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"provider": "openai", "tokens": {"input": 100}}'`}</pre>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Direct API access for any programming language.
            </p>
          </div>
        </div>
      </section>
    ),

    'track-usage': (
      <section id="track-usage" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Track Usage</h1>
          <p className="text-xl text-gray-400">
            Track token usage, costs, and performance across all your AI providers with detailed analytics.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">API Endpoint</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">POST /api/v1/track</pre>
            </div>
            <p className="text-gray-400 mb-4">Track usage data for any AI provider interaction.</p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Request Parameters</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`{
  "provider": "openai" | "anthropic" | "google" | "mistral" | "custom",
  "model": "gpt-4" | "claude-3-opus" | "gemini-pro" | "mistral-large",
  "tokens": {
    "input": number,    // Input tokens used
    "output": number    // Output tokens generated
  },
  "cost": number,       // Cost in USD (optional, auto-calculated if not provided)
  "userId": string,     // Your user identifier (optional)
  "metadata": {         // Additional context (optional)
    "feature": "chat-completion",
    "session_id": "session-123",
    "request_id": "req-456"
  }
}`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Usage Examples</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-white mb-2">OpenAI GPT-4</h4>
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: {
    input: 150,
    output: 75
  },
  cost: 0.0025,
  userId: 'user_123'
});`}</pre>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-white mb-2">Anthropic Claude</h4>
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`await usely.track({
  provider: 'anthropic',
  model: 'claude-3-opus',
  tokens: {
    input: 200,
    output: 100
  },
  cost: 0.0035,
  userId: 'user_456'
});`}</pre>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-white mb-2">Google Gemini</h4>
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
                  <pre className="text-green-400 text-sm">{`await usely.track({
  provider: 'google',
  model: 'gemini-pro',
  tokens: {
    input: 120,
    output: 60
  },
  cost: 0.0009,
  userId: 'user_789'
});`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Advanced Usage with Metadata</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: {
    input: 300,
    output: 150
  },
  cost: 0.0050,
  userId: 'user_123',
  metadata: {
    feature: 'code-generation',
    language: 'python',
    complexity: 'medium',
    session_id: 'session-abc123',
    request_id: 'req-def456',
    user_tier: 'premium',
    environment: 'production'
  }
});`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Supported Providers & Models</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-white mb-3">OpenAI</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">GPT-4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">GPT-4 Turbo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">GPT-3.5 Turbo</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-white mb-3">Anthropic</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Claude 3 Opus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Claude 3 Sonnet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Claude 3 Haiku</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-white mb-3">Google</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Gemini Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Gemini Flash</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-white mb-3">Mistral</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Mistral Large</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Mixtral 8x7B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Response Format</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`{
  "success": true,
  "tracking_id": "track_1234567890",
  "timestamp": "2024-01-15T10:30:00Z",
  "usage": {
    "tokens": {
      "input": 150,
      "output": 75,
      "total": 225
    },
    "cost": 0.0025,
    "provider": "openai",
    "model": "gpt-4"
  }
}`}</pre>
            </div>
          </div>
        </div>
      </section>
    ),

    'analytics': (
      <section id="analytics" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Analytics</h1>
          <p className="text-xl text-gray-400">
            Get comprehensive insights into your AI usage patterns, costs, and performance metrics.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">API Endpoint</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 mb-4">
              <pre className="text-green-400 text-sm">GET /api/v1/analytics</pre>
            </div>
            <p className="text-gray-400 mb-4">Retrieve detailed analytics and usage insights.</p>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Query Parameters</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`{
  startDate?: string,     // Start date (YYYY-MM-DD)
  endDate?: string,       // End date (YYYY-MM-DD)
  provider?: string,      // Filter by provider (openai, anthropic, etc.)
  model?: string,         // Filter by model (gpt-4, claude-3-opus, etc.)
  userId?: string,        // Filter by user ID
  groupBy?: 'day' | 'week' | 'month' | 'hour',  // Grouping interval
  limit?: number          // Number of results (default: 100)
}`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Analytics</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`// Get analytics for the last 30 days
const analytics = await usely.getAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: 'day'
});

console.log(analytics);
// {
//   summary: {
//     totalRequests: 15420,
//     totalTokens: 2847500,
//     totalCost: 89.45,
//     avgLatency: 1250,
//     successRate: 99.2
//   },
//   dailyUsage: [
//     {
//       date: '2024-01-01',
//       requests: 512,
//       tokens: 95000,
//       cost: 2.85,
//       avgLatency: 1200
//     }
//   ],
//   topModels: [
//     { model: 'gpt-4', requests: 8500, cost: 45.20 },
//     { model: 'claude-3-opus', requests: 4200, cost: 28.15 }
//   ],
//   topUsers: [
//     { userId: 'user_123', requests: 1200, cost: 8.50 },
//     { userId: 'user_456', requests: 980, cost: 6.20 }
//   ]
// }`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Advanced Analytics</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-white mb-2">Provider Comparison</h4>
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
                  <pre className="text-green-400 text-sm">{`// Compare providers
const providerAnalytics = await usely.getAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: 'provider'
});

// {
//   providers: {
//     openai: { requests: 8500, cost: 45.20, avgLatency: 1200 },
//     anthropic: { requests: 4200, cost: 28.15, avgLatency: 800 },
//     google: { requests: 2720, cost: 16.10, avgLatency: 600 }
//   }
// }`}</pre>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-white mb-2">User Analytics</h4>
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
                  <pre className="text-green-400 text-sm">{`// Get user-specific analytics
const userAnalytics = await usely.getAnalytics({
  userId: 'user_123',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: 'day'
});

// {
//   userId: 'user_123',
//   summary: {
//     totalRequests: 1200,
//     totalTokens: 180000,
//     totalCost: 8.50,
//     avgTokensPerRequest: 150
//   },
//   dailyUsage: [...],
//   topFeatures: [
//     { feature: 'chat-completion', requests: 800 },
//     { feature: 'code-generation', requests: 400 }
//   ]
// }`}</pre>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-white mb-2">Cost Analysis</h4>
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
                  <pre className="text-green-400 text-sm">{`// Get cost breakdown
const costAnalytics = await usely.getAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: 'model'
});

// {
//   costBreakdown: {
//     'gpt-4': { cost: 45.20, percentage: 50.5 },
//     'claude-3-opus': { cost: 28.15, percentage: 31.5 },
//     'gemini-pro': { cost: 16.10, percentage: 18.0 }
//   },
//   costTrends: {
//     dailyAverage: 2.98,
//     weeklyGrowth: 12.5,
//     monthlyProjection: 92.40
//   }
// }`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Real-time Metrics</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`// Get real-time metrics
const realtimeMetrics = await usely.getMetrics({
  timeframe: '24h',  // '1h', '24h', '7d', '30d'
  include: ['requests', 'tokens', 'cost', 'latency']
});

// {
//   current: {
//     requests: 1250,
//     tokens: 180000,
//     cost: 5.40,
//     avgLatency: 1150
//   },
//   previous: {
//     requests: 1180,
//     tokens: 172000,
//     cost: 5.15,
//     avgLatency: 1200
//   },
//   change: {
//     requests: +5.9,
//     tokens: +4.7,
//     cost: +4.9,
//     latency: -4.2
//   }
// }`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Analytics Dashboard</h3>
            <p className="text-green-300 mb-4">
              Access your analytics through our web dashboard for visual insights and reports.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-green-300">Usage Trends</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-300">Cost Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-purple-300">Performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),

    'webhooks': (
      <section id="webhooks" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Webhooks</h1>
          <p className="text-xl text-gray-400">
            Receive real-time notifications about usage events and billing updates.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Setting Up Webhooks</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`await usely.webhooks.create({
  url: 'https://your-app.com/webhooks/usely',
  events: ['usage.tracked', 'billing.updated'],
  secret: 'your-webhook-secret'
});`}</pre>
            </div>
          </div>
        </div>
      </section>
    ),

    'rate-limiting': (
      <section id="rate-limiting" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Rate Limiting</h1>
          <p className="text-xl text-gray-400">
            Implement sophisticated rate limiting and quota management.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Check Rate Limits</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`const canProceed = await usely.rateLimits.check({
  userId: 'user_123',
  tokens: 150
});

if (!canProceed) {
  throw new Error('Rate limit exceeded');
}`}</pre>
            </div>
          </div>
        </div>
      </section>
    ),

    'typescript': (
      <section id="typescript" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">TypeScript/JavaScript SDK</h1>
          <p className="text-xl text-gray-400">
            Complete SDK documentation for TypeScript and JavaScript.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Installation</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">npm install @usely/sdk</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Usage</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`import { Usely } from '@usely/sdk';

const usely = new Usely({
  apiKey: process.env.USELY_API_KEY
});

await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: { input: 150, output: 75 }
});`}</pre>
            </div>
          </div>
        </div>
      </section>
    ),

    'python': (
      <section id="python" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Python SDK</h1>
          <p className="text-xl text-gray-400">
            Complete SDK documentation for Python.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Installation</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">pip install usely-sdk</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Usage</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`from usely import Usely

client = Usely(api_key="YOUR_API_KEY")

client.track(
  provider="openai",
  model="gpt-4",
  tokens={"input": 150, "output": 75}
)`}</pre>
            </div>
          </div>
        </div>
      </section>
    ),

    'curl': (
      <section id="curl" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">cURL Examples</h1>
          <p className="text-xl text-gray-400">
            Direct API access using cURL for any programming language.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Track Usage</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`curl -X POST https://api.usely.dev/v1/track \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "provider": "openai",
    "model": "gpt-4",
    "tokens": {
      "input": 150,
      "output": 75
    },
    "cost": 0.0025
  }'`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Get Analytics</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30">
              <pre className="text-green-400 text-sm">{`curl -X GET "https://api.usely.dev/v1/analytics?startDate=2024-01-01&endDate=2024-01-31" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
            </div>
          </div>
        </div>
      </section>
    )
  };

  return sections[activeSection as keyof typeof sections] || sections['overview'];
}

 