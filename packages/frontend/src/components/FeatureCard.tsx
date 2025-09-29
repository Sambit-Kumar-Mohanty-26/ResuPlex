import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Tilt
        className="parallax-effect-glare-scale group"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.25}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.05}
        transitionSpeed={1500}
      >
        <div
          className="relative p-8 h-full overflow-hidden bg-gray-50 rounded-2xl shadow-md 
                     transition-all duration-500 group-hover:shadow-2xl"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-400 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>

          <div 
            className="absolute -inset-8 bg-gradient-radial from-indigo-200 to-transparent 
                       rounded-full opacity-0 blur-xl group-hover:opacity-60 transition-opacity duration-700"
          ></div>

          <div className="inner-element relative z-10 flex flex-col h-full text-left">
            
            <div className="inline-flex items-center justify-start p-4 rounded-full w-48 bg-white 
                           shadow-sm group-hover:bg-white/20 transition-colors duration-300">
              <div className="text-indigo-600 group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
            </div>
            
            <h3 className="mt-6 text-xl font-bold text-gray-900 
                           group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            
            <p className="mt-2 text-base leading-relaxed flex-grow text-gray-600 
                           group-hover:text-white/80 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default FeatureCard;