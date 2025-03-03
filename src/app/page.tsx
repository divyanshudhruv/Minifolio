import About from "@/components/about/about";
import Hero from '@/components/hero/hero';
import Education from '@/components/education/education';
import Skills from '@/components/skills/skills';
import Services from '@/components/services/services';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Services />
    </>
  );
}

