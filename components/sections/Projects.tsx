'use client';

import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';

const projects: Project[] = [
  {
    name: 'Moonbeam',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    description: 'Never write from scratch again. Kickstart your next great writing piece with Moonbeam. Your long-form writing AI assistant.',
    tags: ['Front-end', 'GPT-3', 'Next.js', 'React', 'TailwindCSS', 'Chrome Extension'],
    liveLink: 'https://moonbeam.ai',
    github: 'https://github.com'
  },
  // ... other projects
];

export default function Projects({ limit }: { limit?: number }) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {displayedProjects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden group">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-all bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-all bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm italic"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}