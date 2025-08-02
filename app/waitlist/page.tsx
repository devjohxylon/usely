'use client';

import React, { useState } from 'react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() > 0.8 ? 'w-1 h-1 bg-white/60' : 
          Math.random() > 0.6 ? 'w-0.5 h-0.5 bg-white/40' : 'w-0.5 h-0.5 bg-white/20',
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2
  }));

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.size} animate-pulse`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
      }}></div>

      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/15 via-cyan-500/10 to-transparent rounded-full blur-2xl animate-float-slower"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500/8 via-purple-500/8 to-pink-500/8 rounded-full blur-2xl animate-rotate-slow"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-black/60 border border-white/30 rounded-full text-white/90 text-sm backdrop-blur-md shadow-2xl">
            Usely Waitlist
          </div>
        </div>

        <div className="text-center mb-16 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            Track your users.{' '}
            <span className="italic font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Save your margins.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Usely lets you monitor and control customer AI usage before it gets out of hand.
          </p>
        </div>

        <div className="w-full max-w-lg animate-fade-in-up-delay-2">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-black/60 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300 backdrop-blur-md shadow-xl"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="text-center animate-fade-in-scale">
              <div className="text-green-400 text-3xl mb-6">✓</div>
              <h2 className="text-3xl font-bold text-white mb-4">You're in!</h2>
              <p className="text-gray-300 text-lg">
                We'll notify you at <span className="text-white font-medium">{email}</span> when we launch.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center animate-fade-in-delay">
          <p className="text-gray-400 text-sm">
            Crafted by the Usely team
          </p>
        </div>
      </div>
    </div>
  );
} 