import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProvidersSection from '../components/ProvidersSection';
import OrchestrationSection from '../components/OrchestrationSection';
import IntegrationSection from '../components/IntegrationSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-[95vh]">
      <Navbar />
      <HeroSection />
      <ProvidersSection />
      <OrchestrationSection />
      <IntegrationSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
} 