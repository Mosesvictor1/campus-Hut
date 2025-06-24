import React from "react";
import {
  Smartphone,
  Users,
  Target,
  Brain,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Download",
      description: "Get CampusHut from Play Store or App Store",
      icon: Smartphone,
    },
    {
      step: 2,
      title: "Register",
      description: "Create your account with School details",
      icon: Users,
    },
    {
      step: 3,
      title: "Choose Topic",
      description: "Select any subject or topic you want to study",
      icon: Target,
    },
    {
      step: 4,
      title: "AI Magic",
      description: "Let AI generate personalized study courses",
      icon: Brain,
    },
    {
      step: 5,
      title: "Learn & Grow",
      description: "Track progress and build your CV",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-16 bg-[#EAFFE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">
            How Campus<span className="text-orange-500">Hut</span>  Works
          </h2>
          <p className="text-xl text-gray-600" data-aos="fade-up">
            Get started in just a few simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {steps.map((item, index) => (
            <div
              key={index}
              className="text-center relative"
              data-aos="zoom-in"
              data-aos-delay={`${(item.step % 3) * 100}`}
            >
              <div className="w-20 h-20 bg-campusGreen-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold shadow-lg">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>

              {index < 4 && (
                <ChevronRight className="w-6 h-6 text-campusGreen-400 absolute top-8 -right-4 hidden lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
