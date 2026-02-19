"use client";

import Image from "next/image";
import Link from "next/link";
import profilePic from "../../public/Nikhil_image.png";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { NoiseBackground } from "@/components/ui/noise-background";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative max-w-3xl mx-auto px-6 py-24 md:py-32">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 tracking-tight mb-4 ">
            Nikhil Patil
          </h1>

          <p className="text-xl md:text-2xl font-sans text-muted-foreground mb-6 leading-relaxed flex flex-wrap gap-2 justify-center md:justify-start">
            Building
            <Link
              href="https://marketplace.visualstudio.com/items?itemName=nikhil27.x-code-reviewer-ai"
              className="inline-flex flex-wrap items-baseline gap-1.5 font-semibold text-foreground bg-muted px-2 py-1 rounded hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              X Code Reviewer AI
              <span className="text-sm font-medium tracking-tight text-foreground/80">— (own VS Code extension)</span>
            </Link>
            
            <Link
              href="https://www.linkedin.com/feed/update/urn:li:activity:7414210655811194880/"
              className="inline-flex items-center font-semibold text-foreground bg-muted px-2 py-1 rounded whitespace-nowrap hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              X Visualizer
            </Link>
            & other cool things
          </p>

          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed mx-auto md:mx-0">
            Fresher MERN Stack Developer focused on scalable web apps and Gen-AI
            powered developer tools.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            {/* Twitter */}
            <Link
              href="https://x.com/nikhil_patil27"
              target="_blank"
              className="inline-block"
            >
              <NoiseBackground
                containerClassName="rounded-full p-[2px]"
                gradientColors={[
                  "rgb(29,161,242)",
                  "rgb(100,150,255)",
                  "rgb(29,161,242)",
                ]}
              >
                <div className="rounded-full bg-background px-6 py-3 text-foreground font-medium shadow-sm transition active:scale-95">
                  Twitter →
                </div>
              </NoiseBackground>
            </Link>

            {/* Projects */}
            <Link href="/projects" className="inline-block">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="px-6 py-3 bg-background text-foreground font-medium cursor-pointer"
              >
                Projects
              </HoverBorderGradient>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          {/* Grid background */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}
          />

          {/* Radial fade */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)]" />

          {/* Blue Glow */}
          <div className="absolute w-40 h-40 rounded-full bg-blue-500/40 blur-3xl" />

          {/* Image */}
          <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-xl">
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
