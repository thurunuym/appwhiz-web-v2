export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  lucideIconName: string;
}

export interface ProcessStep {
  id: number;
  name: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface CareersApplication {
  name: string;
  email: string;
  skills: string;
  message: string;
  resumeFileName?: string;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  contactNumber: string;
  companyName: string;
  projectDescription: string;
  helpType: string;
}
