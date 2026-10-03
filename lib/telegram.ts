/** Предзаполненный текст сообщения для каждой точки входа — по нему видно, откуда пришел лид. */
const contactMessages = {
  default: "Здравствуйте! Пишу с вашего сайта. Хочу обсудить задачу.",
  header: "Здравствуйте! Увидел ваш сайт. Хочу обсудить задачу.",
  hero: "Здравствуйте! Посмотрел ваш сайт и хочу обсудить проект.",
  footer: "Здравствуйте! Есть задача, которую хочу обсудить.",
} as const;

export type ContactSource = keyof typeof contactMessages;

export interface ContactProject {
  title: string;
}

const USERNAME_PATTERN = /^[a-z][a-z0-9_]{4,31}$/i;

/** Принимает `username`, `@username` или `https://t.me/username`; на невалидном значении — `null`. */
function normalizeTelegramUsername(raw: string | undefined): string | null {
  const value = (raw ?? "")
    .trim()
    .replace(/^(https?:\/\/)?t\.me\//i, "")
    .replace(/^@/, "");
  return USERNAME_PATTERN.test(value) ? value : null;
}

/** Единственное место с именем аккаунта: модуль данных, кнопка связи и адрес `/tg` берут ссылку отсюда. */
export const telegramUsername = normalizeTelegramUsername(
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "opskeeper",
);

/** Ссылка в ЛС Telegram с черновиком сообщения. `null`, если username не настроен. */
function buildTelegramLink(text?: string): string | null {
  if (!telegramUsername) return null;
  const base = `https://t.me/${telegramUsername}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function getContactLink(source: ContactSource = "default"): string | null {
  return buildTelegramLink(contactMessages[source]);
}

/** Текст черновика по кейсу: его же показывает окно кейса перед кнопкой. */
export function getProjectDraft(project: ContactProject): string {
  return `Меня заинтересовал проект «${project.title}», хочу сделать что-то подобное`;
}

export function getProjectContactLink(project: ContactProject): string | null {
  return buildTelegramLink(getProjectDraft(project));
}
