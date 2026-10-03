import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
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
        <Metrics />
        <Projects />
        <TechStack />
        <Footer />
      </main>
    </MotionProvider>
  );
}
