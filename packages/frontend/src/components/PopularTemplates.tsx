import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';

const popularTemplates = [
  {
    image: '/images/templates/template-2.png',
    name: 'Creative Professional',
  },
  {
    image: '/images/templates/template-3.png',
    name: 'Tech Innovator',
  },
  {
    image: '/images/templates/template-1.png',
    name: 'Modern Minimalist',
  },
];

const containerVariants: Variants = {
  offscreen: { opacity: 1 },
  onscreen: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  offscreen: { opacity: 0, y: 50, rotateX: -45 },
  onscreen: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const PopularTemplates = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Trending Resume Designs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Get started with our most popular, recruiter-approved templates.
          </p>
        </motion.div>

        <div className="mt-16 [perspective:2000px]">
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
          >
            {popularTemplates.map((template, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Tilt
                  className="group relative"
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={2000}
                >
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 blur-lg transition-all duration-700 group-hover:opacity-75 group-hover:blur-xl"></div>
                  
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
            <Link
              to="/templates"
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transform hover:-translate-y-1 transition-all"
            >
              Explore All Templates
            </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTemplates;