import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResumeStore from '../store/resumeStore';
import apiClient from '../api';
import { useDebounce } from '../hooks/useDebounce';
import ResumePreview from '../components/editor/ResumePreview';
import ContactForm from '../components/editor/ContactForm';
import SummaryForm from '../components/editor/SummaryForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';

const EditorPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();
  const resumeState = useResumeStore();
  const setResumeState = useResumeStore((state) => state.setResumeState);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const debouncedState = useDebounce(resumeState, 2000);

  useEffect(() => {
    if (!resumeId) {
      navigate('/dashboard');
      return;
    }
    if (resumeId === 'new') {
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
        try {
          await apiClient.put(`/resumes/${resumeId}`, debouncedState);
          setSaveStatus('saved');
        } catch (error) {
          console.error('Auto-save failed:', error);
          setSaveStatus('unsaved');
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
      <div className="lg:col-span-2 h-full overflow-y-auto pr-4 space-y-8">
        <ContactForm />
        <SummaryForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
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
    </div>
  );
};

export default EditorPage;