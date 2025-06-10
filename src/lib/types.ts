
export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  address: string;
  github: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  subtitle: string;
  location?: string;
  date: string;
  description: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number; // Optional: 1-5 or 1-100 for proficiency
}

export interface Project {
  id: string;
  name: string;
  description: string;
  summaryBullets?: string[]; // New field for bulleted summary
  technologies: string[];
  githubUrl?: string;
  youtubeUrl?: string;
  liveUrl?: string;
}

export interface LanguageSkill {
  id: string;
  name: string;
  listening?: string;
  reading?: string;
  spokenProduction?: string;
  spokenInteraction?: string;
  writing?: string;
  motherTongue?: boolean;
}

export interface CVData {
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  experience: TimelineEvent[];
  education: TimelineEvent[];
  skills: Skill[];
  projects: Project[];
  languageSkills: LanguageSkill[];
  profilePhotoUrl?: string;
}
