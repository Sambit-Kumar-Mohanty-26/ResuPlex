import { motion } from 'framer-motion';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  onActionClick: () => void; 
}

const EmptyState = ({ onActionClick }: EmptyStateProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-12 bg-white/5 rounded-2xl border-2 border-dashed border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DocumentPlusIcon className="h-16 w-16 text-white/30" />
      <h3 className="mt-6 text-2xl font-bold text-white">
        Your Resume Library is Empty
      </h3>
      <p className="mt-2 max-w-sm text-gray-400">
        It looks like you haven't created any resumes yet. Let's build your first one and start landing interviews.
      </p>
      <button
        onClick={onActionClick}
        className="mt-8 px-6 py-3 text-white font-semibold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors transform hover:scale-105"
      >
        Create Your First Resume
      </button>
    </motion.div>
  );
};

export default EmptyState;