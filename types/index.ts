export interface Project {
  title: string;
  dates: string;
  image: string;
  description: string;
  links: {
    type: string;
    url: string;
  }[];
  technologies: string[];
}

export interface Skill {
  name: string;
  logo: string;
  color: string;
  darkLogo: string;
  glowColor: string;
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
