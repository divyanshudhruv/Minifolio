import About from "@/components/about/about";
import Hero from '@/components/hero/hero';
import Education from '@/components/education/education';
import Skills from '@/components/skills/skills';
import Services from '@/components/services/services';

export default function Home() {
  return (
    <>
      <Hero />
      <br/><br/>
      <About /><br/><br/>
      <Education /><br/><br/><br/><br/><br/>
      <Skills /><br/><br/>
      <Services /><br/><br/>
    </>
  );
}

