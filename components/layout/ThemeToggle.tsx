'use client';

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export default function ThemeToggle() {
  return (
    <AnimatedThemeToggler
      className="
        flex h-8 w-8 items-center justify-center rounded-full
        bg-gray-100 text-gray-700
        hover:bg-gray-200
        dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800
        transition-colors duration-150
        focus:outline-none focus:ring-1 focus:ring-blue-500/50
      "
    />
  );
}
