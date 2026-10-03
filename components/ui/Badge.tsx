import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "accent" | "neutral" | "tag";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Пульсирующая точка статуса перед текстом. */
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  accent: "border-sky-400/40 bg-sky-400/10 text-sky-800",
  neutral: "border-white/80 bg-white/70 text-slate-600 backdrop-blur-md",
  tag: "border-slate-200 bg-white/60 font-mono text-xs text-slate-600",
};

export function Badge({
  variant = "accent",
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {dot && (
        <span aria-hidden className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  );
}
