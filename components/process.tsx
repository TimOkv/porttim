import { Fragment, type CSSProperties } from "react";
import { copy, processSteps } from "@/data/projects";
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.process.eyebrow}</p>
        <h2 id="process-title" className="display reveal">
          {copy.process.title}
          <br />
          <span className="stroke-text">{copy.process.accent}</span>
        </h2>
        {/* Класс .is-playing вешает наблюдатель: дальше цепочку ведёт CSS. */}
        <ol className="process">
          {processSteps.map((step, index) => (
            <Fragment key={step.title}>
              <li className="process-step" style={{ "--i": index } as CSSProperties}>
                <small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
              {index < processSteps.length - 1 && (
                <li
                  className="process-link"
                  style={{ "--i": index } as CSSProperties}
                  aria-hidden="true"
                >
                  <span className="process-dot" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
