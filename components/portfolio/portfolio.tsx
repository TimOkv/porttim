"use client";

// Approved portfolio design. Content and contact URLs stay in their data modules.
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  X,
  Menu,
  Monitor,
  Bot,
  Workflow,
  Layers3,
  ContactRound,
  PanelsTopLeft,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  about,
  categories,
  categoryLabels,
  copy,
  portfolioCopy as text,
  processSteps,
  profile,
  projects,
  services,
  why,
  type Category,
  type Project,
} from "@/data/projects";
import {
  getContactLink,
  getProjectContactLink,
  getProjectDraft,
} from "@/lib/telegram";
import styles from "./portfolio.module.css";
import { CountUpFact, ProcessStep, ReasonCard } from "./motion-details";

const ease = [0.22, 1, 0.36, 1] as const;
const categoryIcons = { Web: Monitor, "AI & Bots": Bot, Automation: Workflow };
const serviceIcons = {
  window: Monitor,
  send: Bot,
  workflow: Workflow,
  blocks: Layers3,
  crm: ContactRound,
  panel: PanelsTopLeft,
};

function CategorySymbol({ category }: { category: Category }) {
  const Icon = categoryIcons[category];
  return (
    <span className={styles.rowSymbol}>
      <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
    </span>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      data-reveal
      initial={reduced ? false : { y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function BigTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`${styles.titleMask} ${className}`}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className={styles.bigTitle}
        data-mask-title
        variants={{
          hidden: { y: "110%", rotate: 3 },
          visible: { y: 0, rotate: 0 },
        }}
        transition={{ duration: reduced ? 0 : 1.05, ease }}
      >
        {children}
      </motion.h2>
    </motion.div>
  );
}

function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 701px)");
    const closeOnResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnResize);
    };
  }, [menuOpen]);
  return (
    <motion.header
      className={styles.header}
      ref={header}
      data-reveal
      initial={reduced ? false : { y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: reduced ? 0 : 0.9, ease }}
    >
      <a href="#top" className={styles.brand}>
        <span>{profile.name}</span>
      </a>
      <button
        ref={menuButton}
        type="button"
        className={styles.menuToggle}
        data-mobile-menu
        aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
        aria-expanded={menuOpen}
        aria-controls="portfolio-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
      </button>
      <nav
        id="portfolio-navigation"
        aria-label={copy.navigation}
        className={styles.nav}
        data-open={menuOpen}
      >
        {copy.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className={styles.headerContact}>
        {text.contactShort}
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
    </motion.header>
  );
}

function Hero() {
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  return (
    <section ref={hero} className={styles.hero} id="top">
      <motion.div
        className={`${styles.orbit} ${styles.orbitOne}`}
        aria-hidden="true"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      />
      <motion.div
        className={`${styles.orbit} ${styles.orbitTwo}`}
        aria-hidden="true"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease }}
      />
      <h1 className={styles.srOnly}>{profile.name}</h1>
      <motion.div
        className={styles.nameTrack}
        data-reveal
        initial={reduced ? false : { opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.8, duration: 1.3, ease }}
        aria-hidden="true"
      >
        <div className={styles.heroName}>
          <div className={styles.marqueeTrack} data-name-marquee>
            {[0, 1].map((group) => (
              <div className={styles.marqueeGroup} key={group}>
                <span>{profile.name}</span>
                <span>{profile.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.portrait}
        style={{
          y: reduced ? 0 : portraitY,
          scale: reduced ? 1 : portraitScale,
        }}
      >
        <motion.div
          className={styles.portraitInner}
          data-reveal
          initial={reduced ? false : { y: "26%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.95, duration: 1.5, ease }}
        >
          <Portrait />
        </motion.div>
      </motion.div>
      <motion.a
        href="#about"
        className={styles.scrollLink}
        data-reveal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.7 }}
      >
        <span>{text.scroll}</span>
        <ArrowDown size={48} strokeWidth={1.1} aria-hidden="true" />
      </motion.a>
      <div className={styles.heroFoot}>
        <span>{copy.footer.rights}</span>
      </div>
    </section>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  if (!profile.portrait || failed) return null;
  return (
    <Image
      src={profile.portrait}
      alt={copy.hero.portraitAlt}
      fill
      preload
      sizes="(max-width: 700px) 150vw, (max-width: 1000px) 105vw, 90vw"
      ref={(image) => {
        if (image?.complete && image.naturalWidth === 0) setFailed(true);
      }}
      onError={() => setFailed(true)}
    />
  );
}

function About() {
  return (
    <section
      className={`${styles.section} ${styles.dark} ${styles.about}`}
      id="about"
    >
      <div className={styles.sectionMeta}>
        <span>{copy.about.eyebrow}</span>
        <span>{profile.name}</span>
      </div>
      <BigTitle>{text.aboutTitle}</BigTitle>
      <div className={styles.aboutBody}>
        <Reveal className={styles.bigArrow}>
          <ArrowUpRight strokeWidth={0.7} aria-hidden="true" />
        </Reveal>
        <div>
          {about.paragraphs.map((paragraph, i) => (
            <Reveal delay={i * 0.1} key={paragraph}>
              <p className={styles.aboutParagraph}>{paragraph}</p>
            </Reveal>
          ))}
          <Reveal>
            <a href="#projects" className={styles.textLink}>
              {copy.hero.secondary}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
      <div className={styles.facts}>
        {about.facts.map((fact) => (
          <CountUpFact key={fact.label} fact={fact} />
        ))}
      </div>
    </section>
  );
}

function ProjectDialog({
  selected,
  onClose,
}: {
  selected: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!selected) return;
    const node = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, [selected]);
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="project-dialog-title"
      onCancel={() => close.current()}
      onClose={() => close.current()}
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
        const box = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        )
          close.current();
      }}
    >
      {selected && (
        <>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={onClose}
            aria-label={copy.projects.close}
            autoFocus
          >
            <X size={24} />
          </button>
          <p className={styles.kicker}>{categoryLabels[selected.category]}</p>
          <h2 id="project-dialog-title">{selected.title}</h2>
          <p className={styles.kicker}>{copy.projects.dialogDone}</p>
          <p>{selected.details}</p>
          <p className={styles.kicker}>{copy.projects.dialogResult}</p>
          <p className={styles.dialogResult}>
            {selected.result.value} {selected.result.text}
          </p>
          {profile.telegram && (
            <p className={styles.draft}>
              {copy.projects.draftHint}
              <br />
              {getProjectDraft(selected)}
            </p>
          )}
          <div className={styles.dialogActions}>
            <a
              className={styles.solidButton}
              href={getProjectContactLink(selected) || "#contact"}
              target={profile.telegram ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={onClose}
            >
              {copy.contact}
              <ArrowUpRight size={20} />
            </a>
            {profile.max && (
              <a
                href={profile.max}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.outlineButton}
              >
                {text.contactMax}
                <ArrowUpRight size={20} />
              </a>
            )}
            {selected.url && (
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.outlineButton}
              >
                {copy.projects.view}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}

function Works() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);
  return (
    <section className={`${styles.section} ${styles.light}`} id="projects">
      <div className={styles.sectionMeta}>
        <span>{copy.projects.eyebrow}</span>
      </div>
      <div className={styles.worksHeading}>
        <BigTitle>{text.worksTitle}</BigTitle>
        <Reveal>
          <p>
            {copy.projects.title}
            <br />
            {copy.projects.accent}
          </p>
        </Reveal>
      </div>
      <div
        className={styles.filters}
        role="group"
        aria-label={copy.projects.filterLabel}
      >
        {(["all", ...categories] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category === "all" ? copy.projects.all : categoryLabels[category]}
            <sup>
              {category === "all"
                ? projects.length
                : projects.filter((project) => project.category === category)
                    .length}
            </sup>
          </button>
        ))}
      </div>
      <span role="status" aria-live="polite" className={styles.srOnly}>
        {copy.projects.shown}: {filtered.length}
      </span>
      <motion.div layout={!reduced} className={styles.workList}>
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              data-reveal
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: reduced ? 0 : 0.45, ease }}
            >
              <button
                className={styles.workRow}
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`${copy.projects.details}: ${project.title}`}
              >
                <CategorySymbol category={project.category} />
                <span className={styles.workName}>
                  {project.title}
                  <span>{project.done}</span>
                </span>
                <span className={styles.workCategory}>
                  {categoryLabels[project.category]}
                </span>
                <span className={styles.workArrow}>
                  <ArrowUpRight
                    size={32}
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <ProjectDialog selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Services() {
  return (
    <section className={`${styles.section} ${styles.dark}`} id="services">
      <div className={styles.sectionMeta}>
        <span>{copy.services.eyebrow}</span>
        <span>{copy.services.accent}</span>
      </div>
      <BigTitle>{text.servicesTitle}</BigTitle>
      <div className={styles.serviceList}>
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Reveal key={service.name} delay={i * 0.06}>
              <div className={styles.serviceRow}>
                <span className={styles.rowSymbol}>
                  <Icon size={24} strokeWidth={1.3} aria-hidden="true" />
                </span>
                <h3>{service.name}</h3>
                <p>{service.text}</p>
                <ArrowUpRight size={40} strokeWidth={1} aria-hidden="true" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className={`${styles.section} ${styles.light}`} id="why">
      <div className={styles.sectionMeta}>
        <span>{copy.why.eyebrow}</span>
        <span>{copy.why.title}</span>
      </div>
      <BigTitle>{text.whyTitle}</BigTitle>
      <div className={styles.reasons}>
        {why.map((reason, i) => (
          <Reveal key={reason.title} delay={i * 0.08}>
            <ReasonCard reason={reason} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start center", "end center"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });
  return (
    <section
      ref={section}
      className={`${styles.section} ${styles.dark} ${styles.process}`}
      id="process"
    >
      <div className={styles.sectionMeta}>
        <span>{copy.process.eyebrow}</span>
      </div>
      <div className={styles.processGrid}>
        <div className={styles.processHeading}>
          <h2 className={styles.processTitle}>
            {text.processTitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <ArrowUpRight size={150} strokeWidth={0.7} aria-hidden="true" />
        </div>
        <div className={styles.steps}>
          <motion.div
            className={styles.stepProgress}
            style={{ scaleY: reduced ? 1 : smoothProgress }}
            aria-hidden="true"
          />
          {processSteps.map((step, i) => (
            <ProcessStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className={`${styles.section} ${styles.contact}`} id="contact">
      <div className={styles.sectionMeta}>
        <span>{copy.contactSection.eyebrow}</span>
        <a href="#top">
          {copy.footer.toTop}
          <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
      <a
        href={getContactLink("footer") || "#contact"}
        className={styles.contactTitleLink}
        target={profile.telegram ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        <BigTitle>
          {text.contactTitle[0]}
          <br />
          {text.contactTitle[1]}
          <ArrowUpRight strokeWidth={0.8} aria-hidden="true" />
        </BigTitle>
      </a>
      <div className={styles.contactBottom}>
        <Reveal>
          <p>{copy.contactSection.description}</p>
        </Reveal>
        <Reveal className={styles.contactActions}>
          {profile.telegram && (
            <a
              href={getContactLink("footer")!}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messengerLink}
              aria-label={text.contactTelegram}
              title={text.contactTelegram}
            >
              <Image
                src="/portfolio/telegram.svg"
                alt=""
                width={72}
                height={72}
                aria-hidden="true"
              />
            </a>
          )}
          {profile.max && (
            <a
              href={profile.max}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messengerLink}
              aria-label={text.contactMax}
              title={text.contactMax}
            >
              <Image
                src="/portfolio/max.svg"
                alt=""
                width={72}
                height={72}
                aria-hidden="true"
              />
            </a>
          )}
          {!profile.telegram && !profile.max && (
            <p>{copy.contactSection.unavailable}</p>
          )}
        </Reveal>
      </div>
      <div className={styles.footerLine}>
        <span>{profile.name}</span>
        <span>{copy.footer.rights}</span>
      </div>
    </footer>
  );
}

function PortfolioContent() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div className={styles.page} data-portfolio>
      <a href="#main" className={styles.skipLink}>
        {copy.skip}
      </a>
      <motion.div
        className={styles.pageProgress}
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {!reduced && (
          <motion.div
            className={styles.intro}
            data-intro
            initial={{ y: 0 }}
            animate={{ y: "-101%" }}
            transition={{ delay: 0.55, duration: 0.85, ease }}
            aria-hidden="true"
          >
            <span>{profile.name}</span>
            <small>{text.intro}</small>
          </motion.div>
        )}
        <Hero />
        <About />
        <Works />
        <Services />
        <Why />
        <Process />
        <Contact />
      </main>
    </div>
  );
}

export function Portfolio() {
  return (
    <MotionConfig reducedMotion="user">
      <PortfolioContent />
    </MotionConfig>
  );
}
