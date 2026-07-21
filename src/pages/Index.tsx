import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AdaptiveLearningSection from "@/components/AdaptiveLearningSection";
import HowItWorks from "@/components/HowItWorks";
import AILearningSection from "@/components/AILearningSection";
import StudentSuccessSection from "@/components/StudentSuccessSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
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
      <HeroSection />
      <ProblemSection />
      <AdaptiveLearningSection />
      <HowItWorks />
      <AILearningSection />
      <StudentSuccessSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      {showPopup && (
        <LaunchPopup
          playStoreUrl="https://play.google.com/store/apps/details?id=com.campushut.app"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Index;
