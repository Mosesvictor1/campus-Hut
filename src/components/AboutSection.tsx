
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-r from-campusGreen-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering African Students with Smart Learning</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              CampusHut was born from the real challenges faced by African students. We understand the struggle of scattered academic resources, limited access to study materials, and the need for better organization tools.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded by students, for students, our mission is to democratize access to quality educational tools and create a connected campus community across Africa.
            </p>
            
            <div className="grid grid-cols-2 gap-36">
              <div className="text-center">
                <div className="text-3xl font-bold text-campusGreen-600">50K+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-campusGreen-600">100+</div>
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
