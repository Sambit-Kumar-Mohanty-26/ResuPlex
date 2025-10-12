import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import apiClient from '../api';
import type { ResumeState } from '../types/resume';
import ModernTemplate from '../components/editor/templates/ModernTemplate';

const PrintPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [searchParams] = useSearchParams(); 
  const [resumeData, setResumeData] = useState<ResumeState | null>(null);

  useEffect(() => {
    if (resumeId) {
      const fetchResumeData = async () => {
        try {
          const token = searchParams.get('token'); 
          if (!token) {
            throw new Error("Auth token not provided for printing.");
          }
          const response = await apiClient.get(`/resumes/${resumeId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setResumeData(response.data);
          document.body.setAttribute('data-puppeteer-ready', 'true');
        } catch (error) {
          console.error('Failed to fetch resume data for printing:', error);
          document.body.setAttribute('data-puppeteer-error', 'true'); 
        }
      };
      fetchResumeData();
    }
  }, [resumeId, searchParams]);

  if (!resumeData) {
    return <div>Loading document...</div>;
  }

  return <ModernTemplate data={resumeData} />;
};

export default PrintPage;