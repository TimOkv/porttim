import { Layers, Sparkles, Workflow } from "lucide-react";
import { copy, stack, type StackGroup } from "@/data/projects";
const icons: Record<StackGroup["icon"], typeof Layers> = {
  layers: Layers,
  workflow: Workflow,
  sparkles: Sparkles,
};
export function TechStack() {
  // Пустая группа не рисуется: карточка без технологий — это заголовок ни о чём.
  const groups = stack.filter((group) => group.items.length > 0);
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
      <div className="stack-grid">
        {groups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <article key={group.name} className="stack-group glass">
              <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              <h3>{group.name}</h3>
              <p>{group.detail}</p>
              <ul className="stack-items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
