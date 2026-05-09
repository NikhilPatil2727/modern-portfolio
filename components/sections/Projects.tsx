import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CoolMode } from "@/components/ui/cool-mode";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const technologyLogos: Record<string, string> = {
  "Next.js": "https://cdn.simpleicons.org/nextdotjs",
  TypeScript: "https://cdn.simpleicons.org/typescript",
  React: "https://cdn.simpleicons.org/react",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss",
  OpenAI: "https://cdn.simpleicons.org/openai",
  Gemini: "https://cdn.simpleicons.org/googlegemini/8E75B2",
  Vercel: "https://cdn.simpleicons.org/vercel",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs",
  Express: "https://cdn.simpleicons.org/express",
  "VS Code API": "/icons8-visual-studio-code-50.png",
  JavaScript: "https://cdn.simpleicons.org/javascript",
  AI: "https://cdn.simpleicons.org/googlegemini/8E75B2",
  "Developer Tools": "https://cdn.simpleicons.org/postman",
  "Framer Motion": "https://cdn.simpleicons.org/framer",
  Redux: "https://cdn.simpleicons.org/redux",
  Algorithms: "https://cdn.simpleicons.org/leetcode",
  "Vector DB": "/Pinecone-Icon--Streamline-Svg-Logos.png",
  RAG: "https://cdn.simpleicons.org/langchain",
};

function TechnologyLogo({ technology }: { technology: string }) {
  const logo = technologyLogos[technology];

  return (
    <div
      className="flex h-9 w-11 items-center justify-center rounded-lg border border-dashed border-border bg-background transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-muted/50 dark:bg-white/[0.02]"
      title={technology}
      aria-label={technology}
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${technology} logo`}
          width={20}
          height={20}
          unoptimized
          className="h-5 w-5 object-contain opacity-85 dark:brightness-110"
        />
      ) : (
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          {technology.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links[0];
  const hasVideo = Boolean(project.video);

  return (
    <Card className="group overflow-hidden rounded-2xl border border-border bg-card py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl dark:hover:border-white/20">
      <div className="relative aspect-video overflow-hidden border-b border-border bg-muted/40">
        {hasVideo ? (
          <video
            key={project.video}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.image}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}

        {primaryLink ? (
          <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
            <Link
              href={primaryLink.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-black px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-white dark:text-black"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{primaryLink.type}</span>
            </Link>
          </div>
        ) : null}
      </div>

      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>

            {primaryLink ? (
              <Link
                href={primaryLink.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title}`}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <p className="text-sm text-muted-foreground">{project.dates}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <TechnologyLogo
              key={`${project.title}-${technology}`}
              technology={technology}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Projects({
  limit,
  showHeader = true,
}: {
  limit?: number;
  showHeader?: boolean;
}) {
  const featuredProjectTitles = ["PostBloom", "WebCraft", "XVisualizer"];
  const featuredProjects = featuredProjectTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is Project => Boolean(project));

  const displayedProjects = limit
    ? featuredProjects.slice(0, limit)
    : projects;

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl">
        {showHeader ? (
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Check out my latest work
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground text-balance">
              A curated selection of product, frontend, and developer-tooling work
              focused on polished interfaces, fast iteration, and thoughtful user
              experience.
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {limit ? (
          <div className="mt-10 flex justify-center">
            <CoolMode>
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/projects">
                  More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CoolMode>
          </div>
        ) : null}
      </div>
    </section>
  );
}
