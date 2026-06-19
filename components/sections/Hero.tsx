"use client";

import Image from "next/image";
import Link from "next/link";
import profilePic from "../../public/Nikhil_image.png";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Highlighter } from "@/components/ui/highlighter";
import { NoiseBackground } from "@/components/ui/noise-background";
import { cn } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-12 sm:py-24 md:py-32">
      <div className="flex flex-col-reverse items-center justify-between gap-8 md:gap-14 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <ShimmerText
            text="Nikhil Patil"
            className="text-3xl sm:text-5xl md:text-6xl tracking-tight"
            containerClassName="mb-4 justify-center p-0 md:justify-start"
          />

          <p className="mb-6 flex flex-wrap justify-center gap-2 font-sans text-base sm:text-xl md:text-2xl leading-relaxed text-muted-foreground md:justify-start">
            Building
            <Link
              href="https://marketplace.visualstudio.com/items?itemName=nikhil27.x-code-reviewer-ai"
              className="inline-flex flex-wrap items-baseline gap-1.5 font-semibold text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Highlighter action="underline" color="#FF9800" padding={2} iterations={1}>
                <span>X Code Reviewer AI</span>
              </Highlighter>
              <span className="text-xs sm:text-sm font-medium tracking-tight text-foreground/80">
                &mdash; (own VS Code extension)
              </span>
            </Link>

            <Link
              href="https://postbloom-chi.vercel.app/"
              className="inline-flex items-center whitespace-nowrap font-semibold text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>PostBloom</span>
            </Link>
            & other cool things
          </p>

          <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground md:mx-0">
            <span className="inline-flex font-semibold text-foreground dark:text-white">
              <Highlighter action="underline" color="#FF9800" padding={2} iterations={1}>
                <span>MERN & (Next.js)</span>
              </Highlighter>
            </span>{" "}
            Developer &{" "}
            <span className="inline-flex font-semibold text-foreground dark:text-white">
              <Highlighter action="underline" color="#FF9800" padding={2} iterations={1}>
                <span>Frontend Heavy</span>
              </Highlighter>
            </span>{" "}
            focused on scalable web apps and Gen-AI powered developer tools.
          </p>

          <div className="mt-8 flex justify-center gap-4 md:justify-start">
            <Link
              href="https://x.com/nikhil_patil27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:scale-105 hover:border-gray-400 dark:border-white/15 dark:bg-white/[0.02] dark:text-gray-300 dark:hover:text-white dark:hover:border-white/30"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>

            <Link
              href="https://github.com/NikhilPatil2727"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:scale-105 hover:border-gray-400 dark:border-white/15 dark:bg-white/[0.02] dark:text-gray-300 dark:hover:text-white dark:hover:border-white/30"
            >
              <Github className="h-5 w-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/nikhil-patil-967986251/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:scale-105 hover:border-gray-400 dark:border-white/15 dark:bg-white/[0.02] dark:text-gray-300 dark:hover:text-white dark:hover:border-white/30"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="relative flex h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] items-center justify-center shrink-0">
          <div
            className={cn(
              "absolute inset-0 rounded-2xl",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            )}
          />

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)]" />
          <div className="absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-blue-500/40 blur-3xl" />

          <div className="relative z-10 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden rounded-xl shadow-xl">
            <Image
              src={profilePic}
              alt="Nikhil Patil"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
