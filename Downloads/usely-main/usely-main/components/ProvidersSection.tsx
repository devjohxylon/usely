import React from 'react';
import { ArrowRight } from 'lucide-react';

const providers = [
  { name: 'OpenAI', color: 'from-emerald-400 to-emerald-600' },
  { name: 'Anthropic', color: 'from-purple-400 to-purple-600' },
  { name: 'Mistral', color: 'from-blue-400 to-blue-600' },
  { name: 'Cohere', color: 'from-orange-400 to-orange-600' },
  { name: 'Groq', color: 'from-cyan-400 to-cyan-600' },
  { name: 'And more...', color: 'from-gray-400 to-gray-600' },
];

export default function ProvidersSection() {
  return (
    <section className="pt-20 pb-16 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Works with your favorite LLM providers
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Easily integrate with OpenAI, Anthropic, Mistral, and more — all from one endpoint.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="bg-[#111111] rounded-2xl p-4 md:p-6 aspect-square flex items-center justify-center border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg md:text-xl">
                      {provider.name === 'OpenAI' && 'O'}
                      {provider.name === 'Anthropic' && 'A'}
                      {provider.name === 'Mistral' && 'M'}
                      {provider.name === 'Cohere' && 'C'}
                      {provider.name === 'Groq' && 'G'}
                      {provider.name === 'And more...' && '+'}
                    </span>
                  </div>
                  
                  <p className="text-white font-medium text-sm md:text-base">
                    {provider.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm md:text-base font-medium transition-colors duration-300 group">
            View all providers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
} 