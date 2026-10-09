<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- autopilot:start -->
# PortTim

Портфолио Тима Окунева на Next.js 16. Основная страница `/` — утверждённый
2026-10-09 дизайн Matthew: серый первый экран с бегущим именем и портретом,
контрастные секции, кейсы строками, анимированные факты и иллюстрации.
Порядок: Hero, About, Projects, Services, Why, Process, Contact.

## Команды

```sh
npm run dev                       # http://localhost:3000
npm run lint
npm run typecheck
npm run build -- --webpack        # штатная альтернатива Turbopack
npm run test:e2e                   # свежая сборка должна уже существовать
PORTFOLIO_TEST_PORT=3102 npm run test:e2e  # отдельный порт, если 3100 занят
```

Playwright запускает новый `next start`, переиспользование сервера выключено.
Он проверяет текущую сборку, сам её не собирает. Тестовые профили desktop и
mobile используют Chromium; при необходимости `npx playwright install chromium`.

## Источники и структура

- `app/page.tsx` — подключает `Portfolio`; `app/layout.tsx` — метаданные, шрифт,
  тема документа и fallback для страницы без JavaScript.
- `components/portfolio/portfolio.tsx` — текущие секции, мобильное меню, фильтры,
  нативное окно кейса. Шапка стоит перед `main`, чтобы skip-link обходил меню.
- `components/portfolio/motion-details.tsx` — счётчики фактов, четыре SVG-сюжета
  и кольца этапов. Системный reduced motion поддерживается.
- `components/portfolio/portfolio.module.css` — стили текущего дизайна.
  `app/globals.css` содержит базовые стили и прежний дизайн; его параллельные
  незавершённые изменения сохраняются.
- `data/projects.ts` — единственный источник русского UI, кейсов, услуг и фактов:
  `profile`, `copy`, `portfolioCopy`, `projects`, `services`, `why`, `processSteps`,
  `about`, `stack`. Технологии на странице не перечисляются, считается их число.
- `lib/telegram.ts` — имя аккаунта и черновики; `lib/max.ts` — проверенная ссылка
  MAX. При невалидном контакте ссылка возвращает null.
- `app/tg/[[...slug]]/route.ts` — 307 в личный Telegram с черновиком. Неизвестный
  кейс обрабатывается как общий контакт. Redirect в next.config.ts для этого
  не подходит: кириллица в Location должна оставаться закодированной.
- `public/portfolio/` — портрет с прозрачным фоном, Oswald 700 и его OFL-лицензия.
  Исходная фотография сохранена в `public/portrait.jpg` и `Portret.jpg`.
- `tests/portfolio-current.spec.ts` — действующая проверка нового сайта.
  `tests/portfolio.spec.ts` сохранён как тесты прежнего дизайна и не входит в
  testMatch. Его незавершённые изменения принадлежат предыдущей работе.
- `/prototype/matthew` перенаправляет на `/`. Исходники прототипа рядом с этим
  маршрутом сохранены для сравнения, основная страница их не импортирует.

## Согласованные ограничения

- Сохранять реальные тексты и результаты кейсов, не придумывать ссылки, клиентов,
  должности или срок работы. Проекты EasyLab описывают только вклад владельца.
- На странице нет декоративных номеров; номера этапов — только в кружках.
  Значения фактов и количества в фильтрах остаются числовыми.
- В услугах шесть направлений, включая CRM-системы и веб-панели по запросу.
- `Project.url` необязателен: с ним окно показывает ссылку на проект.
- Контакты открывают Telegram и MAX; Telegram получает черновик, не отправляет его.
- Переменные сборки: `NEXT_PUBLIC_PROFILE_NAME`, `NEXT_PUBLIC_PORTRAIT_SRC`,
  `NEXT_PUBLIC_TELEGRAM_USERNAME`, `NEXT_PUBLIC_MAX_URL`; значения по умолчанию
  лежат в коде. Изменение контактов требует обновления ожиданий тестов.
- При изменении анимаций проверять reduced motion, отсутствие горизонтального
  скролла и чтение без JS. Полные значения фактов доступны скринридеру отдельно
  от анимированных цифр. Окно сохраняет Tab-фокус и возвращает его к кейсу.

## Autopilot

Состояние предыдущих работ — в `.autopilot/state.js`, требования и задачи —
в `.autopilot/`, панель — `.autopilot/dashboard.html`. Требование из `manifest.md`
может снять только пользователь. Продолжение по команде «продолжи автопилот»
начинается с чтения состояния и текущей задачи.
<!-- autopilot:end -->

## Публикация в GitHub и Timeweb

Продакшен — Timeweb Cloud App Platform, https://okunevai.pro/.
Репозиторий — `TimOkv/porttim`, публикуемая ветка — `main`.

Просьба владельца «добавь/обнови/залей на GitHub» включает публикацию на
Timeweb: проверить изменения, отправить `main`, дождаться автодеплоя и
подтвердить новую версию на домене. Если владелец просит сначала показать
локальное превью, публикация начинается после его одобрения.

Держать включёнными «Сборку по последнему выполненному коммиту» для `main`
в Timeweb и webhook GitHub с событием `push`. После отправки проверить
доставку события и завершение сборки. Успешная доставка webhook означает
только приём события: выполнение задачи подтверждается обновлённым сайтом.

Если запуск потерялся, один раз повторить доставку соответствующего события
`push` через GitHub. При ошибке сборки получить лог Timeweb и устранить её.
Проверять на домене конкретное изменение; для служебного коммита подтвердить
новую сборку по статусу Timeweb или изменившемуся Next.js build ID.
