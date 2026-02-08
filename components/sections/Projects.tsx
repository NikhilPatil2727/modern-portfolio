"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Project } from "@/types";

/* ---------------- PROJECT DATA ---------------- */

const projects: Project[] = [
  {
    name: "WebCraft",
    image: "/Website.png",
    description:
      "Full-stack automated website builder using React.js and Node.js. Generates complete websites with real-time preview functionality.",
    tags: ["React", "Tailwind", "Node.js", "Express.js"],
    liveLink: "https://astonishing-brioche-b2cfa1.netlify.app/",
    github: "https://github.com/NikhilPatil2727",
  },
  {
    name: "X Code Reviewer AI",
    image: "/VsCode.png",
    description:
      "AI-powered VS Code extension that reviews code and suggests improvements in real time using LLMs.",
    tags: ["VS Code Extension", "AI", "JavaScript", "DeepSeek"],
    liveLink:
      "https://marketplace.visualstudio.com/items?itemName=nikhil27.x-code-reviewer-ai",
    github: "https://github.com/NikhilPatil2727",
  },
  {
    name: "XVisualizer",
    image: "/DSA.png",
    description:
      "Interactive DSA Visualizer with Framer Motion animations for sorting, trees, and graph algorithms.",
    tags: ["React.js", "Framer Motion", "Redux", "Algorithms"],
    liveLink:
      "https://www.linkedin.com/feed/update/urn:li:activity:7414210655811194880/",
    github: "https://github.com/NikhilPatil2727",
  },
  {
    name: "PostGenius",
    image: "/Postgenius.png",
    description:
      "Interactive DSA Visualizer with Framer Motion animations for sorting, trees, and graph algorithms.",
    tags: ["Next.js", "React.js", "Node.js", "Tailwind CSS", "TypeScript"],
    liveLink:
      "https://post-genius-fswq.vercel.app/",
    github: "https://github.com/NikhilPatil2727",
  },
];

/* ---------------- PROJECT CARD ---------------- */

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 20 });

  const imgX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const textX = useTransform(mouseX, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      className="relative group h-[450px] w-full cursor-pointer perspective-1000"
    >
      {/* Background + Border + Glow */}
      <div
        className="
          absolute inset-0 rounded-[32px] overflow-hidden
          bg-white dark:bg-black
          border border-gray-200 dark:border-white/20
          shadow-sm transition-all duration-500

          group-hover:border-blue-500/30
          group-hover:shadow-2xl

          dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
          dark:group-hover:shadow-[0_0_45px_-10px_rgba(59,130,246,0.6)]
        "
      />

      {/* Inner Glow */}
      <div
        className="
          absolute inset-0 rounded-[32px] pointer-events-none
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          dark:ring-1 dark:ring-white/10
        "
      />

      {/* Content */}
      <div className="relative h-full w-full p-4 flex flex-col">
        {/* Image */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 z-10">
          <motion.div
            style={{ x: imgX }}
            animate={{ scale: isHovered ? 1.15 : 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full h-full"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div
              className={`
                absolute inset-0 transition-opacity duration-500
                bg-black/30 dark:bg-black/50
                ${isHovered ? "opacity-0" : "opacity-100"}
              `}
            />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div style={{ x: textX }} className="px-2 z-20">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h3>
            <div className="p-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold uppercase tracking-widest text-blue-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expand */}
          <motion.div
            initial={false}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              {project.description}
            </p>

            <div className="flex gap-3 pb-4">
              <a
                href={project.liveLink}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                bg-gray-900 dark:bg-white
                text-white dark:text-gray-900
                text-xs font-bold hover:scale-[1.02] transition-transform"
              >
                <ExternalLink className="w-3 h-3" /> View Site
              </a>

              <a
                href={project.github}
                target="_blank"
                className="p-3 rounded-xl border border-gray-200 dark:border-white/10
                text-gray-600 dark:text-gray-400
                hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ---------------- PROJECTS SECTION ---------------- */

export default function Projects({
  limit,
  showHeader = true,
}: {
  limit?: number;
  showHeader?: boolean;
}) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-[#fafafa] dark:bg-black">
      {/* HEADER — only when showHeader is true */}
      {showHeader && (
        <div className="mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-mono text-sm"
          >
            / SELECTED_WORKS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-medium tracking-tighter text-gray-900 dark:text-white"
          >
            Crafting digital <br />
            <span className="text-gray-400">landscapes.</span>
          </motion.h2>
        </div>
      )}

      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedProjects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}
