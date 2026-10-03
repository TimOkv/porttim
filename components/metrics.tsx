"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { copy, metrics } from "@/data/projects";
function Metric({
  metric,
  index,
}: {
  metric: (typeof metrics)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(metric.value);
  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, metric.value, {
      duration: 1.45,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => setValue(Math.round(current)),
    });
    return () => controls.stop();
  }, [inView, reduced, metric.value, index]);
  return (
    <div ref={ref} className="metric">
      <div className="metric-value" aria-hidden="true">
        {metric.prefix}
        {reduced ? metric.value : value}
        <span>{metric.suffix}</span>
      </div>
      <span className="sr-only">
        {metric.prefix}
        {metric.value}
        {metric.suffix}
      </span>
      <h3>{metric.label}</h3>
      <p>{metric.note}</p>
    </div>
  );
}
export function Metrics() {
  return (
    <section
      className="container metrics-section"
      id="metrics"
      aria-label={copy.metricsLabel}
    >
      <div className="metrics-panel glass">
        {metrics.map((metric, index) => (
          <Metric key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </section>
  );
}
