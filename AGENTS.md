<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- autopilot:start -->
# PortTim

Одностраничный тёмный сайт-резюме Тима Окунева (сайты, боты, автоматизация) на Next.js 16: за семь экранов показывает заказчику услуги и кейсы и ведёт его в личный чат Telegram с готовым черновиком.

## Команды

```sh
npm ci                             # зависимости; Node >= 20.9
npx playwright install chromium    # один раз: оба тестовых профиля идут на Chromium
npm run dev                        # http://localhost:3000
npm run lint
npm run typecheck
npm run build                      # если среда блокирует порты Turbopack: npm run build -- --webpack
lsof -ti tcp:3100 | xargs kill; npm run build && npm run test:e2e   # все тесты на свежей сборке
npx playwright test tests/portfolio.spec.ts --project=desktop       # один файл, один профиль (второй — mobile)
npx playwright test -g "short /tg"                                  # один тест по части названия
```

## Структура

```
app/page.tsx                  порядок секций: Header, Hero, Services, Projects, Why, Process, About, Footer; плюс RevealObserver и Cursor
app/globals.css               единственный файл стилей: токены тёмной темы и свои классы секций (container, eyebrow, display, tile-grid, reveal)
app/tg/[[...slug]]/route.ts   GET /tg и /tg/<id кейса> → 307 в Telegram; неизвестный id ведёт как /tg
data/projects.ts              всё содержание и тексты: profile, copy, categories, categoryLabels, projects, heroNumbers, services, why, processSteps, stack, stackCount, about; типы Category, Project
lib/telegram.ts               имя аккаунта и черновики: telegramUsername, getContactLink(source?), getProjectContactLink({ title }), getProjectDraft({ title }); без имени — null
lib/max.ts                    ссылка на профиль в MAX: maxLink; невалидное значение — null
components/contact-link.tsx   ContactLink({ children?, className?, compact?, source?, project? }) — кнопка связи в Telegram; при null ведёт на #contact
components/header.tsx         шапка: имя, меню, полоса прогресса; на телефоне меню открывается кнопкой
components/hero.tsx           первый экран; hero-portrait.tsx — портрет-фон, hero-numbers.tsx — четыре цифры
components/projects.tsx       сетка кейсов, фильтр по category, окно кейса на <dialog>
components/                   остальные секции по файлу: services, why, process, about, footer (в нём же #contact и плавающие кнопки Telegram и MAX)
components/reveal-observer.tsx  вешает .is-visible блокам .reveal и .is-playing цепочке .process при входе в окно просмотра
components/cursor.tsx         курсор-прожектор: только для мыши и без prefers-reduced-motion
components/ui/                набор на утилитах Tailwind; страницей не импортируется
tests/portfolio.spec.ts       единственный шов проверки: 20 тестов × профили desktop и mobile, страница в браузере и ответы /tg
public/portrait.jpg           портрет первого экрана; Portret.jpg в корне — исходник
docs/superpowers/specs/       описание редизайна 2026-10-04 и прототип-образец
PROJECT_SPEC.md               описание первой версии, устарело; актуальное — README.md
```

- Текст интерфейса живёт только в `data/projects.ts`; в компонентах секций русских строк нет.
- Числа первого экрана, счётчики фильтра и факт про инструменты считаются из `projects` и `stack`: новый кейс — одна запись в массиве, новая технология — строка в `stack[].items` (на странице меняется только число, названия технологий не показываются).
- `Project.url` не задан ни у одного кейса; с ним в окне кейса появляется кнопка «Посмотреть проект».
- Необязательные переменные, вшиваются при сборке: `NEXT_PUBLIC_PROFILE_NAME`, `NEXT_PUBLIC_PORTRAIT_SRC`, `NEXT_PUBLIC_TELEGRAM_USERNAME`, `NEXT_PUBLIC_MAX_URL`; умолчания — в коде, образец — `.env.example`.
- Тесты берут количества из данных, а тексты кейсов, черновиков, блока «Обо мне» и адреса чатов сверяют со строками в самом тесте: правка текста или переменной окружения требует правки теста.
- На странице нет названия школы, должности, срока работы и названий технологий — это решение владельца; тест «about section…» это проверяет.

## Подводные камни

- Тесты идут против `next start` на порту 3100, проект сами не собирают и вне CI переиспользуют живой сервер: без остановки процесса на 3100 и пересборки проверяется прошлая сборка.
- `/tg` — обработчик маршрута, а не `redirects()` в `next.config.ts`: там Next.js декодирует кириллицу в `destination`, и ответ падает с невалидным `Location`.
- Блоки с классом `.reveal` невидимы, пока `RevealObserver` не повесит `.is-visible`: новый блок без этого класса появится сразу, с ним — только после входа в окно просмотра.
- Точка курсора — элемент с `popover="manual"`: после открытия любого `<dialog>` её нужно показать заново, это делает `MutationObserver` в `components/cursor.tsx`.
- Имена классов `outline`, `filter`, `container` и ключевых кадров `ping` заняты утилитами Tailwind: свой класс с таким именем получит чужие стили. Поэтому контурный текст — `.stroke-text`, кнопка фильтра — `.case-filter`, пульс кнопки — `quick-ping`.
- `data/projects.ts` читает `process.env`: экспорт с именем `process` затенит его, поэтому шаги работы называются `processSteps`.
- Размытие шапки (`backdrop-filter`) делает её опорным блоком для вложенных `position: fixed`: панель меню на телефоне стоит `absolute` от шапки.

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
