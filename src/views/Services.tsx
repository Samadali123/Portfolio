'use client';

import { motion } from 'framer-motion';
import { Code, Brain, BarChart3, Briefcase, CheckCircle } from 'lucide-react';

const Services = () => {

  // Services data
  const services = [
  
    {
      icon: Brain,
      title: 'AI Automation',
      description: 'Automations and chat-driven agents that convert leads, resolve common requests, and complete tasks so your team focuses on revenue.',
      benefits: [
        'Qualify leads automatically so sales teams focus on ready prospects',
        'Deflect repetitive support to reduce ticket volume and headcount pressure',
        'Trigger actions across systems (CRM, billing, tickets) without manual steps',
      ],
      impacts: [
        'Reduce manual hours by up to 50%',
        'Increase qualified leads and shorten sales cycles',
        'Reduce time-to-resolution and recover lost revenue',
      ],
    },
    {
      icon: Briefcase,
      title: 'Business Consultation',
      description: 'Focused audits and roadmaps that find low-risk, high-payback automation and process changes you can run as pilots.',
      benefits: [
        'Identify 1–3 quick pilots with clear ROI and low implementation cost',
        'A one-page roadmap prioritised by time-to-value and savings',
        'Practical pilot plans with success metrics and minimal disruption',
      ],
      impacts: [
        'Faster ROI decisions with prioritized pilots',
        'Reduced operating cost through targeted automation',
        'Clear plan to scale successful pilots across teams',
      ],
    },
      {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Build tools and products that remove manual steps, increase throughput, and unlock new revenue without adding people.',
      benefits: [
        'Replace manual workflows with automated, auditable processes',
        'Improve conversion and retention through better UX and faster flows',
        'Connect systems to eliminate repeated data entry and errors',
      ],
      impacts: [
        'Faster processing times and fewer operational errors',
        'Higher customer conversion and lifetime value',
        'Ability to scale customers without proportional headcount increases',
      ],
    },
    {
      icon: BarChart3,
      title: 'Data Driven Solutions',
      description: 'Reliable pipelines and dashboards that turn messy data into decisions that save money and increase revenue.',
      benefits: [
        'Automated dashboards that remove manual reporting and speed decisions',
        'Predictive signals to prioritise retention and revenue actions',
        'Data quality improvements so analytics are trusted and actionable',
      ],
      impacts: [
        'Reduce reporting time by 60%',
        'Expose revenue opportunities faster',
        'Improve forecast accuracy and operational efficiency',
      ],
    }
    
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background */}
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6">
              Practical Tech That Saves Time & Cost
              <span className="hidden sm:block bg-clip-text">
                Measurable automation, integrations, and software
              </span>
            </h1>
            <p className="hidden sm:block max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              We build targeted solutions chatbots, agents, and apps that remove manual work and deliver measurable ROI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              {/* Service Card */}
              <div className="flex-1 w-full border rounded-2xl cursor-pointer group relative overflow-hidden
  before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-(--color-secondary)
  before:transition-all before:duration-800 before:ease-in-out
  hover:before:h-full">

                <div className="relative z-10 theme-card rounded-3xl p-8 lg:p-10">
                  <div className="w-16 h-16 theme-bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 transition-colors duration-300 group-hover:text-(--color-primary)">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-(--color-primary)">
                    {service.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-(--color-primary)">
                    How this helps your business
                  </h3>

                  <ul className="space-y-3 mb-6">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300 group-hover:text-(--color-primary)" />
                        <span className="text-gray-700 transition-colors duration-300 group-hover:text-(--color-primary)">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Impacts Card */}
              <div className="flex-1 w-full">
                <div className="theme-card rounded-3xl p-8 lg:p-10 border theme-border-secondary">
                  <h3 className="text-2xl font-bold theme-text-secondary mb-6">Impact on Businesses</h3>
                  <div className="space-y-4">
                    {service.impacts.map((impact, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-4 p-4 theme-card rounded-xl border theme-border-secondary shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-8 h-8 theme-bg-secondary rounded-lg flex items-center justify-center shrink-0">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-gray-700 font-medium">{impact}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 theme-bg-secondary-soft rounded-2xl border theme-border-secondary">
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Interested in this service?</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Our experts are ready to discuss how we can tailor this solution to your specific needs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Services;

