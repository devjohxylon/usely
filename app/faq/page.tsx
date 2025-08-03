'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import FAQSection from '../../components/FAQSection';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';

export default function FAQPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <main className="min-h-[95vh]">
      <Navbar 
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />
      <div className="pt-20">
        <FAQSection />
      </div>
      <Footer />
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </main>
  );
} 