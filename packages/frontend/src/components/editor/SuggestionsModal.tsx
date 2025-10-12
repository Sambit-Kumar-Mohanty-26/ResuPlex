import { motion, AnimatePresence } from 'framer-motion';
import { LightBulbIcon } from '@heroicons/react/24/solid';

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isLoading: boolean;
}

const SuggestionsModal = ({ isOpen, onClose, suggestions, onSelect, isLoading }: SuggestionsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} 
        >
          <motion.div
            className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="p-6 border-b border-white/10 flex items-center">
              <LightBulbIcon className="h-6 w-6 text-yellow-400 mr-3" />
              <h2 className="text-xl font-bold">AI Suggestions</h2>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <p className="ml-4 text-gray-300">Generating ideas...</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => onSelect(suggestion)}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer 
                                 hover:bg-indigo-500/50 hover:border-indigo-500 transition-all"
                    >
                      <p className="text-gray-200">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuggestionsModal;