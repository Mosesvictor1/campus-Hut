import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div>
          <h2
            className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-10 sm:mb-14"
            data-aos="fade-up"
          >
            Empowering African Students with Smart Campus
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
          <div className="lg:w-1/2">
            <p
              className="text-base text-center md:text-start sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"
              data-aos="fade-right"
            >
              CampusHut is a next-generation edtech platform reimagining student
              life across tertiary institutions in Africa. We connect students
              to essential digital tools, career opportunities, and peer
              networks that enable academic success, personal growth, and career
              readiness.
            </p>
            <p
              className="text-base sm:text-lg text-center md:text-start  text-gray-600 mb-4 sm:mb-8 leading-relaxed"
              data-aos="fade-right"
            >
              From smart scheduling to internship access, our integrated
              solutions empower students while accelerating digital
              transformation within institutions. Built with deep insight into
              the African education ecosystem, CampusHut delivers locally
              relevant solutions that meet global standards.
            </p>
            <p
              className="text-base sm:text-lg text-center md:text-start  text-gray-600 mb-6 sm:mb-8 leading-relaxed"
              data-aos="fade-right"
            >
              Our mission is to build accessible, student-centered, innovative
              digital solutions that enhance academic success, expand
              opportunity, and simplify campus life across Africa.
            </p>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-1/2 w-full" data-aos="zoom-in">
            <div className="relative">
              <img
                src="assets/about3.jpg"
                alt="African students collaborating"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-[450px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-[#09d40698] via-[#09d4060a] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
