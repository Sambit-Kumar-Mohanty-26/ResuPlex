import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Craft Your Future.
              <br />
              <span className="text-indigo-600">Land Your Dream Job.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              ResuPlex uses AI to build a perfectly tailored resume in minutes. Get noticed by recruiters and accelerate your career.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Create My Resume for Free
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 lg:p-6 transform hover:-rotate-2 transition-transform duration-500">
              <img
                src="/images/hero-image.png"
                alt="AI-powered resume creation"
                className="rounded-xl w-full h-auto"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;