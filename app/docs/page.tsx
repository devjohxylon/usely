'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Menu, X, Search, BookOpen, Zap, CreditCard, Shield, BarChart3, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import CodeBlock from '../../components/CodeBlock';
import { useRouter } from 'next/navigation';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Quick Start', href: '#quick-start', icon: Zap },
      { title: 'Installation', href: '#installation', icon: BookOpen },
      { title: 'Authentication', href: '#authentication', icon: Shield },
    ]
  },
  {
    title: 'Core Features',
    items: [
      { title: 'Token Tracking', href: '#token-tracking', icon: BarChart3 },
      { title: 'Usage Analytics', href: '#usage-analytics', icon: BarChart3 },
      { title: 'Rate Limiting', href: '#rate-limiting', icon: Shield },
    ]
  },
  {
    title: 'Billing & Pricing',
    items: [
      { title: 'Usage Plans', href: '#usage-plans', icon: CreditCard },
      { title: 'Pricing Models', href: '#pricing-models', icon: CreditCard },
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'SDK Setup', href: '#sdk-setup', icon: Zap },
      { title: 'API Endpoints', href: '#api-endpoints', icon: BookOpen },
      { title: 'Webhooks', href: '#webhooks', icon: Zap },
    ]
  }
];

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('quick-start');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-black/95 to-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="ml-4 lg:ml-0 flex items-center gap-6">
                <button
                  onClick={() => router.push('/')}
                  className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <ArrowLeft size={20} className="group-hover:scale-110 transition-transform" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen size={16} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Documentation
                    </h1>
                    <p className="text-xs text-white/50">Build • Track • Scale</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:bg-white/10 w-80 transition-all duration-200"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-300 font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className={cn(
            "fixed lg:static lg:block lg:w-80 h-screen bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-xl border-r border-white/10 overflow-hidden z-40",
            sidebarOpen ? "block" : "hidden lg:block"
          )}
        >
          <div className="p-6 space-y-8">
            {/* Sidebar Header */}
            <div className="text-center pb-6 border-b border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen size={24} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Developer Guide</h2>
              <p className="text-xs text-white/50 mt-1">Everything you need to build</p>
            </div>

            <nav className="space-y-8">
              {navigation.map((section, sectionIndex) => (
                <div key={section.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.href.replace('#', '');
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={() => {
                              setActiveSection(item.href.replace('#', ''));
                              setSidebarOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group relative overflow-hidden",
                              isActive
                                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg"
                                : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-[1.02]"
                            )}
                          >
                            {isActive && (
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                            )}
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                              isActive
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                                : "bg-white/5 group-hover:bg-white/10"
                            )}>
                              <Icon size={16} className={isActive ? "text-white" : "text-white/70"} />
                            </div>
                            <span className="font-medium relative z-10">{item.title}</span>
                            {isActive && (
                              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Quick Links */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white/70 mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <BarChart3 size={16} />
                  <span>Dashboard</span>
                </a>
                <a href="/pricing" className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <CreditCard size={16} />
                  <span>Pricing</span>
                </a>
                <a href="https://github.com/usely-ai" className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Zap size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80">
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
    'quick-start': (
      <section id="quick-start" className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <Zap size={16} />
            Get Started in 5 Minutes
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Quick Start Guide
          </h1>
          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
            Transform your AI app into a revenue-generating machine. Track usage, implement billing, and scale with confidence.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 ml-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Install the SDK</h3>
                  <p className="text-white/60">Add Usely to your project with a single command</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white/50 text-sm ml-2">Terminal</span>
                  </div>
                  <CodeBlock language="bash">
{`npm install @usely/sdk`}
                  </CodeBlock>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Supports TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Tree-shakeable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Zero dependencies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8 ml-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Initialize the Client</h3>
                  <p className="text-white/60">Set up your API key and project configuration</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white/50 text-sm ml-2">app.ts</span>
                </div>
                <CodeBlock language="typescript">
{`import { Usely } from '@usely/sdk';

const usely = new Usely({
  apiKey: process.env.USELY_API_KEY,
  projectId: 'your-project-id'
});`}
                </CodeBlock>
              </div>
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-300">
                  <Shield size={16} />
                  <span className="text-sm font-medium">Security Tip</span>
                </div>
                <p className="text-yellow-200/80 text-sm mt-1">Always use environment variables for API keys. Never commit them to version control.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 ml-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Track Your First Usage</h3>
                  <p className="text-white/60">Start monitoring AI costs and usage patterns</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white/50 text-sm ml-2">usage.ts</span>
                </div>
                <CodeBlock language="typescript">
{`// Track OpenAI usage
await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: {
    input: 150,
    output: 75
  },
  cost: 0.0025,
  userId: 'user-123'
});`}
                </CodeBlock>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">150</div>
                  <div className="text-xs text-white/60">Input Tokens</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">75</div>
                  <div className="text-xs text-white/60">Output Tokens</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">$0.0025</div>
                  <div className="text-xs text-white/60">Cost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              4
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 ml-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">View Your Analytics</h3>
                  <p className="text-white/60">Monitor usage, costs, and billing insights in real-time</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$1,247</div>
                    <div className="text-sm text-white/60">Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.4M</div>
                    <div className="text-sm text-white/60">Tokens Used</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Real-time tracking active</span>
                  </div>
                  <a
                    href="/admin/dashboard"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Open Dashboard
                    <ChevronRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're All Set!</h3>
            <p className="text-white/70 mb-6">Your AI usage tracking is now live. Start building your revenue-generating AI app.</p>
            <div className="flex items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Usage Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Cost Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Billing Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),

    'installation': (
      <section id="installation" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Installation</h1>
          <p className="text-xl text-white/70">
            Choose your preferred method to install and configure Usely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Node.js / TypeScript</h3>
            <CodeBlock language="bash">
{`npm install @usely/sdk`}
            </CodeBlock>
            <p className="text-sm text-white/50 mt-2">
              Perfect for backend services and Node.js applications.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Python</h3>
            <CodeBlock language="bash">
{`pip install usely-sdk`}
            </CodeBlock>
            <p className="text-sm text-white/50 mt-2">
              Native Python SDK for ML and data science workflows.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">REST API</h3>
            <CodeBlock language="bash">
{`curl -X POST https://api.usely.dev/v1/track \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"provider": "openai", "tokens": {"input": 100}}'`}
            </CodeBlock>
            <p className="text-sm text-white/50 mt-2">
              Direct API access for any programming language.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Browser</h3>
            <CodeBlock language="html">
{`<script src="https://cdn.usely.dev/sdk.js"></script>
<script>
  const usely = new Usely({ apiKey: 'YOUR_API_KEY' });
</script>`}
            </CodeBlock>
            <p className="text-sm text-white/50 mt-2">
              Client-side tracking for web applications.
            </p>
          </div>
        </div>
      </section>
    ),

    'authentication': (
      <section id="authentication" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Authentication</h1>
          <p className="text-xl text-white/70">
            Secure your API calls with API keys and JWT tokens.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">API Keys</h3>
            <p className="text-white/70 mb-4">
              Generate API keys from your dashboard. Keep them secure and never expose them in client-side code.
            </p>
            <CodeBlock language="typescript">
{`const usely = new Usely({
  apiKey: 'usely_live_1234567890abcdef...',
  projectId: 'proj_1234567890'
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Environment Variables</h3>
            <CodeBlock language="bash">
{`# .env
USELY_API_KEY=usely_live_1234567890abcdef...
USELY_PROJECT_ID=proj_1234567890`}
            </CodeBlock>
            <CodeBlock language="typescript">
{`const usely = new Usely({
  apiKey: process.env.USELY_API_KEY!,
  projectId: process.env.USELY_PROJECT_ID!
});`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'token-tracking': (
      <section id="token-tracking" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Token Tracking</h1>
          <p className="text-xl text-white/70">
            Accurately track token usage across different AI providers and models.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Token Tracking</h3>
            <CodeBlock language="typescript">
{`// Track usage with token counts
await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: {
    input: 150,
    output: 75
  },
  cost: 0.0025,
  userId: 'user_123'
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Automatic Token Counting</h3>
            <CodeBlock language="typescript">
{`// Usely automatically counts tokens for supported providers
await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  prompt: 'Hello, how are you?',
  completion: 'I am doing well, thank you for asking!',
  // Tokens are automatically calculated
  userId: 'user_123'
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Batch Tracking</h3>
            <CodeBlock language="typescript">
{`// Track multiple requests in a batch
const batch = usely.createBatch();

batch.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: { input: 100, output: 50 }
});

batch.track({
  provider: 'anthropic',
  model: 'claude-3',
  tokens: { input: 200, output: 100 }
});

// Send all at once
await batch.flush();`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'usage-analytics': (
      <section id="usage-analytics" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Usage Analytics</h1>
          <p className="text-xl text-white/70">
            Get detailed insights into your AI usage patterns and costs.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Get Analytics</h3>
            <CodeBlock language="typescript">
{`// Get usage analytics
const analytics = await usely.getAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: 'day'
});

console.log(analytics);
// {
//   totalTokens: 1500000,
//   totalCost: 45.50,
//   dailyUsage: [...],
//   topModels: [...],
//   topUsers: [...]
// }`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Real-time Metrics</h3>
            <CodeBlock language="typescript">
{`// Get real-time usage metrics
const metrics = await usely.getMetrics({
  timeframe: '24h',
  include: ['tokens', 'cost', 'requests']
});

console.log(metrics);
// {
//   tokens: { input: 50000, output: 25000 },
//   cost: 1.25,
//   requests: 150
// }`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'rate-limiting': (
      <section id="rate-limiting" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Rate Limiting</h1>
          <p className="text-xl text-white/70">
            Implement sophisticated rate limiting and quota management for your AI services.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Setting Rate Limits</h3>
            <CodeBlock language="typescript">
{`// Create rate limits for different user tiers
await usely.rateLimits.create({
  name: 'Free Tier',
  limits: {
    requests: 1000, // 1000 requests
    period: 'day',  // per day
    tokens: 100000  // 100K tokens per day
  },
  userIds: ['user_123', 'user_456']
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Checking Rate Limits</h3>
            <CodeBlock language="typescript">
{`// Check if user can make a request
const canProceed = await usely.rateLimits.check({
  userId: 'user_123',
  tokens: 150
});

if (!canProceed) {
  throw new Error('Rate limit exceeded');
}

// Make the request
await usely.track({
  provider: 'openai',
  tokens: { input: 150, output: 75 },
  userId: 'user_123'
});`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'usage-plans': (
      <section id="usage-plans" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Usage Plans</h1>
          <p className="text-xl text-white/70">
            Configure flexible usage plans and pricing models for your AI services.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Creating Usage Plans</h3>
            <CodeBlock language="typescript">
{`// Create a pay-per-use plan
const plan = await usely.plans.create({
  name: 'Pay Per Use',
  type: 'usage',
  pricing: {
    model: 'gpt-4',
    inputTokens: 0.00003, // $0.03 per 1K input tokens
    outputTokens: 0.00006  // $0.06 per 1K output tokens
  }
});

// Create a tiered plan
const tieredPlan = await usely.plans.create({
  name: 'Tiered Pricing',
  type: 'tiered',
  tiers: [
    { usage: 0, price: 0.00003 },
    { usage: 1000000, price: 0.000025 },
    { usage: 10000000, price: 0.00002 }
  ]
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Assigning Plans to Users</h3>
            <CodeBlock language="typescript">
{`// Assign a plan to a user
await usely.users.assignPlan({
  userId: 'user_123',
  planId: 'plan_456',
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
});

// Get user's current plan
const userPlan = await usely.users.getPlan('user_123');
console.log(userPlan.currentPlan.name);`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'pricing-models': (
      <section id="pricing-models" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Pricing Models</h1>
          <p className="text-xl text-white/70">
            Choose from multiple pricing models to fit your business needs.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Pay-Per-Use</h3>
            <p className="text-white/70 mb-4">
              Charge users based on actual token usage. Perfect for variable workloads.
            </p>
            <CodeBlock language="typescript">
{`const payPerUse = await usely.pricing.create({
  name: 'Pay Per Use',
  model: 'usage',
  rates: {
    'gpt-4': { input: 0.00003, output: 0.00006 },
    'gpt-3.5-turbo': { input: 0.0000015, output: 0.000002 }
  }
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
            <p className="text-white/70 mb-4">
              Fixed monthly pricing with usage allowances. Great for predictable revenue.
            </p>
            <CodeBlock language="typescript">
{`const subscription = await usely.pricing.create({
  name: 'Pro Plan',
  model: 'subscription',
  price: 99.99,
  allowance: {
    tokens: 1000000, // 1M tokens per month
    requests: 10000   // 10K requests per month
  }
});`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'sdk-setup': (
      <section id="sdk-setup" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">SDK Setup</h1>
          <p className="text-xl text-white/70">
            Configure the SDK for your specific use case and environment.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Configuration</h3>
            <CodeBlock language="typescript">
{`import { Usely } from '@usely/sdk';

const usely = new Usely({
  apiKey: process.env.USELY_API_KEY,
  projectId: process.env.USELY_PROJECT_ID,
  environment: 'production', // 'development' | 'staging' | 'production'
  timeout: 5000, // API timeout in ms
  retries: 3 // Number of retry attempts
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Configuration</h3>
            <CodeBlock language="typescript">
{`const usely = new Usely({
  apiKey: process.env.USELY_API_KEY,
  projectId: process.env.USELY_PROJECT_ID,
  
  // Batch configuration
  batch: {
    enabled: true,
    size: 100,
    interval: 5000 // Flush every 5 seconds
  },
  
  // Custom headers
  headers: {
    'X-Custom-Header': 'value'
  }
});`}
            </CodeBlock>
          </div>
        </div>
      </section>
    ),

    'api-endpoints': (
      <section id="api-endpoints" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">API Endpoints</h1>
          <p className="text-xl text-white/70">
            Complete API documentation for all Usely endpoints.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Track Usage</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/50 mb-2">POST /v1/track</p>
                <CodeBlock language="typescript">
{`interface TrackRequest {
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  model?: string;
  tokens?: {
    input: number;
    output: number;
  };
  cost?: number;
  userId?: string;
  metadata?: Record<string, any>;
}

const response = await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: { input: 150, output: 75 },
  cost: 0.0025,
  userId: 'user_123'
});`}
                </CodeBlock>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Get Analytics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/50 mb-2">GET /v1/analytics</p>
                <CodeBlock language="typescript">
{`interface AnalyticsRequest {
  startDate?: string;
  endDate?: string;
  provider?: string;
  userId?: string;
  groupBy?: 'day' | 'week' | 'month';
}

const analytics = await usely.getAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: 'day'
});`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),

    'webhooks': (
      <section id="webhooks" className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Webhooks</h1>
          <p className="text-xl text-white/70">
            Receive real-time notifications about usage events and billing updates.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Setting Up Webhooks</h3>
            <CodeBlock language="typescript">
{`// Configure webhook endpoint
await usely.webhooks.create({
  url: 'https://your-app.com/webhooks/usely',
  events: ['usage.tracked', 'billing.updated', 'quota.exceeded'],
  secret: 'your-webhook-secret'
});`}
            </CodeBlock>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Webhook Payload</h3>
            <CodeBlock language="json">
{`{
  "id": "evt_1234567890",
  "type": "usage.tracked",
  "data": {
    "provider": "openai",
    "model": "gpt-4",
    "tokens": { "input": 150, "output": 75 },
    "cost": 0.0025,
    "userId": "user_123",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "created": "2024-01-15T10:30:00Z"
}`}
            </CodeBlock>
          </div>
        </div>
      </section>
    )
  };

  return sections[activeSection as keyof typeof sections] || sections['quick-start'];
}

 