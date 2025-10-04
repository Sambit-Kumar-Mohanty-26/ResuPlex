// src/components/Sidebar.tsx

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Logo from './Logo';
import useAuthStore from '../store/authStore';

const navItems = [
  { name: 'My Resumes', href: '/dashboard', icon: DocumentDuplicateIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState('');
  const user = useAuthStore((state) => state.user);
  const logoutAction = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    navigate('/login');
  };

  return (
    <motion.aside
      className="hidden md:flex flex-col w-64 bg-white/5 backdrop-blur-xl border-r border-white/10"
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="p-6 border-b border-white/10">
        <Logo variant="dark" />
      </div>

      <nav className="flex-1 p-4 relative">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem('')}
            className="relative flex items-center px-4 py-3 my-2 text-gray-300 rounded-lg hover:text-white transition-colors"
          >
            {/* Animated Pill Background */}
            {hoveredItem === item.name && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white/10 rounded-lg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Icon and Text */}
            <item.icon className="h-6 w-6 mr-4 relative z-10" />
            <span className="relative z-10 font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile / Logout */}
      <div className="p-6 mt-auto border-t border-white/10">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;