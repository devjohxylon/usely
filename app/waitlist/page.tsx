'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [lastSubmission, setLastSubmission] = useState<number>(0);

  React.useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
          setWaitlistCount(count);
        }
      } catch (err) {
        // Silent fail for better UX
      }
    };

    fetchWaitlistCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmission;
    
    if (timeSinceLastSubmission < 5000) {
      setError('Please wait 5 seconds between submissions.');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setLastSubmission(now);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }

      setWaitlistCount(prev => prev !== null ? prev + 1 : 1);
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const stars = Array.from({ length: 200 }, (_, i) => {
    const seed = i * 1.618033988749895;
    const left = (Math.sin(seed) * 10000) % 100;
    const top = (Math.sin(seed + 1) * 10000) % 100;
    const size = Math.sin(seed + 2);
    const brightness = Math.sin(seed + 3);
    const twinkleSpeed = Math.sin(seed + 4);
    const distance = Math.sin(seed + 5);
    
    let starClass = '';
    let animationClass = '';
    
    if (size > 0.9) {
      starClass = 'w-2 h-2 bg-yellow-300/90';
      animationClass = 'animate-twinkle';
    } else if (size > 0.7) {
      starClass = 'w-1.5 h-1.5 bg-white/80';
      animationClass = 'animate-twinkle-slow';
    } else if (size > 0.5) {
      starClass = 'w-1 h-1 bg-blue-200/70';
      animationClass = 'animate-twinkle-fast';
    } else {
      starClass = 'w-0.5 h-0.5 bg-white/50';
      animationClass = 'animate-twinkle';
    }
    
    return { 
      id: i, 
      left, 
      top, 
      starClass, 
      animationClass,
      delay: twinkleSpeed * 3,
      duration: 2 + twinkleSpeed * 2,
      brightness: brightness * 0.5 + 0.5,
      scale: 0.8 + distance * 0.4,
      zIndex: Math.floor(distance * 10)
    };
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.starClass} ${star.animationClass}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: star.brightness,
              transform: `scale(${star.scale})`,
              zIndex: star.zIndex
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[500px] bg-gradient-to-r from-blue-400/15 via-cyan-400/10 to-blue-500/15 rounded-full blur-2xl animate-float-slow opacity-80 scale-110"></div>
        </div>

        <div className="bg-black/20 rounded-3xl p-6 md:p-8 lg:p-12 max-w-4xl w-full shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in" style={{boxShadow: '0 0 20px rgba(102, 126, 234, 0.2), 0 0 40px rgba(102, 126, 234, 0.05)'}}>
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 bg-black/60 border border-white/30 rounded-full text-white/90 text-sm">
              Usely Waitlist
            </div>
          </div>

          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in-up-delay">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Track your users.{' '}
              <span className="italic font-light bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                Save your margins.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Usely lets you monitor and control customer AI usage before it gets out of hand.
            </p>
          </div>

          <div className="w-full max-w-lg mx-auto animate-fade-in-up-delay-2">
            {!isSubmitted ? (
              <div>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-black/60 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300 text-base disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
                {error && (
                  <div className="mt-4 text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                {waitlistCount !== null && (
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                      {waitlistCount} amazing people waiting
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center animate-fade-in-scale">
                <div className="text-green-400 text-4xl mb-6">✓</div>
                <h2 className="text-3xl font-bold text-white mb-4">You're in</h2>
                <p className="text-gray-300 text-lg">
                  We'll notify you at <span className="text-white font-medium">{email}</span> when we launch.
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">
              Crafted by the Usely team
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="group bg-black/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 hover:bg-black/30 transition-all duration-500 hover:scale-105 transform">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real Time Monitoring</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Track AI usage patterns, costs, and user behavior in real time with detailed analytics and insights.
              </p>
            </div>

            <div className="group bg-black/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 hover:bg-black/30 transition-all duration-500 hover:scale-105 transform">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Cost Control</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Set usage limits, budgets, and alerts to prevent unexpected costs and keep your AI spending under control.
              </p>
            </div>

            <div className="group bg-black/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 hover:bg-black/30 transition-all duration-500 hover:scale-105 transform">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Automation</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Automatically throttle usage, notify users, and implement safeguards when limits are approached.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Why companies choose <span className="text-white">Us</span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-400 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">Prevent runaway AI costs that can destroy your margins</p>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-400 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">Get visibility into how your customers use AI features</p>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-400 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">Implement usage based pricing with confidence</p>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-400 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">Scale your AI features without scaling costs</p>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md border border-white/30 rounded-2xl p-10 group hover:bg-black/30 transition-all duration-500 hover:scale-105 transform">
              <h4 className="text-2xl font-semibold text-white mb-8">Perfect for</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-4 h-4 bg-blue-400 rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
                  <span className="text-gray-300 text-lg">SaaS companies with AI features</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-4 h-4 bg-purple-400 rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
                  <span className="text-gray-300 text-lg">Startups building AI powered products</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-4 h-4 bg-green-400 rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
                  <span className="text-gray-300 text-lg">Enterprises managing AI costs</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-4 h-4 bg-orange-400 rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
                  <span className="text-gray-300 text-lg">Teams using OpenAI, Anthropic, or similar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <a 
                href="https://x.com/uselydotdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group text-white/60 hover:text-white transition-colors duration-300"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <a 
                href="https://discord.gg/jNTHCjStaS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group text-white/60 hover:text-white transition-colors duration-300"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-gray-400 text-sm">
                © 2025 Usely. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 