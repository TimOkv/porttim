window.STATE =
{
  "slug": "readable-copy",
  "dir": "2026-10-08-readable-copy--wip",
  "title": "Короткие тексты и проверка действий",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-08-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "/Users/timofejokunev/.agents/skills/autopilot",
  "startedAt": "2026-10-08T17:50:20+03:00",
  "updatedAt": "2026-10-08T18:08:39+03:00",
  "finishedAt": "2026-10-08T18:08:39+03:00",
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-10-08T17:50:20+03:00",
      "finishedAt": "2026-10-08T17:50:20+03:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-10-08T17:50:20+03:00",
      "finishedAt": "2026-10-08T17:51:02+03:00"
    },
    {
      "id": "briefing",
      "status": "skipped",
      "note": "вопросов не потребовалось: редактируем существующие тексты"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-10-08T17:51:02+03:00",
      "finishedAt": "2026-10-08T17:51:53+03:00"
    },
    {
      "id": "plan",
      "status": "skipped",
      "note": "ярус T0 — без разбивки на таски"
    },
    {
      "id": "build",
      "status": "done",
      "startedAt": "2026-10-08T17:51:53+03:00",
      "finishedAt": "2026-10-08T17:58:22+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-08T17:54:56+03:00",
      "finishedAt": "2026-10-08T17:58:22+03:00"
    },
    {
      "id": "final",
      "status": "done",
      "startedAt": "2026-10-08T17:58:22+03:00",
      "finishedAt": "2026-10-08T18:08:39+03:00",
      "note": "Независимая живая приёмка: 9 кейсов, меню, фильтры и ссылки без дефектов; CLI ограничен средой"
    }
  ],
  "requirements": {
    "total": 5,
    "done": 5,
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [],
  "singlePass": {
    "startedAt": "2026-10-08T17:51:53+03:00",
    "status": "done",
    "files": [
      "data/projects.ts",
      "tests/portfolio.spec.ts"
    ],
    "copyMetrics": {
      "descriptions": {
        "before": 3507,
        "after": 2314,
        "reductionPercent": 34
      },
      "cards": {
        "before": 822,
        "after": 586,
        "reductionPercent": 28.7
      },
      "details": {
        "before": 1301,
        "after": 870,
        "reductionPercent": 33.1
      }
    },
    "tests": {
      "passed": 2,
      "failed": 0,
      "blocked": 42,
      "note": "CLI Chromium не запускается из-за MachPort; выполнена независимая живая iab приёмка"
    },
    "build": "npm run build -- --webpack → exit 0 в свежей идентичной копии кода",
    "finishedAt": "2026-10-08T18:08:39+03:00",
    "commit": null
  },
  "tests": {
    "passed": 2,
    "failed": 0,
    "blocked": 42,
    "note": "CLI Chromium не запускается из-за MachPort; выполнена независимая живая iab приёмка"
  },
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": {
    "missing": 0,
    "half": 0,
    "extra": 0,
    "note": "Независимая сверка брифа и спецификации: расхождений нет"
  },
  "concerns": [
    "Полный CLI E2E не подтверждён: 42 сценария заблокированы до assertions запуском Chromium; вместо них живая проверка iab. Реальные приложения Telegram/MAX на телефоне не запускались: проверены адреса/черновики.",
    "Косметическое ограничение: каталог прогона не переименован: 1"
  ],
  "reviewers": {
    "manifestSpec": "/root/requirements_review",
    "craft": "/root/craft_review"
  },
  "blind": {
    "agreed": 5,
    "drift": 0,
    "note": "Багов в проверенных сценариях нет; полный CLI E2E частично проверен из-за MachPort deny. Независимые замеры текста дают сокращение около трети."
  }
}
