import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EllipsisVerticalIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  thumbnail?: string | null;
}

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ResumeCard = ({ resume, onDelete, onDuplicate }: ResumeCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg 
                 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-indigo-500/10"
      variants={cardVariants}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-800 relative">
        {resume.thumbnail && !imageError ? (
          <img
            src={resume.thumbnail}
            alt={resume.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-white p-4 flex flex-col gap-3 opacity-90 transition-transform duration-500 group-hover:scale-105">
            <div className="flex gap-3 items-center border-b border-gray-200 pb-3">
               <div className="h-10 w-10 bg-indigo-100 rounded-full"></div>
               <div className="flex-1 space-y-1">
                 <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
                 <div className="h-1.5 w-1/2 bg-gray-200 rounded"></div>
               </div>
            </div>
            
            <div className="space-y-2 mt-1">
               <div className="h-1.5 w-1/4 bg-indigo-50 rounded"></div>
               <div className="h-1.5 w-full bg-gray-100 rounded"></div>
               <div className="h-1.5 w-5/6 bg-gray-100 rounded"></div>
               <div className="h-1.5 w-full bg-gray-100 rounded"></div>
            </div>

            <div className="space-y-2 mt-2">
               <div className="h-1.5 w-1/3 bg-indigo-50 rounded"></div>
               <div className="h-1.5 w-full bg-gray-100 rounded"></div>
               <div className="h-1.5 w-4/5 bg-gray-100 rounded"></div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
          </div>
        )}
      </div>
      <div 
        className="absolute top-4 right-4 z-20"
        tabIndex={0}
        onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsMenuOpen(false);
            }
        }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
        </button>

        {isMenuOpen && (
          <motion.div
            className="absolute top-12 right-0 w-48 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 z-30"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <Link 
                to={`/editor/${resume.id}`} 
                className="flex items-center w-full px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              <PencilIcon className="h-4 w-4 mr-3 text-indigo-400" /> Edit
            </Link>
            
            <button 
                onClick={() => {
                    onDuplicate(resume.id);
                    setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              <DocumentDuplicateIcon className="h-4 w-4 mr-3 text-blue-400" /> Duplicate
            </button>
            
            <div className="h-px bg-white/10 my-1 mx-2"></div>

            <button
              onClick={() => {
                onDelete(resume.id);
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <TrashIcon className="h-4 w-4 mr-3" /> Delete
            </button>
          </motion.div>
        )}
      </div>

      <div className="p-5 border-t border-white/5">
        <h3 className="font-bold text-lg text-white truncate">{resume.title}</h3>
        <p className="text-xs text-gray-400 mt-1 font-medium">Last edited {resume.updatedAt}</p>
      </div>
    </motion.div>
  );
};

export default ResumeCard;