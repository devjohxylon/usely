'use client';

import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-white/10 rounded-md transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div className="ml-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">Privacy Policy</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your privacy is fundamental to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Information We Collect */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Usage Data</h3>
              <p className="text-gray-400 mb-4">
                We collect usage data to provide our AI usage tracking and billing services:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Token usage (input/output counts)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>AI provider and model information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Cost and pricing data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>User identifiers (as provided by you)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Metadata for analytics and billing</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
              <p className="text-gray-400 mb-4">
                When you create an account, we collect:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Email address</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Company name (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Billing information (processed by Stripe)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* What We Don't Collect */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">What We Don't Collect</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Conversation Content</h3>
              <p className="text-gray-400 mb-4">
                We <strong className="text-white">never</strong> collect, store, or process:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Chat messages or conversation content</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>User prompts or AI responses</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Personal or sensitive information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>File contents or documents</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">How We Use Information</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide usage tracking and analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Process billing and payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Improve our services and features</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Send service-related communications</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Data Security</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>End-to-end encryption for all data in transit</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>AES-256 encryption for data at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Secure API key management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Compliance with SOC 2 Type II standards</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Data Retention</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                We retain your data for as long as necessary to provide our services:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Usage data:</strong> Retained for 7 years for billing and compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Account data:</strong> Retained until account deletion</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Analytics data:</strong> Aggregated and anonymized after 2 years</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Access:</strong> Request a copy of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Correction:</strong> Update or correct your information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Deletion:</strong> Request deletion of your account and data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white">Portability:</strong> Export your data in a standard format</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span><strong className="text-white">Email:</strong> privacy@usely.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span><strong className="text-white">Support:</strong> support@usely.dev</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 