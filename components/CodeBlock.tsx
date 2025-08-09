'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  language: string;
  className?: string;
}

export default function CodeBlock({ children, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const textContent = typeof children === 'string' ? children : String(children);
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      typescript: 'text-blue-400',
      javascript: 'text-yellow-400',
      bash: 'text-green-400',
      html: 'text-orange-400',
      css: 'text-pink-400',
      json: 'text-purple-400',
      python: 'text-blue-400',
      go: 'text-cyan-400',
      rust: 'text-orange-400',
      sql: 'text-blue-400',
    };
    return colors[lang.toLowerCase()] || 'text-white/30';
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute top-3 right-3 flex items-center space-x-2">
        <span className={cn("text-xs uppercase tracking-wider", getLanguageColor(language))}>
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} className="text-white/50" />
          )}
        </button>
      </div>
      <pre className="bg-gray-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-white/90 font-mono leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  );
} 