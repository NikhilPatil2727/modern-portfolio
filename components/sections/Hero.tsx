"use client";

import Image from "next/image";
import Link from "next/link";
import profilePic from "../../public/Nikhil_image.png";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Highlighter } from "@/components/ui/highlighter";
import { NoiseBackground } from "@/components/ui/noise-background";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="flex flex-col-reverse items-center justify-between gap-14 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
            Nikhil Patil
          </h1>

          <p className="mb-6 flex flex-wrap justify-center gap-2 font-sans text-xl leading-relaxed text-muted-foreground md:justify-start md:text-2xl">
            Building
            <Link
              href="https://marketplace.visualstudio.com/items?itemName=nikhil27.x-code-reviewer-ai"
              className="inline-flex flex-wrap items-baseline gap-1.5 font-semibold text-foreground hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Highlighter action="underline" color="#FF9800" padding={2} iterations={1}>
                <span>X Code Reviewer AI</span>
              </Highlighter>
              <span className="text-sm font-medium tracking-tight text-foreground/80">
                &mdash; (own VS Code extension)
              </span>
            </Link>

            <Link
              href="https://postbloom-chi.vercel.app/"
              className="inline-flex items-center whitespace-nowrap font-semibold text-foreground hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Highlighter action="highlight" color="#87CEFA" padding={4} iterations={1}>
                <span>PostBloom</span>
              </Highlighter>
            </Link>
            & other cool things
          </p>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground md:mx-0">
            Fresher MERN Stack Developer focused on scalable web apps and Gen-AI powered developer
            tools.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link href="https://x.com/nikhil_patil27" target="_blank" className="inline-block">
              <NoiseBackground
                containerClassName="rounded-full p-[2px]"
                gradientColors={[
                  "rgb(29,161,242)",
                  "rgb(100,150,255)",
                  "rgb(29,161,242)",
                ]}
              >
                <div className="rounded-full bg-background px-6 py-3 font-medium text-foreground shadow-sm transition active:scale-95">
                  Twitter &rarr;
                </div>
              </NoiseBackground>
            </Link>

            <Link href="/projects" className="inline-block">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="cursor-pointer bg-background px-6 py-3 font-medium text-foreground"
              >
                Projects
              </HoverBorderGradient>
            </Link>
          </div>
        </div>

        <div className="relative flex h-[220px] w-[220px] items-center justify-center">
          <div
            className={cn(
              "absolute inset-0 rounded-2xl",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            )}
          />

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)]" />
          <div className="absolute h-40 w-40 rounded-full bg-blue-500/40 blur-3xl" />

          <div className="relative z-10 h-24 w-24 overflow-hidden rounded-xl shadow-xl md:h-28 md:w-28">
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
