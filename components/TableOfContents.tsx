'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
  activeId: string;
}

export default function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (headings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      className={cn(
        "fixed top-24 right-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-4",
        "hidden xl:block"
      )}
    >
      <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        On this page
      </h4>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-white",
              "flex items-center space-x-2 py-1",
              heading.level === 1 && "pl-0 font-medium",
              heading.level === 2 && "pl-4",
              heading.level === 3 && "pl-8",
              activeId === heading.id
                ? "text-white"
                : "text-white/60"
            )}
          >
            {heading.level > 1 && (
              <ChevronRight size={12} className="text-white/30" />
            )}
            <span className="truncate">{heading.title}</span>
          </a>
        ))}
      </nav>
    </motion.div>
  );
} 