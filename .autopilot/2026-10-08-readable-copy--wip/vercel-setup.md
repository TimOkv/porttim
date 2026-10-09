# Vercel setup — verified state

Guide fetched directly from https://vercel.com/get-started.md (web fetch rejected text/markdown; HTTPS curl succeeded). Official OpenAI MCP documentation also checked at https://learn.chatgpt.com/docs/extend/mcp?surface=cli.

CLI63.1.0 is available through the prepared npm cache, authenticated as timaokunev45-hue with the temporary global-config created by the user's completed login. No credential values were read or written to these records.

Global CLI install attempted with require_escalated, failed EPERM at ~/.npm-global/lib/node_modules/vercel. Existing usable CLI continued to work; global installation is not claimed.

Official plugin attempted: npx plugins add vercel/vercel-plugin --target codex --scope user --yes. Codex is a supported/detected target. Installation failed EPERM at ~/.cache/plugins even with require_escalated. Official plugin docs checked once. Standalone skills were not installed alongside it.

Existing Codex MCP entries inspected through redacted codex mcp list --json (only name/type/hostname/auth_status printed; headers/env discarded). Attempted documented codex mcp add vercel --url https://mcp.vercel.com with require_escalated. Failed persisting ~/.codex/config.toml (EPERM temporary file); existing servers left intact. Recheck: Vercel server absent. OAuth/list_teams/search_vercel_documentation not run because there is no registered server. No approval settings weakened.

Native app configuration cannot be used: computer-use getApp returned that com.openai.codex is prohibited for safety reasons. No alternate path to control that app attempted.

## Production deployment completed

Explicit prior user instruction to deploy PortTim remains authorized. Using authenticated CLI profile, published the exact verified source copy /private/tmp/porttim-rounded-gjm6tuss to existing project porttim. No new Vercel project created.

Deployment: dpl_GGrwCV4ePA7eBTw6WarEW7zc4eJ9, READY production.
Production URL: https://porttim.vercel.app
Deployment URL: https://porttim-dui3f45lw-timaokunev45-hues-projects.vercel.app

Cloud Next.js16.3.8 Turbopack build passed. Public HTTPS fetch succeeded with certificate verification via system curl (Python local CA store failed; certificate checks were not disabled). Published HTML has restored noncase text and shortened case result. CSS has case-card radius24px and cases-grid gap16px. /tg, /tg/web-to-sheets and unknown case: correct307 with personal Telegram chat and draft. Live browser production smoke: automation filter2, case dialog opens/closes, all9 cards restore, computed radius24px/gap16px. Production screenshot saved under evidence/production-rounded.jpg.

## Remaining setup

Needs ordinary user Terminal outside this restricted execution profile to install the global CLI/guidance and persist MCP config. Then user completes OAuth for https://mcp.vercel.com. User confirmation for MCP mutations must remain enabled. No global setup READY claim; CLI account and deployment are verified, guidance/MCP are blocked.
