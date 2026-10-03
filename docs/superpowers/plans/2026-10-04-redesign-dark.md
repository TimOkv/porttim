# Редизайн PortTim: план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать одностраничник в тёмный сайт-резюме из семи экранов по согласованному прототипу.

**Architecture:** Структура проекта сохраняется: плоский `components/*.tsx`, один `app/globals.css`, всё содержание в `data/projects.ts`. Секции — серверные компоненты; клиентские только там, где есть состояние (шапка, цифры, портрет, кейсы, курсор, наблюдатель появления). Появление блоков и цепочка процесса сделаны на CSS-классах, которые вешает один наблюдатель, чтобы разметка сервера и браузера совпадала.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4 (только `@import`), framer-motion 12, lucide-react, Playwright + axe.

**Spec:** `docs/superpowers/specs/2026-10-04-redesign-design.md`. Образец вида и движения — `docs/superpowers/specs/2026-10-04-redesign-prototype.html`; где они расходятся, верна спецификация.

## Global Constraints

- Ветка `redesign-dark` от `main`; в `main` не коммитить. Каждый коммит заканчивается строкой `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Перед кодом, который трогает `next/image`, `app/layout.tsx` или обработчик маршрута, прочитать нужное руководство в `node_modules/next/dist/docs/01-app/` (требование `AGENTS.md`). По API framer-motion сверяться через Context7.
- Весь текст интерфейса — только в `data/projects.ts`; в компонентах русских строк нет.
- Тема одна, тёмная: фон `#020408`, текст `#FFFFFF`, приглушённый — белый 58%, линии — белый 9% и 20%, акцент `#5B72FF`, поверхность окна `#06080F`. `color-scheme: dark`.
- Шрифт один: Manrope Variable. Заголовки: 800, капс, трекинг −0,045em, интерлиньяж 0,94.
- Скругление 2 px у кнопок; у плашек и окна углы прямые.
- Имя аккаунта Telegram и правило его проверки живут только в `lib/telegram.ts`; без имени кнопки ведут на `#contact`.
- Ссылка на профиль в MAX и её проверка живут только в `lib/max.ts`; кнопок MAX две — в блоке контакта и плавающая рядом с Telegram; черновика у них нет.
- На странице нет слов «EasyCode», названий должностей, срока работы, названий технологий, слов «стек», «Retention», «лидогенерация».
- Цифры — только названные владельцем или посчитанные из данных.
- Свой курсор — только при `(pointer: fine)` и без `prefers-reduced-motion: reduce`.
- Тесты идут против `next start` на порту 3100 по свежей сборке: `lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`. Если Turbopack не может занять порт: `npm run build -- --webpack`.
- Сайт не публикуется: сборка и проверка только локально.
- `components/ui/` и `PROJECT_SPEC.md` не трогать.

## Review Focus

1. **Имя из одного слова** (`NEXT_PUBLIC_PROFILE_NAME=TimA`): шапка и «Обо мне» показывают одно слово без точки-разделителя и пустой второй строки. Проверка — Task 6, шаг 5.
2. **Портрет не загрузился**: первый экран без битой картинки и без пустой рамки. Тест — Task 1.
3. **Имя аккаунта Telegram не задано или невалидно**: все кнопки ведут на `#contact`, окно кейса не обещает набранный текст. Проверка — Task 6, шаг 5.
4. **Прокрутка первого экрана на телефоне**: выросшие цифры не дают горизонтальной прокрутки. Тест — Task 6.
5. **Низкое окно** (телефон боком, 700×360): окно кейса прокручивается, кнопка «Написать в Telegram» достижима. Тест — Task 3.

## Словарь классов

CSS пишется в `app/globals.css` один раз, при переносе из прототипа. Правила берутся из `<style>` прототипа дословно, меняются только имена:

| Прототип | Сайт |
|---|---|
| `.w` | `.container` |
| `.eb` | `.eyebrow` |
| `.h` | `.display` |
| `.ol` | `.outline` |
| `.bt` | `.button-primary` |
| `.bt.g` | `.button-ghost` |
| `.rv`, `.rv.in` | `.reveal`, `.reveal.is-visible` |
| `.top`, `.top .bar`, `.logo`, `.logo i`, `.top nav`, `.top .ask` | `.site-header`, `.scroll-progress`, `.brand`, `.brand-dot`, `.site-nav`, `.header-cta` |
| `nav a.cur` | `.site-nav a[aria-current]` |
| `#cdot`, `#cspot`, `.hov` | `.cursor-dot`, `.cursor-spot`, `html.cursor-hover` |
| `.hero-g` | `.hero-copy` |
| `.ph` | `.hero-portrait` |
| `.nums`, `.nums div`, `.nums strong` | `.hero-numbers`, `.hero-number`, `.hero-number-value` |
| `.tiles`, `.tint` | `.tile-grid`, `.tile` |
| `.serv` | `.services-grid` |
| `.chips`, `.chips button.on` | `.filters`, `.filter[aria-pressed="true"]` |
| `.cases`, `.case`, `.case dl` | `.cases-grid`, `.case-card`, `.case-facts` |
| `dialog`, `.x`, `.lbl`, `.res`, `.draft` | `.project-dialog`, `.dialog-close`, `.dialog-label`, `.dialog-result`, `.dialog-draft` |
| `.why` | `.why-grid` |
| `.pipe`, `.n`, `.ar`, `.fill`, `.dot` | `.process`, `.process-step`, `.process-link`, `.process-link::before`, `.process-dot` |
| `.about`, `.name`, `.tags`, `.facts` | `.about`, `.about-name`, `.about-tags`, `.about-facts` |
| `.cta` | `.contact-section` |
| `.tg` | `.quick-contact` |

Отличия от прототипа, общие для всех задач:
- Панели `.demo` нет.
- `.outline`: `color: var(--acc); -webkit-text-fill-color: transparent; -webkit-text-stroke: 1px var(--acc);`.
- Фокус: `a:focus-visible, button:focus-visible { outline: 2px solid var(--acc); outline-offset: 4px; }`.
- Брейкпоинты: `max-width: 1100px` — сетки услуг и «Почему я» по 2 колонки, кейсы по 2; `max-width: 760px` — всё в 1 колонку, поля контейнера 20 px, `section { padding: 72px 0 }`.
- Блок `@media (prefers-reduced-motion: reduce)` в конце файла: `*, *::before, *::after { animation: none !important; transition: none !important; }`, `.reveal { opacity: 1; translate: none; }`, `.process-step { opacity: 1; translate: none; scale: 1; }`, `.process-link::before { scale: 1; }`.
- `<noscript>` в `app/layout.tsx` со стилем `.reveal,.process-step{opacity:1;translate:none}`.

---

### Task 1: Каркас — данные, ссылки, тёмная основа, шапка, первый экран, контакт

**Files:**
- Create: `lib/max.ts`
- Modify: `package.json` (зависимости), `data/projects.ts` (целиком), `lib/telegram.ts`, `lib/utils.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css` (целиком), `components/header.tsx`, `components/hero.tsx`, `components/footer.tsx`, `components/contact-link.tsx`, `.env.example`
- Create: `components/hero-numbers.tsx`, `components/hero-portrait.tsx`, `components/reveal-observer.tsx`
- Delete: `components/metrics.tsx`, `components/tech-stack.tsx`, `components/about.tsx`, `components/projects.tsx` (вернутся в своих задачах)
- Test: `tests/portfolio.spec.ts` (целиком)

**Interfaces:**
- Produces (`data/projects.ts`): `profile { name, portrait, telegram, max }`, `copy`, `categories`, `categoryLabels: Record<Category, string>`, `projects: Project[]`, `heroNumbers`, `services`, `why`, `process`, `stack`, `stackCount: number`, `about`; типы `Category`, `Project { id, number, category, title, done, result: { value?, text }, details, url? }`.
- Produces (`lib/telegram.ts`): `telegramUsername`, `getContactLink(source?)`, `getProjectContactLink({ title })`, `getProjectDraft({ title }): string`, тип `ContactSource = "default" | "header" | "hero" | "footer"`.
- Produces (`lib/max.ts`): `maxLink: string | null` — ссылка на профиль в MAX или `null`, если значение не похоже на адрес профиля.
- Produces (`lib/utils.ts`): `cn(...)`, `delay(step: number): React.CSSProperties` — задаёт `--d` для `.reveal`.
- Produces (`components/contact-link.tsx`): `ContactLink({ children?, className?, compact?, source?, project? })`; `compact` — контурная кнопка шапки (`.header-cta`), иначе `.button-primary`.
- Produces: классы `.container`, `.eyebrow`, `.display`, `.outline`, `.reveal`, `.tile-grid`, `.tile`, `.button-primary`, `.button-ghost`; секции с `id` `home` и `contact`.

- [ ] **Step 1: Ветка и шрифт**

```bash
git switch -c redesign-dark
npm install @fontsource-variable/manrope
npm uninstall @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

- [ ] **Step 2: Переписать тесты каркаса**

Заменить `tests/portfolio.spec.ts` целиком:

```ts
import { expect, test, type Page } from "@playwright/test";
import { categories, projects } from "../data/projects";

const personalChat = "https://t.me/opskeeper";
const personalMax =
  "https://max.ru/u/f9LHodD0cOL3ZxdR2MdBHG-1wve5Qo86kG6e9FnepcXpbeAlAVVOr3iiv8o";
// Тексты черновиков — из описания дизайна, а не из модуля ссылок.
const generalDraft = "Здравствуйте! Пишу с вашего сайта. Хочу обсудить задачу.";
const isMobile = () => test.info().project.name === "mobile";
const overflow = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );

test("dark page shows the name, the portrait and no runtime errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Сайт, бот\s*и автоматизация —\s*в одних руках/,
  );
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(2, 4, 8)",
  );
  await expect(page.locator(".brand")).toHaveText(/Тим\s*Окунев/);
  const portrait = page.getByRole("img", { name: "Портрет — Тим Окунев" });
  await expect(portrait).toBeVisible();
  await expect
    .poll(() =>
      portrait.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  expect(await overflow(page)).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("hero shows no broken image when the portrait fails to load", async ({
  page,
}) => {
  await page.route(/portrait/, (route) => route.abort());
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-portrait")).toHaveCount(0);
});

test("every contact link opens the personal Telegram chat with its own draft", async ({
  page,
}) => {
  await page.goto("/");
  for (const [link, draft] of [
    [
      page.locator(".site-header .contact-link").first(),
      "Здравствуйте! Увидел ваш сайт. Хочу обсудить задачу.",
    ],
    [
      page.locator(".hero .contact-link"),
      "Здравствуйте! Посмотрел ваш сайт и хочу обсудить проект.",
    ],
    [
      page.locator("#contact .contact-link"),
      "Здравствуйте! Есть задача, которую хочу обсудить.",
    ],
    [page.locator(".quick-contact"), generalDraft],
  ] as const) {
    await expect(link).toHaveAttribute("target", "_blank");
    const url = new URL((await link.getAttribute("href"))!);
    expect(url.origin + url.pathname).toBe(personalChat);
    expect(url.searchParams.get("text")).toBe(draft);
  }
  // Второй канал — MAX: кнопка в блоке контакта и плавающая рядом с Telegram, без черновика.
  await expect(page.locator(".hero .contact-link")).toHaveText("Связаться");
  const max = page.locator('a[href*="max.ru"]');
  await expect(max).toHaveCount(2);
  for (const link of [
    page.locator("#contact").getByRole("link", { name: "Написать в MAX" }),
    page.locator(".quick-max"),
  ]) {
    await expect(link).toHaveAttribute("href", personalMax);
    await expect(link).toHaveAttribute("target", "_blank");
  }
  // Других адресов Telegram на странице нет, и ни один черновик не пуст.
  const links = await page
    .locator('a[href*="t.me"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
  expect(links.length).toBeGreaterThanOrEqual(4);
  for (const href of links) {
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe(personalChat);
    expect(url.searchParams.get("text")).toBeTruthy();
  }
});

test("short /tg addresses redirect to the personal chat", async ({
  request,
}) => {
  const draft = async (path: string) => {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    const url = new URL(response.headers().location);
    expect(url.origin + url.pathname).toBe(personalChat);
    return url.searchParams.get("text");
  };
  expect(await draft("/tg")).toBe(generalDraft);
  expect(await draft("/tg/web-to-sheets")).toBe(
    "Меня заинтересовал проект «Сайт → таблица», хочу сделать что-то подобное",
  );
  // Неизвестный идентификатор ведёт как /tg.
  expect(await draft("/tg/no-such-case")).toBe(generalDraft);
});

test("hero numbers count up and settle at 9 · 3 · до 80% · 24/7", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  // Для чтения с экрана значения сразу финальные; первые два считаются из данных.
  const used = categories.filter((category) =>
    projects.some((project) => project.category === category),
  );
  await expect(page.locator(".hero-number .sr-only")).toHaveText([
    String(projects.length),
    String(used.length),
    "до 80%",
    "24/7",
  ]);
  const samples = await page
    .locator(".hero-number-value")
    .nth(2)
    .evaluate(async (element) => {
      const values: string[] = [];
      const started = performance.now();
      while (performance.now() - started < 2600) {
        values.push(element.textContent || "");
        await new Promise(requestAnimationFrame);
      }
      return values;
    });
  const digits = (value: string) => parseInt(value.replace(/\D/g, ""), 10);
  expect(samples.some((value) => digits(value) < 80)).toBe(true);
  expect(digits(samples.at(-1)!)).toBe(80);
});

test("phone menu opens with the button, closes on Escape and after choosing a section", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Разделы" });
  const open = page.getByRole("button", { name: "Открыть меню" });
  if (!isMobile()) {
    await expect(nav.getByRole("link", { name: "Кейсы" })).toBeVisible();
    await expect(open).toBeHidden();
    return;
  }
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeHidden();
  await open.click();
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Обсудить задачу" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeHidden();
  await expect(open).toBeFocused();
  await open.click();
  await nav.getByRole("link", { name: "Обо мне" }).click();
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});
```

Импорты `stack` и `AxeBuilder` добавляются в Task 5 и Task 6, когда появляются тесты, которым они нужны.

- [ ] **Step 3: Убедиться, что тесты падают**

Run: `lsof -ti tcp:3100 | xargs kill; npm run build && npx playwright test --project=desktop`
Expected: сборка проходит (код сайта ещё прежний), тесты FAIL — светлый фон, старый заголовок, нет `.brand` с именем.

- [ ] **Step 4: `lib/telegram.ts` — новые черновики**

Заменить `contactMessages` и `projectContactMessage`, добавить `getProjectDraft`; остальное не менять:

```ts
/** Предзаполненный текст сообщения для каждой точки входа — по нему видно, откуда пришел лид. */
const contactMessages = {
  default: "Здравствуйте! Пишу с вашего сайта. Хочу обсудить задачу.",
  header: "Здравствуйте! Увидел ваш сайт. Хочу обсудить задачу.",
  hero: "Здравствуйте! Посмотрел ваш сайт и хочу обсудить проект.",
  footer: "Здравствуйте! Есть задача, которую хочу обсудить.",
} as const;
```

```ts
/** Текст черновика по кейсу: его же показывает окно кейса перед кнопкой. */
export function getProjectDraft(project: ContactProject): string {
  return `Меня заинтересовал проект «${project.title}», хочу сделать что-то подобное`;
}

export function getProjectContactLink(project: ContactProject): string | null {
  return buildTelegramLink(getProjectDraft(project));
}
```

Функцию `projectContactMessage` удалить.

Создать `lib/max.ts`:

```ts
const PROFILE_PATTERN = /^https:\/\/max\.ru\/u\/[\w-]+$/;

/** Единственное место со ссылкой на профиль в MAX. `null`, если значение не похоже на адрес профиля. */
export const maxLink = (() => {
  const value = (
    process.env.NEXT_PUBLIC_MAX_URL ??
    "https://max.ru/u/f9LHodD0cOL3ZxdR2MdBHG-1wve5Qo86kG6e9FnepcXpbeAlAVVOr3iiv8o"
  ).trim();
  return PROFILE_PATTERN.test(value) ? value : null;
})();
```

- [ ] **Step 5: `lib/utils.ts` — задержка появления**

```ts
import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
// Порядковый номер блока в ряду: по нему .reveal сдвигает начало появления.
export const delay = (step: number) => ({ "--d": step }) as CSSProperties;
```

- [ ] **Step 6: `data/projects.ts` — заменить целиком**

```ts
import { maxLink } from "@/lib/max";
import { getContactLink } from "@/lib/telegram";

export type Category = "Web" | "AI & Bots" | "Automation";
export type Project = {
  id: string;
  number: string;
  // Фильтр в сетке кейсов.
  category: Category;
  title: string;
  // Что сделано — одна строка на карточке.
  done: string;
  // Результат. value — только число, названное владельцем; у остальных результат сказан словами.
  result: { value?: string; text: string };
  // Подробное описание для окна кейса.
  details: string;
  // Публичная ссылка: с ней в окне кейса появляется кнопка «Посмотреть проект».
  url?: string;
};

export const profile = {
  name: process.env.NEXT_PUBLIC_PROFILE_NAME || "Тим Окунев",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_SRC || "/portrait.jpg",
  // Ссылку строит модуль ссылок: имя аккаунта и правило его проверки живут только там.
  telegram: getContactLink(),
  max: maxLink,
};

export const copy = {
  metadata: {
    title: `${profile.name} — сайты, боты и автоматизация`,
    description:
      "Разрабатываю сайты, Telegram-ботов и системы автоматизации под задачи бизнеса. Сдаю то, чем уже можно пользоваться.",
  },
  skip: "Перейти к содержимому",
  navigation: "Разделы",
  menuOpen: "Открыть меню",
  menuClose: "Закрыть меню",
  nav: [
    { label: "Услуги", href: "#services" },
    { label: "Кейсы", href: "#projects" },
    { label: "Подход", href: "#process" },
    { label: "Обо мне", href: "#about" },
  ],
  headerCta: "Обсудить задачу",
  contact: "Написать в Telegram",
  contactMax: "Написать в MAX",
  quickContact: "Написать",
  quickMax: "MAX",
  hero: {
    eyebrow: "Сайты · Боты · Интеграции · Автоматизация",
    title: ["Сайт, бот", "и автоматизация —"],
    accent: "в одних руках",
    description:
      "Разрабатываю сайты, Telegram-ботов и связки между сервисами. Собираю из них целые системы автоматизации под задачи бизнеса. Сдаю то, чем уже можно пользоваться.",
    primary: "Связаться",
    secondary: "Смотреть кейсы",
    portraitAlt: `Портрет — ${profile.name}`,
    numbersLabel: "Коротко в цифрах",
  },
  services: { eyebrow: "Услуги", title: "Что могу", accent: "сделать для вас" },
  projects: {
    eyebrow: "Кейсы",
    title: "Что сделано",
    accent: "и что это дало",
    all: "Все",
    filterLabel: "Фильтр кейсов",
    shown: "Показано кейсов",
    done: "Сделано",
    result: "Результат",
    details: "Открыть кейс",
    close: "Закрыть",
    dialogDone: "Что сделано",
    dialogResult: "Что это дало",
    draftHint: "В чате уже будет набран текст:",
    view: "Посмотреть проект",
  },
  why: { eyebrow: "Почему я", title: "Четыре причины", accent: "написать мне" },
  process: {
    eyebrow: "Как строится работа",
    title: "От сообщения",
    accent: "до готового продукта",
  },
  about: { eyebrow: "Обо мне" },
  contactSection: {
    eyebrow: "Напишите мне",
    title: "Есть",
    accent: "задача?",
    description:
      "Расскажите в двух словах, что нужно. Отвечу в Telegram и предложу, как это сделать.",
    unavailable:
      "Прямой контакт появится здесь после добавления Telegram-адреса.",
  },
  footer: { rights: "Сайты · Боты · Автоматизация", toTop: "Наверх" },
};

export const categories = ["Web", "AI & Bots", "Automation"] as const;
// Ключи категорий остаются прежними; на странице — эти подписи.
export const categoryLabels: Record<Category, string> = {
  Web: "Сайты",
  "AI & Bots": "Боты и ИИ",
  Automation: "Автоматизация",
};

// Тексты кейсов согласованы с владельцем 2026-10-04.
// Кейсы 02 и 03 сделаны на чужой платформе EasyLab: заявлена только своя часть работы.
export const projects: Project[] = [
  {
    id: "1c-portal",
    number: "01",
    category: "Web",
    title: "Портал 1С-услуг",
    done: "Многостраничный сайт с каталогом услуг и примерами внедрений.",
    result: { text: "Понятный путь от услуги до заявки" },
    details:
      "Многостраничный сайт для компании, которая внедряет 1С: каталог услуг, примеры внедрений и формы заявок. Структура продумана так, чтобы посетитель быстро находил нужную услугу и оставлял заявку. Сайт быстро открывается.",
  },
  {
    id: "web-quest",
    number: "02",
    category: "Web",
    title: "Обучающий веб-квест",
    done: "Игровой сценарий для учеников на платформе EasyLab.",
    result: { text: "Учатся через игру, а не сухую теорию" },
    details:
      "Браузерный квест для учеников онлайн-школы на базе платформы EasyLab. Придумал игровой сценарий и механики, которые удерживают внимание, и собрал их на платформе.",
  },
  {
    id: "webinar-landing",
    number: "03",
    category: "Web",
    title: "Лендинг для интенсива",
    done: "Страница интенсива онлайн-школы на платформе EasyLab.",
    result: { text: "Посетители регистрируются и приходят на интенсив" },
    details:
      "Посадочная страница интенсива онлайн-школы на базе платформы EasyLab. Её задача — чтобы посетитель зарегистрировался и дошёл до интенсива.",
  },
  {
    id: "materials-catalog",
    number: "04",
    category: "Web",
    title: "Каталог стройматериалов",
    done: "Каталог с быстрым расчётом, заявки сразу попадают в таблицу.",
    result: { value: "100%", text: "заявок доходят без потерь" },
    details:
      "Сайт-каталог для оптовой и розничной продажи стройматериалов. На сайте есть форма быстрого расчёта, а каждая заявка сразу записывается в таблицу — без задержек и ручной работы.",
  },
  {
    id: "card-agent",
    number: "05",
    category: "AI & Bots",
    title: "ИИ-агент учебных карточек",
    done: "Помощник на нейросети сам готовит карточки и задания.",
    result: { text: "У методистов в разы меньше рутины" },
    details:
      "Помощник на нейросети для методистов: сам составляет учебные карточки и задания в нужной структуре.",
  },
  {
    id: "school-assistant",
    number: "06",
    category: "AI & Bots",
    title: "Школьный бот-помощник",
    done: "Telegram-бот: расписание, звонки, меню и помощь с заданиями.",
    result: { value: "80%", text: "типовых вопросов — без человека" },
    details:
      "Telegram-бот для школы: расписание, звонки, меню столовой. Внутри — нейросеть, которая помогает разобрать учебное задание. Работает круглосуточно.",
  },
  {
    id: "lead-bot-parser",
    number: "07",
    category: "AI & Bots",
    title: "Бот сбора заявок",
    done: "Бот принимает и сортирует заявки, заодно собирает данные с сайта.",
    result: { text: "Заявки и данные — в одном канале" },
    details:
      "Telegram-бот принимает входящие заявки и уточняет детали, чтобы отделить целевые. Вторая часть сама следит за данными на внешнем сайте и собирает их.",
  },
  {
    id: "web-to-sheets",
    number: "08",
    category: "Automation",
    title: "Сайт → таблица",
    done: "Заявка с формы проверяется и сразу записывается в таблицу.",
    result: { value: "20+", text: "заявок за считаные минуты" },
    details:
      "Заявка с формы на сайте проверяется и сразу записывается в таблицу. Менеджерам не нужно копировать контакты руками.",
  },
  {
    id: "service-sync",
    number: "09",
    category: "Automation",
    title: "Синхронизация сервисов",
    done: "Сервисы сами обмениваются данными и шлют уведомления в чат.",
    result: { text: "Информация доходит без участия человека" },
    details:
      "Фоновая связка: внешние сервисы сами обмениваются данными, а в рабочие чаты приходят уведомления.",
  },
];

// Направления — категории, в которых есть хотя бы один кейс (те же, что дают кнопки фильтра).
const directions = categories.filter((category) =>
  projects.some((project) => project.category === category),
);

// Цифры первого экрана обобщённые; первые две считаются из данных и растут вместе с ними.
export const heroNumbers = [
  { value: projects.length, prefix: "", suffix: "", label: "готовых проектов" },
  {
    value: directions.length,
    prefix: "",
    suffix: "",
    label: "направления: сайты, боты, автоматизация",
  },
  { value: 80, prefix: "до", suffix: "%", label: "рутины забирает автоматика" },
  { value: 24, prefix: "", suffix: "/7", label: "всё работает без вас" },
];

export const services: {
  icon: "window" | "send" | "workflow" | "blocks";
  name: string;
  text: string;
}[] = [
  {
    icon: "window",
    name: "Сайты",
    text: "Лендинги, многостраничные сайты, платформы. С приёмом заявок или без.",
  },
  { icon: "send", name: "Боты", text: "Telegram-боты под любые задачи бизнеса." },
  {
    icon: "workflow",
    name: "Связки и интеграции",
    text: "Сервисы сами обмениваются данными. Настраиваю под ваш запрос.",
  },
  {
    icon: "blocks",
    name: "Системы под ключ",
    text: "Сайт, бот и связки в одной системе, которая упрощает работу бизнеса.",
  },
];

// tint — оттенок, которым плашка загорается при наведении.
export const why = [
  {
    title: "Всё в одних руках",
    text: "Сайт, бот и связка между ними — один человек, а не три подрядчика.",
    tint: "#5B72FF",
  },
  {
    title: "ИИ по делу",
    text: "Ставлю нейросеть туда, где она снимает рутину, а не «чтобы было».",
    tint: "#F5A430",
  },
  {
    title: "Довожу до рабочего",
    text: "Сдаю не макет и не «почти готово», а то, чем уже пользуются.",
    tint: "#B49DFF",
  },
  {
    title: "Говорю по-человечески",
    text: "Без терминов: что сделаю, зачем это нужно и что вы получите.",
    tint: "#2FCB9B",
  },
];

export const process = [
  { title: "Вы пишете", text: "Описываете задачу своими словами." },
  { title: "Бриф", text: "Изучаю вводные и задаю уточняющие вопросы." },
  { title: "План", text: "Обсуждаем решение, инструменты и порядок работы." },
  {
    title: "Готовый продукт",
    text: "Разработка, интеграции и передача того, чем уже можно пользоваться.",
  },
];

// На странице технологии не называются: массив — источник числа «инструментов в работе».
// Новая технология — одна строка в items.
export const stack: { name: string; items: string[] }[] = [
  {
    name: "Frontend & UI",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend & Automation",
    items: ["Python", "n8n", "Docker", "REST APIs", "Webhooks"],
  },
  {
    name: "AI & Integrations",
    items: [
      "LLM Orchestration",
      "Prompt Engineering",
      "AI Agents",
      "Telegram Bot API",
    ],
  },
];
export const stackCount = stack.reduce((sum, group) => sum + group.items.length, 0);

// Свои продукты владельца в онлайн-школе — его слова.
const ownProducts = [
  "ИИ-агент учебных карточек",
  "веб-квест",
  "лендинг для интенсива",
];

// Школа по названию и должность не называются нигде.
export const about: {
  paragraphs: string[];
  tags: string[];
  facts: { value: string; unit?: string; label: string; note?: string; color: string }[];
} = {
  paragraphs: [
    "Разработчик сайтов, Telegram-ботов и автоматизации. Работаю в EdTech — в онлайн-школе программирования.",
    "Не делаю «сайт ради сайта». Беру задачу бизнеса: заявки теряются, на одни и те же вопросы отвечают вручную, данные переносят руками. Собираю систему, которая делает это сама, — и отдаю готовой к работе.",
  ],
  tags: ["Сайты", "Telegram-боты", "ИИ", "Интеграции", "Автоматизация", "EdTech"],
  facts: [
    {
      value: String(ownProducts.length),
      label: "своих продукта в онлайн-школе",
      note: ownProducts.join(" · "),
      color: "#8FA2FF",
    },
    {
      value: String(stackCount),
      label: "инструментов в работе",
      note: "От сайта до нейросети — подбираю под задачу",
      color: "#F5C26B",
    },
    { value: "~1", unit: "час", label: "до ответа в Telegram", color: "#CDBFFF" },
  ],
};
```

`.env.example`: строку имени заменить на `NEXT_PUBLIC_PROFILE_NAME=Тим Окунев`; добавить строку `NEXT_PUBLIC_MAX_URL=https://max.ru/u/f9LHodD0cOL3ZxdR2MdBHG-1wve5Qo86kG6e9FnepcXpbeAlAVVOr3iiv8o`.

- [ ] **Step 7: `components/contact-link.tsx`**

```tsx
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
  // Контурная кнопка шапки.
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
        compact ? "header-cta" : "button-primary",
        className,
      )}
    >
      {children || copy.contact}
    </a>
  );
}
```

- [ ] **Step 8: `components/reveal-observer.tsx`**

```tsx
"use client";
import { useEffect } from "react";
// Один наблюдатель на страницу: блокам .reveal вешает .is-visible, цепочке .process — .is-playing.
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue;
          target.classList.add(
            target.classList.contains("process") ? "is-playing" : "is-visible",
          );
          observer.unobserve(target);
        }
      },
      // Порог нулевой: высокий блок на низком экране тоже должен появиться.
      { rootMargin: "0px 0px -12% 0px" },
    );
    document
      .querySelectorAll(".reveal, .process")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
```

- [ ] **Step 9: `components/header.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { copy, profile } from "@/data/projects";
import { ContactLink } from "./contact-link";
export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  // Имя может быть одним словом (переменная окружения): тогда точки и второй части нет.
  const [first, ...rest] = profile.name.split(" ");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <header className="site-header" data-open={open || undefined}>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label={`${profile.name} — ${copy.footer.toTop}`}
          onClick={() => setOpen(false)}
        >
          {first}
          {rest.length > 0 && (
            <>
              <i className="brand-dot" aria-hidden="true" />
              <span>{rest.join(" ")}</span>
            </>
          )}
        </a>
        <nav id="site-nav" className="site-nav" aria-label={copy.navigation}>
          {copy.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={current === item.href ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {/* На телефоне кнопка связи живёт внутри раскрытого меню. */}
          <ContactLink compact source="header" className="nav-cta">
            {copy.headerCta}
          </ContactLink>
        </nav>
        <ContactLink compact source="header">
          {copy.headerCta}
        </ContactLink>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? copy.menuClose : copy.menuOpen}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
```

CSS шапки сверх прототипа:

```css
.menu-toggle, .site-nav .nav-cta { display: none; }
.header-inner { display: grid; grid-template-columns: 1fr auto 1fr; }
.header-inner > .header-cta { justify-self: end; }
@media (max-width: 760px) {
  .header-inner { height: 68px; grid-template-columns: 1fr auto; }
  .header-inner > .header-cta { display: none; }
  .menu-toggle { display: grid; place-items: center; width: 44px; height: 44px; background: none; border: 1px solid var(--line2); color: var(--fg); }
  .site-nav { position: fixed; inset: 68px 0 0; flex-direction: column; align-items: flex-start; gap: 8px; padding: 32px 20px; background: var(--bg); visibility: hidden; opacity: 0; transition: opacity .3s, visibility .3s; }
  .site-header[data-open] .site-nav { visibility: visible; opacity: 1; }
  .site-nav a { font-size: 22px; letter-spacing: .12em; padding: 14px 0; }
  .site-nav .nav-cta { display: inline-flex; margin-top: 24px; font-size: 11px; padding: 17px 28px; }
}
```

- [ ] **Step 10: `components/hero-portrait.tsx` и `components/hero-numbers.tsx`**

```tsx
"use client";
import Image from "next/image";
import { useState } from "react";
// Портрет-фон первого экрана. Не загрузился — блока нет совсем, без битой картинки.
export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <div className="hero-portrait">
      <Image
        // Ошибка загрузки могла случиться до гидрации: тогда onError не сработает.
        ref={(image) => {
          if (image?.complete && image.naturalWidth === 0) setFailed(true);
        }}
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 760px) 86vw, 52vw"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
```

```tsx
"use client";
import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { copy, heroNumbers } from "@/data/projects";
function HeroNumber({
  item,
  index,
  scale,
}: {
  item: (typeof heroNumbers)[number];
  index: number;
  scale: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  // С сервера приходит финальное значение: без движения оно таким и остаётся.
  const [value, setValue] = useState(item.value);
  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, item.value, {
      duration: 1.5,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => setValue(Math.round(current)),
    });
    return () => controls.stop();
  }, [reduced, item.value, index]);
  return (
    <div className="hero-number">
      <motion.span
        className="hero-number-value"
        aria-hidden="true"
        style={{ scale: reduced ? 1 : scale }}
      >
        {item.prefix && <small>{item.prefix}</small>}
        {value}
        {item.suffix}
      </motion.span>
      <span className="sr-only">
        {item.prefix && `${item.prefix} `}
        {item.value}
        {item.suffix}
      </span>
      <span className="hero-number-label">{item.label}</span>
    </div>
  );
}
export function HeroNumbers() {
  const { scrollY } = useScroll();
  // Цифры растут, пока первый экран уходит вверх; на телефоне рост меньше, чтобы не выйти за колонку.
  const scale = useTransform(scrollY, (y) => {
    if (typeof window === "undefined") return 1;
    const progress = Math.min(1, y / (window.innerHeight * 0.45));
    const grow = window.innerWidth <= 760 ? 0.15 : 0.45;
    return 1 + grow * (1 - Math.pow(1 - progress, 3));
  });
  return (
    <div className="hero-numbers" role="group" aria-label={copy.hero.numbersLabel}>
      {heroNumbers.map((item, index) => (
        <HeroNumber key={item.label} item={item} index={index} scale={scale} />
      ))}
    </div>
  );
}
```

- [ ] **Step 11: `components/hero.tsx` и `components/footer.tsx`**

```tsx
import { copy, profile } from "@/data/projects";
import { delay } from "@/lib/utils";
import { ContactLink } from "./contact-link";
import { HeroNumbers } from "./hero-numbers";
import { HeroPortrait } from "./hero-portrait";
export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HeroPortrait src={profile.portrait} alt={copy.hero.portraitAlt} />
      <div className="container">
        <div className="hero-copy">
          <p className="eyebrow reveal">{copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="display reveal" style={delay(1)}>
            {copy.hero.title[0]}
            <br />
            {copy.hero.title[1]}
            <br />
            <span className="outline">{copy.hero.accent}</span>
          </h1>
          <p className="hero-description reveal" style={delay(2)}>
            {copy.hero.description}
          </p>
          <div className="hero-actions reveal" style={delay(3)}>
            <ContactLink source="hero">{copy.hero.primary}</ContactLink>
            <a className="button-ghost" href="#projects">
              {copy.hero.secondary}
            </a>
          </div>
        </div>
        <HeroNumbers />
      </div>
    </section>
  );
}
```

```tsx
import { ArrowUp, Send } from "lucide-react";
import { copy, profile } from "@/data/projects";
import { delay } from "@/lib/utils";
import { ContactLink } from "./contact-link";
export function Footer() {
  return (
    <>
      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="container">
          <p className="eyebrow reveal">{copy.contactSection.eyebrow}</p>
          <h2 id="contact-title" className="display reveal" style={delay(1)}>
            {copy.contactSection.title}{" "}
            <span className="outline">{copy.contactSection.accent}</span>
          </h2>
          <p className="contact-description reveal" style={delay(2)}>
            {profile.telegram || profile.max
              ? copy.contactSection.description
              : copy.contactSection.unavailable}
          </p>
          <div className="contact-actions reveal" style={delay(3)}>
            {profile.telegram && <ContactLink source="footer" />}
            {profile.max && (
              <a
                className="button-ghost"
                href={profile.max}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.contactMax}
              </a>
            )}
          </div>
        </div>
      </section>
      <footer className="container footer">
        <a className="footer-brand" href="#home">
          {profile.name}
          <span>© {new Date().getFullYear()}</span>
        </a>
        <p>{copy.footer.rights}</p>
        <a href="#home">
          {copy.footer.toTop}
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </footer>
      <div className="quick-links">
        {profile.max && (
          <a
            href={profile.max}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-max"
            aria-label={copy.contactMax}
          >
            {copy.quickMax}
          </a>
        )}
        <a
          href={profile.telegram || "#contact"}
          target={profile.telegram ? "_blank" : undefined}
          rel={profile.telegram ? "noopener noreferrer" : undefined}
          className="quick-contact"
          aria-label={copy.contact}
        >
          <span>{copy.quickContact}</span>
          <Send size={22} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
```

- [ ] **Step 12: `app/layout.tsx` и `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { copy } from "@/data/projects";
import "@fontsource-variable/manrope";
import "./globals.css";
export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {/* Без скриптов блоки не появятся сами: показываем их сразу. */}
        <noscript>
          <style>{".reveal,.process-step{opacity:1;translate:none}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
```

```tsx
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { RevealObserver } from "@/components/reveal-observer";
import { copy } from "@/data/projects";
export default function Home() {
  return (
    <MotionProvider>
      <a href="#main" className="skip-link">
        {copy.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Footer />
      </main>
      <RevealObserver />
    </MotionProvider>
  );
}
```

Удалить `components/metrics.tsx`, `components/tech-stack.tsx`, `components/about.tsx`, `components/projects.tsx`.

- [ ] **Step 13: `app/globals.css` — заменить целиком**

Оставить `@import "tailwindcss";`. Блок `@theme inline` — только `--font-sans: "Manrope Variable", system-ui, sans-serif;`.
Перенести из прототипа по словарю классов правила: `:root`, сброс, `html`, `body`, `.container`, `section`, `.eyebrow`, `.display`, `.outline`, кнопки, `.reveal`, шапка, первый экран (`.hero`, `.hero::before`, `@keyframes orb`, `.hero-copy`, `.hero-description`, `.hero-actions`, `.hero-portrait`, `.hero-numbers`), `.tile-grid`, `.tile`, `.contact-section`, `.quick-contact`, `@keyframes ping`, `@keyframes blink`.
Добавить: `html { color-scheme: dark; scroll-padding-top: 84px; }`, `body { overflow-x: clip; }`, `.skip-link` (как в старом файле, фон `var(--acc)`, цвет белый), `.footer` (flex, `justify-content: space-between`, 13 px, цвет приглушённый, `padding: 32px 0 96px`), отличия из раздела «Словарь классов», CSS шапки из Step 9.
`.hero-portrait img { object-fit: cover; object-position: center top; }`.
`.contact-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }`.
Плавающие кнопки: `.quick-links { position: fixed; z-index: 50; right: 26px; bottom: 26px; display: flex; align-items: center; gap: 12px; }` — `position: fixed` с самой `.quick-contact` снять; `.quick-max { width: 58px; height: 58px; display: grid; place-items: center; border-radius: 50%; background: #06080f; border: 1px solid var(--line2); color: var(--fg); font-size: 12px; font-weight: 800; letter-spacing: .08em; transition: border-color .3s, translate .3s var(--ease); }`, `.quick-max:hover { border-color: var(--acc); translate: 0 -3px; }`. На телефоне: `right: 14px; bottom: 14px;`, кнопки 50 px.
Первый экран на телефоне:

```css
@media (max-width: 760px) {
  .hero { padding: 108px 0 48px; min-height: 0; }
  .hero-portrait { top: 68px; bottom: auto; right: -18%; width: 86%; max-width: none; opacity: .45; }
  .hero-actions { flex-wrap: wrap; }
  .hero-numbers { grid-template-columns: repeat(2, 1fr); row-gap: 8px; }
}
```

- [ ] **Step 14: Сборка и тесты**

Run: `npm run lint && npm run typecheck && lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`
Expected: PASS — 6 тестов × 2 профиля.

- [ ] **Step 15: Посмотреть глазами**

Снять скриншоты первого экрана на 1440×900, 1288×696 и 390×844 скриптом Playwright из папки scratchpad и сравнить с прототипом: портрет виден целиком и без жёстких краёв, заголовок не налезает на шапку, цифры в ряд (на телефоне 2×2).

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "feat(redesign): тёмная основа, шапка, первый экран и контакт"
```

---

### Task 2: Услуги и «Почему я»

**Files:**
- Create: `components/services.tsx`, `components/why.tsx`
- Modify: `app/page.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `services`, `why`, `copy.services`, `copy.why` из `data/projects.ts`; `delay` из `lib/utils.ts`; классы `.tile-grid`, `.tile`, `.reveal`.
- Produces: секции `#services` и `#why`; компоненты `Services()`, `Why()`.

- [ ] **Step 1: Тест**

Дописать в конец `tests/portfolio.spec.ts`:

```ts
test("services and reasons show the agreed copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#services h2")).toHaveText(
    /Что могу\s*сделать для вас/,
  );
  await expect(page.locator("#services .tile h3")).toHaveText([
    "Сайты",
    "Боты",
    "Связки и интеграции",
    "Системы под ключ",
  ]);
  await expect(page.locator("#services .tile p").nth(3)).toHaveText(
    "Сайт, бот и связки в одной системе, которая упрощает работу бизнеса.",
  );
  await expect(page.locator("#why h2")).toHaveText(
    /Четыре причины\s*написать мне/,
  );
  await expect(page.locator("#why .tile h3")).toHaveText([
    "Всё в одних руках",
    "ИИ по делу",
    "Довожу до рабочего",
    "Говорю по-человечески",
  ]);
  // У каждой причины свой оттенок подсветки.
  const tints = await page
    .locator("#why .tile")
    .evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).getPropertyValue("--t").trim()),
    );
  expect(new Set(tints).size).toBe(4);
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `lsof -ti tcp:3100 | xargs kill; npm run build && npx playwright test -g "services and reasons" --project=desktop`
Expected: FAIL — `#services h2` не найден.

- [ ] **Step 3: Компоненты**

`components/services.tsx`:

```tsx
import { AppWindow, Blocks, Send, Workflow } from "lucide-react";
import { copy, services } from "@/data/projects";
import { delay } from "@/lib/utils";
const icons = { window: AppWindow, send: Send, workflow: Workflow, blocks: Blocks };
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.services.eyebrow}</p>
        <h2 id="services-title" className="display reveal" style={delay(1)}>
          {copy.services.title}
          <br />
          <span className="outline">{copy.services.accent}</span>
        </h2>
        <div className="tile-grid services-grid">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <div key={service.name} className="tile reveal" style={delay(index + 1)}>
                <Icon size={34} strokeWidth={1.2} aria-hidden="true" />
                <h3>{service.name}</h3>
                <p>{service.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

`components/why.tsx`:

```tsx
import type { CSSProperties } from "react";
import { copy, why } from "@/data/projects";
export function Why() {
  return (
    <section id="why" aria-labelledby="why-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.why.eyebrow}</p>
        <h2 id="why-title" className="display reveal">
          {copy.why.title}
          <br />
          <span className="outline">{copy.why.accent}</span>
        </h2>
        <div className="tile-grid why-grid">
          {why.map((reason, index) => (
            <div
              key={reason.title}
              className="tile reveal"
              style={{ "--d": index + 1, "--t": reason.tint } as CSSProperties}
            >
              <em>{String(index + 1).padStart(2, "0")}</em>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

В `app/page.tsx` поставить `<Services />` после `<Hero />` и `<Why />` перед `<Footer />` (между ними позже встанут кейсы).

- [ ] **Step 4: CSS**

Перенести из прототипа правила `.serv …` и `.why …` по словарю (заголовки плашек — `h3`, а не `h4`; значок услуги — `svg { color: var(--acc); }`).
Добавить: `@media (max-width: 1100px) { .services-grid, .why-grid { grid-template-columns: repeat(2, 1fr); } }`, `@media (max-width: 760px) { .services-grid, .why-grid { grid-template-columns: 1fr; } }`.

- [ ] **Step 5: Тесты**

Run: `npm run lint && npm run typecheck && lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`
Expected: PASS — 7 тестов × 2 профиля.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(redesign): экраны услуг и отличий"
```

---

### Task 3: Кейсы и окно кейса

**Files:**
- Create: `components/projects.tsx`
- Modify: `app/page.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `projects`, `categories`, `categoryLabels`, `copy.projects`, тип `Project`, `Category`; `ContactLink`; `getProjectDraft`, `telegramUsername` из `lib/telegram.ts`.
- Produces: секция `#projects`; компонент `Projects()`; карточка — `button.case-card` с `aria-label` «Открыть кейс: <название>»; окно — `dialog.project-dialog`.

- [ ] **Step 1: Тесты**

Дописать в `tests/portfolio.spec.ts`:

```ts
// Ожидаемое содержание — строки из описания дизайна: название, подпись категории, результат.
const specCases = [
  ["Портал 1С-услуг", "Сайты", "Понятный путь от услуги до заявки"],
  ["Обучающий веб-квест", "Сайты", "Учатся через игру, а не сухую теорию"],
  ["Лендинг для интенсива", "Сайты", "Посетители регистрируются и приходят на интенсив"],
  ["Каталог стройматериалов", "Сайты", "100% заявок доходят без потерь"],
  ["ИИ-агент учебных карточек", "Боты и ИИ", "У методистов в разы меньше рутины"],
  ["Школьный бот-помощник", "Боты и ИИ", "80% типовых вопросов — без человека"],
  ["Бот сбора заявок", "Боты и ИИ", "Заявки и данные — в одном канале"],
  ["Сайт → таблица", "Автоматизация", "20+ заявок за считаные минуты"],
  ["Синхронизация сервисов", "Автоматизация", "Информация доходит без участия человека"],
] as const;

test("shows the nine cases in order with what was done and the result", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator(".case-card");
  await expect(cards).toHaveCount(projects.length);
  for (const [index, [title, label, result]] of specCases.entries()) {
    const card = cards.nth(index);
    await expect(card.locator("h3")).toHaveText(title);
    await expect(card.locator(".case-kicker")).toContainText(
      `${String(index + 1).padStart(2, "0")} · ${label}`,
    );
    await expect(card.locator(".case-done")).toHaveText(projects[index].done);
    await expect(card.locator(".case-result")).toHaveText(result);
  }
  // Формат и технические теги с карточек ушли.
  await expect(page.locator("#projects")).not.toContainText("Next.js");
});

test("filters show only categories with cases and the right counts", async ({
  page,
}) => {
  await page.goto("/");
  const group = page.getByRole("group", { name: "Фильтр кейсов" });
  const used = categories.filter((category) =>
    projects.some((project) => project.category === category),
  );
  await expect(group.getByRole("button")).toHaveCount(used.length + 1);
  const labels = { Web: "Сайты", "AI & Bots": "Боты и ИИ", Automation: "Автоматизация" };
  for (const category of used) {
    const count = projects.filter((project) => project.category === category).length;
    const button = group.getByRole("button", { name: `${labels[category]} · ${count}` });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".case-card")).toHaveCount(count);
    await expect(page.locator("#projects [role=status]")).toHaveText(
      `Показано кейсов: ${count}`,
    );
  }
  await group.getByRole("button", { name: `Все · ${projects.length}` }).click();
  await expect(page.locator(".case-card")).toHaveCount(projects.length);
});

test("case grid is even: three, two and one column with equal rows", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [width, columns] of [
    [1440, 3],
    [900, 2],
    [390, 1],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    const boxes = await page
      .locator(".case-card")
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const { top, height } = node.getBoundingClientRect();
          return { top: Math.round(top), height: Math.round(height) };
        }),
      );
    const firstRow = boxes.filter((box) => box.top === boxes[0].top);
    expect(firstRow.length).toBe(columns);
    expect(new Set(firstRow.map((box) => box.height)).size).toBe(1);
  }
});

test("case dialog supports keyboard dismissal and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: `Открыть кейс: ${specCases[0][0]}`,
  });
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Закрыть" });
  const pageScroll = () => page.evaluate(() => document.body.style.overflow);
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press("Enter");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: specCases[0][0], exact: true }),
  ).toBeVisible();
  await expect(close).toBeFocused();
  expect(await pageScroll()).toBe("hidden");
  // Сколько бы ни нажимали Tab, фокус остаётся внутри окна.
  for (let step = 0; step < 4; step += 1) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await pageScroll()).toBe("");
  await trigger.click();
  await close.click();
  await expect(dialog).not.toBeVisible();
  // Щелчок мимо окна тоже закрывает его.
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("case dialog shows the details, the result and a Telegram draft naming the case", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Открыть кейс: Сайт → таблица" }).click();
  const dialog = page.getByRole("dialog");
  const draft =
    "Меня заинтересовал проект «Сайт → таблица», хочу сделать что-то подобное";
  await expect(dialog.locator(".eyebrow")).toHaveText("08 · Автоматизация");
  await expect(dialog).toContainText(
    "Менеджерам не нужно копировать контакты руками.",
  );
  await expect(dialog.locator(".dialog-result")).toHaveText(
    "20+ заявок за считаные минуты",
  );
  await expect(dialog.locator(".dialog-draft")).toContainText(draft);
  const link = dialog.getByRole("link", { name: "Написать в Telegram" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe(personalChat);
  expect(url.searchParams.get("text")).toBe(draft);
  // Публичной ссылки у кейса нет — нет и кнопки просмотра.
  await expect(dialog.getByRole("link", { name: "Посмотреть проект" })).toHaveCount(0);
});

test("case dialog scrolls on a low screen and keeps the Telegram button reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 700, height: 360 });
  await page.goto("/");
  await page.locator(".case-card").first().click();
  const link = page
    .getByRole("dialog")
    .getByRole("link", { name: "Написать в Telegram" });
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeInViewport();
});
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `lsof -ti tcp:3100 | xargs kill; npm run build && npx playwright test -g "case" --project=desktop`
Expected: FAIL — карточек `.case-card` нет.

- [ ] **Step 3: `components/projects.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import {
  categories,
  categoryLabels,
  copy,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { getProjectDraft, telegramUsername } from "@/lib/telegram";
import { ContactLink } from "./contact-link";

type Filter = Category | "all";

// Кнопку получает только категория, в которой есть хотя бы один кейс.
const filters: Filter[] = [
  "all",
  ...categories.filter((item) =>
    projects.some((project) => project.category === item),
  ),
];
const countOf = (filter: Filter) =>
  filter === "all"
    ? projects.length
    : projects.filter((project) => project.category === filter).length;

// Результат: число (если владелец его назвал) и строка текста.
function Result({ result }: { result: Project["result"] }) {
  return (
    <>
      {result.value && (
        <>
          <strong>{result.value}</strong>{" "}
        </>
      )}
      {result.text}
    </>
  );
}

export function Projects() {
  const [category, setCategory] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const filtered =
    category === "all"
      ? projects
      : projects.filter((project) => project.category === category);
  useEffect(() => {
    if (!selected) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [selected]);
  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.projects.eyebrow}</p>
        <h2 id="projects-title" className="display reveal">
          {copy.projects.title}
          <br />
          <span className="outline">{copy.projects.accent}</span>
        </h2>
        <div className="filters" role="group" aria-label={copy.projects.filterLabel}>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className="filter"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === "all" ? copy.projects.all : categoryLabels[item]} ·{" "}
              {countOf(item)}
            </button>
          ))}
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {copy.projects.shown}: {filtered.length}
        </span>
        <motion.div layout={!reduced} className="tile-grid cases-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.button
                key={project.id}
                type="button"
                layout={!reduced}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="tile case-card"
                onClick={() => setSelected(project)}
                aria-label={`${copy.projects.details}: ${project.title}`}
              >
                <span className="case-kicker">
                  <span>
                    {project.number} · {categoryLabels[project.category]}
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
                <h3>{project.title}</h3>
                <span className="case-facts">
                  <span className="case-term">{copy.projects.done}</span>
                  <span className="case-done">{project.done}</span>
                  <span className="case-term">{copy.projects.result}</span>
                  <span className="case-result">
                    <Result result={project.result} />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="dialog-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href]",
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            setSelected(null);
        }}
      >
        {selected && (
          <>
            <button
              className="dialog-close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label={copy.projects.close}
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>
            <p className="eyebrow">
              {selected.number} · {categoryLabels[selected.category]}
            </p>
            <h2 id="dialog-title">{selected.title}</h2>
            <p className="dialog-label">{copy.projects.dialogDone}</p>
            <p>{selected.details}</p>
            <p className="dialog-label">{copy.projects.dialogResult}</p>
            <p className="dialog-result">
              <Result result={selected.result} />
            </p>
            {/* Без настроенного аккаунта кнопка ведёт к контактному блоку: текст в чате не обещаем. */}
            {telegramUsername && (
              <p className="dialog-draft">
                {copy.projects.draftHint}
                <br />
                <span>«{getProjectDraft(selected)}»</span>
              </p>
            )}
            <div className="dialog-actions" onClick={() => setSelected(null)}>
              <ContactLink project={selected} />
              {/* Появится, когда владелец впишет кейсу публичную ссылку. */}
              {selected.url && (
                <a
                  className="button-ghost"
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.projects.view}
                </a>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
```

В `app/page.tsx` поставить `<Projects />` между `<Services />` и `<Why />`.

- [ ] **Step 4: CSS**

Перенести из прототипа правила `.chips …`, `.cases`, `.case …`, `dialog …`, `@keyframes pop` по словарю.
Замены: `dl/dt/dd` → `.case-facts` (та же сетка `78px 1fr`), `.case-term`, `.case-done`, `.case-result` (`color: var(--fg); font-weight: 700`, `strong { color: var(--acc); }`); `.k` → `.case-kicker`.
Добавить:

```css
.case-card { font: inherit; color: inherit; text-align: left; border: 0; width: 100%; }
.project-dialog { max-height: calc(100dvh - 32px); overflow-y: auto; overscroll-behavior: contain; }
.dialog-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.dialog-draft span { color: var(--fg); }
@media (max-width: 1100px) { .cases-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 760px) { .cases-grid { grid-template-columns: 1fr; } .project-dialog { padding: 28px 22px; } }
```

- [ ] **Step 5: Тесты**

Run: `npm run lint && npm run typecheck && lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`
Expected: PASS — 13 тестов × 2 профиля.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(redesign): компактная сетка кейсов и окно кейса с черновиком"
```

---

### Task 4: Подход — цепочка из четырёх плашек

**Files:**
- Create: `components/process.tsx`
- Modify: `app/page.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `process`, `copy.process`; `RevealObserver` вешает `.is-playing` на `.process`.
- Produces: секция `#process`; компонент `Process()`.

- [ ] **Step 1: Тест**

```ts
test("process shows four steps: animated in order, at once with reduced motion", async ({
  page,
}) => {
  const steps = page.locator(".process-step");
  const opacities = () =>
    steps.evaluateAll((nodes) =>
      nodes.map((node) => Number(getComputedStyle(node).opacity)),
    );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(steps.locator("h3")).toHaveText([
    "Вы пишете",
    "Бриф",
    "План",
    "Готовый продукт",
  ]);
  expect(await opacities()).toEqual([1, 1, 1, 1]);
  expect(
    await page
      .locator(".process-dot")
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  // С движением плашки появляются по очереди, когда блок входит в окно просмотра.
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect((await opacities())[3]).toBe(0);
  await page.locator("#process").scrollIntoViewIfNeeded();
  await page.locator(".process").scrollIntoViewIfNeeded();
  await expect.poll(opacities, { timeout: 8000 }).toEqual([1, 1, 1, 1]);
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `lsof -ti tcp:3100 | xargs kill; npm run build && npx playwright test -g "process shows" --project=desktop`
Expected: FAIL — `.process-step` не найден.

- [ ] **Step 3: `components/process.tsx`**

```tsx
import { Fragment, type CSSProperties } from "react";
import { copy, process } from "@/data/projects";
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title">
      <div className="container">
        <p className="eyebrow reveal">{copy.process.eyebrow}</p>
        <h2 id="process-title" className="display reveal">
          {copy.process.title}
          <br />
          <span className="outline">{copy.process.accent}</span>
        </h2>
        {/* Класс .is-playing вешает наблюдатель: дальше цепочку ведёт CSS. */}
        <ol className="process">
          {process.map((step, index) => (
            <Fragment key={step.title}>
              <li className="process-step" style={{ "--i": index } as CSSProperties}>
                <small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
              {index < process.length - 1 && (
                <li
                  className="process-link"
                  style={{ "--i": index } as CSSProperties}
                  aria-hidden="true"
                >
                  <span className="process-dot" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

В `app/page.tsx` поставить `<Process />` после `<Why />`.

- [ ] **Step 4: CSS цепочки**

Вид плашек (`.n`, `small`, `b`→`h3`, `span`→`p`) — из прототипа. Движение — не классами `.on`/`.done`, а одной CSS-анимацией:

```css
.process { list-style: none; margin: 56px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 56px 1fr 56px 1fr 56px 1fr; align-items: stretch; }
.process-step { border: 1px solid var(--line2); padding: 24px 22px 26px; opacity: 0; translate: 0 22px; scale: .96; }
.process-link { align-self: center; height: 1px; background: var(--line); position: relative; }
.process-link::before { content: ""; position: absolute; inset: 0; background: var(--acc); scale: 0 1; transform-origin: left; }
.process-dot { position: absolute; left: 0; top: -5px; width: 11px; height: 11px; margin-left: -5px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 18px 4px var(--acc); opacity: 0; }
/* Шаг раз в секунду: плашка, затем линия и точка к следующей; после первого прохода точка ходит по кругу. */
.process.is-playing .process-step { animation: step-in .6s var(--ease) calc(var(--i) * 1s) forwards, step-flash 3s linear calc(4.4s + var(--i) * 1s) infinite; }
.process.is-playing .process-link::before { animation: link-fill .7s linear calc(var(--i) * 1s + .3s) forwards; }
.process.is-playing .process-dot { animation: dot-first .7s linear calc(var(--i) * 1s + .3s), dot-run 3s linear calc(4.4s + var(--i) * 1s) infinite; }
@keyframes step-in { to { opacity: 1; translate: 0 0; scale: 1; } }
@keyframes step-flash { 0%, 14%, 100% { border-color: var(--line2); box-shadow: none; } 3% { border-color: var(--acc); box-shadow: 0 0 34px var(--glow); } }
@keyframes link-fill { to { scale: 1 1; } }
@keyframes dot-first { from { left: 0; opacity: 1; } to { left: 100%; opacity: 1; } }
@keyframes dot-run { 0% { left: 0; opacity: 1; } 32% { left: 100%; opacity: 1; } 33%, 100% { left: 100%; opacity: 0; } }
@media (max-width: 760px) {
  .process { grid-template-columns: 1fr; }
  .process-link { justify-self: start; margin-left: 22px; width: 1px; height: 36px; }
  .process-link::before { scale: 1 0; transform-origin: top; }
  .process.is-playing .process-link::before { animation-name: link-fill-y; }
  .process-dot { left: -5px; top: 0; margin: -5px 0 0; }
  .process.is-playing .process-dot { animation-name: dot-first-y, dot-run-y; }
}
@keyframes link-fill-y { to { scale: 1 1; } }
@keyframes dot-first-y { from { top: 0; opacity: 1; } to { top: 100%; opacity: 1; } }
@keyframes dot-run-y { 0% { top: 0; opacity: 1; } 32% { top: 100%; opacity: 1; } 33%, 100% { top: 100%; opacity: 0; } }
```

- [ ] **Step 5: Тесты и взгляд**

Run: `npm run lint && npm run typecheck && lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`
Expected: PASS — 14 тестов × 2 профиля.
Снять скриншоты блока на 1440 и 390 через 5 с после входа в окно просмотра: четыре плашки, линии закрашены, на телефоне цепочка вертикальная.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(redesign): цепочка «Как строится работа» с бегущей точкой"
```

---

### Task 5: Обо мне

**Files:**
- Create: `components/about.tsx`
- Modify: `app/page.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `about`, `profile.name`, `copy.about`, `stack` (в тесте).
- Produces: секция `#about`; компонент `About()`.

- [ ] **Step 1: Тест**

Добавить `stack` в импорт из `../data/projects` и дописать:

```ts
test("about section names the author, shows three facts and no job details", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#about");
  await expect(section.locator("h2")).toHaveText(/Тим\s*Окунев/);
  await expect(section.locator(".about-text p")).toHaveText([
    "Разработчик сайтов, Telegram-ботов и автоматизации. Работаю в EdTech — в онлайн-школе программирования.",
    "Не делаю «сайт ради сайта». Беру задачу бизнеса: заявки теряются, на одни и те же вопросы отвечают вручную, данные переносят руками. Собираю систему, которая делает это сама, — и отдаю готовой к работе.",
  ]);
  await expect(section.locator(".about-tags li")).toHaveText([
    "Сайты",
    "Telegram-боты",
    "ИИ",
    "Интеграции",
    "Автоматизация",
    "EdTech",
  ]);
  const tools = stack.reduce((sum, group) => sum + group.items.length, 0);
  await expect(section.locator(".about-facts strong")).toHaveText([
    "3",
    String(tools),
    /~1\s*час/,
  ]);
  await expect(section.locator(".about-facts li").first()).toContainText(
    "ИИ-агент учебных карточек · веб-квест · лендинг для интенсива",
  );
  // Школа по названию, срок, должность и названия технологий на странице не встречаются.
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/EasyCode|должност|молодой специалист|Next\.js|n8n/i);
  expect(await section.innerText()).not.toMatch(/\bгод\b|\bгода\b|\bлет\b/i);
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `lsof -ti tcp:3100 | xargs kill; npm run build && npx playwright test -g "about section" --project=desktop`
Expected: FAIL — `#about` не найден.

- [ ] **Step 3: `components/about.tsx`**

```tsx
import type { CSSProperties } from "react";
import { about, copy, profile } from "@/data/projects";
import { delay } from "@/lib/utils";
export function About() {
  // Имя может быть одним словом (переменная окружения): тогда второй строки нет.
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about-text">
          <p className="eyebrow reveal">{copy.about.eyebrow}</p>
          <h2 id="about-title" className="about-name reveal" style={delay(1)}>
            {first}
            {rest.length > 0 && <span> {rest.join(" ")}</span>}
          </h2>
          {about.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className="reveal" style={delay(index + 2)}>
              {paragraph}
            </p>
          ))}
          <ul className="about-tags reveal" style={delay(4)}>
            {about.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <ul className="about-facts reveal" style={delay(2)}>
          {about.facts.map((fact) => (
            <li key={fact.label} style={{ "--c": fact.color } as CSSProperties}>
              <strong>
                {fact.value}
                {fact.unit && <small> {fact.unit}</small>}
              </strong>
              <b>{fact.label}</b>
              {fact.note && <em>{fact.note}</em>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

В `app/page.tsx` поставить `<About />` после `<Process />`.

- [ ] **Step 4: CSS**

Перенести из прототипа правила `.about …`, `.name …`, `.tags …`, `.facts …` по словарю: абзацы — `.about-text p:not(.eyebrow)`, метки — `.about-tags li` (список без маркеров), факты — `.about-facts > li`.
`.about-name span { display: block; }` — фамилия второй строкой с переливом.
Добавить: `@media (max-width: 1100px) { .about { grid-template-columns: 1fr; gap: 48px; } }`, `@media (max-width: 760px) { .about-text p:not(.eyebrow) { font-size: 17px; } .about-facts > li { padding: 30px 24px; } }`.

- [ ] **Step 5: Тесты**

Run: `npm run lint && npm run typecheck && lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`
Expected: PASS — 15 тестов × 2 профиля.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(redesign): блок «Обо мне» с именем, метками и тремя фактами"
```

---

### Task 6: Курсор-прожектор, сквозные проверки, документы

**Files:**
- Create: `components/cursor.tsx`
- Modify: `app/page.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`, `AGENTS.md`, `README.md`, `.autopilot/2026-10-03-portfolio-cases-refactor/manifest.md`

**Interfaces:**
- Consumes: все секции предыдущих задач; классы `.tile`.
- Produces: компонент `Cursor()`; классы на `html`: `has-cursor`, `cursor-hover`.

- [ ] **Step 1: Тесты**

Добавить импорт `AxeBuilder` и дописать:

```ts
test("sections run in the agreed order and the menu leads to them", async ({
  page,
}) => {
  await page.goto("/");
  const ids = await page
    .locator("main section[id]")
    .evaluateAll((nodes) => nodes.map((node) => node.id));
  expect(ids).toEqual([
    "home",
    "services",
    "projects",
    "why",
    "process",
    "about",
    "contact",
  ]);
  const hrefs = await page
    .locator("#site-nav a:not(.contact-link)")
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  expect(hrefs).toEqual(["#services", "#projects", "#process", "#about"]);
});

test("spotlight cursor exists only for a fine pointer and stays above the case dialog", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const html = page.locator("html");
  if (isMobile()) {
    await expect(html).not.toHaveClass(/has-cursor/);
    return;
  }
  await expect(html).toHaveClass(/has-cursor/);
  const dot = page.locator(".cursor-dot");
  const open = () => dot.evaluate((node) => node.matches(":popover-open"));
  expect(await open()).toBe(true);
  // Окно кейса встаёт в верхний слой позже точки: точка должна подняться над ним заново.
  await dot.evaluate((node) => {
    const state = window as unknown as { lifts: number };
    state.lifts = 0;
    node.addEventListener("toggle", (event) => {
      if ((event as ToggleEvent).newState === "open") state.lifts += 1;
    });
  });
  await page.locator(".case-card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => (window as unknown as { lifts: number }).lifts))
    .toBeGreaterThanOrEqual(1);
  expect(await open()).toBe(true);
});

test("reduced motion keeps final numbers, shows every block and drops the custom cursor", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/has-cursor/);
  const samples = await page
    .locator(".hero-number-value")
    .nth(2)
    .evaluate(async (element) => {
      const values = new Set<string>();
      const started = performance.now();
      while (performance.now() - started < 1200) {
        values.add(element.textContent || "");
        await new Promise(requestAnimationFrame);
      }
      return [...values];
    });
  expect(samples).toEqual(["до80%"]);
  const hidden = await page
    .locator(".reveal")
    .evaluateAll(
      (nodes) =>
        nodes.filter((node) => getComputedStyle(node).opacity !== "1").length,
    );
  expect(hidden).toBe(0);
});

test("page and case dialog pass WCAG AA checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.locator(".case-card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const dialogScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogScan.violations).toEqual([]);
});

test("layout fits narrow phones, tablets and large monitors, also after scrolling", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => overflow(page)).toBeLessThanOrEqual(0);
    // Цифры первого экрана растут при прокрутке и не должны выталкивать страницу вбок.
    await page.evaluate(() => window.scrollTo(0, 320));
    await expect.poll(() => overflow(page)).toBeLessThanOrEqual(0);
  }
});
```

- [ ] **Step 2: Убедиться, что новые тесты падают**

Run: `lsof -ti tcp:3100 | xargs kill; npm run build && npx playwright test -g "spotlight cursor" --project=desktop`
Expected: FAIL — у `html` нет класса `has-cursor`.

- [ ] **Step 3: `components/cursor.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
// Курсор-прожектор: точка на месте указателя и пятно света, которое плывёт следом.
// Работает только с мышью и без просьбы уменьшить движение; иначе остаётся штатный курсор.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const point = dot.current;
    const light = spot.current;
    if (
      !point ||
      !light ||
      !("showPopover" in point) ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    // Точка живёт в верхнем слое браузера. Окно кейса встаёт туда позже и закрывает её,
    // поэтому после каждого открытия окна точку показываем заново — она снова оказывается сверху.
    const lift = () => {
      if (point.matches(":popover-open")) point.hidePopover();
      point.showPopover();
    };
    lift();
    const layers = new MutationObserver(lift);
    layers.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["open"],
    });
    let x = innerWidth / 2;
    let y = innerHeight / 3;
    let lightX = x;
    let lightY = y;
    let frame = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      // Пятно света внутри плашки идёт за указателем.
      const tile = (event.target as Element).closest<HTMLElement>(".tile");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${x - rect.left}px`);
      tile.style.setProperty("--my", `${y - rect.top}px`);
    };
    const over = (event: Event) =>
      root.classList.toggle(
        "cursor-hover",
        !!(event.target as Element).closest("a, button"),
      );
    const tick = () => {
      lightX += (x - lightX) * 0.07;
      lightY += (y - lightY) * 0.07;
      point.style.transform = `translate(${x}px, ${y}px)`;
      light.style.transform = `translate(${lightX}px, ${lightY}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      cancelAnimationFrame(frame);
      layers.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.classList.remove("has-cursor", "cursor-hover");
      if (point.matches(":popover-open")) point.hidePopover();
    };
  }, []);
  return (
    <>
      <div ref={spot} className="cursor-spot" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" popover="manual" aria-hidden="true" />
    </>
  );
}
```

В `app/page.tsx` поставить `<Cursor />` рядом с `<RevealObserver />`. Порядок секций в `<main>` к этому моменту: `Hero, Services, Projects, Why, Process, About, Footer`.

- [ ] **Step 4: CSS курсора**

```css
.cursor-dot, .cursor-spot { position: fixed; left: 0; top: 0; pointer-events: none; display: none; }
.has-cursor .cursor-spot { display: block; z-index: 0; }
.has-cursor .cursor-dot:popover-open { display: block; inset: 0 auto auto 0; margin: 0; padding: 0; border: 0; background: none; overflow: visible; width: 0; height: 0; }
.cursor-dot::before { content: ""; position: absolute; width: 10px; height: 10px; border-radius: 50%; background: var(--acc); translate: -50% -50%; box-shadow: 0 0 22px var(--acc); transition: scale .3s var(--ease), background .3s; }
.cursor-hover .cursor-dot::before { scale: 2.6; background: #fff; mix-blend-mode: difference; }
.cursor-spot::before { content: ""; position: absolute; width: 620px; height: 620px; translate: -50% -50%; border-radius: 50%; background: radial-gradient(circle, var(--glow), transparent 62%); }
.has-cursor, .has-cursor * { cursor: none !important; }
.has-cursor ::backdrop { cursor: none; }
```

Содержимое секций должно лежать выше пятна: `.container { position: relative; z-index: 1; }` (в прототипе так же).

- [ ] **Step 5: Проверки, которые тесты не достают**

```bash
lsof -ti tcp:3100 | xargs kill
NEXT_PUBLIC_PROFILE_NAME=TimA NEXT_PUBLIC_TELEGRAM_USERNAME=x npm run build
(npm run start -- --port 3100 > /dev/null 2>&1 &) ; sleep 3
curl -s http://127.0.0.1:3100 > /tmp/porttim-check.html
grep -c 'brand-dot' /tmp/porttim-check.html      # ожидаем 0: имя из одного слова — без точки-разделителя
grep -c 't.me' /tmp/porttim-check.html           # ожидаем 0: без валидного аккаунта ссылок в Telegram нет
grep -c 'href="#contact"' /tmp/porttim-check.html # ожидаем не меньше 4: кнопки ведут к контактному блоку
grep -c 'max.ru/u/' /tmp/porttim-check.html      # ожидаем 1: MAX остаётся рабочей кнопкой блока контакта
grep -c 'Прямой контакт появится здесь' /tmp/porttim-check.html # ожидаем 0: пока есть MAX, блок не объявляет контакт недоступным
lsof -ti tcp:3100 | xargs kill
```

Если любое ожидание не выполнено — исправить компонент и повторить.

- [ ] **Step 6: Полный прогон**

Run: `npm run lint && npm run typecheck && lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e`
Expected: PASS — 20 тестов × 2 профиля.

Если axe сообщает `color-contrast` на `.outline`: заменить обводку на `-webkit-text-stroke: max(1px, 0.03em) var(--acc);` и повторить прогон.

- [ ] **Step 7: Посмотреть всю страницу**

Снять скриншоты всей страницы на 1440×900 и 390×844 и окна кейса; сравнить с прототипом экран за экраном. Навести мышь на плашку услуги и «Почему я» — подсветка идёт за курсором.

- [ ] **Step 8: Документы**

`AGENTS.md`, раздел про PortTim: первая строка — «Одностраничный тёмный сайт-резюме Тима Окунева (сайты, боты, автоматизация) на Next.js 16: за семь экранов показывает заказчику услуги и кейсы и ведёт его в личный чат Telegram с готовым черновиком.»
Блок «Структура» привести к новому составу: порядок секций `Header, Hero, Services, Projects, Why, Process, About, Footer`; новые файлы `services`, `why`, `process`, `hero-numbers`, `hero-portrait`, `cursor`, `reveal-observer`; убрать `metrics`, `tech-stack`; `data/projects.ts` — `profile, copy, categories, categoryLabels, projects, heroNumbers, services, why, process, stack, about`; число тестов — 20.
Пункты под структурой: убрать строку про `Project.url`-кнопку не нужно (она верна); строку про производные числа заменить на «Числа первого экрана и факт про инструменты считаются из `projects` и `stack`: новый кейс — одна запись в массиве, новая технология — строка в `stack[].items` (на странице меняется только число)».
«Подводные камни»: убрать пункт про четыре пункта меню на телефоне; добавить два:
- «Блоки с классом `.reveal` невидимы, пока `RevealObserver` не повесит `.is-visible`: новый блок без этого класса появится сразу, с ним — только после входа в окно просмотра.»
- «Точка курсора — элемент с `popover="manual"`: после открытия любого `<dialog>` её нужно показать заново, это делает `MutationObserver` в `components/cursor.tsx`.»

`README.md`: обновить описание, список секций, переменную `NEXT_PUBLIC_PROFILE_NAME` (умолчание «Тим Окунев») и добавить `NEXT_PUBLIC_MAX_URL`.
В `AGENTS.md` в блок «Структура» добавить строку `lib/max.ts — ссылка на профиль в MAX: maxLink; невалидное значение — null`, в список необязательных переменных — `NEXT_PUBLIC_MAX_URL`.

`.autopilot/2026-10-03-portfolio-cases-refactor/manifest.md`: под заголовком добавить одну строку, остальное не трогать:
`> С 2026-10-04 часть строк заменена решениями владельца: см. раздел «Какие прошлые решения это отменяет» в docs/superpowers/specs/2026-10-04-redesign-design.md.`

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(redesign): курсор-прожектор, сквозные проверки и документы"
```
