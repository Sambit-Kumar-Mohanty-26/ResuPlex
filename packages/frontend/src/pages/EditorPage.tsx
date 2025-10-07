import ResumePreview from '../components/editor/ResumePreview';

const EditorPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-2 h-full overflow-y-auto pr-4">
        <div className="space-y-8">
          <div className="bg-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <p className="text-gray-300 mt-2">Form fields will go here...</p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white">Work Experience</h2>
            <p className="text-gray-300 mt-2">Form fields will go here...</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1 h-full">
        <ResumePreview />
      </div>
    </div>
  );
};

export default EditorPage;