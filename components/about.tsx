import { about } from "@/data/projects";
import { ContactLink } from "./contact-link";
export function About() {
  return (
    <section
      id="about"
      className="container about-section"
      aria-labelledby="about-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title">
            {about.title}
            <br />
            <span className="muted-heading">{about.accent}</span>
          </h2>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-text">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="about-facts glass">
          {about.facts.map((fact) => (
            <li key={fact.label}>
              <strong>{fact.value}</strong> <span>{fact.label}</span>
            </li>
          ))}
        </ul>
        {/* Точка входа default: общий черновик, как у плавающей кнопки. */}
        <ContactLink className="about-cta" source="default">
          {about.cta}
        </ContactLink>
      </div>
    </section>
  );
}
