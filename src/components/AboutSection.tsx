import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div>
          <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-10 sm:mb-14" data-aos="fade-up">
            Empowering African Students with Smart Campus
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
          <div className="lg:w-1/2">
            <p className="text-base text-center md:text-start sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed" data-aos="fade-right">
              CampusHut was built to transform the student experience across
              Africa beyond just academics. We understand the struggle of
              scattered resources, limited learning support, and lack of access
              to real career opportunities.
            </p>
            <p className="text-base sm:text-lg text-center md:text-start  text-gray-600 mb-4 sm:mb-8 leading-relaxed" data-aos="fade-right">
              That's why we created an all-in-one platform that offers
              everything from smart study tools and assignment reminders to a
              student-focused marketplace and verified internship opportunities.
            </p>
            <p className="text-base sm:text-lg text-center md:text-start  text-gray-600 mb-6 sm:mb-8 leading-relaxed" data-aos="fade-right">
              Our mission is to create accessible, innovative, and
              student-centric solutions that enhance academic performance,
              unlock life-changing opportunities, and simplify campus life
              through technology.
            </p>

            <div className="grid grid-cols-2 gap-8 md:gap-20 lg:gap-36 mt-8">
              <div className="text-center" data-aos="fade-up">
                <div className="text-2xl sm:text-3xl font-bold text-campusGreen-600">
                  50K+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Active Students
                </div>
              </div>
              <div className="text-center" data-aos="fade-up">
                <div className="text-2xl sm:text-3xl font-bold text-campusGreen-600">
                  100+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Universities
                </div>
              </div>
            </div>
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
