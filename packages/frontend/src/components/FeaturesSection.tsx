import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SparklesIcon, AdjustmentsHorizontalIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import FeatureCard from './FeatureCard';

const containerVariants: Variants = {
  offscreen: { opacity: 1 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const features = [
  {
    icon: <SparklesIcon className="h-8 w-8" />,
    title: 'AI-Powered Writing',
    description: 'Intelligent content generation that crafts compelling bullet points and summaries tailored to your experience.',
  },
  {
    icon: <AdjustmentsHorizontalIcon className="h-8 w-8" />,
    title: 'Job-Specific Tailoring',
    description: 'Automatically adapt your resume for each application with industry-specific keywords and formatting.',
  },
  {
    icon: <DocumentTextIcon className="h-8 w-8" />,
    title: 'Professional Templates',
    description: 'Choose from designer-crafted templates that pass ATS systems and impress hiring managers.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why Choose ResuPlex?
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3 items-stretch"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;