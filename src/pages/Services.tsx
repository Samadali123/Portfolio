import { motion } from 'framer-motion';
import { Code, Brain, BarChart3, Briefcase, CheckCircle } from 'lucide-react';

const Services = () => {

  // Services data
  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom software solutions built with cutting-edge technologies and best practices.',
      features: [
        'Custom Web Applications',
        'E-commerce Solutions',
        'Progressive Web Apps (PWA)',
        'SaaS Platforms',
        'Mobile Applications (iOS & Android)',
        'API Development & Integration',
      ],
      impacts: [
        'Modern, user-friendly interfaces',
        'Mobile-first approach',
        'SEO optimized',
        'Scalable architecture',
      ],
    },
    {
      icon: Brain,
      title: 'AI Application Development',
      description: 'Intelligent solutions powered by cutting-edge artificial intelligence technology.',
      features: [
        'Machine Learning Models',
        'Process Automation (RPA)',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Predictive Analytics',
        'AI Integration & Deployment',
      ],
      impacts: [
        'Increase efficiency by 300%',
        'Reduce operational costs',
        'Improve decision-making accuracy',
        'Scale operations effortlessly',
      ],
    },
    {
      icon: BarChart3,
      title: 'Data Driven Solutions',
      description: 'Transform raw data into actionable insights with advanced analytics and engineering.',
      features: [
        'Business Intelligence (BI)',
        'Data Visualization',
        'Data Engineering',
        'Big Data Processing',
        'Real-time Analytics',
        'Machine Learning Pipelines',
      ],
      impacts: [
        'Data-driven decision making',
        'Identify new opportunities',
        'Optimize business processes',
        'Predict market trends',
      ],
    },
    {
      icon: Briefcase,
      title: 'Business Consultation',
      description: 'Strategic guidance for cloud solutions, system design, and digital transformation.',
      features: [
        'Cloud Migration & Strategy',
        'System Design & Architecture',
        'Infrastructure as a Service (IaaS)',
        'Cloud Security & Compliance',
        'Multi-Cloud Management',
        'Digital Transformation Strategy',
      ],
      impacts: [
        'Reduced IT costs by up to 40%',
        'Improved scalability and flexibility',
        'Enhanced disaster recovery',
        'Future-proof infrastructure',
      ],
    },
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
              Comprehensive IT Solutions
              <span className="block bg-clip-text">
                for Your Business
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              We provide end-to-end technology solutions to help businesses thrive in the digital age.
              Our expert team delivers innovative, scalable, and secure services tailored to your unique needs.
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
  before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-[var(--color-secondary)]
  before:transition-all before:duration-800 before:ease-in-out
  hover:before:h-full">

                <div className="relative z-10 theme-card rounded-3xl p-8 lg:p-10">
                  <div className="w-16 h-16 theme-bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    {service.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    Key Features
                  </h3>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300 group-hover:text-[var(--color-primary)]" />
                        <span className="text-gray-700 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                          {feature}
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


