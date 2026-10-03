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
  source,
  project,
}: {
  children?: React.ReactNode;
  className?: string;
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
      className={cn("contact-link", "button-primary", className)}
    >
      {children || copy.contact}
    </a>
  );
}
