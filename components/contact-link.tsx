import { ArrowUpRight, Send } from "lucide-react";
import { copy } from "@/data/projects";
import {
  getContactLink,
  getProjectContactLink,
  type ContactSource,
} from "@/lib/telegram";
import { cn } from "@/lib/utils";
export function ContactLink({
  children,
  className,
  compact = false,
  source,
  project,
}: {
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
  // Точка входа: от неё зависит текст черновика.
  source?: ContactSource;
  // Кейс, о котором пишут: черновик называет его; важнее точки входа.
  project?: { title: string };
}) {
  // Без настроенного имени аккаунта ведём к контактному блоку страницы, а не на чужой аккаунт.
  const telegram = project
    ? getProjectContactLink(project)
    : getContactLink(source);
  return (
    <a
      href={telegram || "#contact"}
      target={telegram ? "_blank" : undefined}
      rel={telegram ? "noopener noreferrer" : undefined}
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
