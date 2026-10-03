# Что уже построено

Читается каждым исполнителем до начала работы. Не изобретай заново то, что здесь есть.

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `data/projects.ts` | всё содержание сайта: профиль, тексты интерфейса, полоса цифр, кейсы, стек, блок «Обо мне» | типы `Category`, `Project`, `StackGroup`; значения `profile`, `copy`, `metrics`, `categories`, `projects`, `stack`, `about` | как считаются производные цифры (число кейсов, число направлений) |
| `lib/telegram.ts` | имя аккаунта Telegram, правило его проверки, тексты черновиков | `telegramUsername: string \| null`; `getContactLink(source?: ContactSource): string \| null`; `getProjectContactLink(project: { title: string }): string \| null`; тип `ContactSource` (`"default" \| "header" \| "hero" \| "footer"`) | нормализацию имени, кодирование текста в адрес |
| `components/contact-link.tsx` | вид и поведение кнопки связи | `ContactLink({ children?, className?, compact?, source?, project? })` — ссылка в Telegram или, без имени аккаунта, якорь на контактный блок | выбор между общей ссылкой и ссылкой по кейсу |
| `components/projects.tsx` | сетка кейсов, фильтры, окно кейса | `Projects()` | состояние фильтра и открытого кейса, управление фокусом окна |
| `components/about.tsx` (новый) | секция «Обо мне» | `About()` | раскладку абзаца и ряда фактов |
| `components/tech-stack.tsx` | секция стека | `TechStack()` | соответствие имени иконки и самой иконки |
| `components/metrics.tsx` | полоса цифр и анимация счёта | `Metrics()` | анимацию и её отключение |
| `app/tg/[[...slug]]/route.ts` | короткие адреса | `GET /tg`, `GET /tg/<id кейса>` → перенаправление | выбор ссылки по идентификатору |

Форма кейса и группы стека:

```ts
export type Category = "Web" | "AI & Bots" | "Automation";
export type Project = {
  id: string;
  number: string;
  category: Category;          // фильтр
  label: string;               // подкатегория из задачи: "Web / EdTech"
  format: string;
  title: string;
  result: { value?: string; text: string };  // value — только число из задачи
  description: string;
  value: string;               // ценность для бизнеса
  tags: string[];
  url?: string;                // публичная ссылка; пока не задана ни у одного
};
export type StackGroup = {
  icon: "layers" | "workflow" | "sparkles";
  name: string;
  detail: string;
  items: string[];
};
export const about: {
  eyebrow: string;
  title: string;
  accent: string;
  paragraphs: string[];                       // два абзаца
  facts: { value: string; label: string }[];  // четыре факта
  cta: string;
};
```

Форма записи полосы цифр не меняется: `{ value: number, prefix: string, suffix: string, label: string, note: string }`.

**Шов для тестов — один, существующий:** готовая страница в браузере (тесты Playwright на
компьютерном и мобильном профиле, файл `tests/portfolio.spec.ts`) плюс ответы адресов `/tg`.
Поведение проверяется только через него; ожидаемые количества тесты берут из `data/projects.ts`,
а не записывают числами.

## Общие правила проекта

- Стек: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12,
  lucide-react, Playwright + axe. Версия Next.js новее привычной: **перед правкой кода прочитай
  нужный раздел в `node_modules/next/dist/docs/`** — это правило из `AGENTS.md`, оно обязательное.
- Команды (из корня репозитория `/Users/timofejokunev/Desktop/PortTim`):
  - линтер — `npm run lint`; типы — `npm run typecheck`;
  - сборка — `npm run build` (если среда блокирует порты Turbopack — `npm run build -- --webpack`);
  - все тесты — `npm run test:e2e`; один файл — `npx playwright test tests/portfolio.spec.ts`;
    один тест — `npx playwright test -g "<часть названия>"`; один профиль — `--project=desktop`.
- Тесты идут против `next start` на порту 3100, и конфигурация **переиспользует живой сервер**.
  На порту может остаться сервер со старой сборкой: перед прогоном останови процесс на 3100
  (`lsof -ti tcp:3100 | xargs kill`), пересобери проект, и только потом запускай тесты — иначе они
  проверяют вчерашний сайт.
- Стили — класс-ориентированные, в одном файле `app/globals.css`; новые секции оформляются теми же
  приёмами (стеклянные панели `glass`, надзаголовок `eyebrow`, заголовок с акцентом).
- Все тексты интерфейса лежат в `data/projects.ts`; в компонентах строк на русском нет.
- Менять запрещено: имена и расположение существующих файлов; первый экран (`components/hero.tsx`
  — заголовок, подпись под именем, портрет и его подписи); `PROJECT_SPEC.md`; каталог
  `components/ui/`; `.env*`; `.vercel/`; всё под `.autopilot/`.
- Ничего не публикуется: никаких `vercel`, `git push`, деплоев.
- Git: не коммить — коммит делает оркестратор после ревью.
- Если не хватает зависимости — не добавляй сам, верни `BLOCKED` с названием.

## Из таска 01 — кейсы, полоса цифр, ссылки в Telegram

- `data/projects.ts`: `Project` — по форме выше; `metrics` определён после `projects`, первая запись
  `value: projects.length`; `profile.telegram = getContactLink()` — своей копии имени аккаунта в данных нет.
- `copy.projects`: добавлены `dialogValue`, `dialogTags`, `view`; убраны `previewNote`, `dialogNote`,
  `dialogLabel`, `dialogStack`.
- `lib/telegram.ts` экспортирует только `telegramUsername`, `getContactLink(source?: ContactSource)`,
  `getProjectContactLink(project: { title: string })`, типы `ContactSource`, `ContactProject`.
  Не пиши свою сборку ссылки — бери отсюда.
- `ContactLink({ children?, className?, compact?, source?, project? })` — кнопка связи; для секции
  «Обо мне» точка входа `default`.
- `components/project-preview.tsx` удалён вместе со стилями превью.
- CSS-классы карточки и окна кейса: `.project-result`, `.project-description`, `.project-format`,
  `.dialog-format`, `.dialog-actions`. Сетка кейсов: 3 колонки, 2 — до 1100 px, 1 — на телефоне.
- Тесты: 14 тестов × 2 профиля в `tests/portfolio.spec.ts`; ожидаемые количества берутся из данных.
  Тест чипа стека «Python & API» пока проверяет прежний стек — его заменяет таск 02.
