
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import QuickOverview from '@/components/QuickOverview';
import AboutSection from '@/components/AboutSection';
import FeaturesOverview from '@/components/FeaturesOverview';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import DownloadSection from '@/components/DownloadSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      <HeroSection />
      <QuickOverview />
      <AboutSection />
      <FeaturesOverview />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <DownloadSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
