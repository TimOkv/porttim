import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type GlassCardPadding = "none" | "md" | "lg";

export interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "section" | "aside" | "li";
  /** Включает hover-отклик (подъем карточки). */
  interactive?: boolean;
  padding?: GlassCardPadding;
}

const paddingStyles: Record<GlassCardPadding, string> = {
  none: "",
  md: "p-6",
  lg: "p-8",
};

/** Классы стеклянной поверхности отдельно от разметки — для `motion.*` и своих оберток. */
export function glassCardStyles({
  interactive = false,
  padding = "md",
  className,
}: Pick<GlassCardProps, "interactive" | "padding" | "className"> = {}): string {
  return cn(
    "rounded-3xl border border-white/80 bg-white/70 shadow-[0_20px_40px_-15px_rgba(2,132,199,0.07)] backdrop-blur-md",
    paddingStyles[padding],
    interactive && "transition-transform duration-300 hover:-translate-y-1",
    className,
  );
}

export function GlassCard({
  as: Component = "div",
  interactive,
  padding,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <Component
      className={glassCardStyles({ interactive, padding, className })}
      {...rest}
    />
  );
}
