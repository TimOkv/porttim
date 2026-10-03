<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- autopilot:start -->
# PortTim

Сайт-портфолио TimA (AI & Web Engineering) на Next.js: герой с портретом, метрики, фильтруемая сетка кейсов, стек и контакты через Telegram.

## Команды

| Команда | Что делает |
|---------|------------|
| `npm ci` | Установить зависимости |
| `npm run dev` | Запустить локально |
| `npm run lint` | Проверить код линтером |
| `npm run typecheck` | Проверить типы |
| `npm run test:e2e` | Прогнать тесты Playwright |

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
