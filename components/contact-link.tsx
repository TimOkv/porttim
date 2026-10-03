import { ArrowUpRight, Send } from "lucide-react";
import { copy, profile } from "@/data/projects";
import { cn } from "@/lib/utils";
export function ContactLink({
  children,
  className,
  compact = false,
}: {
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={profile.telegram || "#contact"}
      target={profile.telegram ? "_blank" : undefined}
      rel={profile.telegram ? "noopener noreferrer" : undefined}
      className={cn(
        "contact-link",
        compact ? "contact-compact" : "button-primary",
        className,
      )}
    >
      <Send size={compact ? 15 : 17} strokeWidth={1.7} aria-hidden="true" />
      <span>{children || copy.contact}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
