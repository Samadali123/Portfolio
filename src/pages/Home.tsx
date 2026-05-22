import { Link } from 'react-router-dom';
import { Cloud, Brain, BarChart3, Code, ArrowRight, CheckCircle, Star, Zap, Shield, Users, Database } from 'lucide-react';
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
  SiOpenai,
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

const Home = () => {

  // Placeholder image for testimonials
  const DefaultClients = new URL('../assets/images/DefaultProfile.png', import.meta.url).href;


  // Services, Testimonials, Why Choose Us, and Tech Stack data
  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      icon: Brain,
      title: 'AI & Automation',
      description: 'Intelligent automation solutions powered by cutting-edge AI technology.',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      icon: BarChart3,
      title: 'Data Solutions',
      description: 'Transform your data into actionable insights with advanced analytics and Engineering.',
      gradient: 'from-orange-500 to-yellow-400',
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure tailored to your business needs.',
      gradient: 'from-blue-500 to-cyan-400',
    },
  ];




  // For Careers Page
  const testimonials = [
    {
      name: 'Dalima Gupta',
      // role: 'CEO at TechCorp',
      role: 'CEO',
      image: DefaultClients,
      content: 'Nexora transformed our cloud infrastructure. Their expertise and professionalism are unmatched.',
      rating: 4,
    },
    {
      name: 'Jyoti Mehta',
      // role: 'CTO at DataFlow',
      role: 'CTO',
      image: DefaultClients,
      content: 'The AI solutions provided by Nexora increased our efficiency by 300%. Highly recommended!',
      rating: 3,
    },
    {
      name: 'Jaydeep Parmar',
      // role: 'Director at InnovateLabs',
      role: 'Director',
      image: DefaultClients,
      content: 'Outstanding service and support. They truly understand business needs and deliver results.',
      rating: 4,
    },
  ];



  // For Careers Page
  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising quality',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Seasoned professionals with years of industry experience',
    },
    {
      icon: CheckCircle,
      title: '24/7 Support',
      description: 'Round-the-clock support for your peace of mind',
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
      { name: 'GenAI', icon: SiOpenai },
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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-text-secondary leading-tight">
              Empowering Businesses with
              <span className="block bg-clip-text">
                Smart Cloud & AI Solutions
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Transform your business with cutting-edge technology. We deliver scalable cloud infrastructure,
              intelligent automation, and data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact#appointment"
                className="px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl theme-shadow-secondary hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

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
                <Link to="/services">
                  <div className="group theme-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border theme-border-secondary">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold theme-text-secondary mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                  </div>
                </Link>
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
            <h2 className="text-4xl font-bold theme-text-secondary mb-4">Why Choose Nexora</h2>
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

      {/* Portfolio Spotlight Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-card rounded-3xl p-12 shadow-2xl border border-theme-secondary"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="uppercase tracking-[0.3em] text-sm font-semibold text-theme-secondary mb-4">
                  Recent Work
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold theme-text-secondary mb-6">
                  Explore professional case studies built for enterprise-grade impact.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Check our latest projects that showcase how strategic cloud, AI, and data solutions drive measurable results for modern businesses.
                </p>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 theme-bg-secondary text-white rounded-3xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span>View Portfolio</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="grid gap-4">
                <div className="theme-card rounded-3xl p-6 border border-theme-secondary bg-white shadow-lg">
                  <p className="font-semibold text-theme-secondary mb-2">Enterprise AI Automation</p>
                  <p className="text-gray-600">A modern workflow platform that reduced manual operations by 65%.</p>
                </div>
                <div className="theme-card rounded-3xl p-6 border border-theme-secondary bg-white shadow-lg">
                  <p className="font-semibold text-theme-secondary mb-2">Cloud Transformation</p>
                  <p className="text-gray-600">A scalable cloud architecture with improved resilience and cost efficiency.</p>
                </div>
                <div className="theme-card rounded-3xl p-6 border border-theme-secondary bg-white shadow-lg">
                  <p className="font-semibold text-theme-secondary mb-2">Data Intelligence</p>
                  <p className="text-gray-600">Analytics dashboards that turned data into executive decision intelligence.</p>
                </div>
              </div>
            </div>
          </motion.div>
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
              We use professional, enterprise-grade tooling across cloud, AI, data and web platforms.
            </p>
          </motion.div>

          <div className="space-y-12">

            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">FrontEnd Engineering</h3>
            {/* FrontEnd Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.frontend.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backend Technologies */}
            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">Backend Engineering</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.backend.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Databases */}

            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">Databases</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.databases.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cloud & Infrastructure */}
            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">Cloud & Infrastructure</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.infrastructure.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ai Engineering */}

            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">Ai Engineering</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.ai.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>




            {/* Data Tools */}

            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">Data Tools</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.data.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>



            {/* Mobile Engineering */}

            <h3 className="text-2xl font-bold theme-text-secondary mb-6 text-center">Mobile Engineering</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="theme-card rounded-3xl p-8 border border-theme-secondary"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {techStacks.mobile.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-theme-secondary">
                      <tech.icon className="w-8 h-8 theme-text-secondary" />
                    </div>
                    <span className="text-sm font-medium theme-text-secondary">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


