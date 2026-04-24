'use client';

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export default function ThemeToggle() {
  return (
    <AnimatedThemeToggler
      className="rounded-full border border-gray-200 p-2 text-gray-700 transition-colors hover:text-black"
    />
  );
}
