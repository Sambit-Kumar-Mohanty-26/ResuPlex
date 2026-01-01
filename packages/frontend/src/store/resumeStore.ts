import { create } from 'zustand';
import type { ResumeState, WorkExperience, Education, Skill, ResumeTheme } from '../types/resume';
import { produce } from 'immer';

interface ResumeActions {
  setResumeState: (newState: ResumeState) => void;
  updateField: <K extends keyof ResumeState>(field: K, value: ResumeState[K]) => void;
  updateTheme: <K extends keyof ResumeTheme>(field: K, value: ResumeTheme[K]) => void;

  addExperience: () => void;
  updateExperience: (id: string, field: keyof WorkExperience, value: string) => void;
  deleteExperience: (id: string) => void;
  updateExperienceDescription: (expId: string, index: number, value: string) => void;
  reorderExperience: (activeId: string, overId: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (activeId: string, overId: string) => void; // <-- NEW

  addSkill: () => void;
  updateSkill: (id: string, value: string) => void;
  deleteSkill: (id: string) => void;
  reorderSkills: (activeId: string, overId: string) => void; // <-- NEW
}

export const initialResumeState: ResumeState = {
  id: 'new',
  title: 'Untitled Resume',
  jobTitle: '',
  theme: {
    primaryColor: '#4F46E5',
    fontFamily: 'sans',
    fontSize: 'medium',
  },
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
  updateTheme: (field, value) => set(produce((state) => { state.theme[field] = value; })),

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
    const exp = state.experience.find((e: WorkExperience) => e.id === id);
    if (exp) (exp as any)[field] = value;
  })),
  deleteExperience: (id) => set(produce((state) => {
    state.experience = state.experience.filter((e: WorkExperience) => e.id !== id);
  })),
  updateExperienceDescription: (expId, index, value) => set(produce((state) => {
    const exp = state.experience.find((e: WorkExperience) => e.id === expId);
    if (exp) exp.description[index] = value;
  })),
  reorderExperience: (activeId, overId) => set(produce((state) => {
    const oldIndex = state.experience.findIndex((e: WorkExperience) => e.id === activeId);
    const newIndex = state.experience.findIndex((e: WorkExperience) => e.id === overId);
    if (oldIndex !== -1 && newIndex !== -1) {
      const [movedItem] = state.experience.splice(oldIndex, 1);
      state.experience.splice(newIndex, 0, movedItem);
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
    const edu = state.education.find((e: Education) => e.id === id);
    if (edu) (edu as any)[field] = value;
  })),
  deleteEducation: (id) => set(produce((state) => {
    state.education = state.education.filter((e: Education) => e.id !== id);
  })),
  reorderEducation: (activeId, overId) => set(produce((state) => {
    const oldIndex = state.education.findIndex((e: Education) => e.id === activeId);
    const newIndex = state.education.findIndex((e: Education) => e.id === overId);
    if (oldIndex !== -1 && newIndex !== -1) {
      const [movedItem] = state.education.splice(oldIndex, 1);
      state.education.splice(newIndex, 0, movedItem);
    }
  })),


  addSkill: () => set(produce((state) => {
    state.skills.push({ id: crypto.randomUUID(), name: '' });
  })),
  updateSkill: (id, value) => set(produce((state) => {
    const skill = state.skills.find((s: Skill) => s.id === id);
    if (skill) skill.name = value;
  })),
  deleteSkill: (id) => set(produce((state) => {
    state.skills = state.skills.filter((s: Skill) => s.id !== id);
  })),
  reorderSkills: (activeId, overId) => set(produce((state) => {
    const oldIndex = state.skills.findIndex((s: Skill) => s.id === activeId);
    const newIndex = state.skills.findIndex((s: Skill) => s.id === overId);
    if (oldIndex !== -1 && newIndex !== -1) {
      const [movedItem] = state.skills.splice(oldIndex, 1);
      state.skills.splice(newIndex, 0, movedItem);
    }
  })),
}));

export default useResumeStore;