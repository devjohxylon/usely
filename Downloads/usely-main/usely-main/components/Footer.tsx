import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-16 pb-16 px-6 md:px-12 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Left Section - Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-[#e5e5e5] mb-2">
              Usely
            </h3>
            <p className="text-sm text-[#a0a0a0] text-center md:text-left">
              AI usage metering & billing
            </p>
          </div>

          {/* Center Section - Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
              <li>
                <a 
                  href="/docs" 
                  className="text-sm text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                >
                  Docs
                </a>
              </li>
              <li>
                <a 
                  href="/docs/api" 
                  className="text-sm text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                >
                  API
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/usely-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-sm text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-sm text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                >
                  Terms
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Section - Social & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/usely-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/usely_ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/usely-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#a0a0a0] hover:text-[#e5e5e5] transition-colors duration-200 focus:outline-none focus:text-[#e5e5e5]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#a0a0a0] text-center md:text-right">
              © 2025 Usely. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 