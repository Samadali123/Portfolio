'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Database, HardDrive, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const DataSolutions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: BarChart3,
      title: 'BI Dashboards',
      description: 'Tableau, Power BI, Looker. Real-time insights, no SQL needed.',
    },
    {
      icon: Zap,
      title: 'Data Pipelines',
      description: 'ETL/ELT automation. Extract, transform, load. Scheduled or real-time.',
    },
    {
      icon: Database,
      title: 'Data Warehousing',
      description: 'Centralized data hub. Snowflake, BigQuery, or on-prem solutions.',
    },
    {
      icon: HardDrive,
      title: 'Real-time Analytics',
      description: 'Streaming data processing. Kafka, Spark, real-time dashboards.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecasting, anomaly detection, ML models built on your data.',
    },
  ];

  const process = [
    { title: 'Data Audit', desc: 'Current data sources analyzed, quality assessed. (2 weeks)', cost: 'Free consultation' },
    { title: 'Architecture Design', desc: 'Data warehouse design, pipeline architecture. (2-3 weeks)', cost: 'Included' },
    { title: 'Build & Integrate', desc: 'Data migration, pipeline automation, validation. (4-8 weeks)', cost: 'Included' },
    { title: 'Dashboard & Reporting', desc: 'BI dashboards, automated reports, team training. (2-4 weeks)', cost: 'Included' },
  ];

  const faqs = [
    { q: 'Do I need to migrate all my data?', a: 'No. We can keep your systems as-is and sync relevant data to a central warehouse.' },
    { q: 'Will this break my existing systems?', a: 'No. We build parallel pipelines that don\'t disrupt your current operations.' },
    { q: 'What\'s the cost?', a: 'Depends on data volume and complexity. Typical range: $20K-50K for setup + $2K-5K/month ongoing.' },
    { q: 'Can you integrate with my CRM/ERP?', a: 'Yes. We integrate with Salesforce, SAP, custom APIs, databases.' },
    { q: 'How long until we see results?', a: '2-4 weeks for first dashboards. Full ROI visibility in 8-12 weeks.' },
    { q: 'What if our data is messy?', a: 'We handle data quality checks and cleaning as part of the pipeline. We\'ll flag anomalies and improve data quality over time.' },
    { q: 'Do you provide ongoing support?', a: 'Yes. Monthly dashboards updates, pipeline maintenance, and 24/7 monitoring included.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-tight">
              Turn your raw data into decisions that drive growth
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Real-time analytics, automated pipelines, and dashboards that your team actually uses.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span>Free Data Audit</span>
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
                  <p className="text-gray-600 mb-2">{p.desc}</p>
                  <p className="text-sm font-semibold text-emerald-600">{p.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI / Results */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-theme-secondary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text-secondary mb-4">Our clients achieve:</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">60%+</h3>
              <p className="text-gray-900 font-semibold mb-2">Reduction in reporting time</p>
              <p className="text-sm text-gray-500">Automated dashboards vs manual Excel = hours saved weekly</p>
            </div>
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">3x</h3>
              <p className="text-gray-900 font-semibold mb-2">Faster decision-making</p>
              <p className="text-sm text-gray-500">Real-time data instead of delayed reports</p>
            </div>
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">40%</h3>
              <p className="text-gray-900 font-semibold mb-2">Cost reduction</p>
              <p className="text-sm text-gray-500">Optimized pipelines and cloud resource usage</p>
            </div>
            <div className="p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-3xl font-bold text-emerald-600 mb-2">95%+</h3>
              <p className="text-gray-900 font-semibold mb-2">Data accuracy</p>
              <p className="text-sm text-gray-500">Quality checks and validation on every pipeline</p>
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
              <h3 className="text-xl font-bold mb-4">Lead Magnet AI - Data Intelligence Platform</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Organizations lacked a centralized process for analyzing large prospect datasets.</p>
                <p><strong className="text-gray-900">Solution: </strong>Created a platform capable of processing CSV datasets, generating insights, and producing structured business reports</p>
                <p><strong className="text-gray-900">Result: </strong>Improved visibility into lead data and accelerated decision-making processes</p>
                <p><strong className="text-gray-900">Tech: </strong>FastAPI, React, LangChain, PostgreSQL.</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">Aetheris ERP AI - Business Intelligence & Analytics</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge: </strong>Business data was spread across multiple departments, making reporting and analysis difficult.</p>
                <p><strong className="text-gray-900">Solution: </strong>Implemented data aggregation, AI-powered querying, and analytics workflows across operational systems.</p>
                <p><strong className="text-gray-900">Result: </strong>Enabled faster access to operational insights and more informed business decisions.</p>
                <p><strong className="text-gray-900">Tech: </strong>FastAPI, SQL, Redis, LangChain, Next.js.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get a Free Data Audit</h2>
          <p className="text-lg text-emerald-100 mb-8">30-min call to review your current setup</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-3xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Book Assessment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DataSolutions;
