import { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/solid';
import apiClient from '../../api';
import SuggestionsModal from './SuggestionsModal';

const ExperienceForm = () => {
  const { 
    experience, 
    addExperience, 
    updateExperience, 
    deleteExperience, 
    updateExperienceDescription 
  } = useResumeStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<{ expId: string; index: number } | null>(null);

  const handleEnhanceClick = async (expId: string, index: number, currentText: string) => {
    setCurrentTarget({ expId, index });
    setIsModalOpen(true);
    setIsLoadingAi(true);
    setSuggestions([]);

    try {
      const response = await apiClient.post('/ai/enhance-bullet', { text: currentText });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (currentTarget) {
      updateExperienceDescription(currentTarget.expId, currentTarget.index, suggestion);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white">Work Experience</h2>
        
        <div className="space-y-8 mt-6">
          {experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-white/10 rounded-lg space-y-4">
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Key Responsibilities</label>
                {exp.description.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2">
                    <textarea
                      rows={2}
                      className="w-full bg-white/5 p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={point}
                      onChange={(e) => updateExperienceDescription(exp.id, pointIndex, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleEnhanceClick(exp.id, pointIndex, point)}
                      className="p-2 text-yellow-400 hover:text-yellow-300 rounded-full hover:bg-white/10 transition-colors"
                      title="Improve with AI"
                    >
                      <SparklesIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
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

      <SuggestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        suggestions={suggestions}
        onSelect={handleSelectSuggestion}
        isLoading={isLoadingAi}
      />
    </>
  );
};

export default ExperienceForm;