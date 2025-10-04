// src/layouts/DashboardLayout.tsx

import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 overflow-hidden">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div
          className="absolute top-0 left-1/4 h-96 w-96 bg-gradient-to-br from-indigo-500 to-transparent rounded-full blur-3xl"
          animate={{ x: [-150, 150, -150], y: [50, -50, 50], scale: [1, 1.2, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-96 w-96 bg-gradient-to-tl from-purple-500 to-transparent rounded-full blur-3xl"
          animate={{ x: [150, -150, 150], y: [-50, 50, -50], scale: [1, 1.1, 1] }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 flex h-screen">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Outlet /> {/* This is where the page content (e.g., DashboardPage) will be rendered */}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;