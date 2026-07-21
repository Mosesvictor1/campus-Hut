import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative pt-28 pb-20 bg-gradient-to-br from-[#EAFFE9] via-white to-[#EAFFE9] overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-campusGreen-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-campusGreen-200 shadow-sm mb-6"
            data-aos="fade-down"
          >
            <Sparkles className="w-4 h-4 text-campusGreen-600" />
            <span className="text-xs sm:text-sm font-medium text-campusGreen-700">
              Africa's AI-Powered Personalized Student Success Platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            data-aos="fade-up"
          >
            Every Student Learns Differently.
            <br />
            <span className="text-campusGreen-600">So Should Your AI.</span>
          </h1>

          {/* Supporting text */}
          <p
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            CampusHut is an AI-powered student success platform that helps
            students at higher institutions study smarter, improve academic
            performance, and prepare for their future through personalized
            learning.
          </p>

          {/* CTA */}
          <div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.campushut.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-8 py-6 text-base sm:text-lg rounded-full shadow-lg shadow-campusGreen-600/30">
                <Download className="w-5 h-5 mr-2" />
                Download App
              </Button>
            </a>
          </div>

          {/* Trust line */}
          <p
            className="mt-6 text-sm text-gray-500"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Trusted by 10,000+ students across African universities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
