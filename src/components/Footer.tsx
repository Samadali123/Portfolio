'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Cpu, Zap, Layout } from 'lucide-react';
import footerLogo from '../assets/images/footer_logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
    ],
    services: [
      { name: 'Software Development', path: '/services' },
      { name: 'AI & Automation', path: '/services' },
      { name: 'Data Solutions', path: '/services' },
      { name: 'Cloud & System Design', path: '/services' },
    ],
  };

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Website' },
    { icon: Cpu, href: '#', label: 'Tech' },
    { icon: Zap, href: '#', label: 'Fast' },
    { icon: Layout, href: '#', label: 'Design' },
  ];

  return (
    <footer className="bg-[#0b251a] text-gray-300 pt-12 pb-28 md:pb-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-5 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center space-x-2 group">
              <div className="flex items-center space-x-2">
                <img src={footerLogo.src} alt="ASG Solutions" className="w-20 h-20" />
              </div>
            </Link>
            <p className="mx-auto sm:mx-0 text-sm leading-relaxed text-gray-400 max-w-xs">
              Empowering businesses with smart cloud and AI solutions for the digital age. Leading the way in scalable enterprise technology.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="inline-flex min-h-8 items-center text-sm hover:text-white transition-colors cursor-pointer relative group"
                  >
                    <span>{link.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3.5">
              {footerLinks.services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.path}
                    className="inline-flex min-h-8 items-center text-sm hover:text-white transition-colors cursor-pointer relative group"
                  >
                    <span>{service.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:asg.solutions@outlook.com"
                  className="flex items-start justify-center sm:justify-start space-x-3 group cursor-pointer break-all"
                >
                  <Mail className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm group-hover:text-white transition-colors">
                    asg.solutions@outlook.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918878858338"
                  className="flex items-start justify-center sm:justify-start space-x-3 group cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm group-hover:text-white transition-colors">
                    +91 8878858338
                  </span>
                </a>
              </li>
              <li className="flex items-start justify-center sm:justify-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm">Bhopal, Madhya Pradesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 md:mt-16 pt-8 w-full flex flex-col gap-5">
          <p className="text-gray-500 text-center text-sm">
            &copy; {currentYear} <span className="text-emerald-500 font-semibold">ASG Solutions</span>. All rights reserved.
          </p>
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              <Link
                href="/privacy-policy"
                className="relative z-10 cursor-pointer text-gray-400 hover:text-white group"
              >
                Privacy Policy
                <span className="pointer-events-none absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/terms-of-service"
                className="relative z-10 cursor-pointer text-gray-400 hover:text-white group"
              >
                Terms of Service
                <span className="pointer-events-none absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
