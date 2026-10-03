export type Category = "Web" | "AI & Bots" | "Automation";
export type ProjectStat = { label: string; value: string };
export type Project = {
  id: string;
  number: string;
  category: Category;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  // Только факты из спецификации; измеримые результаты добавлять сюда же, когда появятся реальные цифры.
  stats: ProjectStat[];
  visual: "website" | "agent" | "workflow" | "landing" | "bot" | "quest";
  featured?: boolean;
  preview: { brand: string; heading: string; detail: string };
};

const username = (process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "opskeeper")
  .trim()
  .replace(/^@/, "");
export const profile = {
  name: process.env.NEXT_PUBLIC_PROFILE_NAME || "TimA",
  initials: "T.",
  role: "AI & Fullstack Developer",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_SRC || "/portrait.jpg",
  telegram: /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(username)
    ? `https://t.me/${username}?text=${encodeURIComponent("Привет! Хочу обсудить с вами проект.")}`
    : null,
};

export const copy = {
  metadata: {
    title: `${profile.name} — AI & Web Engineering`,
    description:
      "Цифровые продукты, AI-агенты и автоматизация. От идеи и архитектуры до интерфейса и запуска.",
  },
  skip: "Перейти к содержимому",
  navigation: "Навигация",
  brandMark: "t",
  heroBadges: {
    top: "AI + WEB + AUTOMATION",
    bottom: "DESIGN → BUILD → LAUNCH",
  },
  nav: [
    { label: "Проекты", href: "#projects" },
    { label: "Метрики", href: "#metrics" },
    { label: "Стек", href: "#stack" },
  ],
  status: "Открыт к проектам",
  contact: "Написать в Telegram",
  quickContact: "На связи",
  hero: {
    eyebrow: "AI SOLUTIONS & WEB ENGINEERING",
    title: ["Превращаю идеи", "в цифровые", "возможности."],
    description:
      "Создаю веб-продукты, AI-агентов и автоматизацию, которые решают задачи бизнеса. От первой идеи до работающей системы.",
    primary: "Обсудить проект",
    secondary: "Смотреть проекты",
    note: "Внимание к деталям. Фокус на результате.",
    portraitAlt: `Портрет разработчика — ${profile.name}`,
    portraitPlaceholder: "Место для вашего портрета",
    portraitLabel: "HUMAN BEHIND THE CODE",
    badgeTop: "От идеи до запуска",
    badgeBottom: "Системный подход",
    location: "РАБОТАЮ УДАЛЁННО · ПО ВСЕМУ МИРУ",
    scroll: "Листайте, дальше интереснее",
  },
  metricsLabel: "Результат в цифрах",
  projects: {
    eyebrow: "01 / ИЗБРАННЫЕ ПРОЕКТЫ",
    title: "Идеи становятся",
    accent: "продуктами.",
    description:
      "Веб, искусственный интеллект и автоматизация.\nРазные задачи — один продуманный подход.",
    all: "Все проекты",
    count: "проектов",
    details: "Подробнее о проекте",
    close: "Закрыть описание проекта",
    dialogLabel: "О проекте",
    dialogStack: "Технологии",
    previewNote: "Концептуальное превью",
    dialogNote:
      "Визуальное превью иллюстрирует направление проекта. Описание — по проектной спецификации.",
    discuss: "Обсудить похожую задачу",
  },
  stack: {
    eyebrow: "02 / ИНСТРУМЕНТЫ",
    title: "Правильный стек.",
    accent: "Сильный результат.",
    description:
      "Подбираю технологии под задачу. Соединяю их в одну работающую систему.",
  },
  contactSection: {
    eyebrow: "03 / ДАВАЙТЕ СОЗДАДИМ ЧТО-ТО КЛАССНОЕ",
    title: "Ваша следующая",
    accent: "большая идея?",
    description:
      "Расскажите, что хотите создать. Вместе найдём путь от «а что, если» до готового продукта.",
    note: "Один диалог — первый шаг к запуску.",
    unavailable:
      "Прямой контакт появится здесь после добавления Telegram-адреса.",
  },
  footer: {
    note: "Создано с вниманием к деталям.",
    rights: "AI & WEB ENGINEERING",
    toTop: "Наверх",
  },
};

export const metrics = [
  {
    value: 8,
    prefix: "",
    suffix: "+",
    label: "Цифровых проектов",
    note: "От концепции до запуска",
  },
  {
    value: 100,
    prefix: "",
    suffix: "%",
    label: "Автономия процессов",
    note: "В ключевых сценариях",
  },
  {
    value: 2,
    prefix: "< ",
    suffix: " нед.",
    label: "От идеи до MVP",
    note: "Средний цикл разработки",
  },
  {
    value: 24,
    prefix: "",
    suffix: "/7",
    label: "AI всегда на связи",
    note: "Без пауз и выходных",
  },
];
export const categories = ["Web", "AI & Bots", "Automation"] as const;
export const projects: Project[] = [
  {
    id: "corporate",
    number: "01",
    category: "Web",
    title: "Больше, чем корпоративный сайт",
    subtitle: "ВЕБ-ПЛАТФОРМА",
    description:
      "Многостраничный веб-ресурс со сложной архитектурой, каталогом услуг и оптимизацией производительности. Продуманная структура помогает быстро найти нужное и перейти к действию.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    stats: [
      { label: "Формат", value: "Многостраничный сайт" },
      { label: "Фокус", value: "Структура и производительность" },
    ],
    visual: "website",
    featured: true,
    preview: {
      brand: "FORMA®",
      heading: "Пространство\nдля новых идей.",
      detail: "Архитектура. Дизайн. Возможности.",
    },
  },
  {
    id: "ai-support",
    number: "02",
    category: "AI & Bots",
    title: "Поддержка, которая не спит",
    subtitle: "АВТОНОМНЫЙ AI-АГЕНТ",
    description:
      "Интеллектуальный агент с подключённой базой знаний, анализом контекста диалога и сценариями маршрутизации запросов. Помогает клиенту найти ответ и передаёт сложные вопросы команде.",
    tags: ["LLM APIs", "Python", "n8n"],
    stats: [
      { label: "Режим работы", value: "24/7" },
      { label: "Основа ответов", value: "База знаний" },
    ],
    visual: "agent",
    preview: {
      brand: "AI ASSISTANT",
      heading: "Чем могу помочь?",
      detail: "База знаний подключена",
    },
  },
  {
    id: "business-automation",
    number: "03",
    category: "Automation",
    title: "Рутина — на автопилоте",
    subtitle: "БИЗНЕС-АВТОМАТИЗАЦИЯ",
    description:
      "Сквозной пайплайн передачи данных между вебхуками, базами данных и сервисами оповещений на базе n8n и Docker. От входящего события до нужного действия в одной цепочке.",
    tags: ["n8n", "Docker", "Webhooks"],
    stats: [
      { label: "Тип", value: "Сквозной пайплайн" },
      { label: "Платформа", value: "n8n + Docker" },
    ],
    visual: "workflow",
    preview: {
      brand: "CONNECTED WORKFLOW",
      heading: "Событие → результат",
      detail: "Webhook · Обработка · Уведомление",
    },
  },
  {
    id: "product-landing",
    number: "04",
    category: "Web",
    title: "Первое впечатление решает",
    subtitle: "ПРОДУКТОВЫЙ ЛЕНДИНГ",
    description:
      "Промо-лендинг продукта с акцентным визуальным стилем и интерактивными элементами вовлечения. Сценарий страницы ведёт от знакомства с продуктом к целевому действию.",
    tags: ["Next.js", "Motion", "UI/UX"],
    stats: [
      { label: "Формат", value: "Landing Page" },
      { label: "Фокус", value: "Вовлечение" },
    ],
    visual: "landing",
    preview: {
      brand: "ORBIT",
      heading: "Ваша идея.\nНовая орбита.",
      detail: "Меньше границ. Больше возможностей.",
    },
  },
  {
    id: "customer-bot",
    number: "05",
    category: "AI & Bots",
    title: "Весь путь клиента. В одном чате.",
    subtitle: "TELEGRAM-БОТ",
    description:
      "Многофункциональный бот автоматизации клиентского пути с обработкой входящих данных и интеграцией со сторонними сервисами.",
    tags: ["Python", "Telegram API", "Integrations"],
    stats: [
      { label: "Автономия процессов", value: "100%" },
      { label: "Сценарий", value: "Клиентский путь" },
    ],
    visual: "bot",
    preview: {
      brand: "YOUR ASSISTANT",
      heading: "Всё под рукой",
      detail: "Заявки · Сервисы · Поддержка",
    },
  },
  {
    id: "web-quest",
    number: "06",
    category: "Web",
    title: "Не просто смотреть. Участвовать.",
    subtitle: "ИНТЕРАКТИВНЫЙ WEB-КВЕСТ",
    description:
      "Геймифицированный веб-проект с логикой квеста, ветвлением решений и вовлекающим сценарием. Пользователь становится участником истории и сам выбирает следующий шаг.",
    tags: ["TypeScript", "Game Logic", "Web"],
    stats: [
      { label: "Формат", value: "Веб-квест" },
      { label: "Механика", value: "Ветвление решений" },
    ],
    visual: "quest",
    featured: true,
    preview: {
      brand: "QUEST / PLAY",
      heading: "Приключение\nначинается с тебя.",
      detail: "Исследуй. Решай. Открывай.",
    },
  },
  {
    id: "lead-landing",
    number: "07",
    category: "Web",
    title: "От интереса к действию",
    subtitle: "ЛЕНДИНГ ДЛЯ ЛИДОГЕНЕРАЦИИ",
    description:
      "Продуктовый лендинг с акцентом на быструю лидогенерацию: понятное предложение, последовательное раскрытие ценности и короткий путь до обращения.",
    tags: ["Next.js", "Tailwind", "UI/UX"],
    stats: [
      { label: "Формат", value: "Landing Page" },
      { label: "Фокус", value: "Быстрая лидогенерация" },
    ],
    visual: "landing",
    preview: {
      brand: "POINT.",
      heading: "Ближе\nк результату.",
      detail: "Один продукт. Много возможностей.",
    },
  },
  {
    id: "service-bot",
    number: "08",
    category: "AI & Bots",
    title: "Нужная информация. Вовремя.",
    subtitle: "СЕРВИСНЫЙ TELEGRAM-БОТ",
    description:
      "Бот для мгновенных уведомлений, управления очередями задач и операционной синхронизации. Сервисные события поступают прямо в привычный мессенджер.",
    tags: ["Telegram API", "Python", "API"],
    stats: [
      { label: "Уведомления", value: "Мгновенные" },
      { label: "Назначение", value: "Операционная синхронизация" },
    ],
    visual: "bot",
    preview: {
      brand: "SERVICE BOT",
      heading: "Вы в курсе событий",
      detail: "Уведомления · Задачи · Статусы",
    },
  },
  {
    id: "data-automation",
    featured: true,
    number: "09",
    category: "Automation",
    title: "Данные в нужном месте",
    subtitle: "СИНХРОНИЗАЦИЯ СЕРВИСОВ",
    description:
      "Автономный конвейер обработки данных и синхронизации сервисов без участия человека. Согласованная передача информации между инструментами команды.",
    tags: ["n8n", "API", "Docker"],
    stats: [
      { label: "Тип", value: "Конвейер данных" },
      { label: "Участие человека", value: "Не требуется" },
    ],
    visual: "workflow",
    preview: {
      brand: "DATA PIPELINE",
      heading: "Всё синхронизировано",
      detail: "Источник · Обработка · Сервис",
    },
  },
];

export const stack = [
  {
    icon: "sparkles",
    name: "Claude & LLM",
    label: "Интеллект",
    detail: "AI-агенты, интеграция языковых моделей и работа с контекстом.",
  },
  {
    icon: "code",
    name: "Next.js & TypeScript",
    label: "Основа",
    detail:
      "Быстрые веб-интерфейсы, типизированная логика и серверный рендеринг.",
  },
  {
    icon: "braces",
    name: "Python & API",
    label: "Логика",
    detail: "Оркестрация сервисов, обработка данных и интеграции.",
  },
  {
    icon: "workflow",
    name: "n8n & Docker",
    label: "Автоматизация",
    detail: "Связанные процессы и воспроизводимый запуск приложений.",
  },
  {
    icon: "layers",
    name: "Tailwind & Motion",
    label: "Впечатление",
    detail: "Адаптивные интерфейсы, плавная анимация и внимание к деталям.",
  },
] as const;
