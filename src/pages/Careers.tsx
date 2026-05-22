import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Heart,
  Target,
  TrendingUp,
  Award,
  Code,
  Zap,
  Globe,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const Careers = () => {

  // Job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120K - $150K",
      description: "Build stunning user interfaces with React and TypeScript",
      icon: Code,
      required: ["React", "TypeScript", "Tailwind CSS", "5+ years experience"],
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      department: "AI & Data",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140K - $180K",
      description: "Develop cutting-edge AI solutions and machine learning models",
      icon: Lightbulb,
      required: ["Python", "TensorFlow/PyTorch", "ML Algorithms", "4+ years experience"],
    },
    {
      id: 3,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100K - $130K",
      description: "Create scalable web applications from frontend to backend",
      icon: Globe,
      required: ["Node.js", "React", "Databases", "3+ years experience"],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$110K - $145K",
      description: "Manage cloud infrastructure and deployment pipelines",
      icon: Zap,
      required: ["Docker", "Kubernetes", "AWS/GCP", "4+ years experience"],
    },
    {
      id: 5,
      title: "Data Scientist",
      department: "AI & Data",
      location: "Remote",
      type: "Full-time",
      salary: "$130K - $160K",
      description: "Transform data into actionable insights and solutions",
      icon: TrendingUp,
      required: ["Python", "SQL", "Statistics", "3+ years experience"],
    },
    {
      id: 6,
      title: "Product Manager",
      department: "Product",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$115K - $155K",
      description: "Lead product strategy and drive innovation",
      icon: Target,
      required: ["Product Strategy", "Analytics", "Leadership", "5+ years experience"],
    },
  ];


  // Benefits data
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, fitness stipends, and mental health support",
    },
    {
      icon: TrendingUp,
      title: "Professional Growth",
      description: "Learning budget, conferences, certifications, and mentorship programs",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented teams in a supportive and inclusive environment",
    },
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Market-competitive salaries, stock options, and performance bonuses",
    },
    {
      icon: Globe,
      title: "Work Flexibility",
      description: "Remote-friendly positions, flexible schedules, and unlimited PTO",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "20% time for side projects and idea experimentation",
    },
  ];



  // Culture values data
  const cultureValues = [
    {
      title: "Innovation",
      description: "We push boundaries and embrace new technologies",
    },
    {
      title: "Integrity",
      description: "We do the right thing, always",
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork",
    },
    {
      title: "Excellence",
      description: "We strive for the highest quality in everything",
    },
  ];


  // Animation variantsn
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };


  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen theme-page-bg pt-32 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold theme-text-secondary mb-6">
            Careers at Nexora Solution
          </h1>
          <p className="text-lg md:text-xl theme-text-muted mb-8 max-w-2xl mx-auto">
            Join Nexora Solution and be part of a team transforming industries with innovative AI,
            cloud, and data solutions. We''re looking for talented individuals who are passionate about
            technology and making an impact.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 theme-bg-secondary text-white rounded-3xl font-medium shadow-lg theme-shadow-secondary hover:shadow-xl transition-all duration-300"
          >
            <Link to="/view-openings" className="flex items-center gap-2">
              View Open Positions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.button>
        </motion.div>
      </section>

      {/* Culture Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold theme-text-secondary text-center mb-12">
            Our Culture & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-transparent rounded-xl theme-shadow-secondary border-2 theme-border-secondary border-opacity-20"
              >
                <h3 className="text-xl font-bold theme-text-secondary mb-3">{value.title}</h3>
                <p className="theme-text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 rounded-2xl py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold theme-text-secondary text-center mb-12">
            Why Join Nexora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-transparent p-8 rounded-xl shadow-md duration-300 border"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 theme-bg-secondary rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold theme-text-secondary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="theme-text-muted text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

   

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-12 md:p-16 text-center bg-transparent theme-shadow-secondary"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don''t See Your Role? We''re Always Hiring!
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Send us your resume and tell us what you''d like to build with us.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 theme-text-secondary rounded-3xl font-bold shadow-lg hover:shadow-xl hover:cursor-pointer hover:border transition-all duration-300"
          >
            <Link to="/contact">Get in Touch</Link>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Careers;
