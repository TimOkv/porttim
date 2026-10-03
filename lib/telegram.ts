/** Предзаполненный текст сообщения для каждой точки входа — по нему видно, откуда пришел лид. */
export const contactMessages = {
  default: "Здравствуйте! Пишу с вашего сайта-портфолио. Хочу обсудить проект.",
  header: "Здравствуйте! Пишу с вашего сайта-портфолио. Хочу обсудить сотрудничество.",
  hero: "Здравствуйте! Посмотрел ваше портфолио и хочу обсудить проект.",
  footer: "Здравствуйте! Есть идея, которую хочу реализовать. Давайте обсудим.",
} as const;

export type ContactSource = keyof typeof contactMessages;

export interface ContactProject {
  title: string;
}

export function projectContactMessage(projectTitle: string): string {
  return `Здравствуйте! Заинтересовал кейс «${projectTitle}» в вашем портфолио. Хочу обсудить похожий проект.`;
}

const USERNAME_PATTERN = /^[a-z][a-z0-9_]{4,31}$/i;

/** Принимает `username`, `@username` или `https://t.me/username`; на невалидном значении — `null`. */
export function normalizeTelegramUsername(raw: string | undefined): string | null {
  const value = (raw ?? "")
    .trim()
    .replace(/^(https?:\/\/)?t\.me\//i, "")
    .replace(/^@/, "");
  return USERNAME_PATTERN.test(value) ? value : null;
}

/** Значение по умолчанию должно совпадать с `username` в `data/projects.ts`. */
export const telegramUsername = normalizeTelegramUsername(
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "opskeeper",
);

/** Ссылка в ЛС Telegram с черновиком сообщения. `null`, если username не настроен. */
export function buildTelegramLink(text?: string): string | null {
  if (!telegramUsername) return null;
  const base = `https://t.me/${telegramUsername}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function getContactLink(source: ContactSource = "default"): string | null {
  return buildTelegramLink(contactMessages[source]);
}

export function getProjectContactLink(project: ContactProject): string | null {
  return buildTelegramLink(projectContactMessage(project.title));
}
