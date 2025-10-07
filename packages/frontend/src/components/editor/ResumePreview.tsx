import ModernTemplate from './templates/ModernTemplate';

const ResumePreview = () => {
  return (
    <div className="sticky top-8 h-[calc(100vh-4rem)]">
      <div className="bg-white/5 p-4 rounded-t-2xl">
        <h3 className="text-lg font-bold text-white text-center">Live Preview</h3>
      </div>
      <div className="bg-white h-full overflow-y-auto rounded-b-2xl">
        <ModernTemplate />
      </div>
    </div>
  );
};

export default ResumePreview;