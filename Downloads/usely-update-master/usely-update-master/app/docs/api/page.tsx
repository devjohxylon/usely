'use client';

import React, { useState } from 'react';
import { Search, BookOpen, ArrowLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navigation = [
  {
    title: 'Authentication',
    items: [
      { title: 'API Keys', href: '#api-keys' },
      { title: 'Rate Limits', href: '#rate-limits' },
    ]
  },
  {
    title: 'Endpoints',
    items: [
      { title: 'Track Usage', href: '#track-usage' },
      { title: 'Get Analytics', href: '#analytics' },
      { title: 'Get Projects', href: '#projects' },
      { title: 'Get Users', href: '#users' },
    ]
  },
  {
    title: 'SDKs',
    items: [
      { title: 'TypeScript/JavaScript', href: '#typescript' },
      { title: 'Python', href: '#python' },
      { title: 'cURL Examples', href: '#curl' },
    ]
  }
];

export default function ApiDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('api-keys');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
                  onClick={() => router.push('/docs')}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">API Reference</h1>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search API docs..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              <button
                onClick={() => router.push('/docs')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Back to Docs
              </button>
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
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <button
                          onClick={() => scrollToSection(item.href.slice(1))}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            activeSection === item.href.slice(1)
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
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
          <div className="max-w-4xl mx-auto px-6 py-8">
            <ApiDocsContent activeSection={activeSection} copiedCode={copiedCode} copyToClipboard={copyToClipboard} />
          </div>
        </main>
      </div>
    </div>
  );
}

function ApiDocsContent({ 
  activeSection, 
  copiedCode, 
  copyToClipboard 
}: { 
  activeSection: string; 
  copiedCode: string | null; 
  copyToClipboard: (text: string, id: string) => void;
}) {
  const baseUrl = 'https://api.usely.dev/v1';

  return (
    <div className="space-y-12">
      {/* API Keys */}
      <section id="api-keys" className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Authentication</h1>
          <p className="text-gray-400 text-lg">
            All API requests require authentication using your API key.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">API Key</h3>
          <p className="text-gray-400 mb-4">
            Include your API key in the Authorization header of all requests:
          </p>
          <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Authorization Header</span>
              <button
                onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                {copiedCode === 'auth-header' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">Authorization: Bearer YOUR_API_KEY</pre>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section id="rate-limits" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Rate Limits</h2>
          <p className="text-gray-400">
            API requests are limited to ensure fair usage and system stability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Free Tier</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Requests per minute:</span>
                <span className="text-white">60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Requests per hour:</span>
                <span className="text-white">1,000</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Pro Tier</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Requests per minute:</span>
                <span className="text-white">300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Requests per hour:</span>
                <span className="text-white">10,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Usage */}
      <section id="track-usage" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Track Usage</h2>
          <p className="text-gray-400">
            Track token usage and costs for AI provider interactions.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">POST</span>
            <code className="text-white font-mono">{baseUrl}/track</code>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-white mb-3">Request Body</h4>
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">JSON Schema</span>
                  <button
                    onClick={() => copyToClipboard(`{
  "provider": "openai",
  "model": "gpt-4",
  "tokens": {
    "input": 150,
    "output": 75
  },
  "cost": 0.0025,
  "userId": "user_123",
  "metadata": {
    "feature": "chat-completion",
    "session_id": "session-123"
  }
}`, 'track-request')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'track-request' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`{
  "provider": "openai",
  "model": "gpt-4",
  "tokens": {
    "input": 150,
    "output": 75
  },
  "cost": 0.0025,
  "userId": "user_123",
  "metadata": {
    "feature": "chat-completion",
    "session_id": "session-123"
  }
}`}</pre>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-white mb-3">Response</h4>
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
                <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`{
  "id": "track_123456789",
  "provider": "openai",
  "model": "gpt-4",
  "tokens": {
    "input": 150,
    "output": 75
  },
  "cost": 0.0025,
  "userId": "user_123",
  "createdAt": "2024-01-15T10:30:00Z"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Get Analytics</h2>
          <p className="text-gray-400">
            Retrieve usage analytics and cost data for your projects.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">GET</span>
            <code className="text-white font-mono">{baseUrl}/analytics</code>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-white mb-3">Query Parameters</h4>
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
                <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`?start_date=2024-01-01&end_date=2024-01-31&provider=openai&group_by=day`}</pre>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-white mb-3">Response</h4>
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
                <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`{
  "period": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "summary": {
    "totalTokens": 150000,
    "totalCost": 12.50,
    "totalRequests": 1250
  },
  "data": [
    {
      "date": "2024-01-01",
      "tokens": 5000,
      "cost": 0.42,
      "requests": 45
    }
  ]
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TypeScript SDK */}
      <section id="typescript" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">TypeScript/JavaScript SDK</h2>
          <p className="text-gray-400">
            Official SDK for TypeScript and JavaScript applications.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Installation</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">npm</span>
                <button
                  onClick={() => copyToClipboard('npm install @usely/sdk', 'npm-install')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'npm-install' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 text-sm">npm install @usely/sdk</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">TypeScript Example</span>
                <button
                  onClick={() => copyToClipboard(`import { Usely } from '@usely/sdk';

const usely = new Usely('YOUR_API_KEY');

// Track usage
await usely.track({
  provider: 'openai',
  model: 'gpt-4',
  tokens: {
    input: 150,
    output: 75
  },
  cost: 0.0025,
  userId: 'user_123'
});`, 'ts-example')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'ts-example' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`import { Usely } from '@usely/sdk';

const usely = new Usely('YOUR_API_KEY');

// Track usage
await usely.track({
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
        </div>
      </section>

      {/* Python SDK */}
      <section id="python" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Python SDK</h2>
          <p className="text-gray-400">
            Official SDK for Python applications.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Installation</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">pip</span>
                <button
                  onClick={() => copyToClipboard('pip install usely', 'pip-install')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'pip-install' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 text-sm">pip install usely</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Python Example</span>
                <button
                  onClick={() => copyToClipboard(`from usely import Usely

usely = Usely('YOUR_API_KEY')

# Track usage
usely.track(
    provider='openai',
    model='gpt-4',
    tokens={'input': 150, 'output': 75},
    cost=0.0025,
    user_id='user_123'
)`, 'python-example')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'python-example' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`from usely import Usely

usely = Usely('YOUR_API_KEY')

# Track usage
usely.track(
    provider='openai',
    model='gpt-4',
    tokens={'input': 150, 'output': 75},
    cost=0.0025,
    user_id='user_123'
)`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* cURL Examples */}
      <section id="curl" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">cURL Examples</h2>
          <p className="text-gray-400">
            Direct API calls using cURL for any programming language.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Track Usage</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">cURL Command</span>
                <button
                  onClick={() => copyToClipboard(`curl -X POST https://api.usely.dev/v1/track \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "openai",
    "model": "gpt-4",
    "tokens": {
      "input": 150,
      "output": 75
    },
    "cost": 0.0025,
    "userId": "user_123"
  }'`, 'curl-track')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'curl-track' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`curl -X POST https://api.usely.dev/v1/track \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "openai",
    "model": "gpt-4",
    "tokens": {
      "input": 150,
      "output": 75
    },
    "cost": 0.0025,
    "userId": "user_123"
  }'`}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Get Analytics</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800/30 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">cURL Command</span>
                <button
                  onClick={() => copyToClipboard(`curl -X GET "https://api.usely.dev/v1/analytics?start_date=2024-01-01&end_date=2024-01-31" \\
  -H "Authorization: Bearer YOUR_API_KEY"`, 'curl-analytics')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'curl-analytics' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap break-words">{`curl -X GET "https://api.usely.dev/v1/analytics?start_date=2024-01-01&end_date=2024-01-31" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 