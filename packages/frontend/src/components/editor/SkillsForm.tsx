import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableSkill({ id, skill, updateSkill, deleteSkill }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1, opacity: isDragging ? 0.5 : 1 };
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group">
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg pr-2 overflow-hidden hover:border-indigo-500/50 transition-colors">
                <div className="w-2 h-full bg-white/5 mr-2 cursor-grab active:cursor-grabbing"></div>
                <input type="text" placeholder="Skill" className="bg-transparent py-2 text-white text-sm focus:outline-none w-28 sm:w-32" value={skill.name} onChange={(e) => updateSkill(skill.id, e.target.value)} onPointerDown={(e) => e.stopPropagation()} // Important: Stop drag when typing
                />
                <button onClick={() => deleteSkill(skill.id)} className="text-gray-500 hover:text-red-400 p-1">
                    <XMarkIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

const SkillsForm = () => {
  const { skills, addSkill, updateSkill, deleteSkill, reorderSkills } = useResumeStore();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSkills(active.id as string, over.id as string);
    }
  };

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-bold text-white mb-2">Skills</h2>
      <p className="text-xs text-gray-400 mb-6">List your key technical and professional skills. Drag to reorder.</p>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills.map(s => s.id)} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <SortableSkill key={skill.id} id={skill.id} skill={skill} updateSkill={updateSkill} deleteSkill={deleteSkill} />
                ))}
                 <button onClick={addSkill} className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-white/20 rounded-lg text-sm text-gray-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all">
                    <PlusIcon className="h-4 w-4 mr-1" /> Add
                </button>
            </div>
        </SortableContext>
      </DndContext>
    </motion.div>
  );
};
export default SkillsForm;