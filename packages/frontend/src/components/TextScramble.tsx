// src/components/TextScramble.tsx

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface TextScrambleProps {
  phrases: string[];
  className?: string;
  pauseDuration?: number;
  scrambleDuration?: number;
}

const TextScramble = ({ 
  phrases, 
  className,
  pauseDuration = 1500,
  scrambleDuration = 2
}: TextScrambleProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => phrases[textIndex].slice(0, latest));
  
  const controls = useRef<any>(null);

  useEffect(() => {
    const animateText = () => {
      const currentPhrase = phrases[textIndex];
      
      // Animate IN
      controls.current = animate(count, currentPhrase.length, {
        type: 'tween',
        duration: scrambleDuration,
        ease: 'easeInOut',
        onComplete: () => {
          // Pause for a moment after the phrase is complete
          setTimeout(() => {
            // Animate OUT (reverse the animation)
            controls.current = animate(count, 0, {
              type: 'tween',
              duration: scrambleDuration / 2, // Make the exit animation faster
              ease: 'easeInOut',
              onComplete: () => {
                // Move to the next phrase and reset the count
                setTextIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                count.set(0); 
              },
            });
          }, pauseDuration);
        },
      });

      return () => controls.current?.stop();
    };

    animateText();
  }, [textIndex, phrases, count, pauseDuration, scrambleDuration]);

  return (
    <motion.span className={className}>
      {displayText}
    </motion.span>
  );
};

export default TextScramble;