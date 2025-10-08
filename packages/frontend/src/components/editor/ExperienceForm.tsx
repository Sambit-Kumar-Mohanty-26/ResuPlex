import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const ExperienceForm = () => {
  const { experience, addExperience, updateExperience, deleteExperience, updateExperienceDescription } = useResumeStore();

  return (
    <motion.div
      className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white">Work Experience</h2>
      
      <div className="space-y-8 mt-6">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 border border-white/10 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Start Date (e.g., Jan 2025)"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
              <input
                type="text"
                placeholder="End Date (e.g., Present)"
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium text-gray-300">Key Responsibilities (one per line)</label>
              <textarea
                rows={4}
                placeholder="- Managed a team of 5 engineers..."
                className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={exp.description.join('\n')}
                onChange={(e) => {
                  const bullets = e.target.value.split('\n');
                  bullets.forEach((bullet, index) => {
                    updateExperienceDescription(exp.id, index, bullet);
                  });
                }}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteExperience(exp.id)}
                className="flex items-center text-sm text-red-400 hover:text-red-300"
              >
                <TrashIcon className="h-4 w-4 mr-1" /> Delete Experience
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addExperience}
          className="w-full flex items-center justify-center p-3 border-2 border-dashed border-white/20 rounded-lg text-white 
                     hover:bg-white/5 hover:border-white/40 transition-all"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Add Experience
        </button>
      </div>
    </motion.div>
  );
};

export default ExperienceForm;