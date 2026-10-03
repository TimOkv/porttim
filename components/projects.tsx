"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import {
  categories,
  categoryLabels,
  copy,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { getProjectDraft, telegramUsername } from "@/lib/telegram";
import { ContactLink } from "./contact-link";

type Filter = Category | "all";

// Кнопку получает только категория, в которой есть хотя бы один кейс.
const filters: Filter[] = [
  "all",
  ...categories.filter((item) =>
    projects.some((project) => project.category === item),
  ),
];
const countOf = (filter: Filter) =>
  filter === "all"
    ? projects.length
    : projects.filter((project) => project.category === filter).length;

// Результат: число (если владелец его назвал) и строка текста.
function Result({ result }: { result: Project["result"] }) {
  return (
    <>
      {result.value && (
        <>
          <strong>{result.value}</strong>{" "}
        </>
      )}
      {result.text}
    </>
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
  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.projects.eyebrow}</p>
        <h2 id="projects-title" className="display reveal">
          {copy.projects.title}
          <br />
          <span className="stroke-text">{copy.projects.accent}</span>
        </h2>
        <div className="filters" role="group" aria-label={copy.projects.filterLabel}>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className="case-filter"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === "all" ? copy.projects.all : categoryLabels[item]} ·{" "}
              {countOf(item)}
            </button>
          ))}
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {copy.projects.shown}: {filtered.length}
        </span>
        <motion.div layout={!reduced} className="tile-grid cases-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.button
                key={project.id}
                type="button"
                layout={!reduced}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="tile case-card"
                onClick={() => setSelected(project)}
                aria-label={`${copy.projects.details}: ${project.title}`}
              >
                <span className="case-kicker">
                  <span>
                    {project.number} · {categoryLabels[project.category]}
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
                <h3>{project.title}</h3>
                <span className="case-facts">
                  <span className="case-term">{copy.projects.done}</span>
                  <span className="case-done">{project.done}</span>
                  <span className="case-term">{copy.projects.result}</span>
                  <span className="case-result">
                    <Result result={project.result} />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="dialog-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href]",
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
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            setSelected(null);
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
              <X size={20} aria-hidden="true" />
            </button>
            <p className="eyebrow">
              {selected.number} · {categoryLabels[selected.category]}
            </p>
            <h2 id="dialog-title">{selected.title}</h2>
            <p className="dialog-label">{copy.projects.dialogDone}</p>
            <p>{selected.details}</p>
            <p className="dialog-label">{copy.projects.dialogResult}</p>
            <p className="dialog-result">
              <Result result={selected.result} />
            </p>
            {/* Без настроенного аккаунта кнопка ведёт к контактному блоку: текст в чате не обещаем. */}
            {telegramUsername && (
              <p className="dialog-draft">
                {copy.projects.draftHint}
                <br />
                <span>«{getProjectDraft(selected)}»</span>
              </p>
            )}
            <div className="dialog-actions" onClick={() => setSelected(null)}>
              <ContactLink project={selected} />
              {/* Появится, когда владелец впишет кейсу публичную ссылку. */}
              {selected.url && (
                <a
                  className="button-ghost"
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.projects.view}
                </a>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
