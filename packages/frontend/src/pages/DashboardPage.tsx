import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import ResumeCard from '../components/ResumeCard';
import type { Resume } from '../components/ResumeCard'; 
import { PlusIcon } from '@heroicons/react/24/solid';

const placeholderResumes: Resume[] = [
  {
    id: '1',
    title: 'Software Engineer @ Google',
    updatedAt: '2 days ago',
    thumbnail: '/images/templates/template-1.png',
  },
  {
    id: '2',
    title: 'Product Manager @ Figma',
    updatedAt: '1 week ago',
    thumbnail: '/images/templates/template-2.png',
  },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};


const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Resumes</h1>
          <p className="mt-2 text-gray-300">
            Welcome back, {user?.name || user?.email || 'User'}!
          </p>
        </div>
      </div>

      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="group relative flex aspect-[3/4] items-center justify-center 
                     rounded-2xl border-2 border-dashed border-white/20 bg-white/5 
                     transition-all duration-300 hover:border-white/40 hover:bg-white/10"
        >
          <div className="text-center">
            <PlusIcon className="mx-auto h-12 w-12 text-white/50 transition-colors group-hover:text-white" />
            <h3 className="mt-2 text-lg font-bold text-white">Create New Resume</h3>
          </div>
        </motion.div>

        {placeholderResumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardPage;