import { getContactLink } from "@/lib/telegram";

export type Category = "Web" | "AI & Bots" | "Automation";
export type Project = {
  id: string;
  number: string;
  // Фильтр в сетке кейсов.
  category: Category;
  // Подкатегория из задачи, подпись на карточке: "Web / EdTech".
  label: string;
  format: string;
  title: string;
  // Метрика кейса. value — только число, названное владельцем; у остальных результат сказан словами.
  result: { value?: string; text: string };
  description: string;
  // Ценность для бизнеса — полным текстом в окне кейса.
  value: string;
  tags: string[];
  // Публичная ссылка: с ней в окне кейса появляется кнопка «Посмотреть проект».
  url?: string;
};
export type StackGroup = {
  icon: "layers" | "workflow" | "sparkles";
  name: string;
  // Одна строка о пользе для бизнеса под заголовком группы.
  detail: string;
  items: string[];
};

export const profile = {
  name: process.env.NEXT_PUBLIC_PROFILE_NAME || "TimA",
  initials: "T.",
  role: "AI & Fullstack Developer",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_SRC || "/portrait.jpg",
  // Ссылку строит модуль ссылок: имя аккаунта и правило его проверки живут только там.
  telegram: getContactLink(),
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
    { label: "Обо мне", href: "#about" },
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
    eyebrow: "01 / РЕАЛИЗОВАННЫЕ КЕЙСЫ",
    title: "Кейсы.",
    accent: "Что сделано и что это дало.",
    description:
      "Веб, AI-боты и автоматизация.\nВ каждой карточке — формат, суть работы и ценность для бизнеса.",
    all: "Все проекты",
    count: "проектов",
    details: "Подробнее о проекте",
    close: "Закрыть описание проекта",
    dialogValue: "Ценность для бизнеса",
    dialogTags: "Теги",
    discuss: "Обсудить похожую задачу",
    view: "Посмотреть проект",
  },
  stack: {
    eyebrow: "03 / ИНСТРУМЕНТЫ",
    title: "Правильный стек.",
    accent: "Сильный результат.",
    description:
      "Подбираю технологии под задачу. Соединяю их в одну работающую систему.",
  },
  contactSection: {
    eyebrow: "04 / ДАВАЙТЕ СОЗДАДИМ ЧТО-ТО КЛАССНОЕ",
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

export const categories = ["Web", "AI & Bots", "Automation"] as const;
// Тексты кейсов окончательные и согласованы с владельцем: формат, описание и ценность — его слова.
// Кейсы 02 и 03 сделаны на чужой платформе EasyLab: заявлена только своя часть работы.
export const projects: Project[] = [
  {
    id: "1c-portal",
    number: "01",
    category: "Web",
    label: "Web",
    format: "Масштабный многостраничный веб-ресурс",
    title: "Корпоративный портал 1С-решений",
    result: { text: "Понятный путь от каталога услуг до заявки" },
    description:
      "Разработка архитектуры под каталог B2B-услуг, кейсы внедрения 1С и лидогенерацию.",
    value:
      "Чёткая конверсионная структура для enterprise-сегмента, высокая скорость загрузки.",
    tags: ["Многостраничный сайт", "B2B", "Next.js", "TypeScript"],
  },
  {
    id: "web-quest",
    number: "02",
    category: "Web",
    label: "Web / Interactive",
    format: "Интерактивный браузерный квест",
    title: "Геймифицированный Web-квест",
    result: { text: "Вовлечение через игру вместо сухой теории" },
    description:
      "Разработка интерактивного сценария на базе платформы EasyLab: проектирование игрового обучающего сценария и механик вовлечения учеников.",
    value:
      "Высокий Retention и вовлечение пользователей через геймификацию вместо сухой теории.",
    tags: ["EasyLab", "Геймификация", "Игровая логика"],
  },
  {
    id: "webinar-landing",
    number: "03",
    category: "Web",
    label: "Web / EdTech",
    format: "Конверсионный промо-лендинг",
    title: "Интерактивный вебинарный лендинг",
    result: { text: "Из трафика — в регистрацию и на эфир" },
    description:
      "Разработка контентного модуля на базе платформы EasyLab: посадочный модуль под проведение вебинаров и открытых уроков онлайн-школы.",
    value:
      "Максимизация конверсии из трафика в регистрацию и присутствие на эфире.",
    tags: ["EasyLab", "Лендинг", "EdTech"],
  },
  {
    id: "materials-catalog",
    number: "04",
    category: "Web",
    label: "Web / E-commerce",
    format: "Коммерческий посадочный сайт",
    title: "Каталог стройматериалов с лидогенерацией",
    result: { value: "100%", text: "заявок фиксируются без задержек" },
    description:
      "Каталог оптово-розничной продажи с формой экспресс-расчёта и моментальной фиксацией входящих заявок в таблицы.",
    value:
      "100% лидов фиксируются без задержек и человеческого фактора.",
    tags: ["Каталог", "Форма расчёта", "Google Sheets", "Next.js"],
  },
  {
    id: "card-agent",
    number: "05",
    category: "AI & Bots",
    label: "AI",
    format: "Автономный генеративный агент",
    title: "AI-агент генерации образовательных карточек",
    result: { text: "В разы меньше рутины у методистов" },
    description:
      "Специализированный AI-ассистент на базе LLM для автоматического создания структурированных дидактических карточек и учебных заданий.",
    value:
      "Сокращение рутинного времени методистов на подготовку контента в разы.",
    tags: ["LLM", "Prompt Engineering", "AI Agents"],
  },
  {
    id: "school-assistant",
    number: "06",
    category: "AI & Bots",
    label: "AI / Bots",
    format: "Telegram-бот + LLM",
    title: "Школьный AI-ассистент & Инфо-хаб",
    result: { value: "80%", text: "типовых школьных вопросов — без участия человека" },
    description:
      "Цифровой хаб школы (расписание, звонки, меню столовой) со встроенной нейросетью-помощником для разбора учебных заданий.",
    value:
      "Круглосуточная автоматизация ответов на 80% типовых школьных вопросов.",
    tags: ["Telegram Bot API", "LLM", "Python"],
  },
  {
    id: "lead-bot-parser",
    number: "07",
    category: "AI & Bots",
    label: "AI / Bots",
    format: "Telegram-сервис + Parser",
    title: "Telegram-бот сбора заявок и парсер",
    result: { text: "Заявки и внешние данные — в одном канале" },
    description:
      "Бот сбора и квалификации входящих заявок, совмещённый с модулем парсинга данных с внешнего веб-ресурса.",
    value:
      "Автономный мониторинг внешних данных и агрегация заявок в единый канал.",
    tags: ["Telegram Bot API", "Парсинг", "Python"],
  },
  {
    id: "web-to-sheets",
    number: "08",
    category: "Automation",
    label: "Automation",
    format: "Конвейер интеграции (Webhooks / APIs)",
    title: "Сквозной пайплайн передачи данных (Web → Sheets)",
    result: { text: "Без ручного копирования контактов" },
    description:
      "Автоматизированный захват данных формы сайта, валидация и мгновенная запись в таблицы в реальном времени.",
    value:
      "Полное исключение ручного копирования контактов менеджерами.",
    tags: ["Webhooks", "REST APIs", "Google Sheets", "n8n"],
  },
  {
    id: "service-sync",
    number: "09",
    category: "Automation",
    label: "Automation",
    format: "Системный конвейер",
    title: "Автоматизация фоновой синхронизации сервисов",
    result: { text: "Служебные данные доходят сами" },
    description:
      "Фоновый скрипт/пайплайн обмена данными между внешними сервисами и рабочими чатами уведомлений.",
    value:
      "Бесперебойная синхронизация служебной информации без участия человека.",
    tags: ["n8n", "Docker", "Уведомления в чат"],
  },
];

// Каждая цифра подтверждается кейсом; первая считается из данных и растёт вместе с ними.
export const metrics = [
  {
    value: projects.length,
    prefix: "",
    suffix: "",
    label: "Реализованных кейсов",
    note: "Web, AI-боты и автоматизация",
  },
  {
    value: 100,
    prefix: "",
    suffix: "%",
    label: "Заявок фиксируются автоматически",
    note: "Кейс: каталог стройматериалов",
  },
  {
    value: 80,
    prefix: "",
    suffix: "%",
    label: "Типовых вопросов закрывает бот",
    note: "Кейс: школьный AI-ассистент",
  },
  {
    value: 24,
    prefix: "",
    suffix: "/7",
    label: "Работают AI-ассистенты",
    note: "Кейс: школьный AI-ассистент",
  },
];

// Направления — категории, в которых есть хотя бы один кейс (те же, что дают кнопки фильтра).
const directions = categories.filter((category) =>
  projects.some((project) => project.category === category),
);

// Тексты блока «Обо мне» окончательные и согласованы с владельцем: первый абзац — его фраза дословно.
// Должность в EasyCode не называется нигде. Числа кейсов и направлений считаются из данных.
export const about: {
  eyebrow: string;
  title: string;
  accent: string;
  paragraphs: string[];
  facts: { value: string; label: string }[];
  cta: string;
} = {
  eyebrow: "02 / ОБО МНЕ",
  title: "Молодой специалист.",
  accent: "Опыт — на реальных задачах.",
  paragraphs: [
    "Практический опыт работы в онлайн-школе программирования EasyCode: техническое сопровождение платформы, разработка интерактивных обучающих решений и интеграция AI-инструментов для автоматизации образовательного процесса.",
    "В EasyCode я год. Я в начале пути и говорю об этом прямо: беру задачи, на которых расту, и довожу их до работающего результата. Помимо основной работы стараюсь встраивать в школу продукты и решения, которые работают на удержание.",
  ],
  facts: [
    { value: "1 год", label: "в EasyCode" },
    { value: String(projects.length), label: "реализованных кейсов" },
    {
      value: String(directions.length),
      label: `направления: ${directions.join(", ")}`,
    },
    { value: "EdTech", label: "основная отрасль" },
  ],
  cta: "Написать в Telegram",
};

// Три группы стека: все технологии видны сразу. Новая технология — одна строка в items.
// Группа с пустым items на странице не рисуется.
export const stack: StackGroup[] = [
  {
    icon: "layers",
    name: "Frontend & UI",
    detail:
      "Интерфейсы, которые быстро загружаются и ведут посетителя к заявке.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: "workflow",
    name: "Backend & Automation",
    detail:
      "Связываю сервисы между собой, чтобы данные доходили без ручной работы.",
    items: ["Python", "n8n", "Docker", "REST APIs", "Webhooks"],
  },
  {
    icon: "sparkles",
    name: "AI & Integrations",
    detail: "Встраиваю нейросети в рабочие процессы и в Telegram.",
    items: [
      "LLM Orchestration",
      "Prompt Engineering",
      "AI Agents",
      "Telegram Bot API",
    ],
  },
];
