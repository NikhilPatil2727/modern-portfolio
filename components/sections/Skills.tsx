"use client";

import { Skill } from "@/types";

const skills: Skill[] = [
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
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
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
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
];

export default function Skills() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8">Skills & Technologies</h2>
      <div className="bg-white dark:bg-gray-950 p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-12 h-12 object-contain"
                  style={
                    skill.name === "Express.js" ? { filter: "invert(1)" } : {}
                  }
                />
              </div>
              <span className="font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
