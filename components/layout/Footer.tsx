"use client";

import Link from "next/link";

import Image from "next/image";

const footerSections = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      
      { name: "Projects", href: "/projects" },
      
    ],
  },
  {
    title: "Social",
    links: [
      { name: "GitHub", href: "https://github.com/NikhilPatil2727" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-patil-967986251/" },
      { name: "Twitter", href: "https://x.com/nikhil_patil27" },
      
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Snippets", href: "/snippets" },
      { name: "Tweets", href: "/tweets" },
      { name: "Resources", href: "/resources" },
      
    ],
  },
];


export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 
                                 hover:text-gray-900 dark:hover:text-white 
                                 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span>Find me on</span>

            <Link
              href="https://x.com/nikhil_patil27"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent transition flex items-center"
            >
              <Image
                src="/x.png"
                alt="X (Twitter)"
                width={25}
                height={25}
                className="dark:invert"
              />
            </Link>

            <span>and</span>

            <Link
              href="https://peerlist.io/nikhilpa02436"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent transition flex items-center"
            >
              <Image
                src="/peerlist.jpg"
                alt="Peerlist"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>
          </div>

          <p className="text-center md:text-left">
            Portfolio inspired by Manu Arora
          </p>
        </div>

      </div>
    </footer>
  );
}

