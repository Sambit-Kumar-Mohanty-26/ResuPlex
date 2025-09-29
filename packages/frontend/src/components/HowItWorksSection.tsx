import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; 
import { ArrowDownTrayIcon, SparklesIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    icon: <ArrowUpOnSquareIcon className="h-8 w-8 text-indigo-600" />,
    title: 'Input Your Info',
    description: 'Let our intuitive editor guide you or import directly from LinkedIn to get started instantly.',
  },
  {
    icon: <SparklesIcon className="h-8 w-8 text-indigo-600" />,
    title: 'Enhance with AI',
    description: 'Our AI instantly rewrites bullet points, generates summaries, and optimizes your resume for your target role.',
  },
  {
    icon: <ArrowDownTrayIcon className="h-8 w-8 text-indigo-600" />,
    title: 'Download & Apply',
    description: 'Export a pixel-perfect PDF and start applying with confidence to your dream positions.',
  },
];

const lineVariants: Variants = {
  offscreen: { height: "0%" }, 
  onscreen: { 
    height: "100%",
    transition: { duration: 1, ease: "easeInOut" }
  },
};

const itemVariants: Variants = {
  offscreen: { opacity: 0, y: 20 },
  onscreen: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

const HowItWorksSection = () => {
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
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            From zero to hired in minutes. Our streamlined process makes resume building effortless.
          </p>
        </motion.div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative">
            <motion.div 
              className="absolute top-6 left-6 h-full w-0.5 bg-indigo-200"
              style={{ top: '24px', left: '24px' }} 
              variants={lineVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            ></motion.div>

            <motion.div 
              className="space-y-12"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.4 }}
            >
              {steps.map((step, index) => (
                <motion.div key={index} className="flex items-start relative z-10" variants={itemVariants}>
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">{index + 1}</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-3 rounded-full">{step.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;