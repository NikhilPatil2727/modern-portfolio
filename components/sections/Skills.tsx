"use client";

import { Skill } from "@/types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const skills: Skill[] = [
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "TailwindCSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

// Update your Skill type to include darkLogo
type EnhancedSkill = Skill & { darkLogo?: string };

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for dark mode
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Observe for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Function to get the appropriate logo based on theme
  const getLogoForTheme = (skill: EnhancedSkill) => {
    if (skill.name === "Express.js") {
      // For Express.js, use white version in dark mode
      return isDarkMode 
        ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
        : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
    }
    return skill.logo;
  };

  // Function to get the appropriate color based on theme
  const getColorForTheme = (skill: EnhancedSkill) => {
    if (isDarkMode) {
      // In dark mode, all skills get a modern dark theme
      return {
        glowColor: "#ffffff10",
        textColor: "#ffffff",
        borderColor: "#ffffff15",
        shadowColor: "#ffffff08",
      };
    }
    
    // In light mode, use skill's original color
    return {
      glowColor: `${skill.color}20`,
      textColor: skill.color,
      borderColor: `${skill.color}30`,
      shadowColor: `${skill.color}40`,
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1 },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 15 },
  };

  if (!mounted) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">Skills & Technologies</h2>
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 p-6">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
      >
        Skills & Technologies
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`p-8 rounded-3xl shadow-2xl border relative overflow-hidden ${
          isDarkMode 
            ? "bg-gray-950 border-gray-800" 
            : "bg-white border-gray-100"
        }`}
      >
        {/* Subtle background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent ${
          isDarkMode 
            ? "to-gray-900/20" 
            : "to-gray-50/50"
        } pointer-events-none`} />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
        >
          {skills.map((skill, idx) => {
            const themeColors = getColorForTheme(skill);
            const skillLogo = getLogoForTheme(skill);
            
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
                animate="initial"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Animated glow effect */}
                <motion.div
                  variants={glowVariants}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${themeColors.glowColor} 0%, transparent 70%)`,
                    filter: "blur(12px)",
                  }}
                />
                
                {/* Main card */}
                <div className={`relative flex flex-col items-center gap-4 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 overflow-hidden group cursor-pointer border ${
                  isDarkMode
                    ? "bg-gray-900/80 border-gray-800 hover:border-gray-600"
                    : "bg-gradient-to-b from-gray-50/80 to-white border-gray-200/50 hover:border-gray-300/50"
                }`}
                  style={{
                    boxShadow: hoveredIndex === idx 
                      ? `0 20px 40px -15px ${isDarkMode ? '#ffffff10' : themeColors.shadowColor}`
                      : isDarkMode
                      ? "0 8px 32px -8px rgba(0,0,0,0.3)"
                      : "0 8px 32px -8px rgba(0,0,0,0.1)",
                  }}
                >
                  
                  {/* Subtle shine effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                    isDarkMode 
                      ? "via-white/5" 
                      : "via-white/10"
                  } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
                  
                  {/* Icon container with 3D effect */}
                  <motion.div
                    variants={iconVariants}
                    className={`relative w-20 h-20 flex items-center justify-center rounded-2xl shadow-lg group-hover:shadow-xl border ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50"
                        : "bg-gradient-to-br from-white to-gray-100 border-gray-200/50"
                    }`}
                    style={{
                      boxShadow: hoveredIndex === idx 
                        ? `0 20px 40px -15px ${themeColors.shadowColor}, inset 0 1px 0 0 ${isDarkMode ? '#ffffff10' : 'rgba(255,255,255,0.2)'}`
                        : `inset 0 1px 0 0 ${isDarkMode ? '#ffffff10' : 'rgba(255,255,255,0.2)'}`,
                    }}
                  >
                    {/* Pulsing ring effect - only in light mode */}
                    {!isDarkMode && hoveredIndex === idx && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                        className="absolute inset-0 rounded-2xl border-2"
                        style={{ borderColor: skill.color }}
                      />
                    )}
                    
                    {/* Express.js special handling */}
                    {skill.name === "Express.js" && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {!isDarkMode && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-2xl" />
                        )}
                        <img
                          src={skillLogo}
                          alt={skill.name}
                          className="w-12 h-12 object-contain z-10 relative"
                          style={{
                            filter: isDarkMode 
                              ? "invert(0) brightness(2)"  // Light version for dark mode
                              : "invert(0)",  // Normal version for light mode
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Other icons */}
                    {skill.name !== "Express.js" && (
                      <img
                        src={skillLogo}
                        alt={skill.name}
                        className="w-12 h-12 object-contain z-10"
                        style={
                          skill.name === "Express.js" && isDarkMode
                            ? { filter: "invert(0)" }
                            : {}
                        }
                      />
                    )}
                  </motion.div>
                  
                  {/* Skill name */}
                  <motion.span
                    className={`font-semibold text-center text-lg ${
                      isDarkMode
                        ? "text-white"
                        : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                    }`}
                    animate={
                      hoveredIndex === idx && !isDarkMode
                        ? {
                            backgroundImage: `linear-gradient(to right, ${skill.color}, ${skill.color}CC)`,
                          }
                        : {}
                    }
                  >
                    {skill.name}
                  </motion.span>
                  
                  {/* Subtle indicator line */}
                  <motion.div
                    className="h-1 rounded-full"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(to right, transparent, #ffffff, transparent)"
                        : "linear-gradient(to right, transparent, #d1d5db, transparent)",
                    }}
                    animate={
                      hoveredIndex === idx
                        ? {
                            width: "100px",
                          }
                        : { width: "48px" }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Decorative elements - dark mode specific */}
        {isDarkMode ? (
          <>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </>
        )}
      </motion.div>
    </section>
  );
}