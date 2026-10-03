"use client";
import { useEffect } from "react";
// Один наблюдатель на страницу: блокам .reveal вешает .is-visible, цепочке .process — .is-playing.
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue;
          target.classList.add(
            target.classList.contains("process") ? "is-playing" : "is-visible",
          );
          observer.unobserve(target);
        }
      },
      // Порог нулевой: высокий блок на низком экране тоже должен появиться.
      { rootMargin: "0px 0px -12% 0px" },
    );
    document
      .querySelectorAll(".reveal, .process")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
