"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <nav className="sticky top-6 z-50 max-w-4xl mx-auto px-4">
      <div
        className="
    flex items-center justify-between
    bg-white/80 dark:bg-black
    backdrop-blur-xl
    border border-white/40 dark:border-gray-800
    rounded-full px-6 py-2

    shadow-lg shadow-blue-500/10
    dark:shadow-[0_8px_30px_rgba(255,255,255,0.06)]
  "
      >
        <ThemeToggle />

        <div className="flex gap-1 relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out group ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {/* 1. The Active Glow Pill */}
                <span
                  className={`absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10 
                             shadow-[0_0_20px_rgba(59,130,246,0.3)]
                             transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                             ${
                               isActive
                                 ? "opacity-100 scale-100"
                                 : "opacity-0 scale-75 pointer-events-none"
                             }`}
                />

                {/* 2. The Hover "Ghost" Pill (Adds smoothness when moving between links) */}
                <span
                  className="absolute inset-0 rounded-full bg-gray-100/50 dark:bg-gray-800/40 
                             opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 -z-10"
                />

                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
