import React from "react";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.campushut.app";
const APP_STORE_URL = "https://apps.apple.com/app/campushut";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const StoreButtons: React.FC<Props> = ({ className = "", size = "md" }) => {
  const sizing =
    size === "lg"
      ? "h-14 px-5 text-base"
      : size === "sm"
      ? "h-11 px-4 text-xs"
      : "h-12 px-4 text-sm";

  return (
    <div className={`flex flex-col sm:flex-row gap-3 items-center justify-center ${className}`}>
      <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
        <div
          className={`${sizing} inline-flex items-center gap-3 rounded-2xl bg-black text-white hover:bg-gray-900 transition-colors shadow-lg`}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
            <path fill="#EA4335" d="M3.6 2.3C3.2 2.6 3 3.1 3 3.8v16.5c0 .6.2 1.1.6 1.5l9.1-9.4-9.1-10z"/>
            <path fill="#FBBC04" d="m16.8 8.5-3-1.7L3.6 2.3l9.1 10 4.1-3.8z"/>
            <path fill="#34A853" d="M3.6 21.8c.5.4 1.2.4 1.9.1l11.3-6.5-4.1-3.9-9.1 10.3z"/>
            <path fill="#4285F4" d="m20.4 10.9-3.6-2.4L12.7 12l4.1 3.9 3.6-2c1.2-.7 1.2-2.4 0-3z"/>
          </svg>
          <div className="text-left leading-tight">
            <div className="text-[10px] opacity-80">GET IT ON</div>
            <div className="font-semibold">Google Play</div>
          </div>
        </div>
      </a>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
        <div
          className={`${sizing} inline-flex items-center gap-3 rounded-2xl bg-black text-white hover:bg-gray-900 transition-colors shadow-lg`}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
            <path d="M16.365 1.43c0 1.14-.42 2.22-1.14 3-.78.86-2.04 1.52-3.06 1.44-.12-1.1.42-2.24 1.14-3 .8-.86 2.16-1.5 3.06-1.44zM20.5 17.44c-.55 1.28-.82 1.85-1.54 2.98-1 1.58-2.41 3.55-4.16 3.57-1.55.02-1.95-1.01-4.05-1-2.1.01-2.55 1.02-4.1 1-1.75-.02-3.08-1.8-4.08-3.38C.14 17.7-.16 12.9 1.36 10.15c1.08-1.96 2.79-3.2 4.4-3.2 1.63 0 2.66 1.02 4.02 1.02 1.32 0 2.13-1.02 4.02-1.02 1.43 0 2.94.78 4.02 2.13-3.53 1.94-2.95 6.99.68 8.36z"/>
          </svg>
          <div className="text-left leading-tight">
            <div className="text-[10px] opacity-80">Download on the</div>
            <div className="font-semibold">App Store</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default StoreButtons;
