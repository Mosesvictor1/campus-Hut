
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Brain, BookOpen, Users, Award } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "AI Study Assistant",
      description: "Let AI create personalized study courses for any topic",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop"
    },
    {
      title: "Smart CV Builder",
      description: "Build professional CVs with our intelligent templates", 
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=600&fit=crop"
    },
    {
      title: "Campus Community",
      description: "Connect with fellow students across African universities",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-campusGreen-50 via-white to-campusGreen-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Smart 
              <span className="text-campusGreen-600"> Campus</span> Companion
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              AI tools, study planners, CV builder & more — made specifically for African university students
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-8 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download on Play Store
              </Button>
              <Button variant="outline" className="border-campusGreen-600 text-campusGreen-600 hover:bg-campusGreen-50 px-8 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download on App Store
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-campusGreen-600" />
                <span>50K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-campusGreen-600" />
                <span>4.8★ Rating</span>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 animate-slide-in-right">
            <div className="relative">
              <div className="w-80 h-96 mx-auto bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                  <img
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-white font-semibold text-lg">{heroSlides[currentSlide].title}</h3>
                    <p className="text-white/90 text-sm mt-1">{heroSlides[currentSlide].description}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-campusGreen-500 text-white p-3 rounded-2xl animate-float">
                <Brain className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-2xl animate-float" style={{ animationDelay: '1s' }}>
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
