import React from "react";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onClose?: () => void;
}

const ComingSoonBanner: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative animate-fade-in transition-all duration-300">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700 mb-3 sm:mb-4">
          🚀 Launching Soon!
        </h2>

        {/* Description */}
        <p className="text-center text-sm sm:text-base text-gray-700 mb-5">
          CampusHut is almost here! Get ready to experience the future of campus life.
        </p>

        {/* Email Input + Button */}
        <form className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full rounded-full px-5 py-3 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm sm:text-base">
            <Mail className="w-4 h-4 mr-2" />
            Notify Me
          </Button>
        </form>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-center text-gray-500">
          No spam. We'll just let you know when we go live. 💌
        </p>
      </div>
    </div>
    
  );
};

export default ComingSoonBanner;
