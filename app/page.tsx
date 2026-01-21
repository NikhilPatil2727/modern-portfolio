import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <main className="space-y-0">
      <Hero />
      <Skills/>
      <Projects limit={3} />
    </main>
  );
}
