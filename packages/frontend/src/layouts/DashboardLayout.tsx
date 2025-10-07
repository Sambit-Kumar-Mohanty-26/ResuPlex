// src/layouts/DashboardLayout.tsx

import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar'; // This is our "Floating Glass Dock"

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 overflow-hidden">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          className="absolute top-0 left-1/4 h-[500px] w-[500px] bg-gradient-to-br from-indigo-500 to-transparent rounded-full blur-3xl"
          animate={{ x: [-200, 200, -200], y: [100, -100, 100], scale: [1, 1.2, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-[500px] w-[500px] bg-gradient-to-tl from-purple-500 to-transparent rounded-full blur-3xl"
          animate={{ x: [200, -200, 200], y: [-100, 100, -100], scale: [1, 1.1, 1] }}
          transition={{ duration: 55, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
      </div>

      {/* Main Layout using Flexbox */}
      <div className="relative z-10 flex h-screen">
        
        {/* Sidebar Wrapper: flex-shrink-0 prevents it from shrinking */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        {/* The 'md:ml-24' is the key fix. It adds a left margin on medium screens
            and up, equal to the sidebar's width, preventing overlap. */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto md:ml-24">
          
          {/* Framer Motion wrapper for page content transitions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* The actual page component (e.g., DashboardPage) will be rendered here by the router */}
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;