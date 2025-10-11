import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EllipsisVerticalIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  thumbnail: string;
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

  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg 
                 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-indigo-500/10"
      variants={cardVariants}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={resume.thumbnail}
          alt={resume.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div 
        className="absolute top-4 right-4 z-20"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsMenuOpen(false);
          }
        }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
        </button>

        {isMenuOpen && (
          <motion.div
            className="absolute top-12 right-0 w-48 bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl py-2 z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to={`/editor/${resume.id}`} className="flex items-center w-full px-4 py-2 text-sm text-gray-200 text-left hover:bg-white/10">
              <PencilIcon className="h-5 w-5 mr-3" /> Edit
            </Link>

            <button
              onClick={() => {
                onDelete(resume.id);
                setIsMenuOpen(false); 
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-red-400 text-left hover:bg-red-500 hover:text-white"
            >
              <TrashIcon className="h-5 w-5 mr-3" /> Delete
            </button>
            <button
              onClick={() => {
                onDuplicate(resume.id);
                setIsMenuOpen(false);
              }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 text-left hover:bg-white/10"
            >
                <DocumentDuplicateIcon className="h-5 w-5 mr-3" /> Duplicate
            </button>
          </motion.div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-white truncate">{resume.title}</h3>
        <p className="text-sm text-gray-300 mt-1">Updated {resume.updatedAt}</p>
      </div>
    </motion.div>
  );
};

export default ResumeCard;