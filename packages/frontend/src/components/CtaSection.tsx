import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="bg-gray-800">
      <div className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-radial from-indigo-600/50 to-transparent rounded-full -translate-y-1/2 blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/50 to-transparent rounded-full -translate-y-1/2 blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        ></motion.div>
        
        <div className="relative z-10">
          <motion.h2 
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ready to land your dream job with ResuPlex?
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join thousands of professionals who've transformed their careers with our AI-powered resume builder.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to="/register"
              className="mt-8 inline-block px-10 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Build My Resume with ResuPlex &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;