import { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import apiClient from '../../api'; 

const ResumePreview = () => {
  const resumeState = useResumeStore();
  const resumeId = useResumeStore((state) => (state as any).id);
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    if (!resumeId) {
      console.error("Resume ID is not available for download.");
      return;
    }
    
    setIsDownloading(true);

    try {
      const response = await apiClient.get(`/resumes/${resumeId}/pdf`, {
        responseType: 'blob', 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const filename = `${resumeState.title || 'resume'}.pdf`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Failed to download PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="sticky top-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="bg-white/5 p-2 rounded-t-2xl flex justify-between items-center flex-shrink-0">
        <h3 className="text-lg font-bold text-white text-center flex-1 ml-24">Live Preview</h3>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center w-36 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg 
                     hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
        >
          {isDownloading ? (
            <>
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download PDF
            </>
          )}
        </button>
      </div>
      <div className="bg-white h-full overflow-y-auto rounded-b-2xl">
        <ModernTemplate data={resumeState} />
      </div>
    </div>
  );
};

export default ResumePreview;