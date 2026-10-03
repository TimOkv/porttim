import { AppWindow, Blocks, Send, Workflow } from "lucide-react";
import { copy, services } from "@/data/projects";
import { delay } from "@/lib/utils";
const icons = { window: AppWindow, send: Send, workflow: Workflow, blocks: Blocks };
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.services.eyebrow}</p>
        <h2 id="services-title" className="display reveal" style={delay(1)}>
          {copy.services.title}
          <br />
          <span className="stroke-text">{copy.services.accent}</span>
        </h2>
        <div className="tile-grid services-grid">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <div key={service.name} className="tile reveal" style={delay(index + 1)}>
                <Icon size={34} strokeWidth={1.2} aria-hidden="true" />
                <h3>{service.name}</h3>
                <p>{service.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
