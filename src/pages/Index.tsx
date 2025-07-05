import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuickOverview from "@/components/QuickOverview";
import AboutSection from "@/components/AboutSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import DownloadSection from "@/components/DownloadSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import ComingSoonBanner from "@/components/ComingSoonBanner";
const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);
  return (
    <div
      className="min-h-screen bg-white font-inter overflow-x-hidden"
      id="home"
    >
      <Navigation />
      <HeroSection />
      <QuickOverview />
      <AboutSection />
      <FeaturesOverview />
      <HowItWorks />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <DownloadSection />
      <FAQSection />
      <ContactSection />
      {showBanner && <ComingSoonBanner onClose={() => setShowBanner(false)} />}
      <Footer />
    </div>
  );
};

export default Index;
