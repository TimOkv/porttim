import type { ReactNode } from "react";
import { Send } from "lucide-react";
import {
  getContactLink,
  getProjectContactLink,
  type ContactProject,
  type ContactSource,
} from "@/lib/telegram";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

/** Подсказка на кнопке, когда username Telegram не задан в окружении. */
const UNAVAILABLE_LABEL = "Контакт в Telegram пока не настроен";

export interface TelegramButtonProps {
  /** Точка входа: определяет предзаполненный текст сообщения. */
  source?: ContactSource;
  /** Если передан кейс, текст обращения упоминает его и `source` игнорируется. */
  project?: ContactProject;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

/** Кнопка быстрой связи: открывает ЛС в Telegram с готовым черновиком сообщения. */
export function TelegramButton({
  source = "default",
  project,
  children,
  ...buttonProps
}: TelegramButtonProps) {
  const href = project
    ? getProjectContactLink(project)
    : getContactLink(source);
  const icon = <Send aria-hidden className="size-4" />;

  if (!href) {
    return (
      <Button
        {...buttonProps}
        iconLeft={icon}
        disabled
        title={UNAVAILABLE_LABEL}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button {...buttonProps} href={href} iconLeft={icon}>
      {children}
    </Button>
  );
}
