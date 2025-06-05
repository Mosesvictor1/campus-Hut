
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-campusGreen-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">CampusHut</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
              <a href="#pricing" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
              <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
                Download App
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">Features</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">About</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">Pricing</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">Contact</a>
              <Button className="w-full mt-2 bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
                Download App
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
