'use client';

import { motion } from 'framer-motion';
import {CheckCircle2, AlertCircle, Gavel, Scale, Globe, Terminal, UserCheck } from 'lucide-react';

const TermsOfService = () => {

// Terms of Service sections data
  const sections = [
    {
      icon: Terminal,
      title: "1. Acceptance of Terms",
      content: "By accessing and using the ASG Solutions website and services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
      icon: UserCheck,
      title: "2. User Obligations",
      content: "You agree to use our platform and services only for purposes that are permitted by these Terms and any applicable law or regulation. You are responsible for maintaining the confidentiality of any login credentials and are fully responsible for all activities that occur under your account."
    },
    {
      icon: Globe,
      title: "3. Intellectual Property",
      content: "All content, software, and AI models provided by ASG Solutions are the exclusive property of ASG Solutions or its licensors. Users are granted a limited, non-transferable license to use our services according to the specific service agreement purchased."
    },
    {
      icon: Scale,
      title: "4. Limitation of Liability",
      content: "ASG Solutions shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or the inability to use our cloud or AI services. We provide our platform on an 'as is' and 'as available' basis without any warranties of any kind."
    },
    {
      icon: Gavel,
      title: "5. Termination",
      content: "We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms shall survive termination."
    }
  ];

  return (
    <div className="min-h-screen theme-page-bg pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
         
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Terms of <span className="theme-text-secondary">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. They govern your relationship with ASG Solutions' platform and infrastructure.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-black font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 theme-text-secondary" /> Legally Binding</span>
            <span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 theme-text-secondary" /> Enterprise Standard</span>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-4xl p-8 md:p-10 shadow-3xl border theme-border-secondary group hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 theme-bg-secondary text-white shadow-lg group-hover:bg-emerald-700 transition-colors">
                  <section.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        className="mt-16 p-10 rounded-[2.5rem] theme-bg-secondary shadow-sm"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-2">Governing Law</h4>
              <p className="text-sm leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of Madhya Pradesh, India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
