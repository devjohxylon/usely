'use client';

import React from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
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
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">Terms of Service</h1>
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
            <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These terms govern your use of our AI usage tracking and billing services.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Acceptance of Terms */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400">
                By accessing or using our services, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Service Description</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                We provide AI usage tracking and billing services that allow you to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Track token usage across multiple AI providers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Monitor costs and performance metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Implement usage-based billing for your customers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Access analytics and reporting tools</span>
                </li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                You are responsible for:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Providing accurate and complete information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Maintaining the security of your API keys and account</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complying with all applicable laws and regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Not using our services for illegal or harmful purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Paying all fees associated with your usage</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Prohibited Uses</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                You may not use our services to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Violate any applicable laws or regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Infringe on intellectual property rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Transmit malicious code or attempt to breach security</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfere with or disrupt our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Attempt to reverse engineer our systems</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Billing and Payment */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Billing and Payment</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Terms</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fees are billed monthly based on your usage</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Payment is processed through Stripe</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Unpaid accounts may be suspended or terminated</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>All fees are non-refundable unless required by law</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Privacy and Data</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                Your privacy is important to us. Our data practices are governed by our Privacy Policy, 
                which is incorporated into these terms by reference.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We only collect usage data, never conversation content</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>All data is encrypted and securely stored</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We comply with applicable data protection laws</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Service Availability</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                We strive to maintain high service availability but cannot guarantee:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>100% uptime or uninterrupted service</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Immediate resolution of all issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Compatibility with all third-party services</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                Our services, including all software, APIs, and documentation, are protected by 
                intellectual property laws. You retain ownership of your data and content.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>You grant us a license to process your data for service provision</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We may use anonymized data for service improvement</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>You may not copy, modify, or distribute our software</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We are not liable for indirect, incidental, or consequential damages</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Our total liability is limited to the amount you paid in the 12 months prior</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We are not responsible for third-party service disruptions</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Termination</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                Either party may terminate these terms:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>You may cancel your account at any time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We may terminate for violation of these terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Upon termination, your access will be revoked</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We will delete your data within 30 days</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400">
                We may update these terms from time to time. We will notify you of any material changes 
                via email or through our service. Your continued use after changes constitutes acceptance 
                of the new terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            
            <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-gray-800/50 rounded-lg p-6">
              <p className="text-gray-400 mb-4">
                If you have questions about these terms, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span><strong className="text-white">Email:</strong> legal@usely.dev</span>
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