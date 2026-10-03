import { copy, profile } from "@/data/projects";
import { delay } from "@/lib/utils";
import { ContactLink } from "./contact-link";
import { HeroNumbers } from "./hero-numbers";
import { HeroPortrait } from "./hero-portrait";
export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HeroPortrait src={profile.portrait} alt={copy.hero.portraitAlt} />
      <div className="container">
        <div className="hero-copy">
          <p className="eyebrow hero-in">{copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="display hero-in" style={delay(1)}>
            {copy.hero.title[0]}
            <br />
            {copy.hero.title[1]}
            <br />
            <span className="stroke-text">{copy.hero.accent}</span>
          </h1>
          <p className="hero-description hero-in" style={delay(2)}>
            {copy.hero.description}
          </p>
          <div className="hero-actions hero-in" style={delay(3)}>
            <ContactLink source="hero">{copy.hero.primary}</ContactLink>
            <a className="button-ghost" href="#projects">
              {copy.hero.secondary}
            </a>
          </div>
        </div>
        <HeroNumbers />
      </div>
    </section>
  );
}
