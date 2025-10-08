import { create } from 'zustand';
import type { Education, ResumeState, Skill, WorkExperience } from '../types/resume'; 
import { produce } from 'immer';

interface ResumeActions {
  updateField: <K extends keyof ResumeState>(field: K, value: ResumeState[K]) => void;

  addExperience: () => void;
  updateExperience: (id: string, field: keyof WorkExperience, value: string) => void;
  deleteExperience: (id: string) => void;
  updateExperienceDescription: (expId: string, index: number, value: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  deleteEducation: (id: string) => void;

  addSkill: () => void;
  updateSkill: (id: string, value: string) => void;
  deleteSkill: (id: string) => void;
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
   addExperience: () => {
    set(produce((state) => {
      state.experience.push({
        id: crypto.randomUUID(), 
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: [''], 
      });
    }));
  },

  updateExperience: (id, field, value) => {
    set(produce((state) => {
      const experienceEntry = state.experience.find((exp: WorkExperience) => exp.id === id);
      if (experienceEntry) {
        experienceEntry[field] = value;
      }
    }));
  },

  deleteExperience: (id) => {
    set(produce((state) => {
      state.experience = state.experience.filter((exp: WorkExperience) => exp.id !== id);
    }));
  },

  updateExperienceDescription: (expId, index, value) => {
    set(produce((state) => {
      const experienceEntry = state.experience.find((exp: WorkExperience) => exp.id === expId);
      if (experienceEntry) {
        experienceEntry.description[index] = value;
      }
    }));
  },

  addEducation: () => {
    set(produce((state) => {
      state.education.push({
        id: crypto.randomUUID(),
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
      });
    }));
  },
  updateEducation: (id, field, value) => {
    set(produce((state) => {
      const eduEntry = state.education.find((edu: Education) => edu.id === id);
      if (eduEntry) {
        eduEntry[field] = value;
      }
    }));
  },
  deleteEducation: (id) => {
    set(produce((state) => {
      state.education = state.education.filter((edu: Education) => edu.id !== id);
    }));
  },

  addSkill: () => {
    set(produce((state) => {
      state.skills.push({
        id: crypto.randomUUID(),
        name: '',
      });
    }));
  },
  updateSkill: (id, value) => {
    set(produce((state) => {
      const skillEntry = state.skills.find((skill: Skill) => skill.id === id);
      if (skillEntry) {
        skillEntry.name = value;
      }
    }));
  },
  deleteSkill: (id) => {
    set(produce((state) => {
      state.skills = state.skills.filter((skill: Skill) => skill.id !== id);
    }));
  },
}));

export default useResumeStore;