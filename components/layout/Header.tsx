"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full px-4 pt-6">
      <div className="mx-auto flex w-full max-w-3xl justify-center">
        <div className="flex w-full items-center justify-between rounded-2xl border border-dashed border-gray-200 bg-transparent px-6 py-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/Nikhil_image.png"
              alt="Profile photo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-gray-200 object-cover"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    isActive
                      ? "rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-900 transition-colors dark:bg-white/10 dark:text-white"
                      : "px-1 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
                  }
                >
                  {item.name}
                </Link>
              );
            })}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
