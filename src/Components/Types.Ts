export interface Job {
  company: string;
  title: string;
  years: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  graduated: string;
  awards: string[];
  description: string[];
}

export interface ResumeData {
  work: Job[];
  projects?: Job[];
  education: Education[];
  skills?: Skill[]
  skillMessage?: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Testimonial {
  text: string;
  user: string;
}