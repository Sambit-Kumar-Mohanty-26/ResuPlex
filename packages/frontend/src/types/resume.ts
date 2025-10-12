export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

export interface WorkExperience {
  id: string; 
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[]; 
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface ResumeState {
  id: string;
  title: string;
  jobTitle: string;
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}