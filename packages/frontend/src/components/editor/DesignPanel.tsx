// src/components/editor/DesignPanel.tsx

import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { PaintBrushIcon } from '@heroicons/react/24/solid';

const colors = [
  '#4F46E5',
  '#DC2626',
  '#16A34A',
  '#2563EB',
  '#D97706',
  '#9333EA',
  '#EC4899',
  '#000000',
];

const DesignPanel = () => {
  const theme = useResumeStore((state) => state.theme);
  const updateTheme = useResumeStore((state) => state.updateTheme);

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center mb-6 border-b border-white/10 pb-4">
        <PaintBrushIcon className="h-5 w-5 text-indigo-400 mr-2" />
        <h2 className="text-lg font-bold text-white">Design & Formatting</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Accent Color</label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => updateTheme('primaryColor', color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  theme.primaryColor === color 
                    ? 'border-white ring-2 ring-offset-2 ring-offset-gray-900 ring-indigo-500 scale-110' 
                    : 'border-transparent hover:border-white/50'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Typography</label>
          <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
            <button
              onClick={() => updateTheme('fontFamily', 'sans')}
              className={`flex-1 py-2 text-sm rounded-md transition-all ${
                theme.fontFamily === 'sans' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Modern
            </button>
            <button
              onClick={() => updateTheme('fontFamily', 'serif')}
              className={`flex-1 py-2 text-sm rounded-md transition-all font-serif ${
                theme.fontFamily === 'serif' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => updateTheme('fontFamily', 'mono')}
              className={`flex-1 py-2 text-sm rounded-md transition-all font-mono ${
                theme.fontFamily === 'mono' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Tech
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Density</label>
          <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
            <button
              onClick={() => updateTheme('fontSize', 'small')}
              className={`flex-1 py-2 text-sm rounded-md transition-all ${
                theme.fontSize === 'small' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Compact
            </button>
            <button
              onClick={() => updateTheme('fontSize', 'medium')}
              className={`flex-1 py-2 text-sm rounded-md transition-all ${
                theme.fontSize === 'medium' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => updateTheme('fontSize', 'large')}
              className={`flex-1 py-2 text-sm rounded-md transition-all ${
                theme.fontSize === 'large' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Large
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DesignPanel;