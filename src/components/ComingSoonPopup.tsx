// components/ComingSoonPopup.tsx

import React from "react";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
}

const ComingSoonPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-4">
          🚀 Coming Soon!
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-700 mb-6">
          The CampusHut app will be available soon on Play Store & App Store.
          Enter your email to get notified when we launch!
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full">
            <Mail className="w-4 h-4 mr-2" />
            Notify Me
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ComingSoonPopup;
