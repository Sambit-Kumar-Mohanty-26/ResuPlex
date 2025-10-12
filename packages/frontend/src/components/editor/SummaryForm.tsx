import { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import apiClient from '../../api';

const SummaryForm = () => {
  const { summary, jobTitle, experience, updateField } = useResumeStore();
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleGenerateSummary = async () => {
    if (experience.length === 0) {
      alert("Please add at least one work experience to generate a summary.");
      return;
    }

    setIsLoadingAi(true);
    try {
      const response = await apiClient.post('/ai/generate-summary', {
        workExperience: experience,
        jobTitle: jobTitle,
      });
      updateField('summary', response.data.summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <motion.div
      className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Professional Summary</h2>
          <p className="mt-2 text-gray-400 text-sm">
            Write a 2-4 sentence summary to highlight your top skills.
          </p>
        </div>
        <button
          onClick={handleGenerateSummary}
          disabled={isLoadingAi}
          className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg 
                     shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoadingAi ? (
            <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <SparklesIcon className="h-5 w-5 mr-2" />
          )}
          Generate with AI
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300">
            What is your target job title?
          </label>
          <input
            type="text"
            id="jobTitle"
            className="mt-1 block w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Senior Software Engineer"
            value={jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-300">
            Your Summary
          </label>
          <textarea
            id="summary"
            rows={5}
            className="mt-1 w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Click 'Generate with AI' or write your own summary..."
            value={summary}
            onChange={(e) => updateField('summary', e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryForm;