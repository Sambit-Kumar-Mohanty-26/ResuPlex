
interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

const AnimatedGradientText = ({ text, className }: AnimatedGradientTextProps) => {
  return (
    <span 
      className={`
        text-transparent bg-clip-text 
        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
        bg-[length:200%_auto] 
        animate-gradient-pan 
        ${className}
      `}
    >
      {text}
    </span>
  );
};

export default AnimatedGradientText;