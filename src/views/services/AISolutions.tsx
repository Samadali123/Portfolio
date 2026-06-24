'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Cpu, FileText, BarChart, Link as LinkIcon, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const AISolutions = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Customer support, internal knowledge assistants, document Q&A.',
    },
    {
      icon: Cpu,
      title: 'Process Automation',
      description: 'Invoice processing, data extraction, workflow automation.',
    },
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'OCR, entity extraction, classification at scale.',
    },
    {
      icon: BarChart,
      title: 'Predictive Analytics',
      description: 'Demand forecasting, churn prediction, anomaly detection.',
    },
    {
      icon: LinkIcon,
      title: 'LLM Integration',
      description: 'Integrate Claude, GPT-4, or open-source models into your apps.',
    },
  ];

  const useCases = [
    { title: 'Healthcare', desc: 'Patient support bots, clinical trial matching, appointment automation.' },
    { title: 'Logistics', desc: 'Route optimization, cargo tracking, damage prediction.' },
    { title: 'Finance', desc: 'Fraud detection, KYC automation, compliance reporting.' },
    { title: 'E-Commerce', desc: 'Product recommendations, customer service bots, inventory forecasting.' },
  ];

  const process = [
    { step: '1', title: 'Audit Your Workflow', desc: 'We analyze your processes, data, and pain points (Week 1)' },
    { step: '2', title: 'Build Custom AI', desc: 'Model training, integration, testing with your real data (Weeks 2-4)' },
    { step: '3', title: 'Train & Deploy', desc: 'Deployment, monitoring, team training (Week 5)' },
  ];

  const faqs = [
    { q: 'Is my data safe when we send it to OpenAI/Claude?', a: 'Yes. We follow strict data handling policies. We can deploy private instances to ensure data retention and SOC2 compliance.' },
    { q: 'Do I need existing AI infrastructure?', a: 'No. We handle everything from data setup to deployment. Works with on-premise or cloud.' },
    { q: 'Can you integrate with my existing CRM/ERP?', a: 'Yes. Our AI systems integrate with Salesforce, SAP, custom databases, APIs, etc.' },
    { q: 'How long does it take?', a: '4-8 weeks for a production system. MVP in 2 weeks.' },
    { q: 'What if it doesn\'t work as expected?', a: 'We offer 30-day optimization period with no extra cost. Adjustments included.' },
    { q: 'Can you train the model on our proprietary data?', a: 'Yes. We handle RAG, fine-tuning, and private deployments.' },
    { q: 'Do you provide ongoing support?', a: 'Yes. Monitoring, updates, and retraining included in support plans starting at custom monthly rates.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>
      
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-tight">
              Automate the work your team hates.<br />
              <span className="block text-4xl sm:text-5xl mt-2 font-normal text-gray-700">We build AI systems that actually work.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              From chatbots to process automation. Custom AI that integrates with your existing infrastructure — no rip-and-replace required.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span>Free AI Readiness Assessment</span>
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
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50/50">
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
          <p className="text-center text-gray-500 font-medium mt-6">Timeline: 4-8 weeks average. Results visible in 2 weeks.</p>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-theme-secondary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text-secondary mb-10">Real Results</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">300%</h3>
              <p className="text-gray-700 font-medium">Efficiency gain for a logistics client in 8 weeks</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">95%</h3>
              <p className="text-gray-700 font-medium">Reduction in manual data entry for finance team</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border theme-border-secondary">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">70%</h3>
              <p className="text-gray-700 font-medium">Inquiries handled automatically by support bots with 92% CSAT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold theme-text-secondary mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['OpenAI', 'Claude (Anthropic)', 'LangChain', 'Python', 'TensorFlow', 'AWS Bedrock', 'Pinecone', 'ChromaDB'].map((t) => (
              <span key={t} className="px-4 py-2 bg-gray-100 rounded-full font-medium text-gray-700 border border-gray-200">{t}</span>
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
              <h3 className="text-xl font-bold mb-4">Logistics AI Automation</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge:</strong> High-volume support queries slowing down operations.</p>
                <p><strong className="text-gray-900">Solution:</strong> Custom RAG pipeline connecting KB to GPT-4.</p>
                <p><strong className="text-gray-900">Result:</strong> 60% reduction in response time.</p>
                <p><strong className="text-gray-900">Tech:</strong> LangChain, OpenAI, Pinecone.</p>
              </div>
              <Link href="/portfolio" className="text-emerald-600 font-semibold hover:underline flex items-center">
                Read Full Case Study <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="theme-card p-8 rounded-2xl border theme-border-secondary shadow-lg">
              <h3 className="text-xl font-bold mb-4">Fintech Data Extraction</h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong className="text-gray-900">Challenge:</strong> Manual invoice processing causing delays.</p>
                <p><strong className="text-gray-900">Solution:</strong> Document intelligence OCR and entity extraction.</p>
                <p><strong className="text-gray-900">Result:</strong> 95% reduction in manual entry, saving 40 hours/week.</p>
                <p><strong className="text-gray-900">Tech:</strong> Python, AWS Textract, Claude.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to automate?</h2>
          <p className="text-lg text-emerald-100 mb-8">Get a Free AI Readiness Assessment</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-3xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Book 30-Min Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AISolutions;
