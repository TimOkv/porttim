"use client";
import { useState } from "react";
import {
  Braces,
  Code2,
  Layers,
  Sparkles,
  Workflow,
  ArrowUpRight,
} from "lucide-react";
import { copy, stack } from "@/data/projects";
import { cn } from "@/lib/utils";
const icons = {
  sparkles: Sparkles,
  code: Code2,
  braces: Braces,
  workflow: Workflow,
  layers: Layers,
};
export function TechStack() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="stack"
      className="container stack-section"
      aria-labelledby="stack-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.stack.eyebrow}</p>
          <h2 id="stack-title">
            {copy.stack.title}
            <br />
            <span className="muted-heading">{copy.stack.accent}</span>
          </h2>
        </div>
        <p className="section-description">{copy.stack.description}</p>
      </div>
      <div className="stack-grid" role="group" aria-label={copy.stack.title}>
        {stack.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <button
              key={item.name}
              className={cn("stack-chip glass", active === index && "selected")}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-controls="stack-detail"
            >
              <div>
                <Icon size={25} strokeWidth={1.5} />
                <ArrowUpRight size={14} />
              </div>
              <span>{item.name}</span>
              <small>{item.label}</small>
            </button>
          );
        })}
      </div>
      <p className="stack-detail" id="stack-detail" role="status">
        <span className="status-dot" />
        {stack[active].detail}
      </p>
    </section>
  );
}
