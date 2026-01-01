import { useState, useRef } from 'react';
import useResumeStore from '../../store/resumeStore';
import ModernTemplate from './templates/ModernTemplate';
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
// @ts-ignore
import html2pdf from 'html2pdf.js';

const ResumePreview = () => {
  const resumeState = useResumeStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsDownloading(true);

    const opt = {
      margin:       0,
      filename:     `${resumeState.title || 'resume'}.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed", error);
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
          className="flex items-center justify-center w-40 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg 
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
        <div ref={printRef} className="w-full h-full">
           <ModernTemplate data={resumeState} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;