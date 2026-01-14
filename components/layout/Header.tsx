'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Snippets', href: '/snippets' },
  { name: 'Resources', href: '/resources' },
  { name: 'Projects', href: '/projects' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-50 max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
        <ThemeToggle/>
        
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}