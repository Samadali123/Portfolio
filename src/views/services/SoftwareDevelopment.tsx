'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Smartphone, Briefcase, Wrench, Plug, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const SoftwareDevelopment = () => {

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Replace manual processes with web apps that cut steps, reduce errors, and speed customer workflows.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Put services in your customers’ hands to increase retention, reduce support calls, and grow revenue.',
    },
    {
      icon: Briefcase,
      title: 'SaaS Platforms',
      description: 'Build subscription products that scale revenue without proportional increases in operations.',
    },
    {
      icon: Wrench,
      title: 'Internal Tools',
      description: 'Remove manual admin work and speed internal processes so teams deliver more with the same headcount.',
    },
    {
      icon: Plug,
      title: 'APIs & Integrations',
      description: 'Integrations that connect systems and unlock automation — enabling end-to-end workflows and reliable data for decision-making.',
    },
  ];

  const process = [
    { title: 'Discovery (Week 1)', items: ['Requirements workshop', 'User research', 'Architecture planning'] },
    { title: 'Design (Week 2)', items: ['Wireframes & prototypes', 'UX review', 'Design system'] },
    { title: 'Development (Weeks 3-6)', items: ['Agile sprints', 'Daily standups', 'Code reviews'] },
    { title: 'Launch & Support (Week 7+)', items: ['Deployment', 'Monitoring', '30-day optimization'] },
  ];


  const faqs = [
    { q: 'How long does a typical project take?', a: 'MVPs in 4-8 weeks. Full-scale apps 8-16 weeks. Depends on complexity and your feedback speed.' },
    { q: 'Do you sign NDAs?', a: 'Always. Every project is under NDA and confidentiality agreement.' },
    { q: 'Who owns the code?', a: '100% ownership transfers to you. We provide full access to repositories and documentation.' },
    { q: 'What if I need changes after launch?', a: 'We offer support plans starting at custom monthly rates for ongoing maintenance, updates, and enhancements.' },
    { q: 'Can you work with our existing team?', a: 'Yes. We can join your team, lead development, or mentor your in-house engineers.' },
    { q: 'Do you use frameworks or custom code?', a: 'We use modern frameworks (React, Next.js) for speed and maintainability, plus custom code where needed.' },
    { q: 'What about testing and quality assurance?', a: 'Every feature is unit tested, integration tested, and QA tested before deployment. 0 known bugs policy.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-none">
              Custom software that removes manual work and pays for itself.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We design and ship web and mobile apps that automate core processes, connect your systems, and deliver measurable ROI fast.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span>Free 15‑Min Project Audit</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What We Build */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">What We Build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {services.map((s, i) => (
              <div key={i} className="theme-card rounded-2xl p-6 shadow-lg border theme-border-secondary">
                <s.icon className="w-10 h-10 theme-text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-700">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">Our Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="theme-card rounded-2xl p-6 border theme-border-secondary shadow-md relative">
                <div className="w-8 h-8 rounded-full theme-bg-secondary text-white flex items-center justify-center font-bold absolute -top-4 -left-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold mb-4 theme-text-secondary">{p.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Case Studies */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-theme-secondary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">Case Studies</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">Gatherly - Real-Time Collaboration Platform</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Building a scalable platform for real-time communication, private rooms, and collaborative meetings.</p>
                <p><strong className="text-gray-900">Solution: </strong>Developed a full-stack social collaboration application with live messaging, room management, and video communication features.</p>
                <p><strong className="text-gray-900">Result: </strong>Delivered a responsive platform capable of supporting real-time user interactions and collaborative workflows.</p>
                <p><strong className="text-gray-900">Tech: </strong>React, Node.js, Socket.IO, LiveKit, Supabase.</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">FallahTrips - AI Travel Planning Platform</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Travelers needed a faster way to create personalized itineraries without manual research.</p>
                <p><strong className="text-gray-900">Solution: </strong>Built an intelligent travel planning application combining modern web technologies with AI-powered itinerary generation.</p>
                <p><strong className="text-gray-900">Result: </strong>Reduced trip planning complexity by generating tailored travel recommendations within minutes.</p>
                <p><strong className="text-gray-900">Tech: </strong>React, Supabase, FastAPI, LangChain, GenAI</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
  
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-4 text-center">FAQ's</h2>
          <p className="text-center text-gray-500 mb-10">
            Looking for answers to your frequently asked questions? Check out our FAQ's section below to find.
          </p>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b theme-border-secondary">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h3 className="text-base font-medium theme-text-secondary">{faq.q}</h3>
                  <span className="text-2xl text-black ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="text-black pb-5 pr-8">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center theme-bg-secondary p-12 rounded-3xl text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to build?</h2>
          <p className="text-lg text-emerald-100 mb-8">Get a Free Project Consultation</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-3xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Book a Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SoftwareDevelopment;
