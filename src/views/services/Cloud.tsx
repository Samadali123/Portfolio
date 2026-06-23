'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cloud as CloudIcon, ShieldCheck, Activity, DollarSign, Database, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const Cloud = () => {
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
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10">Cloud Partners</h2>
          <div className="flex flex-wrap justify-center gap-8 text-2xl font-bold text-gray-400 mb-8">
            <span className="hover:text-gray-700 transition-colors">AWS</span>
            <span className="hover:text-gray-700 transition-colors">Microsoft Azure</span>
            <span className="hover:text-gray-700 transition-colors">Google Cloud Platform</span>
          </div>
          <p className="text-gray-500 font-medium">Certified Solutions Architects and DevOps Engineers</p>
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
                  Step {i + 1}
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

      {/* Cost Savings & Uptime SLA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-theme-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold theme-text-secondary mb-6">Our clients reduce cloud spend by 35% in 90 days</h2>
              <div className="theme-card p-8 rounded-2xl shadow-md border theme-border-secondary space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold text-gray-700">Right-size EC2 instances</span>
                  <span className="text-emerald-600 font-bold">-20%</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold text-gray-700">Use Reserved Instances</span>
                  <span className="text-emerald-600 font-bold">-10%</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold text-gray-700">Optimize storage</span>
                  <span className="text-emerald-600 font-bold">-5%</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-semibold text-gray-700">Remove waste</span>
                  <span className="text-emerald-600 font-bold">-5%</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-xl text-gray-900">Total Savings</span>
                  <span className="text-emerald-600 font-bold text-xl">40% + better performance</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold theme-text-secondary mb-6">Enterprise-Grade Guarantees</h2>
              <div className="grid gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
                  <h3 className="font-bold text-lg mb-1">99.9% Uptime SLA</h3>
                  <p className="text-sm text-gray-600">Only 43 minutes downtime per month</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
                  <h3 className="font-bold text-lg mb-1">24-Hour Response Time</h3>
                  <p className="text-sm text-gray-600">Urgent issues fixed same-day</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
                  <h3 className="font-bold text-lg mb-1">5-Minute Alert Response</h3>
                  <p className="text-sm text-gray-600">Any anomaly detected, team alerted automatically</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
                  <h3 className="font-bold text-lg mb-1">Redundancy Across AZs</h3>
                  <p className="text-sm text-gray-600">Your data replicated across availability zones</p>
                </div>
              </div>
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
              <h3 className="text-xl font-bold mb-4">Cloud Migration - Logistics</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge:</strong> On-premise servers costing $50K/month, unreliable uptime.</p>
                <p><strong className="text-gray-900">Solution:</strong> Migrated to AWS with auto-scaling, RDS, CloudFront CDN.</p>
                <p><strong className="text-gray-900">Result:</strong> 40% cost reduction ($20K/month), 99.99% uptime, 3x faster load times.</p>
                <p><strong className="text-gray-900">Tech:</strong> AWS EC2, RDS, CloudFront, CloudFormation.</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">DevOps Pipeline Automation</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge:</strong> No CI/CD, manual deployments causing frequent outages.</p>
                <p><strong className="text-gray-900">Solution:</strong> Implemented GitHub Actions + Docker + ECS deployment pipeline.</p>
                <p><strong className="text-gray-900">Result:</strong> Deployments in 2 minutes vs 2 hours, 0 deployment failures in 6 months.</p>
                <p><strong className="text-gray-900">Tech:</strong> GitHub Actions, Docker, AWS ECS, CloudFormation.</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10 text-center">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="theme-card p-6 rounded-2xl border theme-border-secondary">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 pl-8">{faq.a}</p>
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
