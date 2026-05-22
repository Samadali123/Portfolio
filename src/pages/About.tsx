import { motion } from 'framer-motion';
import { Target, Eye, TrendingUp, Award, Users, Globe } from 'lucide-react';

const About = () => {


  // Stats data
  const DefaultTeamMember = new URL('../assets/images/DefaultProfile.png', import.meta.url).href;


  // Team data
  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      image: DefaultTeamMember,
      bio: 'Visionary leader with 15+ years in tech',
    },
    {
      name: 'Sarah Martinez',
      role: 'CTO',
      image: DefaultTeamMember,
      bio: 'Cloud architecture expert and innovator',
    },
    {
      name: 'David Kim',
      role: 'Head of AI',
      image: DefaultTeamMember,
      bio: 'AI researcher with PhD in Machine Learning',
    },
    {
      name: 'Emma Wilson',
      role: 'Lead Developer',
      image: DefaultTeamMember,
      bio: 'Full-stack expert specializing in scalable solutions',
    },
  ];


  // Timeline data
  const timeline = [
    {
      year: '2024',
      title: 'Worked as a Freelancer',
      description: 'Started with a vision to transform businesses through technology',
    },
    {
      year: '2025',
      title: 'First Major Client',
      description: 'Successfully delivered a custom software solution for a local business, leading to 5x growth',
    },
    {
      year: '2026',
      title: 'AI Driven Startup',
      description: 'Expanded services to include AI application development, helping clients automate processes and enhance business intelligence',
    },
  ];


  // Stats data
  const stats = [
    { icon: Users, value: '25+', label: 'Happy Clients' },
    { icon: Award, value: '50+', label: 'Projects Completed' },
    { icon: Globe, value: '3+', label: 'Countries Served' },
    { icon: TrendingUp, value: '95%', label: 'Client Satisfaction' },
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
              Innovating the Future of
              <span className="block bg-clip-text">
                Business Technology
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              At Nexora Solution, we're committed to empowering businesses with cutting-edge technology
              solutions that drive growth, efficiency, and innovation in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="theme-card rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border theme-border-secondary"
              >
                <div className="w-12 h-12 theme-bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold theme-text-secondary mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="theme-bg-secondary rounded-3xl p-10 text-white shadow-2xl theme-shadow-secondary"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white text-lg leading-relaxed">
                To empower businesses worldwide with innovative technology solutions that drive digital
                transformation, enhance operational efficiency, and create sustainable competitive advantages
                in an ever-evolving digital landscape.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="theme-card rounded-3xl p-10 shadow-xl border theme-border-secondary"
            >
              <div className="w-14 h-14 theme-bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold theme-text-secondary mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the global leader in IT consulting and services, recognized for our commitment to
                innovation, excellence, and client success. We envision a future where every business,
                regardless of size, has access to enterprise-grade technology solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold theme-text-secondary mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Growing together with our clients</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 theme-line-secondary"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="theme-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border theme-border-secondary">
                      <div className="text-2xl font-bold theme-text-secondary mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold theme-text-secondary mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 theme-bg-secondary rounded-full relative z-10 shadow-lg theme-shadow-secondary"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

  
      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Constantly pushing boundaries and embracing new technologies',
              },
              {
                title: 'Excellence',
                description: 'Delivering superior quality in every project we undertake',
              },
              {
                title: 'Integrity',
                description: 'Building trust through transparency and ethical practices',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="theme-card rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow theme-border-secondary"
              >
                <div className="w-16 h-16 theme-bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg theme-shadow-secondary">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


