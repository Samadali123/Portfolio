'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, DollarSign, Clock, Activity } from 'lucide-react';
import Link from 'next/link';

const BusinessConsultation = () => {

  const outcomes = [
    { title: 'Find Low-Risk Wins', desc: 'Identify 1–3 automation pilots that deliver measurable savings in weeks.' },
    { title: 'Reduce Operating Costs', desc: 'Cut manual effort, reallocate staff to revenue tasks, and lower monthly expenses.' },
    { title: 'Scale Without Adding Headcount', desc: 'Automate repeatable work so your team can handle more customers.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-none">Business Consultation AI That Pays Back</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">We map your workflows, find the highest-value automation pilots, and deliver a low-risk rollout plan that saves time and cost pilots only, measurable outcomes.</p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span>Free 15‑Min Business Audit</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-8 text-center">How we consult</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outcomes.map((o, i) => (
              <div key={i} className="theme-card rounded-2xl p-6 shadow-md border theme-border-secondary">
                <h3 className="text-xl font-bold mb-2">{o.title}</h3>
                <p className="text-gray-600">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-6 text-center">What you get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl border-dashed border-2 border-emerald-200 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Audit & Quick Wins</h3>
              <p className="text-gray-600">We identify 1–3 high-impact automation pilots you can run in weeks to reduce manual hours and improve conversion.</p>
            </div>
            <div className="p-6 rounded-2xl border-dashed border-2 border-emerald-200 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Roadmap with ROI</h3>
              <p className="text-gray-600">A one-page roadmap prioritising pilots by ROI, cost to implement, and time-to-value so decisions are fast and measurable.</p>
            </div>
            <div className="p-6 rounded-2xl border-dashed border-2 border-emerald-200 bg-white/5">
              <h3 className="text-xl font-bold mb-2">Low‑Risk Pilot Plan</h3>
              <p className="text-gray-600">Concrete proof-of-concept steps with success metrics and minimal disruption — we run pilots that prove value before wider rollout.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BusinessConsultation;
