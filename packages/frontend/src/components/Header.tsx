import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition'; 
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#4F46E5' : '#374151', 
  });

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrollY > 10
          ? 'bg-white/80 backdrop-blur-md shadow-md'
          : 'bg-transparent shadow-none'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo className="h-8 w-auto" />

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/features" style={navLinkStyles} className="font-medium hover:text-indigo-600 transition-colors">
              Features
            </NavLink>
            <NavLink to="/how-it-works" style={navLinkStyles} className="font-medium hover:text-indigo-600 transition-colors">
              How It Works
            </NavLink>
            <NavLink to="/success-stories" style={navLinkStyles} className="font-medium hover:text-indigo-600 transition-colors">
              Success Stories
            </NavLink>
            <NavLink to="/pricing" style={navLinkStyles} className="font-medium hover:text-indigo-600 transition-colors">
              Pricing
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-white font-semibold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Start Free Trial
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4"
          >
            <NavLink to="/features" style={navLinkStyles} onClick={() => setIsMenuOpen(false)}>Features</NavLink>
            <NavLink to="/how-it-works" style={navLinkStyles} onClick={() => setIsMenuOpen(false)}>How It Works</NavLink>
            <NavLink to="/success-stories" style={navLinkStyles} onClick={() => setIsMenuOpen(false)}>Success Stories</NavLink>
            <NavLink to="/pricing" style={navLinkStyles} onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>
            <hr />
            <Link to="/login" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
            <Link to="/register" className="w-full text-center px-5 py-2 text-white font-semibold bg-indigo-600 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Start Free Trial
            </Link>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;