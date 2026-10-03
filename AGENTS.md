<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- autopilot:start -->
# PortTim

Одностраничный сайт-портфолио TimA (AI & Web Engineering) на Next.js 16: показывает заказчику кейсы и ведёт его в личный чат Telegram с готовым черновиком.

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
app/page.tsx                  порядок секций: Header, Hero, Metrics, Projects, About, TechStack, Footer
app/globals.css               единственный файл стилей: свои классы секций (glass, eyebrow, section-heading)
app/tg/[[...slug]]/route.ts   GET /tg и /tg/<id кейса> → 307 в Telegram; неизвестный id ведёт как /tg
data/projects.ts              всё содержание и тексты: profile, copy, categories, projects, metrics, about, stack; типы Category, Project, StackGroup
lib/telegram.ts               имя аккаунта и черновики: telegramUsername, getContactLink(source?), getProjectContactLink({ title }); без имени — null
components/contact-link.tsx   ContactLink({ children?, className?, compact?, source?, project? }) — кнопка связи; при null ведёт на #contact
components/projects.tsx       сетка кейсов, фильтр по category, окно кейса на <dialog>
components/                   остальные секции по файлу: header, hero, metrics, about, tech-stack, footer (в нём же #contact и плавающая кнопка)
components/ui/                набор на утилитах Tailwind; страницей не импортируется
tests/portfolio.spec.ts       единственный шов проверки: 18 тестов × профили desktop и mobile, страница в браузере и ответы /tg
public/portrait.jpg           портрет первого экрана; Portret.jpg в корне — исходник
PROJECT_SPEC.md               описание первой версии, устарело; актуальное — README.md
```

- Текст интерфейса живёт только в `data/projects.ts`; в компонентах секций русских строк нет.
- Производные числа считаются из `projects` (первая цифра полосы, факты «Обо мне», кнопки фильтра): новый кейс — одна запись в массиве, новая технология — строка в `stack[].items`.
- `Project.url` не задан ни у одного кейса; с ним в окне кейса появляется кнопка «Посмотреть проект».
- Необязательные переменные, вшиваются при сборке: `NEXT_PUBLIC_PROFILE_NAME`, `NEXT_PUBLIC_PORTRAIT_SRC`, `NEXT_PUBLIC_TELEGRAM_USERNAME`; умолчания — в коде, образец — `.env.example`.
- Тесты берут количества из данных, а тексты кейсов, черновиков, стека и адрес чата сверяют со строками в самом тесте: правка текста или переменной окружения требует правки теста.

## Подводные камни

- Тесты идут против `next start` на порту 3100, проект сами не собирают и вне CI переиспользуют живой сервер: без остановки процесса на 3100 и пересборки проверяется прошлая сборка.
- `/tg` — обработчик маршрута, а не `redirects()` в `next.config.ts`: там Next.js декодирует кириллицу в `destination`, и ответ падает с невалидным `Location`.
- Шапка на телефоне вмещает четыре пункта `copy.nav` впритык: тест ловит перенос строки на ширинах 320–414 px.

## Как здесь работает Autopilot

Сборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
