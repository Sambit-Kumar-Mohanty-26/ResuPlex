import { useState, useEffect } from 'react';
import useResumeStore from '../../store/resumeStore';
import { PencilIcon } from '@heroicons/react/24/solid';

const TitleInput = () => {
  const title = useResumeStore((state) => state.title);
  const updateField = useResumeStore((state) => state.updateField);
  
  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    updateField('title', e.target.value);
  };

  return (
    <div className="group flex items-center gap-2">
      <div className="relative">
        <input
          type="text"
          value={localTitle}
          onChange={handleChange}
          className="bg-transparent text-2xl font-bold text-white tracking-tight border-b-2 border-transparent 
                     hover:border-white/20 focus:border-indigo-500 focus:outline-none transition-all
                     w-full max-w-md truncate placeholder-gray-500"
          placeholder="Untitled Resume"
        />
        <PencilIcon className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>
    </div>
  );
};

export default TitleInput;