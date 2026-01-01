import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // Using vertical dots as a grip

interface Props {
  id: string;
  children: React.ReactNode;
}

export function SortableItem({ id, children }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="group mb-4 flex items-stretch rounded-lg overflow-hidden shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="w-12 bg-indigo-900/40 hover:bg-indigo-600/60 border border-white/10 border-r-0 rounded-l-lg 
                   flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors"
        title="Drag to reorder"
      >
        <div className="flex flex-col -space-y-1 text-white/50 group-hover:text-white">
          <EllipsisVerticalIcon className="h-6 w-6" />
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 border-l-0 rounded-r-lg">
        {children}
      </div>
    </div>
  );
}