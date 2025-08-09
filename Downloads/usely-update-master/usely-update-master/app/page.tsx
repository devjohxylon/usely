'use client';

import React, { useState, useEffect } from 'react';
import { UselyScrollDemo } from '@/components/ui/usely-scroll-demo';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<number>(0);

  useEffect(() => {
    fetchWaitlistCount();
    checkPreviousSubmission();
  }, []);

  const fetchWaitlistCount = async () => {
    try {
      const response = await fetch('/api/waitlist/count');
      if (response.ok) {
        const data = await response.json();
        setWaitlistCount(data.count);
      }
    } catch (error) {
      setWaitlistCount(20);
    }
  };

  const checkPreviousSubmission = () => {
    const hasSubmittedBefore = localStorage.getItem('usely_ip_submitted');
    if (hasSubmittedBefore) {
      setHasSubmitted(true);
      return;
    }

    const sessionSubmitted = sessionStorage.getItem('usely_session_submitted');
    if (sessionSubmitted) {
      setHasSubmitted(true);
      return;
    }

    const lastSubmitTime = localStorage.getItem('usely_last_submit_time');
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime);
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setHasSubmitted(true);
        return;
      }
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailToSubmit = email.trim().toLowerCase();
    
    if (!emailToSubmit) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(emailToSubmit)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (hasSubmitted) {
      setError('You can only submit one email, I know you\'re excited!');
      return;
    }
    
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmission;
    
    if (timeSinceLastSubmission < 5000) {
      setError('Please wait 5 seconds between submissions.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    setLastSubmission(now);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToSubmit }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setHasSubmitted(true);
          setError('You can only submit one email, I know you\'re excited!');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setHasSubmitted(true);
      localStorage.setItem('usely_ip_submitted', 'true');
      sessionStorage.setItem('usely_session_submitted', 'true');
      localStorage.setItem('usely_last_submit_time', Date.now().toString());
      
      setSuccess('You\'ve been added to the waitlist! We\'ll notify you when we launch.');
      setIsSubmitted(true);
      setEmail('');
      setWaitlistCount(prev => prev !== null ? prev + 1 : 1);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#030303] to-[#0a0a0a] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with custom animations */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/6 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/2 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Moving particles */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-drift"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-drift-reverse"></div>
        <div className="absolute top-1/6 right-1/4 w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-drift-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400/35 rounded-full animate-drift-delayed"></div>
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/2 via-transparent to-purple-500/2 animate-gradient-shift-reverse"></div>
      </div>
      
      {/* Add the custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.5;
          }
          66% {
            transform: translateY(10px) translateX(-15px) scale(0.9);
            opacity: 0.4;
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(25px) translateX(-20px) scale(1.2);
            opacity: 0.6;
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(25px) rotate(180deg);
            opacity: 0.4;
          }
        }
        
        @keyframes drift {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-50px) translateX(30px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(-40px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(30px) translateX(20px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
        }
        
        @keyframes drift-reverse {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(40px) translateX(-30px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        
        @keyframes drift-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-25px) translateX(35px);
          }
          66% {
            transform: translateY(15px) translateX(-25px);
          }
        }
        
        @keyframes drift-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-35px) translateX(45px);
            opacity: 0.7;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.3;
            transform: rotate(0deg);
          }
          50% {
            opacity: 0.6;
            transform: rotate(180deg);
          }
        }
        
        @keyframes gradient-shift-reverse {
          0%, 100% {
            opacity: 0.2;
            transform: rotate(0deg) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: rotate(-180deg) scale(1.1);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-drift {
          animation: drift 10s ease-in-out infinite;
        }
        
        .animate-drift-reverse {
          animation: drift-reverse 8s ease-in-out infinite reverse;
          animation-delay: 1s;
        }
        
        .animate-drift-slow {
          animation: drift-slow 14s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animate-drift-delayed {
          animation: drift-delayed 11s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }
        
        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 25s ease-in-out infinite;
          animation-delay: 5s;
        }
      `}</style>
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        <header className="py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/uselylogo.png" alt="Usely" className="w-8 h-8" />
              <span className="text-xl font-bold">Usely</span>
            </div>
            <a 
              href="https://x.com/uselydotdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-white/20"
            >
              Contact
            </a>
          </div>
        </header>

        <main className="py-12 md:py-20">
          <div className="flex justify-center">
            <div className="max-w-2xl w-full space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center">
                  Track your users.{' '}
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-lg">
                    Save your margins.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed text-center">
                  Monitor and control customer AI usage before it gets out of hand.
                </p>
              </div>

              <div className="space-y-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                        className="flex-1 px-4 py-4 bg-black border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300 text-base disabled:opacity-50 shadow-lg shadow-white/5 focus:shadow-white/10"
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300 text-base disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] shadow-lg shadow-white/20 hover:shadow-white/30"
                      >
                        {isLoading ? 'Joining...' : 'Join Waitlist'}
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    {success && (
                      <p className="text-green-400 text-sm text-center">{success}</p>
                    )}
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-white/30">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">You're in!</h2>
                    <p className="text-gray-300">We'll notify you when we launch.</p>
                  </div>
                )}

                {waitlistCount && (
                  <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span> {waitlistCount} users have already joined, don't miss out!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <UselyScrollDemo />

        <section className="py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why companies choose Usely</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Prevent runaway AI costs and scale your features with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black rounded-xl p-8 space-y-4 border border-white/10 shadow-lg shadow-white/5 hover:shadow-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
              <p className="text-gray-300 leading-relaxed">
                Track AI usage patterns, costs, and user behavior in real-time with detailed analytics and insights.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 space-y-4 border border-white/10 shadow-lg shadow-white/5 hover:shadow-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Cost Control</h3>
              <p className="text-gray-300 leading-relaxed">
                Set usage limits, budgets, and alerts to prevent unexpected costs and keep your AI spending under control.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 space-y-4 border border-white/10 shadow-lg shadow-white/5 hover:shadow-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Smart Automation</h3>
              <p className="text-gray-300 leading-relaxed">
                Automatically throttle usage, notify users, and implement safeguards when limits are approached.
              </p>
            </div>

            <div className="bg-black rounded-xl p-8 space-y-4 border border-white/10 shadow-lg shadow-white/5 hover:shadow-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Usage-based Pricing</h3>
              <p className="text-gray-300 leading-relaxed">
                Implement fair pricing models based on actual AI usage with confidence and transparency.
              </p>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img src="/uselylogo.png" alt="Usely" className="w-6 h-6" />
              <span className="text-sm text-gray-300">© 2025 Usely. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="https://x.com/uselydotdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <a 
                href="https://discord.gg/jNTHCjStaS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 