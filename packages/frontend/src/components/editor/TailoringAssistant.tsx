import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import useResumeStore from '../../store/resumeStore';
import apiClient from '../../api';

interface Suggestion {
  experienceId: string;
  originalBullet: string;
  suggestedRewrite: string;
}
interface AnalysisResult {
  matchScore: number;
  missingKeywords: string[];
  suggestions: Suggestion[];
}

interface TailoringAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const TailoringAssistant = ({ isOpen, onClose }: TailoringAssistantProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [acceptedSuggestion, setAcceptedSuggestion] = useState<string | null>(null);
  
  const updateExperienceDescription = useResumeStore((state) => state.updateExperienceDescription);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysisResult(null);
    setError('');
    try {
      const currentResumeState = useResumeStore.getState();
      const response = await apiClient.post('/ai/tailor', {
        resumeData: currentResumeState,
        jobDescription: jobDescription,
      });
      setAnalysisResult(response.data);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: Suggestion) => {
    const currentExperience = useResumeStore.getState().experience;
    const experienceEntry = currentExperience.find(exp => exp.id === suggestion.experienceId);
    if (!experienceEntry) return;
    
    const bulletIndex = experienceEntry.description.indexOf(suggestion.originalBullet);
    
    if (bulletIndex !== -1) {
      updateExperienceDescription(suggestion.experienceId, bulletIndex, suggestion.suggestedRewrite);
      setAcceptedSuggestion(suggestion.originalBullet);
      setTimeout(() => {
        if (analysisResult) {
          setAnalysisResult({
            ...analysisResult,
            suggestions: analysisResult.suggestions.filter(s => s.originalBullet !== suggestion.originalBullet),
          });
        }
        setAcceptedSuggestion(null);
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-gray-800 border-l border-white/10 shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center">
                <SparklesIcon className="h-6 w-6 text-indigo-400 mr-3" />
                <h2 className="text-xl font-bold text-white">AI Tailoring Assistant</h2>
              </div>
              <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-gray-300">Paste a job description to get a match score and actionable feedback.</p>
              <div className="mt-6">
                <textarea
                  id="jobDescription"
                  rows={8}
                  className="mt-2 w-full bg-gray-900/50 border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading || jobDescription.length < 50}
                  className="w-full flex items-center justify-center px-6 py-3 text-white font-semibold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </div>
              {error && <p className="mt-4 text-center text-red-400">{error}</p>}
              
              {analysisResult && (
                <motion.div 
                  className="mt-8 space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    <h3 className="font-bold text-white">Match Score</h3>
                    <p className="text-5xl font-extrabold text-green-400 mt-2">{analysisResult.matchScore}%</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysisResult.missingKeywords.map(keyword => (
                        <span key={keyword} className="px-3 py-1 bg-yellow-500/10 text-yellow-300 text-sm rounded-full">{keyword}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Suggestions</h3>
                    <div className="space-y-4 mt-2">
                      <AnimatePresence>
                        {analysisResult.suggestions.map((s) => (
                          <motion.div 
                            key={s.originalBullet}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                          >
                            <div className="bg-white/5 p-4 rounded-lg">
                              <p className="text-xs text-gray-400">Original:</p>
                              <p className="text-gray-300 line-through text-sm">{s.originalBullet}</p>
                              <p className="text-xs text-green-400 mt-2">Suggestion:</p>
                              <p className="text-green-300 text-sm">{s.suggestedRewrite}</p>
                              <div className="text-right mt-3">
                                <button 
                                  onClick={() => handleAcceptSuggestion(s)} 
                                  disabled={acceptedSuggestion === s.originalBullet}
                                  className={`flex items-center ml-auto px-3 py-1 text-xs font-semibold text-white rounded-md transition-all duration-300
                                            ${acceptedSuggestion === s.originalBullet 
                                              ? 'bg-emerald-500'
                                              : 'bg-green-600 hover:bg-green-700'}`
                                  }
                                >
                                  <CheckCircleIcon className="h-4 w-4 mr-1.5"/>
                                  {acceptedSuggestion === s.originalBullet ? 'Accepted!' : 'Accept'}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TailoringAssistant;