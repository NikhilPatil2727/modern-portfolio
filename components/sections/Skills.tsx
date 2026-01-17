"use client";

import { Skill } from "@/types";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

const skills: Skill[] = [
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    glowColor: "#ffffff",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    glowColor: "#61DAFB",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    color: "#764ABC",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    glowColor: "#764ABC",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    glowColor: "#47A248",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    glowColor: "#ffffff",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    glowColor: "#339933",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    glowColor: "#3178C6",
  },
  {
    name: "TailwindCSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    glowColor: "#06B6D4",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    glowColor: "#F7DF1E",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    glowColor: "#F05032",
  },
];

type EnhancedSkill = Skill & { darkLogo?: string; glowColor?: string };

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
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

  const getLogoForTheme = (skill: EnhancedSkill) => {
    if (isDarkMode && skill.name === "Express.js") {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
    }
    if (isDarkMode && skill.name === "Next.js") {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
    }
    return skill.logo;
  };

  const getColorForTheme = (skill: EnhancedSkill) => {
    if (isDarkMode) {
      return {
        glowColor: skill.glowColor ? `${skill.glowColor}30` : "#ffffff20",
        textColor: "#ffffff",
        borderColor: "#ffffff15",
        shadowColor: skill.glowColor ? `${skill.glowColor}15` : "#ffffff10",
        cardGlow: skill.glowColor ? `${skill.glowColor}20` : "#ffffff10",
      };
    }
    
    return {
      glowColor: `${skill.color}20`,
      textColor: skill.color,
      borderColor: `${skill.color}30`,
      shadowColor: `${skill.color}40`,
      cardGlow: `${skill.color}15`,
    };
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconVariants: Variants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const skillNameVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  if (!mounted) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className={`p-8 rounded-3xl ${
          isDarkMode 
            ? "bg-gradient-to-br from-gray-900 to-black" 
            : "bg-white"
        } shadow-2xl border ${isDarkMode ? "border-gray-800/50" : "border-gray-100"}`}>
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 p-4">
                <div className={`w-16 h-16 ${
                  isDarkMode 
                    ? "bg-gradient-to-br from-gray-800 to-gray-900" 
                    : "bg-gray-200"
                } rounded-2xl animate-pulse border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />
                <div className={`h-5 w-20 ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-gray-800 to-gray-700" 
                    : "bg-gray-200"
                } rounded animate-pulse`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`p-8 rounded-3xl relative overflow-hidden ${
          isDarkMode 
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-950 shadow-2xl shadow-black/30" 
            : "bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl shadow-gray-200/30"
        } border`}
        style={{
          borderColor: isDarkMode 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Premium dark mode background effects */}
        {isDarkMode ? (
          <>
            {/* Animated grid background for dark mode */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_50%,transparent_75%,transparent_100%)] bg-[length:15px_15px] opacity-10" />
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [null, `-${Math.random() * 50}px`],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl" />
          </>
        ) : (
          <>
            {/* Light mode background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white" />
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-cyan-500/5 via-transparent to-transparent rounded-full blur-2xl" />
          </>
        )}
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-4xl font-bold mb-10 text-center ${
              isDarkMode 
                ? "bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                : "bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent"
            }`}
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-3 md:grid-cols-5 gap-4"
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
                  {/* Premium glow effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredIndex === idx ? 
                      { opacity: 1, scale: 1 } : 
                      { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-2xl blur-lg"
                    style={{
                      background: `radial-gradient(circle at center, ${themeColors.glowColor} 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Main card - Premium dark mode styling */}
                  <div className={`
                    relative flex flex-col items-center gap-4 p-5 rounded-2xl 
                    backdrop-blur-sm transition-all duration-300 overflow-hidden 
                    group cursor-pointer border
                    ${isDarkMode 
                      ? `bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-black/80 
                         border-gray-800/30 hover:border-gray-700/50
                         shadow-lg shadow-black/20` 
                      : `bg-gradient-to-b from-white/80 via-white to-gray-50/80
                         border-gray-200/30 hover:border-gray-300/50
                         shadow-lg shadow-gray-200/20`
                    }
                  `}
                    style={{
                      transform: hoveredIndex === idx ? 'translateZ(5px)' : 'translateZ(0)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                      isDarkMode 
                        ? 'via-white/[0.02]' 
                        : 'via-black/[0.01]'
                    } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`} />
                    
                    {/* Icon container with premium 3D effect */}
                    <motion.div
                      variants={iconVariants}
                      className={`
                        relative w-16 h-16 flex items-center justify-center 
                        rounded-2xl border shadow-xl transition-all duration-300
                        ${isDarkMode
                          ? `bg-gradient-to-br from-gray-900/80 to-black 
                             border-gray-800/60 hover:border-gray-700`
                          : `bg-gradient-to-br from-white to-gray-100 
                             border-gray-300/60 hover:border-gray-400`
                        }
                      `}
                      style={{
                        boxShadow: hoveredIndex === idx 
                          ? `0 15px 40px -10px ${themeColors.shadowColor},
                             inset 0 1px 0 0 ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'}`
                          : `inset 0 1px 0 0 ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'}`,
                      }}
                    >
                      {/* Pulsing ring effect */}
                      {hoveredIndex === idx && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                          className="absolute inset-[-2px] rounded-2xl border"
                          style={{ 
                            borderColor: isDarkMode 
                              ? skill.glowColor || themeColors.glowColor
                              : skill.color 
                          }}
                        />
                      )}
                      
                      {/* Special handling for Next.js and Express.js in dark mode */}
                      {(skill.name === "Next.js" || skill.name === "Express.js") && isDarkMode ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className={`absolute inset-0 rounded-2xl ${
                            skill.name === "Next.js" 
                              ? "bg-gradient-to-br from-gray-900 to-black" 
                              : "bg-gradient-to-br from-gray-800 to-gray-900"
                          }`} />
                          <img
                            src={skillLogo}
                            alt={skill.name}
                            className="w-10 h-10 object-contain z-10 relative"
                            style={{
                              filter: isDarkMode && skill.name === "Express.js" 
                                ? "invert(1) brightness(1.5)"
                                : "invert(0)"
                            }}
                          />
                        </div>
                      ) : (
                        <img
                          src={skillLogo}
                          alt={skill.name}
                          className="w-10 h-10 object-contain z-10"
                        />
                      )}
                      
                      {/* Hover glow effect */}
                      {hoveredIndex === idx && (
                        <div className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `radial-gradient(circle at center, ${themeColors.cardGlow} 0%, transparent 70%)`,
                          }}
                        />
                      )}
                    </motion.div>
                    
                    {/* Skill name with premium typography */}
                    <motion.div
                      variants={skillNameVariants}
                      className="relative"
                    >
                      <span className={`
                        font-semibold text-sm tracking-tight text-center block
                        ${isDarkMode 
                          ? "bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
                        }
                      `}>
                        {skill.name}
                      </span>
                      
                      {/* Subtle underline */}
                      <motion.div
                        className="h-0.5 rounded-full mt-1"
                        initial={{ width: "0%" }}
                        animate={hoveredIndex === idx ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: isDarkMode
                            ? `linear-gradient(to right, transparent, ${skill.glowColor || '#ffffff'}, transparent)`
                            : `linear-gradient(to right, transparent, ${skill.color}, transparent)`,
                        }}
                      />
                    </motion.div>
                    
                    {/* Floating particles on hover */}
                    {hoveredIndex === idx && isDarkMode && (
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-[1px] h-[1px] rounded-full"
                            style={{ backgroundColor: skill.glowColor || '#ffffff' }}
                            initial={{ 
                              x: Math.random() * 100 + '%', 
                              y: '120%',
                              opacity: 0 
                            }}
                            animate={{ 
                              y: ['120%', '-20%'],
                              opacity: [0, 0.6, 0]
                            }}
                            transition={{
                              duration: 1 + Math.random(),
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Technology stack labels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <div className={`px-5 py-2 rounded-full border text-xs font-medium ${
              isDarkMode 
                ? "bg-black/20 border-gray-800/30 text-gray-300"
                : "bg-white/50 border-gray-300/30 text-gray-700"
            }`}>
              Full-Stack
            </div>
            <div className={`px-5 py-2 rounded-full border text-xs font-medium ${
              isDarkMode 
                ? "bg-black/20 border-gray-800/30 text-gray-300"
                : "bg-white/50 border-gray-300/30 text-gray-700"
            }`}>
              Modern Web
            </div>
            <div className={`px-5 py-2 rounded-full border text-xs font-medium ${
              isDarkMode 
                ? "bg-black/20 border-gray-800/30 text-gray-300"
                : "bg-white/50 border-gray-300/30 text-gray-700"
            }`}>
              State Management
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}