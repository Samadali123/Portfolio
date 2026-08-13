'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import footerLogo from '../assets/images/logo.png';

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
      { name: 'Software Development', path: '/services/software-development' },
      { name: 'AI Solutions', path: '/services/ai-solutions' },
      { name: 'Data Driven Solutions', path: '/services/data-driven-solutions' },
      { name: 'Business Consultation', path: '/services/business-consultation' },
    ],
  };

  const socialLinks = [
    { 
      href: 'https://www.linkedin.com/company/asg-solutionsai/', 
      label: 'LinkedIn',
      icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    },
    { 
      href: 'https://x.com/ASG_Solutions_', 
      label: 'Twitter',
      icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
    },
    { 
      href: 'https://www.instagram.com/asgsolutions.ai?igsh=dmdjaXBiZ25sbHJ6', 
      label: 'Instagram',
      icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    },
  ];

  return (
    <footer className="bg-[#0b251a] text-gray-300 pt-12 pb-28 md:pb-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-5 text-center sm:text-left">
            <Link href="/" className="inline-flex flex-col items-center sm:items-start space-y-1 group">
              <img src={footerLogo.src} alt="ASG Solutions" className="w-20 h-auto" />
              <span className="text-white font-medium text-lg">Advanced Systems & Gen AI</span>
            </Link>
            <p className="mx-auto sm:mx-0 text-sm leading-relaxed text-gray-400 max-w-xs sm:max-w-md">
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
                  href="mailto:contact@asgsolutions.dev"
                  className="flex items-start justify-center sm:justify-start space-x-3 group cursor-pointer break-all"
                >
                  <Mail className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm group-hover:text-white transition-colors">
                    contact@asgsolutions.dev
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
              <li>
                <a
                  href="https://wa.me/918878858338"
                  className="flex items-start justify-center sm:justify-start space-x-3 group cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm group-hover:text-white transition-colors">
                    Contact us
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
