import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import StoreButtons from "./StoreButtons";
import homepage from "@/assets/homepage.png.asset.json";
import task from "@/assets/task-scheduler.png.asset.json";
import personalisation from "@/assets/personalisation.png.asset.json";
import onboarding from "@/assets/onboarding.png.asset.json";

const slides = [
  { src: homepage.url, alt: "CampusHut home screen" },
  { src: personalisation.url, alt: "Personalised dashboard" },
  { src: task.url, alt: "Task scheduler" },
  { src: onboarding.url, alt: "Onboarding profile setup" },
];

const HeroSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-28 pb-20 bg-gradient-to-br from-[#EAFFE9] via-white to-[#EAFFE9] overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      <div className="absolute top-20 -left-20 w-72 h-72 bg-campusGreen-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-campusGreen-200 shadow-sm mb-6"
              data-aos="fade-down"
            >
              <Sparkles className="w-4 h-4 text-campusGreen-600" />
              <span className="text-xs sm:text-sm font-medium text-campusGreen-700">
                Africa's AI-Powered Personalized Student Success Platform
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
              data-aos="fade-up"
            >
              Every Student Learns Differently.
              <br />
              <span className="text-campusGreen-600">So Should Your AI.</span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              CampusHut is an AI-powered student success platform that helps
              students at higher institutions study smarter, improve academic
              performance, and prepare for their future through personalized
              learning.
            </p>

            <div
              className="mt-8 flex justify-center lg:justify-start"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <StoreButtons className="!justify-start" size="lg" />
            </div>

            <p
              className="mt-6 text-sm text-gray-500"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Trusted by 10,000+ students across African universities.
            </p>
          </div>

          {/* Right: phone slider */}
          <div className="relative flex justify-center lg:justify-end" data-aos="fade-left">
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px]">
              <div className="absolute -inset-6 bg-campusGreen-400/20 rounded-[3rem] blur-3xl" />
              <div className="relative aspect-[9/18]">
                {slides.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === active
                        ? "w-6 bg-campusGreen-600"
                        : "w-2 bg-campusGreen-300 hover:bg-campusGreen-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
