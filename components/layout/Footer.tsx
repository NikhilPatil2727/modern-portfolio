'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

const footerSections = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Projects', href: '/projects' },
      { name: 'Links', href: '/links' },
    ],
  },
  {
    title: 'Social',
    links: [
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'LinkedIn', href: 'https://linkedin.com' },
      { name: 'Twitter', href: 'https://twitter.com' },
      { name: 'Instagram', href: 'https://instagram.com' },
      { name: 'Freelancing', href: '/freelancing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Snippets', href: '/snippets' },
      { name: 'Tweets', href: '/tweets' },
      { name: 'Resources', href: '/resources' },
      { name: 'Live Demos', href: '/demos' },
      { name: 'freeCodeCamp', href: 'https://freecodecamp.org' },
      { name: 'Box Shadows', href: '/box-shadows' },
      { name: 'Design Inspiration', href: '/design-inspiration' },
    ],
  },
];

const socialIcons = [
  { icon: Github, href: 'https://github.com' },
  { icon: Linkedin, href: 'https://linkedin.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Mail, href: 'mailto:contact@example.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p className="mb-2">Find me on X and P</p>
            <p>Portfolio inspired by Lee Rob</p>
          </div>

          <div className="flex gap-4">
            {socialIcons.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}