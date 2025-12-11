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
import LaunchPopup from "@/components/LiveLaunchBanner";

const Index = () => {
  const [showPopup, setShowPopup] = useState(true);
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
       {showPopup && (
        <LaunchPopup
          playStoreUrl="https://play.google.com/store/apps/details?id=com.campushut.app"
          onClose={() => setShowPopup(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default Index;
