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
        console.error('Error fetching waitlist count:', err);
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

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[500px] bg-gradient-to-r from-blue-400/15 via-cyan-400/10 to-blue-500/15 rounded-full blur-2xl animate-float-slow opacity-80 scale-110"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
        <div className="bg-black/20 rounded-3xl p-6 md:p-8 lg:p-12 max-w-4xl w-full shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in" style={{boxShadow: '0 0 30px rgba(102, 126, 234, 0.3), 0 0 60px rgba(102, 126, 234, 0.1)'}}>
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
    </div>
  );
} 