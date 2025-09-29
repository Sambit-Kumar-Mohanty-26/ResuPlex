import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useState, type MouseEvent } from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarInitial: string;
  bgColor: string;
}

const cardVariants: Variants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const TestimonialCard = ({ quote, name, title, avatarInitial, bgColor }: TestimonialCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      ></motion.div>

      <div className="relative z-10">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5" />
          ))}
        </div>
        <blockquote className="mt-4 text-gray-600 italic flex-grow">
          "{quote}"
        </blockquote>
        <footer className="mt-6 flex items-center">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${bgColor}`}
          >
            {avatarInitial}
          </div>
          <div className="ml-4">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-gray-500 text-sm">{title}</p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;