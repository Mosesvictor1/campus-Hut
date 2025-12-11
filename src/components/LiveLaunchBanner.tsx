import React, { useState, useEffect } from "react";
import { X, Smartphone, Download, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  playStoreUrl?: string;
  onClose?: () => void;
}

const LaunchPopup: React.FC<Props> = ({
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.campushut.app",
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Show popup after a short delay for better UX
    const showTimer = setTimeout(() => setIsVisible(true), 800);
    
    // Generate confetti
    const confettiArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(confettiArray);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      
      {/* Popup Container */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 overflow-y-auto ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div 
          className={`relative bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transition-all duration-500 transform my-8 ${
            isVisible ? "scale-100 translate-y-0" : "scale-90 translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Confetti Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((item) => (
              <div
                key={item.id}
                className="absolute w-2 h-2 rounded-full animate-fall"
                style={{
                  left: `${item.left}%`,
                  top: '-10px',
                  backgroundColor: ['#10b981', '#059669', '#34d399', '#fbbf24', '#f59e0b'][Math.floor(Math.random() * 5)],
                  animationDelay: `${item.delay}s`,
                  animationDuration: `${item.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative p-6 sm:p-8 md:p-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-bounce">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>NOW LIVE</span>
            </div>

            {/* Main Content */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                CampusHut is on
                <span className="block text-green-600 mt-1">Google Play! 🎉</span>
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                Join thousands of students already connecting, sharing, and thriving on campus. 
                Download now and be part of your vibrant campus community!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur p-3 sm:p-4 rounded-xl border border-green-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-gray-900">Campus Feed</div>
                  <div className="text-gray-500">Stay connected</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur p-3 sm:p-4 rounded-xl border border-green-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-gray-900">Events</div>
                  <div className="text-gray-500">Never miss out</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur p-3 sm:p-4 rounded-xl border border-green-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-gray-900">Resources</div>
                  <div className="text-gray-500">Access anywhere</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group">
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download Now - It's Free!
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <span className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white" />
                </span>
                Join 1,000+ students already on CampusHut
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-30" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}} />
    </>
  );
};

export default LaunchPopup;