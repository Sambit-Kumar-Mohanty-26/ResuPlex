import ResumePreview from '../components/editor/ResumePreview';
import SummaryForm from '../components/editor/SummaryForm';
import ContactForm from '../components/editor/ContactForm'; 
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';

const EditorPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-2 h-full overflow-y-auto pr-4">
        <div className="space-y-8">
          <ContactForm />          
          <SummaryForm />
          <ExperienceForm />
          <EducationForm /> 
          <SkillsForm /> 
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-1 h-full">
        <ResumePreview />
      </div>
    </div>
  );
};

export default EditorPage;