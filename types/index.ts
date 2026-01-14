export interface Project {
  name: string;
  image: string;
  description: string;
  tags: string[];
  liveLink: string;
  github: string;
}

export interface Skill {
  name: string;
  logo: string;
  color: string;
}

export interface Blog {
  title: string;
  views: string;
  slug: string;
  date: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType;
}