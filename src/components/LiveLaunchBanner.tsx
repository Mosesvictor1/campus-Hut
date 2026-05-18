import React, { useState, useEffect } from "react";
import { X, Smartphone, Download, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  playStoreUrl?: string;
  appStoreUrl?: string;
  onClose?: () => void;
}

const LaunchPopup: React.FC<Props> = ({
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.campushut.app",
  appStoreUrl = "https://apps.apple.com/ng/app/campushut-student-app/id6755047066",
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: number; delay: number; duration: number }>
  >([]);

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
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 overflow-y-auto ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
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
                  top: "-10px",
                  backgroundColor: [
                    "#10b981",
                    "#059669",
                    "#34d399",
                    "#fbbf24",
                    "#f59e0b",
                  ][Math.floor(Math.random() * 5)],
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
                <span className="block text-green-600 mt-1">
                  Google Play & App Store! 🎉
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                Join thousands of students already connecting, sharing, and
                thriving on campus. Download now and be part of your vibrant
                campus community!
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Google Play Button */}
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group border border-gray-700">
                  {/* Google Play Icon */}
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.18 23.76C3.06 23.7 3 23.58 3 23.4V0.6C3 0.42 3.06 0.3 3.18 0.24L3.24 0.18L13.14 10.08V10.2L3.24 20.1L3.18 23.76Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M16.5 13.44L13.14 10.08V9.96L16.5 6.6L16.56 6.66L20.52 8.94C21.66 9.6 21.66 10.68 20.52 11.34L16.56 13.38L16.5 13.44Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M16.56 13.38L13.14 10.08L3.18 23.76C3.54 24.06 4.08 24.12 4.68 23.76L16.56 13.38Z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.18 0.24C3.54 -0.06 4.08 0 4.68 0.36L16.56 6.66L13.14 10.08L3.18 0.24Z"
                      fill="#4285F4"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-gray-400 font-normal">
                      GET IT ON
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      Google Play
                    </div>
                  </div>
                </button>
              </a>

              {/* App Store Button */}
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group border border-gray-700">
                  {/* Apple Icon */}
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-gray-400 font-normal">
                      DOWNLOAD ON THE
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      App Store
                    </div>
                  </div>
                </button>
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />
    </>
  );
};

export default LaunchPopup;
