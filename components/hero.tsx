"use client";
import Image from "next/image";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Layers2,
  Sparkles,
} from "lucide-react";
import { copy, profile } from "@/data/projects";
import { ContactLink } from "./contact-link";
export function Hero() {
  const reduced = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);
  const px = useMotionValue(0),
    py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 90, damping: 22 });
  const y = useSpring(py, { stiffness: 90, damping: 22 });
  const enter = {
    type: "spring" as const,
    stiffness: 65,
    damping: 19,
    delay: 0.15,
  };
  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow">
          <span className="tiny-spark">
            <Sparkles size={13} />
          </span>
          {copy.hero.eyebrow}
        </div>
        <motion.h1
          id="hero-title"
          initial={false}
          animate={{ y: 0 }}
          transition={enter}
        >
          {copy.hero.title[0]}
          <br />
          {copy.hero.title[1]}
          <br />
          <span className="gradient-text">{copy.hero.title[2]}</span>
        </motion.h1>
        <p className="hero-description">{copy.hero.description}</p>
        <div className="hero-actions">
          <ContactLink source="hero">{copy.hero.primary}</ContactLink>
          <a className="button-secondary" href="#projects">
            {copy.hero.secondary}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <p className="hero-note">
          <span className="status-dot" />
          {copy.hero.note}
        </p>
      </div>
      <div
        className="portrait-stage"
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          px.set(((event.clientX - rect.left) / rect.width - 0.5) * 18);
          py.set(((event.clientY - rect.top) / rect.height - 0.5) * 14);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        <div className="portrait-glow" />
        <div className="portrait-orbits">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
        <motion.div
          className="portrait-motion"
          initial={{ y: 34, scale: 0.96 }}
          animate={{ y: 0, scale: 1 }}
          transition={enter}
        >
          <motion.div style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}>
            <div className="portrait-frame glass">
              <div className="portrait-image">
                {profile.portrait && !imageFailed ? (
                  <Image
                    src={profile.portrait}
                    alt={copy.hero.portraitAlt}
                    fill
                    priority
                    sizes="(max-width: 760px) 80vw, 360px"
                    className="portrait-photo"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div
                    className="portrait-placeholder"
                    aria-label={copy.hero.portraitPlaceholder}
                    role="img"
                  >
                    <div className="portrait-grid" />
                    <div className="glass-monogram">{profile.initials}</div>
                    <span className="portrait-placeholder-label">
                      {copy.hero.portraitPlaceholder}
                    </span>
                  </div>
                )}
                <div className="portrait-shade" />
                <div className="portrait-caption">
                  <span>{copy.hero.portraitLabel}</span>
                  <strong>
                    {profile.name}
                    <ArrowUpRight size={20} />
                  </strong>
                  <p>{profile.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className="float-badge float-badge-top glass">
          <span className="badge-icon">
            <Code2 size={20} />
          </span>
          <span>
            {copy.hero.badgeTop}
            <small>{copy.heroBadges.top}</small>
          </span>
        </div>
        <div className="float-badge float-badge-bottom glass">
          <span className="badge-icon">
            <Layers2 size={20} />
          </span>
          <span>
            {copy.hero.badgeBottom}
            <small>{copy.heroBadges.bottom}</small>
          </span>
        </div>
        <span className="portrait-star">
          <Sparkles size={27} strokeWidth={1} />
        </span>
      </div>
      <div className="hero-bottom">
        <span className="mono">{copy.hero.location}</span>
        <a href="#metrics">
          {copy.hero.scroll}
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
