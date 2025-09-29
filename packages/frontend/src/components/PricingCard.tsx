import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  plan: string;
  price: string;
  description: string;
  features: string[];
}

const cardVariants: Variants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const PricingCard = ({ plan, price, description, features }: PricingCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative h-full transform transition-transform duration-300 hover:-translate-y-2"
    >
      <div 
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                   opacity-0 blur-lg transition-all duration-1000 group-hover:opacity-75 group-hover:blur-xl"
      ></div>

      <div className="relative p-8 bg-white rounded-2xl h-full flex flex-col shadow-md">
        <h3 className="text-2xl font-bold text-gray-900">{plan}</h3>
        <p className="mt-4 text-gray-600">
          {description}
        </p>
        <div className="mt-6">
          <span className="text-5xl font-extrabold text-gray-900">{price}</span>
          <span className="ml-2 text-lg text-gray-500">
            {plan !== 'Free' ? '/month' : '/forever'}
          </span>
        </div>
        <ul className="mt-8 space-y-4 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="h-6 w-6 mr-3 text-indigo-500" />
              <span className="text-gray-800">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/register"
          className="block w-full mt-10 px-6 py-3 text-center font-semibold rounded-lg text-indigo-600 bg-indigo-50
                     transition-colors duration-300 hover:bg-indigo-100"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingCard;