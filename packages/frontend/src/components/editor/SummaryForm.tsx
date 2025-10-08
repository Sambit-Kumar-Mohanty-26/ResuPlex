import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';

const SummaryForm = () => {
  const summary = useResumeStore((state) => state.summary);
  const updateField = useResumeStore((state) => state.updateField);

  return (
    <motion.div
      className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white">Professional Summary</h2>
      <p className="mt-2 text-gray-400 text-sm">
        Write a 2-4 sentence summary to highlight your top skills and accomplishments.
      </p>
      <div className="mt-6">
        <textarea
          rows={5}
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="e.g., A highly motivated and results-oriented Software Engineer..."
          value={summary}
          onChange={(e) => updateField('summary', e.target.value)}
        />
      </div>
    </motion.div>
  );
};

export default SummaryForm;