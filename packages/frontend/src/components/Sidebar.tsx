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
  const user = useAuthStore((state) => state.user);
  const logoutAction = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    navigate('/login'); 
  };

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      className="hidden md:flex flex-col w-24 bg-black/10 backdrop-blur-2xl border-r border-white/10"
      initial={{ x: -96, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}  // A more refined ease
    >
      <motion.div
        className="flex flex-col h-full p-4"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="w-full mb-8">
          <Logo variant="dark" />
        </motion.div>

        <nav className="flex flex-col items-center space-y-4">
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `group relative flex items-center justify-center h-14 w-14 rounded-2xl text-gray-300 
                   transition-all duration-300
                   ${isActive ? 'bg-indigo-500 text-white' : 'hover:bg-white/10 hover:text-white'}`
                }
              >
                <item.icon className="h-7 w-7 transform group-hover:scale-110 transition-transform" />

                <div className="absolute left-full ml-4 px-3 py-1.5 whitespace-nowrap bg-gray-800 text-white text-sm font-semibold 
                                rounded-md shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                                transition-all duration-200 origin-left pointer-events-none">
                  {item.name}
                </div>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <motion.div variants={itemVariants} className="mt-auto group relative flex justify-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg cursor-pointer">
            {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="absolute left-full bottom-0 ml-4 p-4 whitespace-nowrap bg-gray-800/80 backdrop-blur-md 
                          rounded-lg shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                          transition-all duration-200 origin-left pointer-events-none">
            <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
            <button
              onClick={handleLogout}
              className="w-full mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;