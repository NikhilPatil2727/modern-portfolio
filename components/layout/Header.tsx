"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Snippets", href: "/snippets" },
  { name: "Resources", href: "/resources" },
  { name: "Projects", href: "/projects" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-4 z-50 max-w-3xl mx-auto px-4">
      <div
        className="
          flex items-center justify-between
          bg-white/80 dark:bg-gray-950
          backdrop-blur-lg
          border border-gray-200 dark:border-gray-800
          rounded-full px-3 py-1.5
          shadow-md shadow-blue-500/5
          dark:shadow-[0_4px_12px_rgba(255,255,255,0.04)]
          transition-all duration-200
        "
      >
        {/* Logo/Brand (Optional - add your logo here) */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              sm:hidden flex items-center justify-center
              w-8 h-8 rounded-full
              bg-gray-100 dark:bg-gray-900
              hover:bg-gray-200 dark:hover:bg-gray-800
              transition-colors duration-150
              focus:outline-none focus:ring-1 focus:ring-blue-500/50
            "
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-1 relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-in-out group ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {/* Active Glow Pill */}
                <span
                  className={`absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10 
                             shadow-[0_0_10px_rgba(59,130,246,0.2)]
                             transition-all duration-300
                             ${
                               isActive
                                 ? "opacity-100 scale-100"
                                 : "opacity-0 scale-75 pointer-events-none"
                             }`}
                />

                {/* Hover "Ghost" Pill */}
                <span
                  className="absolute inset-0 rounded-full bg-gray-100/50 dark:bg-gray-800/30 
                             opacity-0 scale-90 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 -z-10"
                />

                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Placeholder for right-side content (optional) */}
        <div className="hidden sm:block w-8">
          {/* Could add a search icon, profile icon, etc. here */}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="
            sm:hidden
            absolute top-full left-4 right-4 mt-1.5
            bg-white/95 dark:bg-gray-950/95
            backdrop-blur-lg
            border border-gray-200 dark:border-gray-800
            rounded-xl
            shadow-lg shadow-blue-500/5
            dark:shadow-[0_4px_12px_rgba(255,255,255,0.06)]
            overflow-hidden
            animate-in fade-in slide-in-from-top-5
            duration-200
          "
        >
          <div className="flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    relative px-5 py-3
                    text-sm font-medium
                    transition-all duration-200
                    border-b border-gray-100 dark:border-gray-800
                    last:border-b-0
                    group
                    ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50/30 dark:hover:bg-gray-800/30"
                    }
                  `}
                >
                  {/* Mobile Active Indicator */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-0.5 
                               bg-gradient-to-b from-blue-500 to-blue-400
                               rounded-r-full"
                    />
                  )}

                  {/* Mobile Hover Effect */}
                  <span
                    className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 
                             opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200"
                  />

                  <div className="relative z-10 flex items-center">
                    <span className="flex-1">{item.name}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Footer (optional) */}
          <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Navigation
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}