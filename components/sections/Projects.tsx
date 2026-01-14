"use client";

import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { CardBody, CardContainer } from "../ui/3d-card";
import { Project } from "@/types";

const projects: Project[] = [
  {
    name: "Moonbeam",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    description:
      "Never write from scratch again. Kickstart your next great writing piece with Moonbeam.",
    tags: ["Next.js", "React", "Tailwind", "Chrome Extension"],
    liveLink: "https://moonbeam.ai",
    github: "https://github.com",
  },
];

export default function Projects({ limit }: { limit?: number }) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-10">Projects</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        {displayedProjects.map((project, idx) => (
          <CardContainer key={idx} className="w-full">
            <CardBody
              className="
    w-full h-full
    bg-white dark:bg-black
    rounded-2xl p-6
    border border-black/10 dark:border-white/25  /* Even higher border opacity */
    transition-all duration-300 ease-out

    shadow-md shadow-black/5
    hover:shadow-xl hover:shadow-black/10

    /* More intense shadows for black background */
    dark:shadow-[0_12px_24px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.2)]
    dark:hover:shadow-[0_20px_40px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.25)]
    dark:hover:scale-[1.02]  /* Optional: slight scale on hover for emphasis */
  "
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-xl mb-5">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      px-3 py-1 text-xs font-medium rounded-full
                      bg-gray-100 text-gray-700
                      dark:bg-gray-800 dark:text-gray-300
                    "
                  >
                    {tag}
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
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-lg text-sm font-semibold
                    bg-black text-white
                    dark:bg-white dark:text-black
                    transition-transform hover:scale-[1.03]
                  "
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-lg text-sm font-semibold
                    border border-gray-300 dark:border-gray-700
                    text-gray-700 dark:text-gray-300
                    transition-transform hover:scale-[1.03]
                  "
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
