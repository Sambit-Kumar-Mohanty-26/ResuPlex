import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import apiClient from '../api';
import type { ResumeState } from '../types/resume';
import ModernTemplate from '../components/editor/templates/ModernTemplate';

const PrintPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [searchParams] = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resumeId) {
      const fetchResumeData = async () => {
        try {
          const token = searchParams.get('token');
          if (!token) throw new Error("No authentication token provided.");

          const response = await apiClient.get(`/resumes/${resumeId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setResumeData(response.data);
          
          setTimeout(() => {
            window.print();
          }, 800); 

        } catch (err) {
          console.error('Print fetch error:', err);
          setError('Failed to load resume.');
        }
      };
      fetchResumeData();
    }
  }, [resumeId, searchParams]);

  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!resumeData) return <div className="p-10">Preparing document...</div>;

  return (
    <div className="bg-white min-h-screen w-full print:min-h-0">
      <ModernTemplate data={resumeData} />
    </div>
  );
};

export default PrintPage;