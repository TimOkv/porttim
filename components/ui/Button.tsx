import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "glass" | "ghost";
export type ButtonSize = "md" | "lg";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

type ButtonAsButton = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** С `href` рендерится `<a>`, без него — `<button>`. */
export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-sky-600",
  glass:
    "border border-white/80 bg-white/70 text-slate-900 shadow-[0_20px_40px_-15px_rgba(2,132,199,0.07)] backdrop-blur-md hover:bg-white",
  ghost: "text-blue-600 hover:bg-blue-600/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

/** Классы кнопки отдельно от разметки — для `motion.a` / `motion.button` и своих оберток. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: Pick<ButtonOwnProps, "variant" | "size"> & {
  className?: string;
} = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, iconLeft, iconRight, className, children, ...rest } =
    props;
  const classes = buttonStyles({ variant, size, className });
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (rest.href !== undefined) {
    const isExternal = /^https?:\/\//.test(rest.href);
    return (
      <a
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
