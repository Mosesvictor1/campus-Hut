
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DownloadSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-campusGreen-600 to-campusGreen-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Ready to Transform Your Campus Experience?</h2>
        <p className="text-xl mb-8 text-campusGreen-100" data-aos="fade-up">Join over 50,000 students already using CampusHut</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button className="bg-white text-campusGreen-600 hover:bg-gray-100 px-8 py-4 text-lg" data-aos="zoom-out-right">
            <Download className="w-5 h-5 mr-2" />
            Download on Play Store
          </Button>
          <Button variant="outline" className="border-white text-green-600 hover:bg-white hover:text-campusGreen-600 px-8 py-4 text-lg" data-aos="zoom-out-left">
            <Download className="w-5 h-5 mr-2" />
            Download on App Store
          </Button>
        </div>

        <div className="bg-white p-6 rounded-2xl inline-block" data-aos="zoom-in">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">QR Code</span>
          </div>
          <p className="text-gray-600 mt-2 text-sm">Scan to download</p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
