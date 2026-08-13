'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cloud, Brain, BarChart3, Code, ArrowRight, CheckCircle, Star, Zap, Shield, Settings, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiDjango,
  SiDocker,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiLangchain,
  SiApacheairflow,
  SiRedux,
  SiTailwindcss,
  SiFlutter,
  SiExpo,
  SiFirebase,
  SiNestjs,
  SiAppwrite,
  SiGithubactions,
  SiN8N,
  SiSnowflake,
  SiDatabricks
} from 'react-icons/si';
import defaultProfile from '../assets/images/DefaultProfile.png';
import { start } from 'repl';

const Home = () => {

  // Placeholder image for testimonials
  const DefaultClients = defaultProfile.src;


  // Services, Testimonials, Why Choose Us, and Tech Stack data
  const services = [
    {
      icon: Brain,
      title: 'AI Automation',
      description: 'Custom chatbots, AI agents, and workflow automation that qualify leads, resolve support queries, and take action on your data.',
      path: '/services/ai-solutions',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      icon: Cloud,
      title: 'Business Consultation',
      description: 'Strategy-first AI and process improvements that prioritise high-ROI automation and measurable cost savings.',
      path: '/services/business-consultation',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'SaaS platforms, internal tools, and client portals that scale built to automate work and accelerate revenue.',
      path: '/services/software-development',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      icon: BarChart3,
      title: 'Data Driven Solutions',
      description: 'Turn raw data into decisions: automated pipelines, dashboards, and predictive models that increase ROI.',
      path: '/services/data-driven-solutions',
      gradient: 'from-orange-500 to-yellow-400',
    },
  ];



  const testimonials = [
    {
      name: 'Raj Kumar',
      role: 'Business Owner',
      image: 'https://ui-avatars.com/api/?name=Raj+Kumar&background=0D8ABC&color=fff',
      content: 'Saved ~40% time on manual follow-ups and doubled qualified leads in 6 weeks.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Manager',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=FF8A65&color=fff',
      content: 'Automation removed routine support tasks — response time went from hours to seconds.',
      rating: 4,
    },
    {
      name: 'Vikram Singh',
      role: 'Founder',
      image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=4CAF50&color=fff',
      content: 'Practical, measurable improvements: fewer errors, faster onboarding, and happier customers.',
      rating: 4,
    },
  ];


  // For Careers Page

  const whyChooseUs = [
    {
      icon: Settings,
      title: 'One Partner for Everything',
      description:
        'One partner for bots, integrations, and custom software so you avoid vendor friction and get results faster.',
    },
    {
      icon: Zap,
      title: 'Automation That Saves Time',
      description:
        'Remove repetitive tasks and free your team — expect measurable time savings in weeks, not months.',
    },
    {
      icon: Shield,
      title: 'Built for Scale & Security',
      description:
        'Secure integrations and scalable design so automation grows with your business without breaking processes.',
    },
    {
      icon: CheckCircle,
      title: 'Long-Term Technology Partner',
      description:
        'We stay on with you: maintenance, performance checks, and incremental improvements to secure long-term value.',
    },
  ];



  // our tech stack data 
  const techStacks = {
    frontend: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Redux', icon: SiRedux },
      { name: 'Tailwind', icon: SiTailwindcss },
    ],

    mobile: [
      { name: 'React Native', icon: SiReact },
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Expo', icon: SiExpo },
      { name: 'Firebase', icon: SiFirebase },
    ],

    backend: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'Django', icon: SiDjango },
      { name: 'FastAPI', icon: SiFastapi },
    ],

    databases: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Appwrite', icon: SiAppwrite },
    ],

    infrastructure: [
      { name: 'AWS', icon: Cloud },
      { name: 'Docker', icon: SiDocker },
      { name: 'Redis', icon: SiRedis },
      { name: 'CI/CD', icon: SiGithubactions },
    ],

    ai: [
      { name: 'GenAI', icon: Brain },
      { name: 'LangChain', icon: SiLangchain },
      { name: 'RAG Systems', icon: SiLangchain },
      { name: 'n8n', icon: SiN8N },
    ],

    data: [
      { name: 'SQL', icon: Database },
      { name: 'Apache Airflow', icon: SiApacheairflow },
      { name: 'Snowflake', icon: SiSnowflake },
      { name: 'Databricks', icon: SiDatabricks },
    ],
  };

  const techStackGroups = [
    { title: 'Frontend Engineering', items: techStacks.frontend },
    { title: 'Backend Engineering', items: techStacks.backend },
    { title: 'Databases', items: techStacks.databases },
    { title: 'Cloud & Infrastructure', items: techStacks.infrastructure },
    { title: 'AI Engineering', items: techStacks.ai },
    { title: 'Data Tools', items: techStacks.data },
    { title: 'Mobile Engineering', items: techStacks.mobile },
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 theme-page-bg"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 theme-blob rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 theme-blob rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 theme-blob rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Impactful Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold theme-text-secondary leading-none tracking-tight max-w-4xl mx-auto">
              Cut Costs & Save Time with AI Automation
              <p className="block mt-5 text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-700">
                Custom chatbots, intelligent agents, and tailored software that automate tasks and free your team.
              </p>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto sm:max-w-none">
              <Link
                href="/contact"
                className="px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl theme-shadow-secondary hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 group w-full sm:w-auto"
              >
                <span>Free 15‑Min AI Audit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-transparent border-2 theme-border-secondary text-[var(--color-secondary)] rounded-3xl font-semibold hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>See Our Work</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Horizontal Text Scroller */}
      <div className="w-full border-y border-emerald-800/10 bg-emerald-800/5 py-4 overflow-hidden mb-8">
        <div className="marquee-wrapper marquee-mask">
          <div className="marquee-content font-bold uppercase tracking-wider text-xs sm:text-sm theme-text-secondary">
            {/* First Set of Items */}


            <span className="flex items-center gap-2 whitespace-nowrap">Save 30% on manual work</span>
            <span className="flex items-center gap-2 whitespace-nowrap">MVP in 4 weeks</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Free 15‑Min AI Audit</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Automate lead qualification</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Reduce support tickets by 60%</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Intelligent agents that act</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Connect CRM & payments</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Secure by design</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Real-time dashboards</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Outcome-focused pilots</span>

            {/* Second Set of Items (Clone for continuous loop) */}
            <span className="flex items-center gap-2 whitespace-nowrap">Save 30% on manual work</span>
            <span className="flex items-center gap-2 whitespace-nowrap">MVP in 4 weeks</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Free 15‑Min AI Audit</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Automate lead qualification</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Reduce support tickets by 60%</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Intelligent agents that act</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Connect CRM & payments</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Secure by design</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Real-time dashboards</span>
            <span className="flex items-center gap-2 whitespace-nowrap">Outcome-focused pilots</span>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold theme-text-secondary mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive IT solutions tailored to your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >

                <div className="group theme-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border theme-border-secondary">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold theme-text-secondary mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {/* Only Link wraps Read More */}
                  <Link href={service.path} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-secondary)] hover:gap-2 transition-all duration-200 cursor-pointer">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold theme-text-secondary mb-4">Why Choose ASG Solutions</h2>
            <p className="text-xl text-gray-600">The benefits of partnering with us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 theme-bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg theme-shadow-secondary">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold theme-text-secondary mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by leading companies worldwide</p>
          </motion.div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="theme-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border theme-border-secondary"
              >
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>

                  {testimonial.rating && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{ color: 'var(--color-secondary)', fill: 'var(--color-secondary)' }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/*tech stack section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold theme-text-secondary mb-4">Tech Stack We Used </h2>
            <p className="text-xl text-gray-600">
              We use professional, enterprise-grade tooling across Software, Cloud and AI platforms.
            </p>
          </motion.div>

          <div className="space-y-12">
            {techStackGroups.map((group) => (
              <div
                key={group.title}
                className="scroll-mt-28"
              >
                <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">
                  {group.title}
                </h3>

                <div className="theme-card rounded-3xl p-8 ">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {group.items.map((tech) => (
                      <div key={tech.name} className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border theme-border-secondary">
                          <tech.icon className="w-8 h-8 theme-text-secondary" />
                        </div>
                        <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
