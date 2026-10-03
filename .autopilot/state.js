window.STATE =
{
  "slug": "portfolio-cases-refactor",
  "dir": "2026-10-03-portfolio-cases-refactor--wip",
  "title": "Портфолио PortTim: стек, опыт EasyCode и 9 кейсов",
  "mode": "interview",
  "depth": "deep",
  "polish": null,
  "tier": "T1",
  "briefFile": "2026-10-03-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "/Users/timofejokunev/.claude/skills/autopilot",
  "startedAt": "2026-10-03T22:04:51+03:00",
  "updatedAt": "2026-10-03T23:03:25+03:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-03T22:04:51+03:00",
      "finishedAt": "2026-10-03T22:07:03+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-03T22:05:40+03:00",
      "finishedAt": "2026-10-03T22:07:03+03:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-10-03T22:07:03+03:00",
      "finishedAt": "2026-10-03T22:31:20+03:00"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-03T22:31:20+03:00",
      "finishedAt": "2026-10-03T22:37:31+03:00"
    },
    {
      "id": "plan",
      "status": "done",
      "startedAt": "2026-10-03T22:37:31+03:00",
      "finishedAt": "2026-10-03T22:39:13+03:00"
    },
    {
      "id": "build",
      "status": "active",
      "startedAt": "2026-10-03T22:39:13+03:00",
      "note": "1 из 2 тасков готовы"
    },
    {
      "id": "review",
      "status": "active", "startedAt": "2026-10-03T22:52:32+03:00", "note": "проверено 1 из 2, идёт второй"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 50,
    "done": 34,
    "inTicket": 16,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Девять кейсов, полоса цифр и ссылки в Telegram",
      "requirements": [
        "R01",
        "R02",
        "R04",
        "R05",
        "R12",
        "R13",
        "R14",
        "R15",
        "R16",
        "R17",
        "R18",
        "R19",
        "R20",
        "R21",
        "R22",
        "R23",
        "R24",
        "R25",
        "R27",
        "R28",
        "R29",
        "R30",
        "R31",
        "R32",
        "R33",
        "R35i",
        "R36i",
        "R37i",
        "R38i",
        "R39i",
        "R40i",
        "R41i",
        "R42i",
        "G06"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "data/",
        "lib/",
        "components/projects.tsx",
        "components/contact-link.tsx",
        "app/tg/",
        "app/globals.css",
        "tests/"
      ],
      "status": "done",
      "finishedAt": "2026-10-03T22:55:53+03:00",
      "files": ["data/projects.ts", "lib/telegram.ts", "components/projects.tsx", "components/contact-link.tsx", "components/header.tsx", "components/footer.tsx", "components/hero.tsx", "app/globals.css", "tests/portfolio.spec.ts", "components/project-preview.tsx (удалён)"],
      "tests": { "passed": 28, "failed": 0 },
      "commit": "a27bb94",
      "concerns": [],
      "startedAt": "2026-10-03T22:39:13+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "02",
      "title": "Блок «Обо мне», стек из трёх групп и меню",
      "requirements": [
        "R03",
        "R06",
        "R07",
        "R08",
        "R09",
        "R10",
        "R11",
        "R33",
        "R42i",
        "R43i",
        "R44i",
        "G01",
        "G02",
        "G03",
        "G04",
        "G05"
      ],
      "blockedBy": [
        "01"
      ],
      "wave": 2,
      "zone": [
        "data/",
        "components/about.tsx",
        "components/tech-stack.tsx",
        "app/page.tsx",
        "app/globals.css",
        "tests/",
        "README.md"
      ],
      "status": "review",
      "startedAt": "2026-10-03T22:55:53+03:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": { "passed": 28, "failed": 0 },
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "missing": 2,
    "half": 7,
    "extra": 0,
    "note": "Независимая сверка брифа и спецификации: 2 пропуска (число цифр у кейсов, запрет на имена клиентов) и 7 половин (образец, границы схемы данных, EasyLab против фразы про EasyCode, деление формулировки EasyLab, глубокий анализ, тексты черновиков, метрика кейса) — все дописаны в спецификацию. Из лишнего: домысленные «по своей инициативе» и «учеников» убраны из текста «Обо мне»; остальное — проработка требований, привязанная к ним."
  },
  "concerns": [
    "tests/portfolio.spec.ts:25 — набор кнопок фильтра выводится тем же выражением, что в компоненте: тест не упадёт, если пустая категория перестанет отсекаться",
    "tests/portfolio.spec.ts:467 — ветка «ссылка задана → кнопка „Посмотреть проект“» не проверена: ссылки нет ни у одного кейса",
    "tests/portfolio.spec.ts — ветка «некорректное имя аккаунта → якорь на контактный блок» не покрыта автотестом (проверена исполнителем вручную отдельной сборкой)",
    "tests/portfolio.spec.ts:155 — с таблицей содержания целиком сверен только кейс 01 (и 06 в окне); у остальных формат, ценность и теги литералами не проверены",
    "tests/portfolio.spec.ts:253 — тексты «Все проекты» и «проектов» взяты из данных, а не записаны литералами",
    "tests/portfolio.spec.ts:310 — собраны три кадра, утверждается только последний",
    "tests/portfolio.spec.ts:136 — один тест на 110 строк с несколькими причинами упасть",
    "components/footer.tsx:52 — плавающая кнопка повторяет выбор «ссылка или якорь» из contact-link.tsx",
    "components/contact-link.tsx:28 — тип { title: string } записан заново при экспортируемом ContactProject",
    "components/projects.tsx:216 — щелчок по промежутку между кнопками в окне кейса тоже закрывает окно",
    "app/globals.css:1179 — правило двух колонок сетки и кегль тегов заданы дважды",
    "app/globals.css:632 — класс .bento-grid называет теперь ровную сетку",
    "components/hero.tsx:55 — на первом экране изменён один атрибут: кнопке передана точка входа source=\"hero\" (видимое не менялось)"
  ],
  "reviewers": {
    "manifestSpec": "reviewer-ms",
    "craft": "reviewer-craft"
  },
  "blind": null
}
