import { Cursor } from "@/components/cursor";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Why } from "@/components/why";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { RevealObserver } from "@/components/reveal-observer";
import { copy } from "@/data/projects";
export default function Home() {
  return (
    <MotionProvider>
      <a href="#main" className="skip-link">
        {copy.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <Why />
        <Process />
        <About />
        <Footer />
      </main>
      <RevealObserver />
      <Cursor />
    </MotionProvider>
  );
}
