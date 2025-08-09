'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, easeOut, easeIn } from 'framer-motion';
import { Code, Copy, Check } from 'lucide-react';

// Language data with code examples
const languages = [
  {
    name: 'Python',
    code: `from usely import Usely

client = Usely(api_key="YOUR_API_KEY")
res = client.completions.create(
  model="gpt-4",
  prompt="Track this."
)`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'TypeScript',
    code: `import { Usely } from "usely-sdk";

const client = new Usely({ 
  apiKey: process.env.USELY_API_KEY 
});

const res = await client.completions.create({
  model: "gpt-4",
  prompt: "Hello Usely"
});`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'Next.js',
    code: `import { Usely } from "usely-sdk";

const client = new Usely({ 
  apiKey: process.env.USELY_API_KEY 
});

const res = await client.completions.create({
  model: "gpt-4",
  prompt: "Hello Usely"
});`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'cURL',
    code: `curl -X POST https://api.usely.com/v1/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "prompt": "Hello Usely"
  }'`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'Java',
    code: `import com.usely.Usely;

Usely client = new Usely("YOUR_API_KEY");
CompletionRequest request = CompletionRequest.builder()
  .model("gpt-4")
  .prompt("Hello Usely")
  .build();
CompletionResponse response = client.completions().create(request);`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'Rust',
    code: `use usely::Usely;

let client = Usely::new("YOUR_API_KEY");
let response = client.completions()
  .create(CompletionRequest {
    model: "gpt-4".to_string(),
    prompt: "Hello Usely".to_string(),
    ..Default::default()
  })?;`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'Go',
    code: `package main

import "github.com/usely/usely-go"

client := usely.NewClient("YOUR_API_KEY")
response, err := client.Completions.Create(&usely.CompletionRequest{
  Model:  "gpt-4",
  Prompt: "Hello Usely",
})`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'PHP',
    code: `$client = new Usely("YOUR_API_KEY");

$response = $client->completions->create([
  "model" => "gpt-4",
  "prompt" => "Hello Usely"
]);`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  },
  {
    name: 'Ruby',
    code: `require 'usely'

client = Usely.new(api_key: "YOUR_API_KEY")
res = client.completions.create(
  model: "gpt-4", 
  prompt: "Hello"
)`,
    syntax: {
      keyword: 'text-purple-400',
      string: 'text-red-400',
      function: 'text-blue-400',
      comment: 'text-gray-500',
      default: 'text-gray-300'
    }
  }
];

export default function IntegrationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  // Simple syntax highlighting using React components
  const SyntaxHighlightedCode = ({ code, syntax }: { code: string; syntax: any }) => {
    const lines = code.split('\n');
    
    const highlightLine = (line: string) => {
      const parts = [];
      let currentIndex = 0;
      
      // Keywords
      const keywordRegex = /\b(import|from|const|new|await|require|def|class|function|use|package|let|var|async)\b/g;
      let match;
      while ((match = keywordRegex.exec(line)) !== null) {
        // Add text before match
        if (match.index > currentIndex) {
          parts.push(
            <span key={`text-${currentIndex}`} className={syntax.default}>
              {line.slice(currentIndex, match.index)}
            </span>
          );
        }
        // Add highlighted keyword
        parts.push(
          <span key={`keyword-${match.index}`} className={syntax.keyword}>
            {match[0]}
          </span>
        );
        currentIndex = match.index + match[0].length;
      }
      
      // Functions and variables
      const functionRegex = /\b(Usely|client|res|response|request|completions)\b/g;
      while ((match = functionRegex.exec(line)) !== null) {
        if (match.index > currentIndex) {
          parts.push(
            <span key={`text-${currentIndex}`} className={syntax.default}>
              {line.slice(currentIndex, match.index)}
            </span>
          );
        }
        parts.push(
          <span key={`function-${match.index}`} className={syntax.function}>
            {match[0]}
          </span>
        );
        currentIndex = match.index + match[0].length;
      }
      
      // Strings (double quotes)
      const stringRegex = /"([^"]*)"/g;
      while ((match = stringRegex.exec(line)) !== null) {
        if (match.index > currentIndex) {
          parts.push(
            <span key={`text-${currentIndex}`} className={syntax.default}>
              {line.slice(currentIndex, match.index)}
            </span>
          );
        }
        parts.push(
          <span key={`string-${match.index}`} className={syntax.string}>
            {match[0]}
          </span>
        );
        currentIndex = match.index + match[0].length;
      }
      
      // Strings (single quotes)
      const singleQuoteRegex = /'([^']*)'/g;
      while ((match = singleQuoteRegex.exec(line)) !== null) {
        if (match.index > currentIndex) {
          parts.push(
            <span key={`text-${currentIndex}`} className={syntax.default}>
              {line.slice(currentIndex, match.index)}
            </span>
          );
        }
        parts.push(
          <span key={`string-${match.index}`} className={syntax.string}>
            {match[0]}
          </span>
        );
        currentIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (currentIndex < line.length) {
        parts.push(
          <span key={`text-${currentIndex}`} className={syntax.default}>
            {line.slice(currentIndex)}
          </span>
        );
      }
      
      return parts.length > 0 ? parts : [<span key="empty" className={syntax.default}>{line}</span>];
    };

    return (
      <code className="text-gray-300">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex}>
            {highlightLine(line)}
          </div>
        ))}
      </code>
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(languages[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: easeOut
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.2,
        ease: easeIn
      }
    }
  };

  return (
    <section className="pt-16 pb-16 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            variants={itemVariants}
          >
            <Code className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Integration</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Simple{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              integration
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Just change your API endpoint and keep your existing code. Works with any language or framework.
          </p>
        </motion.div>

        {/* Tabbed Code Interface */}
        <motion.div 
          className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl p-8 shadow-2xl border border-gray-800/50"
          variants={itemVariants}
        >
          {/* Language Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
            {languages.map((language, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative">
            {/* Code Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-mono">
                {languages[activeTab].name} Example
              </span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <motion.div 
              className="bg-[#0a0a0a] rounded-2xl p-6 border border-gray-800/30"
              variants={tabVariants}
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <pre className="font-mono text-sm md:text-base leading-relaxed overflow-x-auto whitespace-pre">
                <SyntaxHighlightedCode 
                  code={languages[activeTab].code} 
                  syntax={languages[activeTab].syntax} 
                />
              </pre>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm">
            Usely routes your request to the appropriate provider while tracking usage and performance across all languages and frameworks.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 