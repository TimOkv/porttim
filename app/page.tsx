import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
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
        <Footer />
      </main>
      <RevealObserver />
    </MotionProvider>
  );
}
