import type { CSSProperties } from "react";
import { copy, why } from "@/data/projects";
export function Why() {
  return (
    <section id="why" aria-labelledby="why-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.why.eyebrow}</p>
        <h2 id="why-title" className="display reveal">
          {copy.why.title}
          <br />
          <span className="stroke-text">{copy.why.accent}</span>
        </h2>
        <div className="tile-grid why-grid">
          {why.map((reason, index) => (
            <div
              key={reason.title}
              className="tile reveal"
              style={{ "--d": index + 1, "--t": reason.tint } as CSSProperties}
            >
              <em>{String(index + 1).padStart(2, "0")}</em>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
