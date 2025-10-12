import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import ResumeCard from '../components/ResumeCard';
import type { Resume } from '../components/ResumeCard';
import { PlusIcon } from '@heroicons/react/24/solid';
import apiClient from '../api';
import useResumeStore, { initialResumeState } from '../store/resumeStore';
import ConfirmationModal from '../components/ConfirmationModal';
import EmptyState from '../components/EmptyState';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const setResumeState = useResumeStore((state) => state.setResumeState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/resumes');
      const formattedResumes = response.data.map((r: any) => ({
        id: r.id,
        title: r.title,
        updatedAt: new Date(r.updatedAt).toLocaleDateString(),
        thumbnail: `/images/templates/template-${(parseInt(r.id.slice(-1), 16) % 3) + 1}.png`,
      }));
      setResumes(formattedResumes);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
      toast.error('Could not load your resumes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateNew = async () => {
    try {
      setResumeState(initialResumeState);
      const response = await apiClient.post('/resumes', { title: 'Untitled Resume' });
      const newResume = response.data;
      navigate(`/editor/${newResume.id}`);
    } catch (error) {
      console.error('Failed to create new resume:', error);
      toast.error('Failed to create a new resume.');
    }
  };

  const handleDeleteClick = (id: string) => {
    setResumeToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!resumeToDelete) return;
    const toastId = toast.loading('Deleting resume...');
    try {
      await apiClient.delete(`/resumes/${resumeToDelete}`);
      toast.success('Resume deleted successfully!', { id: toastId });
      fetchResumes();
    } catch (error) {
      console.error('Failed to delete resume:', error);
      toast.error('Failed to delete resume.', { id: toastId });
    } finally {
      setIsModalOpen(false);
      setResumeToDelete(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    const toastId = toast.loading('Duplicating resume...');
    try {
      const response = await apiClient.get(`/resumes/${id}`);
      const resumeToDuplicate = response.data;
      const newTitle = `${resumeToDuplicate.title} (Copy)`;
      const createResponse = await apiClient.post('/resumes', { title: newTitle });
      const newResume = createResponse.data;
      
      await apiClient.put(`/resumes/${newResume.id}`, {
        ...resumeToDuplicate,
        title: newTitle,
      });

      toast.success('Resume duplicated!', { id: toastId });
      fetchResumes();
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
      toast.error('Failed to duplicate resume.', { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Resumes</h1>
          <p className="mt-2 text-gray-300">Welcome back, {user?.name || user?.email || 'User'}!</p>
        </div>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <p className="text-white text-center py-20">Loading your resumes...</p>
        ) : resumes.length === 0 ? (
          <EmptyState onActionClick={handleCreateNew} />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              onClick={handleCreateNew}
              className="group cursor-pointer relative flex aspect-[3/4] items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <div className="text-center">
                <PlusIcon className="mx-auto h-12 w-12 text-white/50 transition-colors group-hover:text-white" />
                <h3 className="mt-2 text-lg font-bold text-white">Create New Resume</h3>
              </div>
            </motion.div>

            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={handleDeleteClick}
                onDuplicate={handleDuplicate}
              />
            ))}
          </motion.div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Resume"
        message="Are you sure you want to permanently delete this resume? This action cannot be undone."
      />
    </div>
  );
};

export default DashboardPage;