window.STATE =
{
  "slug": "readable-copy",
  "dir": "2026-10-08-readable-copy--wip",
  "title": "Короткие кейсы и скруглённые карточки",
  "mode": "semi",
  "depth": "normal",
  "polish": null,
  "tier": "T0",
  "briefFile": "2026-10-08-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "/Users/timofejokunev/.agents/skills/autopilot",
  "startedAt": "2026-10-08T17:50:20+03:00",
  "updatedAt": "2026-10-08T19:49:17+03:00",
  "finishedAt": null,
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
      "startedAt": "2026-10-08T18:46:41+03:00",
      "note": "Уточнение: возврат остальных текстов и дизайн кейсов",
      "finishedAt": "2026-10-08T18:57:19+03:00"
    },
    {
      "id": "review",
      "status": "done",
      "startedAt": "2026-10-08T18:48:51+03:00",
      "finishedAt": "2026-10-08T18:57:19+03:00"
    },
    {
      "id": "final",
      "status": "failed",
      "startedAt": "2026-10-08T19:13:21+03:00",
      "note": "PortTim опубликован и проверен. Глобальная настройка Vercel-плагина/MCP заблокирована записью в пользовательские папки."
    }
  ],
  "requirements": {
    "total": 9,
    "done": 8,
    "inTicket": 0,
    "inSpec": 1,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [],
  "singlePass": {
    "startedAt": "2026-10-08T18:46:41+03:00",
    "status": "done",
    "files": [
      "data/projects.ts",
      "app/globals.css",
      "tests/portfolio.spec.ts"
    ],
    "finishedAt": "2026-10-08T18:57:19+03:00",
    "commit": null,
    "tests": {
      "passed": 3,
      "failed": 0,
      "blocked": 42,
      "note": "3 HTTP маршрута; живой IAB:9 диалогов,4 фильтра,5 размеров; полный CLI ограничен средой"
    }
  },
  "tests": {
    "passed": 3,
    "failed": 0,
    "blocked": 42,
    "note": "3 HTTP маршрута; живой IAB:9 диалогов,4 фильтра,5 размеров; полный CLI ограничен средой"
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
    "note": "G2 уточнения: возврат остальных текстов и скругление кейсов покрыты полностью"
  },
  "concerns": [
    "Полный CLI E2E не подтверждён: MachPort deny; функциональная проверка выполнена root в живом IAB.",
    "Независимый reviewer не получил live IAB на продолжении; проверил данные и свежие снимки."
  ],
  "reviewers": {
    "manifestSpec": "/root/requirements_review",
    "craft": "/root/craft_review"
  },
  "blind": {
    "agreed": 7,
    "drift": 0,
    "note": "Независимо: точный scope и снимки. Независимый live IAB недоступен; root прошёл9 диалогов и адаптивную сетку."
  },
  "deployment": {
    "status": "ready",
    "project": "porttim",
    "workspace": "/private/tmp/porttim-rounded-gjm6tuss",
    "cliCache": "/private/tmp/porttim-vercel-cache",
    "cliAuthConfig": "/private/tmp/porttim-vercel-auth",
    "loginSessionId": 90003,
    "loginTabId": "5",
    "error": null,
    "approvalReview": "Подключение Vercel-плагина отклонено: новый доступ к внешнему аккаунту требует отдельного разрешения.",
    "account": "timaokunev45-hue",
    "id": "dpl_GGrwCV4ePA7eBTw6WarEW7zc4eJ9",
    "url": "https://porttim.vercel.app",
    "deploymentUrl": "https://porttim-dui3f45lw-timaokunev45-hues-projects.vercel.app",
    "readyState": "READY",
    "target": "production",
    "verified": true
  },
  "vercelSetup": {
    "guide": "https://vercel.com/get-started.md",
    "cliVersion": "63.1.0",
    "authenticatedAs": "timaokunev45-hue",
    "cliScope": "Временный CLI-кэш и auth config /private/tmp/porttim-vercel-auth",
    "globalCliInstall": "blocked: EPERM ~/.npm-global/lib/node_modules/vercel",
    "guidance": "blocked: EPERM ~/.cache/plugins; standalone skills не устанавливались",
    "mcp": "blocked: EPERM ~/.codex/config.toml; сервер vercel не добавлен",
    "mcpEndpoint": "https://mcp.vercel.com",
    "authenticatedMcpCheck": "not run: server not registered",
    "nativeSettings": "blocked: computer use cannot control com.openai.codex for safety reasons",
    "reload": "not performed; installation did not succeed"
  }
}
