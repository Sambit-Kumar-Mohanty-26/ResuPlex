import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const containerVariants: Variants = {
  offscreen: { opacity: 1 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const testimonials = [
  {
    quote: "I went from 2 interviews in 6 months to 5 interviews in 2 weeks after using ResuPlex. The AI suggestions were spot-on for tech roles.",
    name: 'Sarah Chen',
    title: 'Software Engineer at Google',
    avatarInitial: 'SC',
    bgColor: 'bg-blue-500',
  },
  {
    quote: "The job-specific tailoring is genius. I could see exactly what keywords I was missing and how to rewrite my experience. Landed my dream role!",
    name: 'Marcus Rodriguez',
    title: 'Marketing Manager at HubSpot',
    avatarInitial: 'MR',
    bgColor: 'bg-green-500',
  },
  {
    quote: "As someone who hates writing, the AI career coach was a lifesaver. It turned my boring bullet points into compelling achievements.",
    name: 'Emily Johnson',
    title: 'Project Manager at Microsoft',
    avatarInitial: 'EJ',
    bgColor: 'bg-purple-500',
  },
];

const SuccessStoriesSection = () => {
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
            Success stories from <span className="text-indigo-600">real job seekers</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Join thousands of professionals who've transformed their careers with ResuPlex.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              avatarInitial={testimonial.avatarInitial}
              bgColor={testimonial.bgColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;