export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  featured: boolean;
  displayOrder: number;
}

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "mobile" | "tools";
  level: number;
  iconUrl: string | null;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteProfile {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio1: string;
  bio2: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  mobileHighlight: string;
  backendHighlight: string;
  webHighlight: string;
}
