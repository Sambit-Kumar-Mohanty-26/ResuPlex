// src/components/ParallaxTemplateCard.tsx

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Tilt from 'react-parallax-tilt';

interface ParallaxTemplateCardProps {
  image: string;
  name: string;
}

const ParallaxTemplateCard = ({ image, name }: ParallaxTemplateCardProps) => {
  // A ref to the card's container to track its position in the viewport
  const ref = useRef(null);
  
  // useScroll hook to track scroll progress of this specific component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Track from the moment it enters the viewport until it leaves
  });

  // useTransform to map scroll progress to a vertical movement (y-axis)
  // As the card moves from the bottom to the top of the screen, the image inside will move from -20% to +20%
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="group relative">
      <Tilt
        className="relative"
        perspective={1000}
        scale={1.05}
        transitionSpeed={2000}
      >
        {/* Animated Gradient Border on Hover */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 blur-lg transition-all duration-700 group-hover:opacity-75 group-hover:blur-xl z-0"></div>
        
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
          {/* The motion.img is the key to the parallax effect */}
          <motion.img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-[140%] object-cover" // Image is taller than the container
            style={{ y }} // Apply the animated vertical movement
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default ParallaxTemplateCard;