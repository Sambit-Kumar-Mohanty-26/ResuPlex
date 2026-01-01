import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const EducationForm = () => {
  const { education, addEducation, updateEducation, deleteEducation, reorderEducation } = useResumeStore();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderEducation(active.id as string, over.id as string);
    }
  };

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-between items-end mb-6">
           <h2 className="text-xl font-bold text-white">Education</h2>
           <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold">Drag to Reorder</span>
      </div>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={education.map(e => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {education.map((edu) => (
              <SortableItem key={edu.id} id={edu.id}>
                <div className="p-5 bg-black/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                         <label className="text-xs text-gray-400">Degree</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={edu.degree || ''} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                         <label className="text-xs text-gray-400">Institution</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={edu.institution || ''} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                         <label className="text-xs text-gray-400">Location</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={edu.location || ''} onChange={(e) => updateEducation(edu.id, 'location', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                         <label className="text-xs text-gray-400">Date</label>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" value={edu.graduationDate || ''} onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                    <button onClick={() => deleteEducation(edu.id)} className="flex items-center text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-colors">
                      <TrashIcon className="h-4 w-4 mr-1.5" /> Remove
                    </button>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <button onClick={addEducation} className="w-full mt-6 py-3 border-2 border-dashed border-indigo-500/30 text-indigo-300 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-white transition-all font-medium flex items-center justify-center group">
        <PlusIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" /> Add Education
      </button>
    </motion.div>
  );
};
export default EducationForm;