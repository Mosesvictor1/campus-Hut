// components/HeroSection.tsx

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Brain, BookOpen, Users, Award } from "lucide-react";
import Slider from "react-slick";
// import ComingSoonPopup from "./ComingSoonPopup"; // Adjust path if needed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ComingSoonPopup from "./ComingSoonPopup";

interface SlideType {
  title: string;
  description: string;
  image: string;
}

const HeroSection = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const heroSlides: SlideType[] = [
    {
      title: "AI Study Assistant",
      description: "Let AI create personalized study courses for any topic",
      image: "/assets/hero1.png",
    },
    {
      title: "Smart CV Builder",
      description: "Build professional CVs with our intelligent templates",
      image: "/assets/hero2.png",
    },
    {
      title: "Campus Community",
      description: "Connect with fellow students across African universities",
      image: "/assets/hero3.png",
    },
    {
      title: "Internship Hub",
      description: "Find real internships and job roles relevant to you",
      image: "/assets/hero4.png",
    },
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-green- to-green- bg-gray-800 overflow-hidden min-h-[740px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="mt-10 lg:mt-0 text-center lg:text-left animate-fade-in ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Smart <span className="text-orange-500">Campus</span> Companion
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              AI tools, study planners, CV builder & more — made specifically for African university students
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                onClick={() => setShowPopup(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Download on Play Store
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 border-2 bg-transparent text-white hover:bg-orange-600 hover:text-white px-6 sm:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg"
                onClick={() => setShowPopup(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Download on App Store
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start items-center gap-6 text-sm text-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-500" />
                <span>50K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>4.8★ Rating</span>
              </div>
            </div>
          </div>

          {/* Right Slider */}
          <div className="w-full flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative w-full max-w-[500px] sm:max-w-[520px] md:max-w-[560px] p-2 rounded-3xl">
              <div className="slider-container rounded-2xl overflow-hidden">
                <Slider ref={sliderRef} {...settings}>
                  {heroSlides.map((slide, index) => (
                    <div key={index}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 bg-campusGreen-500 text-white p-3 rounded-2xl animate-float">
                <Brain className="w-6 h-6" />
              </div>
              <div
                className="absolute bottom-12 -left-4 bg-blue-500 text-white p-3 rounded-2xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showPopup && <ComingSoonPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default HeroSection;
