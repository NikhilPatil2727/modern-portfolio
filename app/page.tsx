import Hero from "@/components/sections/Hero";
import GitHubCalendar from "@/components/sections/GitHubCalendar";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import RecentBlogs from "@/components/sections/RecentBlogs";

export default function Home() {
  return (
    <main className="space-y-0">
      <Hero />
      <GitHubCalendar />
      <Skills />
      <Projects limit={3} />
      <RecentBlogs />
    </main>
  );
}
