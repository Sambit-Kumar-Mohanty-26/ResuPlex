import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResumeStore, { initialResumeState } from '../store/resumeStore';
import apiClient from '../api';
import { useDebounce } from '../hooks/useDebounce';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ResumePreview from '../components/editor/ResumePreview';
import ContactForm from '../components/editor/ContactForm';
import SummaryForm from '../components/editor/SummaryForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import DesignPanel from '../components/editor/DesignPanel';
import { SparklesIcon } from '@heroicons/react/24/solid';
import TailoringAssistant from '../components/editor/TailoringAssistant';
import TitleInput from '../components/editor/TitleInput';

const EditorPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();
  const resumeState = useResumeStore();
  const setResumeState = useResumeStore((state) => state.setResumeState);
  
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const toastIdRef = useRef<string | null>(null);

  const debouncedState = useDebounce(resumeState, 2000);

  useEffect(() => {
    if (!resumeId) { navigate('/dashboard'); return; }
    if (resumeId === 'new') {
      setResumeState(initialResumeState);
      setIsLoading(false);
      return;
    }
    const fetchResumeData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/resumes/${resumeId}`);
        setResumeState(response.data);
      } catch (error) {
        console.error('Failed to fetch:', error);
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumeData();
  }, [resumeId, setResumeState, navigate]);

  useEffect(() => {
    if (!isLoading && resumeId && resumeId !== 'new') {
      const autoSave = async () => {
        setSaveStatus('saving');
        
        if (!toastIdRef.current) {
          toastIdRef.current = toast.loading('Saving changes...');
        }

        try {
          await apiClient.put(`/resumes/${resumeId}`, debouncedState);
          setSaveStatus('saved');
          
          if (toastIdRef.current) {
            toast.success('Saved!', { id: toastIdRef.current });
          }
        } catch (error) {
          console.error('Auto-save failed:', error);
          setSaveStatus('unsaved');
          if (toastIdRef.current) {
            toast.error('Save failed', { id: toastIdRef.current });
          }
        } finally {
          setTimeout(() => { toastIdRef.current = null; }, 2000);
        }
      };
      autoSave();
    }
  }, [debouncedState, resumeId, isLoading]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading Editor...</div>;
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden font-sans">
       <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <motion.div
          className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] bg-indigo-600/30 rounded-full blur-[120px]"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] bg-purple-600/30 rounded-full blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-3rem)]">
          
          <div className="lg:col-span-7 h-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10">
              <div>
                <TitleInput />
                <div className="flex items-center gap-2 mt-1">
                  <span className={`h-2 w-2 rounded-full ${
                    saveStatus === 'saved' ? 'bg-green-500' : saveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {saveStatus === 'saved' ? 'All changes saved' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAssistantOpen(true)}
                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                Tailor for Job
              </button>
            </div>

            <div className="space-y-6 pb-20">
              <DesignPanel />
              <ContactForm />
              <SummaryForm />
              <ExperienceForm />
              <EducationForm />
              <SkillsForm />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 h-full">
            <ResumePreview />
          </div>
        </div>
      </div>
      
      <TailoringAssistant 
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

export default EditorPage;