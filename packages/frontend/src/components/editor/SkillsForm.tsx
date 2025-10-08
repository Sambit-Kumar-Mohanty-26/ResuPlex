import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

const SkillsForm = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useResumeStore();

  return (
    <motion.div
      className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white">Skills</h2>
      <p className="mt-2 text-gray-400 text-sm">
        List your key technical and professional skills.
      </p>
      
      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center bg-white/10 rounded-full">
            <input
              type="text"
              placeholder="Skill (e.g., React)"
              className="w-32 sm:w-40 bg-transparent px-3 py-1.5 text-white focus:outline-none"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, e.target.value)}
            />
            <button
              onClick={() => deleteSkill(skill.id)}
              className="mr-2 text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        <button
          onClick={addSkill}
          className="flex items-center justify-center px-3 py-1.5 border-2 border-dashed border-white/20 rounded-full text-white 
                     hover:bg-white/5 hover:border-white/40 transition-all"
        >
          <PlusIcon className="h-4 w-4 mr-1" /> Add Skill
        </button>
      </div>
    </motion.div>
  );
};

export default SkillsForm;