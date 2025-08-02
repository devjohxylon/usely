'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <nav className={`hidden md:block transition-all duration-300 ease-in-out pointer-events-auto ${
          isScrolled ? 'mt-4' : 'mt-6'
        }`}>
          <div className={`bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 rounded-2xl transition-all duration-300 ease-in-out ${
            isScrolled ? 'px-6 py-3' : 'px-8 py-4'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a 
                  href="/" 
                  className={`font-bold text-[#e5e5e5] hover:text-white transition-all duration-200 ${
                    isScrolled ? 'text-lg' : 'text-xl'
                  }`}
                >
                  Usely
                </a>
              </div>

              <div className="flex items-center space-x-8">
                <a 
                  href="/docs" 
                  className={`font-medium text-[#e5e5e5] hover:text-white transition-all duration-200 ${
                    isScrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  Docs
                </a>
                <a 
                  href="/docs/api" 
                  className={`font-medium text-[#e5e5e5] hover:text-white transition-all duration-200 ${
                    isScrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  API
                </a>
                <a 
                  href="#pricing" 
                  className={`font-medium text-[#e5e5e5] hover:text-white transition-all duration-200 ${
                    isScrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  Pricing
                </a>
                <a 
                  href="https://github.com/usely-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`font-medium text-[#e5e5e5] hover:text-white transition-all duration-200 flex items-center gap-1 ${
                    isScrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  <Github className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} transition-all duration-200`} />
                  GitHub
                </a>
                
                <a 
                  href="#get-started" 
                  className={`bg-white text-[#0a0a0a] font-semibold rounded-full transition-all duration-200 flex items-center gap-2 group hover:bg-[#f5f5f5] hover:shadow-lg hover:shadow-white/20 ${
                    isScrolled ? 'px-5 py-2 text-sm' : 'px-6 py-3 text-base'
                  }`}
                >
                  Get Started
                  <ArrowRight className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} group-hover:translate-x-1 transition-transform duration-200`} />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <nav className="md:hidden pointer-events-auto">
          <div className={`bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 rounded-2xl transition-all duration-300 ease-in-out ${
            isScrolled ? 'mt-4 px-6 py-3' : 'mt-6 px-6 py-4'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a 
                  href="/" 
                  className={`font-bold text-[#e5e5e5] hover:text-white transition-all duration-200 ${
                    isScrolled ? 'text-lg' : 'text-xl'
                  }`}
                >
                  Usely
                </a>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#e5e5e5] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl overflow-hidden">
              <div className="px-6 py-6 space-y-4">
                <a 
                  href="/docs" 
                  className="block text-base font-medium text-[#e5e5e5] hover:text-white transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Docs
                </a>
                <a 
                  href="/docs/api" 
                  className="block text-base font-medium text-[#e5e5e5] hover:text-white transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  API
                </a>
                <a 
                  href="#pricing" 
                  className="block text-base font-medium text-[#e5e5e5] hover:text-white transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="https://github.com/usely-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-base font-medium text-[#e5e5e5] hover:text-white transition-colors duration-200 py-2 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                
                <div className="pt-4 border-t border-white/10">
                  <a 
                    href="#get-started" 
                    className="block bg-white text-[#0a0a0a] px-6 py-3 rounded-full text-base font-semibold hover:bg-[#f5f5f5] transition-all duration-200 text-center flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
} 