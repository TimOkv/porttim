# Публикация Vercel

Пользователь явно разрешил production-деплой 2026-10-08: «задеплой на версель».

Исходники в чистой копии /private/tmp/porttim-rounded-gjm6tuss сверены с текущими data/CSS/tests/page/components/package/lockfile/config. Локальная сборка прошла. В существующий проект porttim скопирована только привязка .vercel/project.json; env/secrets не копировались. Кэши, node_modules, .autopilot и env исключены из загрузки.

Команда: npm_config_cache=/private/tmp/porttim-vercel-cache npx --yes vercel@latest --prod --yes.

CLI63.1.0; публикация выполняется.

Два запуска production-деплоя (обычный и require_escalated) завершились deploy_failed / Not authorized. Публикация не подтверждена. Вход CLI запущен с временным global-config, сессия5338; открыт экран Vercel OAuth, ожидается действие пользователя. Секреты и коды входа в файлы не записывались.

Автоматическая проверка отклонила WebMCP открытие подключения Vercel-плагина: оно может инициировать OAuth/доступ к аккаунту; исходный запрос на деплой не разрешает новые права. Пользователю задан выбор: отдельно разрешить подключение или завершить штатный вход CLI. До ответа подключение не продолжается.

2026-10-08: Новый вход90003 завершился успешно. whoami: timaokunev45-hue. Production deployment READY: dpl_GGrwCV4ePA7eBTw6WarEW7zc4eJ9. Alias https://porttim.vercel.app. Cloud build и публичный HTML/CSS,3 redirect routes и браузерный filter/dialog smoke прошли.
