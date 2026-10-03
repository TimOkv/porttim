"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { copy, profile } from "@/data/projects";
export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  // Имя может быть одним словом (переменная окружения): тогда точки и второй части нет.
  const [first, ...rest] = profile.name.split(" ");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const main = document.querySelector("main");
    // Пока меню открыто, страница под ним не прокручивается и не получает фокус.
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    document.querySelector<HTMLElement>("#site-nav a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    // Окно стало широким (поворот телефона): кнопки меню там нет, закрываем сами.
    const wide = matchMedia("(min-width: 961px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = previous;
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);
  return (
    <header className="site-header" data-open={open || undefined}>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label={`${profile.name} — ${copy.footer.toTop}`}
          onClick={() => setOpen(false)}
        >
          {first}
          {rest.length > 0 && (
            <>
              <i className="brand-dot" aria-hidden="true" />
              <span>{rest.join(" ")}</span>
            </>
          )}
        </a>
        {/* Кнопка стоит перед меню: с клавиатуры после неё сразу идут его пункты. */}
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? copy.menuClose : copy.menuOpen}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
        <nav id="site-nav" className="site-nav" aria-label={copy.navigation}>
          {copy.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={current === item.href ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
