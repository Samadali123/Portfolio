'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cloud as CloudIcon, ShieldCheck, Activity, DollarSign, Database, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Cloud = () => {

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: CloudIcon,
      title: 'Cloud Migration',
      description: 'Move from on-premise to cloud. Lift-and-shift or re-architect. Zero downtime migration.',
    },
    {
      icon: Database,
      title: 'Infrastructure Design',
      description: 'VPC, security groups, load balancing, auto-scaling. Enterprise-grade.',
    },
    {
      icon: Activity,
      title: 'DevOps & CI/CD',
      description: 'Automated deployments. GitHub Actions, Jenkins, GitLab CI. Every commit → production in minutes.',
    },
    {
      icon: DollarSign,
      title: 'Cost Optimization',
      description: 'Right-size instances, remove waste, use spot/reserved pricing. Average 35% savings in 90 days.',
    },
    {
      icon: ShieldCheck,
      title: '24/7 Monitoring',
      description: 'CloudWatch, DataDog, New Relic. Alerts before outages. Proactive fixes, not reactive heroics.',
    },
  ];

  const process = [
    { title: 'Assessment', desc: 'Current infrastructure audit, compliance requirements review, cost & performance baseline. (1 week)' },
    { title: 'Architecture Design', desc: 'Cloud architecture design, security & compliance mapping, cost estimation. (2-3 weeks)' },
    { title: 'Migration (Zero Downtime)', desc: 'Parallel environment setup, data sync and cutover, rollback plan in place. (4-12 weeks)' },
    { title: 'Optimize', desc: 'Performance tuning, cost optimization, security hardening. (2-4 weeks post-migration)' },
    { title: 'Monitor (Ongoing)', desc: '24/7 monitoring, automated alerts, monthly optimization reviews. (Ongoing)' },
  ];

  const faqs = [
    { q: 'Will migration cause downtime?', a: 'No. We use zero-downtime migration strategies with parallel environments and database sync.' },
    { q: 'How much will this cost?', a: 'Typically 35% less than on-premise with better performance. Free audit shows exact numbers.' },
    { q: 'What about security and compliance?', a: 'We implement AWS/Azure/GCP compliance frameworks (SOC2, ISO27001, HIPAA, PCI-DSS as needed).' },
    { q: 'Can we keep our existing vendor?', a: 'Yes. We work with AWS, Azure, GCP, and hybrid scenarios.' },
    { q: 'What\'s your average migration timeline?', a: '4-12 weeks depending on complexity and data size.' },
    { q: 'Do you handle ongoing support?', a: 'Yes. Managed services starting at custom monthly rates include monitoring, updates, and optimization.' },
    { q: 'What about disaster recovery?', a: 'Built into every deployment. Automated backups, multi-region failover, tested quarterly.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-tight">
              Scale without the headaches.<br />
              <span className="block text-4xl sm:text-5xl mt-2 font-normal text-gray-700">Cloud infrastructure that just works.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              AWS, Azure, GCP expertise. Migration, optimization, 24/7 monitoring, and cost control built-in.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span>Free Cloud Cost Audit</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">Services</h2>
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

      {/* Cloud Partners */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10">Cloud Partners</h2>
          <div className="flex flex-wrap justify-center gap-8 text-2xl font-bold text-gray-400 mb-8">
            <span className="hover:text-gray-700 transition-colors">AWS</span>
            <span className="hover:text-gray-700 transition-colors">Microsoft Azure</span>
            <span className="hover:text-gray-700 transition-colors">Google Cloud Platform</span>
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
                  {i + 1}
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


      {/* Case Studies */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">Case Studies</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">FallahTrips - Cloud-Native Travel Platform</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Delivering a responsive AI application capable of serving users across different locations.</p>
                <p><strong className="text-gray-900">Solution: </strong>Built and deployed a cloud-hosted architecture with scalable APIs, managed databases, and modern frontend infrastructure.</p>
                <p><strong className="text-gray-900">Result: </strong>Achieved reliable performance, streamlined deployments, and simplified platform management.</p>
                <p><strong className="text-gray-900">Tech: </strong>Supabase, FastAPI, React, Vercel, CI/CD</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">Gatherly - Scalable Real-Time Infrastructure</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Real-time communication systems require stable infrastructure and low-latency connections</p>
                <p><strong className="text-gray-900">Solution: </strong>Engineered a cloud-ready architecture supporting messaging, room management, and live collaboration features.</p>
                <p><strong className="text-gray-900">Result: </strong>Delivered a reliable environment for real-time engagement and collaborative experiences.</p>
                <p><strong className="text-gray-900">Tech: </strong>Node.js, Socket.IO, LiveKit, Supabase.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get a Free Cloud Cost Audit</h2>
          <p className="text-lg text-emerald-100 mb-8">See exactly where you can save</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-3xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cloud;
