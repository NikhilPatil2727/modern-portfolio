"use client";

import React, { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/types";

const projects: Project[] = [
  {
    name: "WebCraft",
    image: "/Website.png",
    description:
      "Developed a full-stack automated website builder using React.js and Node.js that generates complete websites from user input with real-time preview functionality.",
    tags: [ "React", "Tailwind", "Node.js", "Express.js"],
    liveLink: "https://astonishing-brioche-b2cfa1.netlify.app/",
    github: "https://github.com/NikhilPatil2727",
  },
  {
    name: "X Code Reviewer AI",
    image: "/VsCode.png",
    description:
      "Built an AI-powered VS Code extension in JavaScript that reviews code and suggests improvements in real time, helping developers write cleaner and better code.",
    tags: ["VS Code Extension", "AI", "JavaScript", "Developer Tools"],
    liveLink:
      "https://marketplace.visualstudio.com/items?itemName=nikhil27.x-code-reviewer-ai",
    github: "https://github.com/NikhilPatil2727",
  },
  {
    name: " XVisualizer",
    image: "/DSA.png",
    description:
      "Built an interactive DSA Visualizer using React.js with Framer Motion animations to visualize sorting algorithms, tree traversals, and graph searches",
    tags: ["React.js", "Tailwind", "framer-motion", "Node.js", "Express.js", "MongoDB", "redux"],
    liveLink: "https://www.linkedin.com/feed/update/urn:li:activity:7414210655811194880/",
    github: "https://github.com/NikhilPatil2727",
  },
  
];

export default function Projects({ limit }: { limit?: number }) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.setProperty('--mouse-x', `50%`);
      card.style.setProperty('--mouse-y', `50%`);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">Projects</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        {displayedProjects.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => { cardRefs.current[idx] = el; }}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            className="
              group relative
              w-full h-full
              flex flex-col
              bg-white dark:bg-gray-950
              rounded-2xl p-6
              border border-gray-200 dark:border-gray-800
              transition-all duration-300 ease-out
              overflow-hidden
              cursor-pointer
              hover:border-blue-300 dark:hover:border-blue-800
              hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5
              hover:-translate-y-1
              isolate
            "
            style={{
              '--mouse-x': '50%',
              '--mouse-y': '50%',
            } as React.CSSProperties}
          >
            {/* Dark mode specific background layer */}
            <div className="
              absolute inset-0 
              dark:bg-gradient-to-br 
              dark:from-gray-950 
              dark:via-gray-900 
              dark:to-gray-950
              opacity-100 dark:opacity-100
              transition-opacity duration-300
              pointer-events-none
              z-0
            " />

            {/* Visible gradient that follows cursor - Dark mode enhanced */}
            <div 
              className="
                absolute inset-0 
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                pointer-events-none
                z-0
              "
              style={{
                background: `radial-gradient(
                  500px circle at var(--mouse-x) var(--mouse-y), 
                  rgba(59, 130, 246, 0.1), 
                  rgba(147, 51, 234, 0.05), 
                  transparent 50%
                )`,
              }}
            />

            {/* Color flow effect - Subtle in dark mode */}
            <div 
              className="
                absolute inset-0 
                opacity-0 dark:group-hover:opacity-20
                transition-opacity duration-700
                pointer-events-none
                z-0
              "
              style={{
                background: `linear-gradient(
                  45deg,
                  transparent 0%,
                  rgba(59, 130, 246, 0.08) 20%,
                  rgba(147, 51, 234, 0.05) 40%,
                  rgba(236, 72, 153, 0.03) 60%,
                  transparent 100%
                )`,
                transform: `translate(
                  calc(var(--mouse-x) * 0.03 - 50%),
                  calc(var(--mouse-y) * 0.03 - 50%)
                )`,
              }}
            />

            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-xl mb-5 z-10">
              <div 
                className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-40
                  transition-opacity duration-500
                  z-10
                "
                style={{
                  background: `radial-gradient(
                    ellipse at var(--mouse-x) var(--mouse-y), 
                    rgba(59, 130, 246, 0.15), 
                    transparent 60%
                  )`,
                }}
              />
              <img
                src={project.image}
                alt={project.name}
                className="
                  w-full h-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                  relative z-0
                "
              />
            </div>

            {/* Title */}
            <h3 className="
              text-2xl font-semibold mb-2 
              relative z-10
              text-gray-900 dark:text-gray-100
              transition-colors duration-300
              group-hover:text-blue-600 dark:group-hover:text-blue-400
            ">
              {project.name}
            </h3>

            {/* Description */}
            <p className="
              text-gray-600 dark:text-gray-300 
              text-sm leading-relaxed mb-5
              transition-colors duration-300
              group-hover:text-gray-800 dark:group-hover:text-gray-200
              relative z-10
            ">
              {project.description}
            </p>

            {/* Bottom content */}
            <div className="mt-auto relative z-10">
              {/* Tags with visible effect */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      relative
                      px-3 py-1 text-xs font-medium rounded-full
                      bg-gray-100 dark:bg-gray-900
                      text-gray-700 dark:text-gray-300
                      border border-gray-200 dark:border-gray-800
                      transition-all duration-300 ease-out
                      group-hover:bg-blue-50 dark:group-hover:bg-gray-800
                      group-hover:text-blue-700 dark:group-hover:text-blue-300
                      group-hover:border-blue-200 dark:group-hover:border-blue-800
                      group-hover:scale-105
                      overflow-hidden
                    "
                  >
                    {/* Tag highlight - subtle in dark mode */}
                    <div 
                      className="
                        absolute inset-0
                        opacity-0 dark:group-hover:opacity-30
                        transition-opacity duration-500
                      "
                      style={{
                        background: `radial-gradient(
                          circle at var(--mouse-x) var(--mouse-y), 
                          rgba(59, 130, 246, 0.2), 
                          transparent 60%
                        )`,
                      }}
                    />
                    <span className="relative z-10">
                      {tag}
                    </span>
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-lg text-sm font-semibold
                    bg-gradient-to-r from-black to-black
                    dark:from-blue-700 dark:to-blue-800
                    text-white
                    overflow-hidden
                    transition-all duration-300 ease-out
                    hover:scale-105
                    hover:shadow-lg hover:shadow-blue-500/30
                    dark:hover:shadow-blue-500/20
                    active:scale-95
                    cursor-pointer
                    select-none
                    z-20
                    border border-blue-500/20 dark:border-blue-600/30
                  "
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Button glow - subtle in dark */}
                  <div 
                    className="
                      absolute inset-0
                      opacity-0 hover:opacity-100
                      transition-opacity duration-500
                    "
                    style={{
                      background: `radial-gradient(
                        circle at var(--mouse-x) var(--mouse-y), 
                        rgba(255, 255, 255, 0.2), 
                        transparent 60%
                      )`,
                    }}
                  />
                  <ExternalLink className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Live</span>
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-lg text-sm font-semibold
                    border border-gray-300 dark:border-gray-800
                    text-gray-700 dark:text-gray-300
                    overflow-hidden
                    transition-all duration-300 ease-out
                    hover:scale-105
                    hover:text-blue-600 dark:hover:text-blue-400
                    hover:border-blue-400 dark:hover:border-blue-700
                    hover:bg-gray-50 dark:hover:bg-gray-900
                    active:scale-95
                    cursor-pointer
                    select-none
                    z-20
                  "
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Button effect */}
                  <div 
                    className="
                      absolute inset-0
                      opacity-0 hover:opacity-100
                      transition-opacity duration-500
                    "
                    style={{
                      background: `radial-gradient(
                        circle at var(--mouse-x) var(--mouse-y), 
                        rgba(59, 130, 246, 0.08), 
                        transparent 60%
                      )`,
                    }}
                  />
                  <Github className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Code</span>
                </a>
              </div>
            </div>

            {/* Corner accent - subtle in dark */}
            <div 
              className="
                absolute top-0 right-0 w-32 h-32
                opacity-0 dark:group-hover:opacity-30
                transition-opacity duration-700
                pointer-events-none
                z-0
              "
              style={{
                background: `radial-gradient(
                  circle at var(--mouse-x) var(--mouse-y), 
                  rgba(59, 130, 246, 0.15), 
                  transparent 60%
                )`,
              }}
            />

            {/* Subtle border glow - only in dark */}
            <div className="
              absolute inset-0 rounded-2xl
              opacity-0 dark:group-hover:opacity-100
              transition-opacity duration-500
              pointer-events-none
              z-0
            ">
              <div 
                className="
                  absolute inset-0 rounded-2xl
                  border border-blue-500/10 dark:border-blue-700/30
                  blur-sm
                "
                style={{
                  transform: `scale(1.02)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}