'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Cpu, FileText, BarChart, Link as LinkIcon, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const AISolutions = () => {

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: Bot,
      title: 'AI WhatsApp Chatbots',
      description: 'Answer customer questions instantly using AI-powered conversations.',
    },
    {
      icon: Cpu,
      title: 'Lead Qualification',
      description: 'Automatically capture, qualify, and assign leads to your sales team.',
    },
    {
      icon: FileText,
      title: 'Appointment Booking',
      description: 'Schedule meetings, consultations, and reminders directly through WhatsApp.',
    },
    {
      icon: BarChart,
      title: 'Order & Customer Support',
      description: 'Provide order updates, FAQs, complaint handling, and post-sale support.',
    },
    {
      icon: LinkIcon,
      title: 'CRM & Business Integrations',
      description: 'Connect WhatsApp with CRMs, Google Sheets, payment gateways, and business applications.',
    },
  ];

  const useCases = [
    {
      title: 'Real Estate',
      desc: 'Capture property inquiries, schedule site visits, and automate buyer follow-ups.',
    },
    {
      title: 'Clinics & Hospitals',
      desc: 'Appointment booking, reminders, patient support, and prescription follow-ups.',
    },
    {
      title: 'Education',
      desc: 'Student inquiries, admission support, fee reminders, and course updates.',
    },
    {
      title: 'E-Commerce',
      desc: 'Order confirmation, shipping updates, abandoned cart recovery, and customer support.',
    },
  ];

  const process = [
    { step: '1', title: 'Understand Your Business', desc: 'Understand your customer journey and identify repetitive conversations.' },
    { step: '2', title: 'Build Your WhatsApp Automation', desc: 'Design AI-powered WhatsApp workflows integrated with your existing tools.' },
    { step: '3', title: 'Launch & Optimize', desc: 'Deploy, monitor, optimize, and continuously improve automation performance.' },
  ];

  const faqs = [
    {
      q: 'What can WhatsApp automation do for my business?',
      a: 'WhatsApp automation can handle customer support, lead qualification, appointment booking, order updates, follow-ups, FAQs, and personalized messaging—helping you save time and respond instantly.'
    },
    {
      q: 'Can the chatbot integrate with my existing CRM or business software?',
      a: 'Yes. We can integrate WhatsApp with CRMs, Google Sheets, payment gateways, booking systems, ERPs, and custom APIs to automate your business workflows.'
    },
    {
      q: 'Will customers know they are talking to an AI?',
      a: 'Our AI assistant provides natural, human-like conversations and can seamlessly transfer complex queries to your team whenever human assistance is needed.'
    },
    {
      q: 'Is WhatsApp automation suitable for small businesses?',
      a: 'Absolutely. Whether you are a startup, clinic, real estate agency, educational institute, or e-commerce business, WhatsApp automation helps improve customer engagement while reducing manual work.'
    },
    {
      q: 'How long does it take to set up?',
      a: 'Most WhatsApp automation solutions can be designed, integrated, and deployed within 1–3 weeks, depending on your business requirements and integrations.'
    },
    {
      q: 'Is customer data secure?',
      a: 'Yes. We follow secure development practices and ensure customer data is handled safely. Integrations are built using secure APIs and industry-standard authentication methods.'
    },
    {
      q: 'Do you provide support after deployment?',
      a: 'Yes. We provide ongoing maintenance, monitoring, updates, performance optimization, and technical support to ensure your WhatsApp automation continues to run smoothly.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-none">
              Automate Your Business with AI-Powered WhatsApp<br />
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Convert more leads, support customers 24/7, and automate repetitive conversations with intelligent WhatsApp solutions.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span>Book Free WhatsApp Automation Demo</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {services.map((s, i) => (
              <div key={i} className="theme-card rounded-2xl p-6 shadow-lg border theme-border-secondary">
                <s.icon className="w-10 h-10 theme-text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">Use Cases by Industry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((u, i) => (
              <div key={i} className="theme-card rounded-2xl p-6 shadow-md border theme-border-secondary">
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide theme-text-secondary">{u.title}</h3>
                <p className="text-gray-600">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">How It Works</h2>
          <div className="space-y-6">
            {process.map((p, i) => (
              <div key={i} className="flex gap-4 items-start theme-card p-6 rounded-2xl border theme-border-secondary shadow-md">
                <div className="w-12 h-12 rounded-full theme-bg-secondary text-white flex items-center justify-center shrink-0 font-bold text-xl">
                  {p.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{p.title}</h3>
                  <p className="text-gray-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </section>

      {/* Results */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-theme-secondary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10">Real Results</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">90%</h3>
              <p className="text-gray-700 font-medium">Faster Customer Response Time</p>
            </div>
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">70%</h3>
              <p className="text-gray-700 font-medium">Reduction in Repetitive Customer Queries</p>
            </div>
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">24/7</h3>
              <p className="text-gray-700 font-medium">Automated Customer Support Availability</p>
            </div>
          </div>
        </div>
      </section>



      {/* Case Studies */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">Case Studies</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">Real Estate Lead Automation</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Agents were missing leads after business hours.</p>
                <p><strong className="text-gray-900">Solution: </strong>Built an AI-powered WhatsApp chatbot that qualified buyers, answered FAQs, and booked property visits.</p>
                <p><strong className="text-gray-900">Result: </strong>Reduced response time from hours to seconds while increasing qualified appointments.</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">Clinic Appointment Automation</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Receptionists handled hundreds of repetitive calls daily.</p>
                <p><strong className="text-gray-900">Solution: </strong>Implemented WhatsApp automation for appointment booking, reminders, and FAQs.
                </p>
                <p><strong className="text-gray-900">Result: </strong>Reduced manual workload and improved patient response time significantly.</p>
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
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="border-b theme-border-secondary">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h3 className="text-base font-medium theme-text-secondary">{faq.q}</h3>
                  <span className="text-xl theme-text-secondary ml-4">{openFaq === i ? "−" : "+"}</span>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Automate Your WhatsApp Business?</h2>
          <p className="text-lg text-emerald-100 mb-8">Book a Free WhatsApp Automation Consultation</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-3xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Book 30-Min Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AISolutions;
