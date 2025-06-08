import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-r from-campusGreen-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Empowering African Students with Smart Campus{" "}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              CampusHut was built to transform the student experience across
              Africa beyond just academics. We understand the struggle of
              scattered resources, limited learning support, and lack of access
              to real career opportunities.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              That's why we created an all-in-one platform that offers
              everything from smart study tools and assignment reminders to a
              student-focused marketplace and verified internship opportunities.
            </p>
            <p  className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to create accessible, innovative, and
              student-centric solutions that enhance academic performance,
              unlock life-changing opportunities, and simplify campus life
              through technology.
            </p>

            <div className="grid grid-cols-2 gap-36">
              <div className="text-center">
                <div className="text-3xl font-bold text-campusGreen-600">
                  50K+
                </div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-campusGreen-600">
                  100+
                </div>
                <div className="text-gray-600">Universities</div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="relative">
              <img
                src="assets/about2.jpg"
                alt="African students collaborating"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-campusGreen-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
