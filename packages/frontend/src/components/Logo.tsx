// src/components/Logo.tsx

import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  useGradient?: boolean;
}

const Logo = ({ className = '', variant = 'light', useGradient = false }: LogoProps) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-800';
  const plexColor = variant === 'dark' ? 'text-indigo-400' : 'text-indigo-600';

  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <img 
        // === THE ONLY CHANGE IS ON THIS LINE ===
        src="/images/ResuPlex-logo.png" // <-- Change this to the name of your new logo file
        alt="ResuPlex Logo"
        className={`h-8 w-auto ${variant === 'dark' ? 'brightness-200' : ''}`}
      />
      {useGradient ? (
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
          ResuPlex
        </span>
      ) : (
        <span className={`text-2xl font-bold ${textColor}`}>
          Resu<span className={plexColor}>Plex</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;