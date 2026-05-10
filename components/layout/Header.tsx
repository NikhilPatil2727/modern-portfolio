"use client";

import Image from "next/image";
import Link from "next/link";

import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
];

export default function Navbar() {
  const morphicNavItems = Object.fromEntries(
    navItems.map((item) => [item.href, { name: item.name }])
  );

  return (
    <nav className="sticky top-4 z-50 w-full px-4">
      <div className="mx-auto flex w-full max-w-3xl justify-center">
        <div className="flex w-full items-center justify-between rounded-2xl border border-dashed border-gray-200 bg-white/65 px-6 py-3 backdrop-blur-sm dark:border-white/15 dark:bg-black/20">
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
            <MorphicNavbar items={morphicNavItems} className="px-0 py-0" />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
