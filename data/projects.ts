import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "PostBloom",
    dates: "Jan 2024 - Feb 2024",
    description:
      "AI-powered content repurposing platform that turns a single idea into polished posts for X, LinkedIn, Instagram, and Peerlist with a fast creator workflow.",
    image: "/PostBloom.png",
    links: [
      { type: "Website", url: "https://postbloom-chi.vercel.app/" },
      { type: "Source", url: "https://github.com/NikhilPatil2727/postbloom" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI", "Vercel"],
  },
  {
    title: "WebCraft",
    dates: "Oct 2023 - Dec 2023",
    description:
      "Full-stack automated website builder with real-time preview, modular page generation, and a clean editing experience for shipping landing pages quickly.",
    image: "/Website.png",
    links: [
      {
        type: "Website",
        url: "https://astonishing-brioche-b2cfa1.netlify.app/",
      },
      { type: "Source", url: "https://github.com/NikhilPatil2727" },
    ],
    technologies: ["React", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    title: "X Code Reviewer AI",
    dates: "Mar 2024 - Apr 2024",
    description:
      "A VS Code extension that reviews code in-editor, surfaces actionable suggestions, and helps developers tighten feedback loops while they build.",
    image: "/VsCode.png",
    links: [
      {
        type: "Website",
        url: "https://marketplace.visualstudio.com/items?itemName=nikhil27.x-code-reviewer-ai",
      },
      { type: "Source", url: "https://github.com/NikhilPatil2727" },
    ],
    technologies: ["VS Code API", "JavaScript", "AI", "Developer Tools"],
  },
  {
    title: "XVisualizer",
    dates: "Jul 2023 - Sep 2023",
    description:
      "Interactive data structures and algorithms visualizer with motion-rich demos for sorting, trees, and graph concepts designed for fast understanding.",
    image: "/DSA.png",
    links: [
      {
        type: "Website",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7414210655811194880/",
      },
      { type: "Source", url: "https://github.com/NikhilPatil2727" },
    ],
    technologies: ["React", "Framer Motion", "Redux", "Algorithms"],
  },
];
