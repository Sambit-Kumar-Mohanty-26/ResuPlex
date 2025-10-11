import { create } from 'zustand';
import type { ResumeState, WorkExperience, Education, Skill } from '../types/resume';
import { produce } from 'immer';

interface ResumeActions {
  setResumeState: (newState: ResumeState) => void;
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

export const initialResumeState: ResumeState = {
  title: 'Untitled Resume',
  contact: {
    name: 'Your Name',
    email: 'youremail@example.com',
    phone: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

const useResumeStore = create<ResumeState & ResumeActions>((set) => ({
  ...initialResumeState,

  setResumeState: (newState) => set(newState),
  updateField: (field, value) => set(produce((state) => { (state as any)[field] = value; })),

  addExperience: () => set(produce((state) => {
    state.experience.push({
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [''],
    });
  })),
  updateExperience: (id, field, value) => set(produce((state) => {
    const experienceEntry = state.experience.find((exp: WorkExperience) => exp.id === id);
    if (experienceEntry) {
      (experienceEntry as any)[field] = value;
    }
  })),
  deleteExperience: (id) => set(produce((state) => {
    state.experience = state.experience.filter((exp: WorkExperience) => exp.id !== id);
  })),
  updateExperienceDescription: (expId, index, value) => set(produce((state) => {
    const experienceEntry = state.experience.find((exp: WorkExperience) => exp.id === expId);
    if (experienceEntry) {
      experienceEntry.description[index] = value;
    }
  })),

  addEducation: () => set(produce((state) => {
    state.education.push({
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
    });
  })),
  updateEducation: (id, field, value) => set(produce((state) => {
    const eduEntry = state.education.find((edu: Education) => edu.id === id);
    if (eduEntry) {
      (eduEntry as any)[field] = value;
    }
  })),
  deleteEducation: (id) => set(produce((state) => {
    state.education = state.education.filter((edu: Education) => edu.id !== id);
  })),

  addSkill: () => set(produce((state) => {
    state.skills.push({
      id: crypto.randomUUID(),
      name: '',
    });
  })),
  updateSkill: (id, value) => set(produce((state) => {
    const skillEntry = state.skills.find((skill: Skill) => skill.id === id);
    if (skillEntry) {
      skillEntry.name = value;
    }
  })),
  deleteSkill: (id) => set(produce((state) => {
    state.skills = state.skills.filter((skill: Skill) => skill.id !== id);
  })),
}));

export default useResumeStore;