'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen theme-page-bg flex items-center justify-center pt-32 pb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Animated 404 Display */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <div className="relative mb-8">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-64 h-64 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-full filter blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* Main 404 Text */}
            <motion.div
              className="relative z-10"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <h1 className="text-8xl md:text-9xl font-black theme-text-secondary bg-clip-text mb-4">
                404
              </h1>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold theme-text-secondary mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl theme-text-muted mb-6">
              Sorry, the page you are looking for does not exist. It might have been moved or deleted.
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Illustration */}
        <motion.div
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-32 h-32 theme-bg-secondary rounded-full opacity-20 absolute -inset-4 blur-xl" />
            <div className="relative z-10 text-center">
              <Search className="w-24 h-24 theme-text-secondary mx-auto mb-4" />
              <p className="theme-text-secondary font-semibold">Page Lost in Space</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 theme-bg-secondary text-white rounded-3xl font-bold shadow-lg theme-shadow-secondary hover:cursor-pointer hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
          </Link>


          <motion.button
            onClick={() => {
              router.back()
            }}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent theme-text-secondary border-2 theme-border-secondary rounded-3xl font-bold shadow-md hover:cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>

        </motion.div>


        {/* Bottom Message */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <p className="theme-text-muted">
            If you think this is a mistake, <Link href="/contact" className="theme-text-secondary font-bold hover:underline">contact us</Link>.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
