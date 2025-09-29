import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import PricingCard from './PricingCard';

const containerVariants: Variants = {
  offscreen: { opacity: 1 },
  onscreen: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const pricingPlans = [
  {
    plan: 'Free',
    price: '$0',
    description: 'Perfect for getting started.',
    features: [
      '1 resume template',
      'Basic AI suggestions',
      'PDF export',
      'Job match scoring',
      'Community support',
    ],
  },
  {
    plan: 'Professional',
    price: '$9.99',
    description: 'Everything you need for a successful job hunt.',
    features: [
      'Unlimited resume versions',
      'All premium templates',
      'Advanced AI rewriting',
      'Keyword gap analysis',
      'Cover letter generation',
    ],
    isFeatured: true,
  },
  {
    plan: 'Team',
    price: '$29.99',
    description: 'For HR teams and career centers.',
    features: [
      'Everything in Professional',
      'Up to 10 team members',
      'Bulk resume review',
      'Team analytics dashboard',
      'Custom branding',
    ],
  },
];

const PricingSection = () => {
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
            Choose your <span className="text-indigo-600">career acceleration</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Start free and upgrade when you're ready to supercharge your job search.
          </p>
        </motion.div>

         <motion.div
          className="mt-16 grid gap-10 lg:grid-cols-3 items-stretch"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan.plan}
              price={plan.price}
              description={plan.description}
              features={plan.features}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;