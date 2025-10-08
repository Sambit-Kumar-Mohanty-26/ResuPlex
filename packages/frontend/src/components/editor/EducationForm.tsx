import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const EducationForm = () => {
  const { education, addEducation, updateEducation, deleteEducation } = useResumeStore();

  return (
    <motion.div
      className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white">Education</h2>
      
      <div className="space-y-6 mt-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border border-white/10 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree or Certificate"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="Institution"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location (e.g., Anytown, USA)"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
              />
              <input
                type="text"
                placeholder="Graduation Date (e.g., May 2024)"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteEducation(edu.id)}
                className="flex items-center text-sm text-red-400 hover:text-red-300"
              >
                <TrashIcon className="h-4 w-4 mr-1" /> Delete Education
              </button>
            </div>
          </div>
        ))}
        
        <button
          onClick={addEducation}
          className="w-full flex items-center justify-center p-3 border-2 border-dashed border-white/20 rounded-lg text-white 
                     hover:bg-white/5 hover:border-white/40 transition-all"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Add Education
        </button>
      </div>
    </motion.div>
  );
};

export default EducationForm;