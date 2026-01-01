import { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/solid';
import apiClient from '../../api';
import SuggestionsModal from './SuggestionsModal';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const ExperienceForm = () => {
  const { experience, addExperience, updateExperience, deleteExperience, updateExperienceDescription, reorderExperience } = useResumeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<{ expId: string; index: number } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderExperience(active.id as string, over.id as string);
    }
  };

  const handleEnhanceClick = async (expId: string, index: number, currentText: string) => {
    setCurrentTarget({ expId, index });
    setIsModalOpen(true);
    setIsLoadingAi(true);
    setSuggestions([]);
    try {
      const response = await apiClient.post('/ai/enhance-bullet', { text: currentText });
      setSuggestions(response.data.suggestions);
    } catch (error) { console.error(error); } finally { setIsLoadingAi(false); }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (currentTarget) updateExperienceDescription(currentTarget.expId, currentTarget.index, suggestion);
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-end mb-6">
           <h2 className="text-xl font-bold text-white">Work Experience</h2>
           <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold">Drag to Reorder</span>
        </div>
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experience.map(e => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {experience.map((exp) => (
                <SortableItem key={exp.id} id={exp.id}>
                  <div className="p-5 bg-black/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                         <label className="text-xs text-gray-400">Job Title</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={exp.jobTitle || ''} onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs text-gray-400">Company</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={exp.company || ''} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs text-gray-400">Start Date</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={exp.startDate || ''} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs text-gray-400">End Date</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={exp.endDate || ''} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs text-gray-400">Key Achievements</label>
                      {exp.description.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-2 group/bullet">
                          <textarea rows={2} className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y" value={point || ''} onChange={(e) => updateExperienceDescription(exp.id, pointIndex, e.target.value)} />
                          <button type="button" onClick={() => handleEnhanceClick(exp.id, pointIndex, point)} disabled={!point || point.trim().length < 10} className="mt-1 p-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Improve with AI">
                            <SparklesIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                      <button onClick={() => deleteExperience(exp.id)} className="flex items-center text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-colors">
                        <TrashIcon className="h-4 w-4 mr-1.5" /> Remove
                      </button>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        
        <button onClick={addExperience} className="w-full mt-6 py-3 border-2 border-dashed border-indigo-500/30 text-indigo-300 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-white transition-all font-medium flex items-center justify-center group">
          <PlusIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" /> Add Experience
        </button>
      </motion.div>
      <SuggestionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} suggestions={suggestions} onSelect={handleSelectSuggestion} isLoading={isLoadingAi} />
    </>
  );
};
export default ExperienceForm;