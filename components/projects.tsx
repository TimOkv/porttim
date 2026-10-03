"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import {
  categories,
  copy,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { ContactLink } from "./contact-link";
import { cn } from "@/lib/utils";

type Filter = Category | "all";

// Кнопку получает только категория, в которой есть хотя бы один кейс.
const filters: Filter[] = [
  "all",
  ...categories.filter((item) =>
    projects.some((project) => project.category === item),
  ),
];

// Выделенный результат: число (если владелец его назвал) и строка текста.
function Result({ result }: { result: Project["result"] }) {
  return (
    <span className="project-result">
      {result.value && (
        <>
          <strong>{result.value}</strong>{" "}
        </>
      )}
      <span>{result.text}</span>
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="project-tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export function Projects() {
  const [category, setCategory] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const filtered =
    category === "all"
      ? projects
      : projects.filter((project) => project.category === category);
  useEffect(() => {
    if (!selected) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [selected]);
  function moveGlow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - rect.top}px`,
    );
  }
  return (
    <section
      id="projects"
      className="container projects-section"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.projects.eyebrow}</p>
          <h2 id="projects-title">
            {copy.projects.title}
            <br />
            <span className="muted-heading">{copy.projects.accent}</span>
          </h2>
        </div>
        <p className="section-description">{copy.projects.description}</p>
      </div>
      <div className="project-toolbar">
        <div className="filters" role="group" aria-label={copy.projects.all}>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={cn("filter", category === item && "active")}
            >
              {item === "all" ? copy.projects.all : item}
              {item === "all" && (
                <span>{projects.length.toString().padStart(2, "0")}</span>
              )}
            </button>
          ))}
        </div>
        <span className="project-count mono" role="status" aria-live="polite">
          {filtered.length.toString().padStart(2, "0")} / {copy.projects.count}
        </span>
      </div>
      <motion.div layout={!reduced} className="bento-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout={!reduced}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              className="project-card"
              onPointerMove={moveGlow}
            >
              <button
                type="button"
                className="project-open"
                onClick={() => setSelected(project)}
                aria-label={`${copy.projects.details}: ${project.title}`}
              >
                <div className="project-body">
                  <div className="project-kicker">
                    <span>
                      <span className="project-number">{project.number}</span>
                      {project.label}
                    </span>
                    <span className="project-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <Result result={project.result} />
                  <p className="project-description">{project.description}</p>
                  <span className="project-format">{project.format}</span>
                  <Tags tags={project.tags} />
                </div>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="dialog-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex="0"]',
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              setSelected(null);
          }
        }}
      >
        {selected && (
          <>
            <button
              className="dialog-close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label={copy.projects.close}
              autoFocus
            >
              <X size={21} />
            </button>
            <div className="dialog-body">
              <p className="eyebrow">{selected.label}</p>
              <p className="dialog-format">{selected.format}</p>
              <h2 id="dialog-title">{selected.title}</h2>
              <Result result={selected.result} />
              <p>{selected.description}</p>
              <h3>{copy.projects.dialogValue}</h3>
              <p>{selected.value}</p>
              <h3>{copy.projects.dialogTags}</h3>
              <Tags tags={selected.tags} />
              <div className="dialog-actions" onClick={() => setSelected(null)}>
                <ContactLink project={selected}>
                  {copy.projects.discuss}
                </ContactLink>
                {/* Появится, когда владелец впишет кейсу публичную ссылку. */}
                {selected.url && (
                  <a
                    className="button-secondary"
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.projects.view}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
