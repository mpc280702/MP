import React, { useState } from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';

export type NavRoute = 'home' | 'about' | 'services' | 'skills' | 'works' | 'contact';

interface NavbarProps {
  currentRoute?: NavRoute;
}

interface NavItem {
  name: string;
  key: NavRoute;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', key: 'home', href: '../index.html' },
  { name: 'About', key: 'about', href: 'about.html' },
  { name: 'Services', key: 'services', href: 'services.html' },
  { name: 'Skills', key: 'skills', href: 'about.html#skills' },
  { name: 'Works', key: 'works', href: 'selected-work.html' },
  { name: 'Contact', key: 'contact', href: 'contact.html' }
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute = 'home' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#04201A]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand identity & Subtitle */}
        <a
          href="../index.html"
          className="flex flex-col text-left group"
          onClick={handleLinkClick}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00DF89] animate-pulse"></span>
            <span className="font-extrabold tracking-wider text-base text-white group-hover:text-[#00DF89] transition-colors">
              {DESIGNER_INFO.name.toUpperCase()}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-[#B8D3CB] font-medium tracking-wide mt-0.5">
            Graphic Designer · Digital Creator
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                className={`transition-all py-1 border-b-2 ${
                  isActive
                    ? 'text-[#00DF89] border-[#00DF89]'
                    : 'text-[#B8D3CB] border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="contact.html"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] hover:scale-105 transition-all shadow-md shadow-[#00DF89]/20"
          >
            Liên Hệ
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="contact.html"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] transition-all"
          >
            Liên Hệ
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#B8D3CB] hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00DF89]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#04201A] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fade-in">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={handleLinkClick}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#00DF89]/15 text-[#00DF89] border border-[#00DF89]/30'
                    : 'text-[#B8D3CB] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
