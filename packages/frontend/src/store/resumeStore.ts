import { create } from 'zustand';
import type { ResumeState } from '../types/resume'; 

interface ResumeActions {
  updateField: <K extends keyof ResumeState>(field: K, value: ResumeState[K]) => void;
}

const initialResumeState: ResumeState = {
  title: 'Untitled Resume',
  contact: {
    name: 'SAMBIT KUMAR MOHANTY',
    email: 'sambit@example.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/sambit',
    website: 'sambit.dev',
  },
  summary: 'A highly motivated and results-oriented Software Engineer with experience in building and maintaining web applications using modern technologies like React and Node.js. Proven ability to collaborate with cross-functional teams to deliver high-quality software solutions.',
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Software Engineer',
      company: 'Tech Company Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2025',
      endDate: 'Present',
      description: [
        'Developed and maintained web applications using React and Node.js.',
        'Collaborated with cross-functional teams to deliver high-quality software.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Anytown, USA',
      graduationDate: 'May 2024',
    },
  ],
  skills: [
    { id: 'skill1', name: 'React' },
    { id: 'skill2', name: 'Node.js' },
    { id: 'skill3', name: 'TypeScript' },
  ],
};

const useResumeStore = create<ResumeState & ResumeActions>((set) => ({
  ...initialResumeState,

  updateField: (field, value) => {
    set((state) => ({
      ...state,
      [field]: value,
    }));
  },

}));

export default useResumeStore;