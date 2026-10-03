"use client";
import { useEffect, useRef } from "react";
// Курсор-прожектор: точка на месте указателя и пятно света, которое плывёт следом.
// Работает только с мышью и без просьбы уменьшить движение; иначе остаётся штатный курсор.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const point = dot.current;
    const light = spot.current;
    if (
      !point ||
      !light ||
      !("showPopover" in point) ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    // Точка живёт в верхнем слое браузера. Окно кейса встаёт туда позже и закрывает её,
    // поэтому после каждого открытия окна точку показываем заново — она снова оказывается сверху.
    const lift = () => {
      if (point.matches(":popover-open")) point.hidePopover();
      point.showPopover();
    };
    lift();
    const layers = new MutationObserver(lift);
    layers.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["open"],
    });
    let x = innerWidth / 2;
    let y = innerHeight / 3;
    let lightX = x;
    let lightY = y;
    let frame = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      // Пятно света внутри плашки идёт за указателем.
      const tile = (event.target as Element).closest<HTMLElement>(".tile");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${x - rect.left}px`);
      tile.style.setProperty("--my", `${y - rect.top}px`);
    };
    const over = (event: Event) =>
      root.classList.toggle(
        "cursor-hover",
        !!(event.target as Element).closest("a, button"),
      );
    const tick = () => {
      lightX += (x - lightX) * 0.07;
      lightY += (y - lightY) * 0.07;
      point.style.transform = `translate(${x}px, ${y}px)`;
      light.style.transform = `translate(${lightX}px, ${lightY}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      cancelAnimationFrame(frame);
      layers.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.classList.remove("has-cursor", "cursor-hover");
      if (point.matches(":popover-open")) point.hidePopover();
    };
  }, []);
  return (
    <>
      <div ref={spot} className="cursor-spot" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" popover="manual" aria-hidden="true" />
    </>
  );
}
