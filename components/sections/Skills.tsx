import Image from "next/image";

type TechItem = {
  name: string;
  logo: string;
};

const techItems: TechItem[] = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Shadcn UI", logo: "https://cdn.simpleicons.org/shadcnui" },
  { name: "React.js", logo: "https://cdn.simpleicons.org/react" },
  { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma" },
  { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
  { name: "Redis", logo: "https://cdn.simpleicons.org/redis" },
];

const badges = ["Full-Stack", "Modern Web", "UI/UX"];

export default function Skills() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {techItems.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white p-6 transition-all duration-200 hover:scale-105 hover:border-gray-400 dark:border-white/15 dark:bg-white/[0.02] dark:hover:border-white/30"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-gray-50 dark:bg-white/5">
                <Image
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  width={64}
                  height={64}
                  unoptimized
                  className="h-16 w-16 object-contain"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <div
              key={badge}
              className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 dark:border-white/15 dark:text-gray-300"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
