"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Bot,
  HandHelping,
  MessageCircle,
  Monitor,
  Rocket,
  Workflow,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  matthewPreviewCopy as text,
  type about,
  type processSteps,
  type why,
} from "@/data/projects";
import styles from "./prototype.module.css";

export function CountUpFact({ fact }: { fact: (typeof about.facts)[number] }) {
  const element = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.95", "center 0.58"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });
  const match = fact.value.match(/^(\D*)(\d+)(.*)$/);
  const count = useTransform(progress, (value) =>
    match
      ? `${match[1]}${Math.round(Math.max(0, Math.min(1, value)) * Number(match[2]))}${match[3]}`
      : fact.value,
  );
  return (
    <div className={styles.fact} ref={element}>
      <span aria-label={`${fact.value} ${fact.unit || ""}`}>
        <motion.span aria-hidden="true" className={styles.factCount}>
          {reduced ? fact.value : count}
        </motion.span>
        <small>{fact.unit}</small>
      </span>
      <p>{fact.label}</p>
    </div>
  );
}

function HandsScene() {
  return (
    <>
      <g className={styles.handLeft}>
        <HandHelping x="5" y="68" width="100" height="68" strokeWidth="1.2" />
      </g>
      <g className={styles.handRight}>
        <HandHelping x="5" y="68" width="100" height="68" strokeWidth="1.2" />
      </g>
      <g className={`${styles.heldNode} ${styles.heldOne}`}>
        <rect x="42" y="29" width="42" height="42" rx="10" />
        <Monitor x="52" y="39" width="22" height="22" strokeWidth="1.5" />
      </g>
      <g className={`${styles.heldNode} ${styles.heldTwo}`}>
        <rect x="89" y="10" width="42" height="42" rx="10" />
        <Bot x="99" y="20" width="22" height="22" strokeWidth="1.5" />
      </g>
      <g className={`${styles.heldNode} ${styles.heldThree}`}>
        <rect x="136" y="29" width="42" height="42" rx="10" />
        <Workflow x="146" y="39" width="22" height="22" strokeWidth="1.5" />
      </g>
    </>
  );
}

function AiScene() {
  return (
    <>
      <path
        className={styles.circuit}
        d="M20 38h38l20 20h14M20 102h38l20-20h14M128 58h16l20-20h38M128 82h16l20 20h38"
      />
      <g className={styles.chip}>
        <rect x="84" y="43" width="52" height="54" rx="13" />
        <path d="M94 35v8m16-8v8m16-8v8M94 97v8m16-8v8m16-8v8M76 54h8m-8 16h8m-8 16h8m52-32h8m-8 16h8m-8 16h8" />
        <Bot x="95" y="55" width="30" height="30" strokeWidth="1.3" />
      </g>
      {[38, 102].map((y, i) => (
        <circle
          key={y}
          className={`${styles.signal} ${i ? styles.signalTwo : ""}`}
          cx="20"
          cy={y}
          r="5"
        />
      ))}
      <path className={styles.aiCheck} d="m171 66 8 8 15-17" />
      <path className={styles.scanLine} d="M82 70h56" />
    </>
  );
}

function LaunchScene() {
  return (
    <>
      <path className={styles.launchLine} d="M35 114h150M58 100h104" />
      <g className={styles.rocket}>
        <Rocket x="80" y="26" width="70" height="70" strokeWidth="1.2" />
        <path className={styles.flame} d="m85 92-10 23 23-10" />
      </g>
      <circle className={styles.launchStar} cx="165" cy="35" r="3" />
      <path className={styles.launchStar} d="M47 46h14m-7-7v14" />
      <path className={styles.launchCheck} d="m159 79 7 7 13-15" />
    </>
  );
}

function TalkScene() {
  return (
    <>
      <g className={styles.bubbleLeft}>
        <MessageCircle
          x="28"
          y="17"
          width="100"
          height="78"
          strokeWidth="1.1"
        />
        {[65, 79, 93].map((x, i) => (
          <circle
            key={x}
            className={styles.talkDot}
            style={{ animationDelay: `${i * 0.15}s` }}
            cx={x}
            cy="52"
            r="3"
          />
        ))}
      </g>
      <g className={styles.bubbleRight}>
        <path d="M121 65h65a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10h-8l-16 13v-13h-41a10 10 0 0 1-10-10V75a10 10 0 0 1 10-10Z" />
        <path className={styles.talkCheck} d="m139 91 10 10 22-24" />
      </g>
    </>
  );
}

const scenes = [HandsScene, AiScene, LaunchScene, TalkScene];

export function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof why)[number];
  index: number;
}) {
  const [active, setActive] = useState(false);
  const Scene = scenes[index];
  return (
    <article
      className={styles.reason}
      data-active={active}
      tabIndex={0}
      aria-labelledby={`reason-title-${index}`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setActive(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setActive(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") setActive((value) => !value);
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActive((value) => !value);
        }
      }}
    >
      <div className={styles.reasonTop}>
        <svg
          className={styles.reasonScene}
          viewBox="0 0 220 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <Scene />
        </svg>
      </div>
      <h3 id={`reason-title-${index}`}>{reason.title}</h3>
      <p>{reason.text}</p>
      <span className={styles.reasonHint}>
        {text.reasonHint}
        <span aria-hidden="true">↗</span>
      </span>
    </article>
  );
}

export function ProcessStep({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const element = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.82", "start 0.32"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 25 });
  const dashOffset = useTransform(progress, [0, 1], [201.062, 0]);
  const color = useTransform(progress, [0, 1], ["#959b8e", "#b6ff7c"]);
  const x = useTransform(progress, [0, 1], [0, 6]);
  const background = useTransform(
    progress,
    [0, 1],
    ["rgba(182,255,124,0)", "rgba(182,255,124,0.055)"],
  );
  return (
    <motion.div
      ref={element}
      className={styles.step}
      style={{
        x: reduced ? 0 : x,
        backgroundColor: reduced ? "transparent" : background,
      }}
    >
      <div className={styles.stepBadge}>
        <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
          <circle cx="36" cy="36" r="32" stroke="#454b40" strokeWidth="1" />
          <motion.circle
            cx="36"
            cy="36"
            r="32"
            stroke="#b6ff7c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="201.062"
            style={{ strokeDashoffset: reduced ? 0 : dashOffset }}
            transform="rotate(-90 36 36)"
          />
        </svg>
        <motion.span
          className={styles.stepNumber}
          style={{ color: reduced ? "#b6ff7c" : color }}
        >
          0{index + 1}
        </motion.span>
      </div>
      <div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </motion.div>
  );
}
