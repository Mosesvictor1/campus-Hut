
import React from 'react';
import { BookOpen, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-campusGreen-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold">CampusHut</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering African students with smart learning tools and AI-powered study assistance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-campusGreen-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-campusGreen-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-campusGreen-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-campusGreen-400">Home</a></li>
              <li><a href="#about" className="hover:text-campusGreen-400">About</a></li>
              <li><a href="#features" className="hover:text-campusGreen-400">Features</a></li>
              <li><a href="#pricing" className="hover:text-campusGreen-400">Pricing</a></li>
              <li><a href="#contact" className="hover:text-campusGreen-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-campusGreen-400">AI Study Assistant</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">CV Builder</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">Schedule Manager</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">Campus News</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-campusGreen-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-campusGreen-400">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CampusHut. All rights reserved. Made with ❤️ for African students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
