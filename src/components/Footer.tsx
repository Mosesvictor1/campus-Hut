import React from "react";
import { BookOpen, Instagram, Facebook, Linkedin} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {

// Custom TikTok Icon that matches Lucide's default styling
const TiktokIcon = ({ size = 30, ...props }) => (
  <svg
    xmlns="http://w3.org"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-campusGreen-500 rounded-lg flex items-center justify-center">
                <img src="icons.png" alt="" />
              </div>
              <span className="ml-2 text-xl font-bold">CampusHut</span>
            </div>
            <p className="text-gray-400 mb-4">
              Africa's AI-powered personalized student success platform that helps students at higher institutions study smarter, improve academic outcomes, and prepare for their future
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/campushut_?igsh=MWs1ZTVtZ29hdGg5cQ"
                target="_blank"
                className="text-gray-400 hover:text-campusGreen-400"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1BnLaYDnEd/"
                target="_blank"
                className="text-gray-400 hover:text-campusGreen-400"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/campushut-limited/"
                target="_blank"
                className="text-gray-400 hover:text-campusGreen-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@campushutapp?_r=1&_t=ZS-98Fp6gaT73c"
                target="_blank"
                className="text-gray-400 hover:text-campusGreen-400"
              >
                <TiktokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#home" className="hover:text-campusGreen-400">Home</a></li>
              <li><a href="/#how-it-works" className="hover:text-campusGreen-400">How It Works</a></li>
              <li><a href="/#ai-learning" className="hover:text-campusGreen-400">AI Learning</a></li>
              <li><a href="/#student-success" className="hover:text-campusGreen-400">Student Success</a></li>
              <li><a href="/blog" className="hover:text-campusGreen-400">Blog</a></li>
              <li><a href="/#contact" className="hover:text-campusGreen-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">AI Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#ai-features" className="hover:text-campusGreen-400">AI Study Assistant</a></li>
              <li><a href="/#ai-features" className="hover:text-campusGreen-400">AI Course Generator</a></li>
              <li><a href="/#ai-features" className="hover:text-campusGreen-400">AI Flashcards & Quizzes</a></li>
              <li><a href="/#ai-features" className="hover:text-campusGreen-400">Smart Study Planner</a></li>
              <li><a href="/#ai-features" className="hover:text-campusGreen-400">Assignment Reminder</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-campusGreen-400"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-campusGreen-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          <div className=" w-60 rounded-lg mt-4">
            <img src="NDPR.png" alt="" />
          </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2026 CampusHut. All rights reserved. Made with ❤️ for African
            students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
