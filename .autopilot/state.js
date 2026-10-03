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
  "updatedAt": "2026-10-03T22:52:32+03:00",
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
      "note": "0 из 2 тасков готовы"
    },
    {
      "id": "review",
      "status": "active", "startedAt": "2026-10-03T22:52:32+03:00", "note": "проверяется 1 из 2"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 50,
    "done": 2,
    "inTicket": 48,
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
      "status": "review",
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
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": null,
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
  "concerns": [],
  "reviewers": {
    "manifestSpec": "reviewer-ms",
    "craft": "reviewer-craft"
  },
  "blind": null
}
