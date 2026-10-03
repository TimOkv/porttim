import type { CSSProperties } from "react";
import { about, copy, profile } from "@/data/projects";
import { delay } from "@/lib/utils";
export function About() {
  // Имя может быть одним словом (переменная окружения): тогда второй строки нет.
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about-text">
          <p className="eyebrow reveal">{copy.about.eyebrow}</p>
          <h2 id="about-title" className="about-name reveal" style={delay(1)}>
            {first}
            {rest.length > 0 && <span> {rest.join(" ")}</span>}
          </h2>
          {about.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className="reveal" style={delay(index + 2)}>
              {paragraph}
            </p>
          ))}
          <ul className="about-tags reveal" style={delay(4)}>
            {about.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <ul className="about-facts reveal" style={delay(2)}>
          {about.facts.map((fact) => (
            <li key={fact.label} style={{ "--c": fact.color } as CSSProperties}>
              <strong>
                {fact.value}
                {fact.unit && <small> {fact.unit}</small>}
              </strong>
              <b>{fact.label}</b>
              {fact.note && <em>{fact.note}</em>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
