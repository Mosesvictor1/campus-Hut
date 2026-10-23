import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { seoLandingPages } from "@/data/seoLandingPages";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#ai-learning", label: "AI Learning" },
  { href: "/#student-success", label: "Student Success" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeResourceDropdown = (e: React.MouseEvent) => {
    const details = (e.currentTarget as HTMLElement).closest("details");
    if (details) details.open = false;
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-green-50 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <div className=" rounded-lg flex items-center justify-center">
                  <img src="assets/logo.png" alt="CampusHut" className="w-20" />
                </div>
              </a>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-gray-700 hover:text-campusGreen-600 px-2 py-2 text-sm font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-1 px-2 py-2 text-sm font-medium text-gray-700 hover:text-campusGreen-600">
                  Student Resources
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="absolute right-0 top-full z-50 mt-2 max-h-80 w-80 overflow-y-auto border border-gray-200 bg-white py-2 shadow-lg">
                  {seoLandingPages.map((page) => (
                    <Link
                      key={page.slug}
                      to={`/${page.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-campusGreen-700"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </details>
              <a
                href="https://play.google.com/store/apps/details?id=com.campushut.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white rounded-full">
                  Download App
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600"
                >
                  {l.label}
                </a>
              ))}
              <details className="group px-3 py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between text-gray-700 hover:text-campusGreen-600">
                  Student Resources
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-2 max-h-64 space-y-1 overflow-y-auto border-l border-gray-200 pl-3">
                  {seoLandingPages.map((page) => (
                    <Link
                      key={page.slug}
                      to={`/${page.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-sm text-gray-700 hover:text-campusGreen-600"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </details>
              <a
                href="https://play.google.com/store/apps/details?id=com.campushut.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full mt-2 bg-campusGreen-600 hover:bg-campusGreen-700 text-white rounded-full">
                  Download App
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
