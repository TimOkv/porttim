"use client";
import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { copy, heroNumbers } from "@/data/projects";
function HeroNumber({
  item,
  index,
  scale,
}: {
  item: (typeof heroNumbers)[number];
  index: number;
  scale: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  // С сервера приходит финальное значение: без движения оно таким и остаётся.
  const [value, setValue] = useState(item.value);
  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, item.value, {
      duration: 1.5,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => setValue(Math.round(current)),
    });
    return () => controls.stop();
  }, [reduced, item.value, index]);
  return (
    <div className="hero-number">
      <motion.span
        className="hero-number-value"
        aria-hidden="true"
        style={{ scale: reduced ? 1 : scale }}
      >
        {item.prefix && <small>{item.prefix}</small>}
        {value}
        {item.suffix}
      </motion.span>
      <span className="sr-only">
        {item.prefix && `${item.prefix} `}
        {item.value}
        {item.suffix}
      </span>
      <span className="hero-number-label">{item.label}</span>
    </div>
  );
}
export function HeroNumbers() {
  const { scrollY } = useScroll();
  // Цифры растут, пока первый экран уходит вверх; на телефоне рост меньше, чтобы не выйти за колонку.
  const scale = useTransform(scrollY, (y) => {
    if (typeof window === "undefined") return 1;
    const progress = Math.min(1, y / (window.innerHeight * 0.45));
    const grow = window.innerWidth <= 760 ? 0.15 : 0.45;
    return 1 + grow * (1 - Math.pow(1 - progress, 3));
  });
  return (
    <div className="hero-numbers" role="group" aria-label={copy.hero.numbersLabel}>
      {heroNumbers.map((item, index) => (
        <HeroNumber key={item.label} item={item} index={index} scale={scale} />
      ))}
    </div>
  );
}
