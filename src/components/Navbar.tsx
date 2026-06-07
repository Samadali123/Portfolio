'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();


  // Add scroll listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);




  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${isScrolled || isMobileMenuOpen
        ? 'bg-[#d3d3d3]/95 backdrop-blur-lg shadow-lg shadow-gray-900/20'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-gray-900 leading-4.5">ASG <br /> Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${pathname === link.path
                  ? 'theme-text-secondary border-b-theme-secondary'
                  : 'text-gray-700 border-b-transparent hover:theme-text-secondary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact#appointment"
              className="px-6 py-2.5 theme-bg-secondary text-white rounded-3xl font-medium shadow-lg theme-shadow-secondary hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>




      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`md:hidden fixed left-0 right-0 top-20 z-[65] h-[calc(100dvh-5rem)] bg-[#0b251a] transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full overflow-y-auto px-6 py-6 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-4 rounded-r-xl text-base transition-all duration-300 border-l-4 ${isActive
                  ? 'bg-white/10 text-white border-emerald-400 font-semibold translate-x-2'
                  : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Action Button */}
          <div className="pt-4">
            <Link
              href="/contact#appointment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-4 text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-center transition-colors shadow-lg active:scale-95"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
