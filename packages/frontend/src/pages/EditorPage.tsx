import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import useResumeStore, { initialResumeState } from '../store/resumeStore';
import apiClient from '../api';
import { useDebounce } from '../hooks/useDebounce';
import ResumePreview from '../components/editor/ResumePreview';
import ContactForm from '../components/editor/ContactForm';
import SummaryForm from '../components/editor/SummaryForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import { SparklesIcon } from '@heroicons/react/24/solid';
import TailoringAssistant from '../components/editor/TailoringAssistant';

const EditorPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();
  const resumeState = useResumeStore();
  const setResumeState = useResumeStore((state) => state.setResumeState);
  
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const toastIdRef = useRef<string | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const debouncedState = useDebounce(resumeState, 2000);

  useEffect(() => {
    if (!resumeId) {
      navigate('/dashboard');
      return;
    }
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
        console.error('Failed to fetch resume data:', error);
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
          toastIdRef.current = toast.loading('Saving...');
        }

        try {
          await apiClient.put(`/resumes/${resumeId}`, debouncedState);
          setSaveStatus('saved');
          if (toastIdRef.current) {
            toast.success('All changes saved!', { id: toastIdRef.current });
          }
        } catch (error) {
          console.error('Auto-save failed:', error);
          setSaveStatus('unsaved');
          if (toastIdRef.current) {
            toast.error('Failed to save changes.', { id: toastIdRef.current });
          }
        } finally {
          setTimeout(() => {
            toastIdRef.current = null;
          }, 2000);
        }
      };
      autoSave();
    }
  }, [debouncedState, resumeId, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-xl">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-2 h-full overflow-y-auto pr-4">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Resume Editor</h1>
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Tailor for Job
            </button>
          </div>

          <ContactForm />
          <SummaryForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1 h-full">
        <div className="sticky top-8">
          <div className="text-center text-gray-400 text-sm mb-2 h-5">
            {saveStatus === 'saving' && 'Saving...'}
            {saveStatus === 'saved' && 'All changes saved'}
            {saveStatus === 'unsaved' && <span className="text-red-400">Save failed</span>}
          </div>
          <ResumePreview />
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