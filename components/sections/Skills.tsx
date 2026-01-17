"use client";

import { useState, useEffect } from "react";

const skills = [
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    color: "#764ABC",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "TailwindCSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
];

export default function Skills() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className={`p-6 rounded-2xl ${
        isDarkMode 
          ? "bg-gray-950 border border-gray-800" 
          : "bg-white border border-gray-200"
      } shadow-lg`}>
        <h2 className={`text-3xl font-bold mb-8 text-center ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>
          Skills & Technologies
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {skills.map((skill, idx) => {
            const isHovered = hoveredIndex === idx;
            
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? "bg-gray-800/50 hover:bg-gray-800/80" 
                    : "bg-gray-50 hover:bg-gray-100"
                } ${isHovered ? "transform scale-105" : ""}`}
                style={{
                  boxShadow: isHovered 
                    ? isDarkMode 
                      ? `0 4px 20px ${skill.color}20`
                      : `0 4px 20px ${skill.color}30`
                    : 'none'
                }}
              >
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${
                  isDarkMode ? "bg-gray-900/50" : "bg-white"
                } border ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                  {(skill.name === "Express.js" || skill.name === "Next.js") && isDarkMode ? (
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                      style={{
                        filter: skill.name === "Express.js" ? "invert(1)" : "none"
                      }}
                    />
                  ) : (
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                </div>
                
                <span className={`font-medium text-sm text-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            isDarkMode 
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}>
            Full-Stack
          </div>
          <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            isDarkMode 
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}>
            Modern Web
          </div>
          <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            isDarkMode 
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}>
            State Management
          </div>
        </div>
      </div>
    </section>
  );
}