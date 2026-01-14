import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';

import Projects from '@/components/sections/Projects';


export default function Home() {
  return (
    <>
      <Hero/>
      <Skills/>
      {/* <RecentBlogs /> */}
      <Projects limit={4}/>
      {/* <Contact/>
      <SpotifyStatus/> */}
    </>
  );
}