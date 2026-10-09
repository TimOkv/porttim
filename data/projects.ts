import { maxLink } from "@/lib/max";
import { getContactLink } from "@/lib/telegram";

export type Category = "Web" | "AI & Bots" | "Automation";
export type Project = {
  id: string;
  number: string;
  // Фильтр в сетке кейсов.
  category: Category;
  title: string;
  // Что сделано — одна строка на карточке.
  done: string;
  // Результат. value — только число, названное владельцем; у остальных результат сказан словами.
  result: { value?: string; text: string };
  // Подробное описание для окна кейса.
  details: string;
  // Публичная ссылка: с ней в окне кейса появляется кнопка «Посмотреть проект».
  url?: string;
};

export const profile = {
  name: process.env.NEXT_PUBLIC_PROFILE_NAME || "Тим Окунев",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_SRC || "/portfolio/tim-cutout.png",
  // Ссылку строит модуль ссылок: имя аккаунта и правило его проверки живут только там.
  telegram: getContactLink(),
  max: maxLink,
};

export const copy = {
  metadata: {
    title: `${profile.name} — сайты, боты и автоматизация`,
    description:
      "Разрабатываю сайты, Telegram-ботов и системы автоматизации под задачи бизнеса. Сдаю то, чем уже можно пользоваться.",
  },
  skip: "Перейти к содержимому",
  navigation: "Разделы",
  menuOpen: "Открыть меню",
  menuClose: "Закрыть меню",
  nav: [
    { label: "Услуги", href: "#services" },
    { label: "Кейсы", href: "#projects" },
    { label: "Подход", href: "#process" },
    { label: "Обо мне", href: "#about" },
  ],
  contact: "Написать в Telegram",
  contactMax: "Написать в MAX",
  quickContact: "Написать",
  hero: {
    eyebrow: "Сайты · Боты · Интеграции · Автоматизация",
    title: ["Сайт, бот", "и автоматизация —"],
    accent: "в одних руках",
    description:
      "Разрабатываю сайты, Telegram-ботов и связки между сервисами. Собираю из них целые системы автоматизации под задачи бизнеса. Сдаю то, чем уже можно пользоваться.",
    primary: "Связаться",
    secondary: "Смотреть кейсы",
    portraitAlt: `Портрет — ${profile.name}`,
    numbersLabel: "Коротко в цифрах",
  },
  services: { eyebrow: "Услуги", title: "Что могу", accent: "сделать для вас" },
  projects: {
    eyebrow: "Кейсы",
    title: "Что сделано",
    accent: "и что это дало",
    all: "Все",
    filterLabel: "Фильтр кейсов",
    shown: "Показано кейсов",
    done: "Сделано",
    result: "Результат",
    details: "Открыть кейс",
    close: "Закрыть",
    dialogDone: "Что сделано",
    dialogResult: "Что это дало",
    draftHint: "В чате уже будет набран текст:",
    view: "Посмотреть проект",
  },
  why: { eyebrow: "Почему я", title: "Четыре причины", accent: "написать мне" },
  process: {
    eyebrow: "Как строится работа",
    title: "От сообщения",
    accent: "до готового продукта",
  },
  about: { eyebrow: "Обо мне" },
  contactSection: {
    eyebrow: "Напишите мне",
    title: "Есть",
    accent: "задача?",
    description:
      "Расскажите в двух словах, что нужно. Отвечу в Telegram и MAX — предложу, как это сделать.",
    unavailable:
      "Прямой контакт появится здесь после добавления Telegram-адреса.",
  },
  footer: { rights: "Сайты · Боты · Автоматизация", toTop: "Наверх" },
};

export const categories = ["Web", "AI & Bots", "Automation"] as const;
// Ключи категорий остаются прежними; на странице — эти подписи.
export const categoryLabels: Record<Category, string> = {
  Web: "Сайты",
  "AI & Bots": "Боты и ИИ",
  Automation: "Автоматизация",
};

// Тексты кейсов согласованы с владельцем 2026-10-04.
// Кейсы 02 и 03 сделаны на чужой платформе EasyLab: заявлена только своя часть работы.
export const projects: Project[] = [
  {
    id: "1c-portal",
    number: "01",
    category: "Web",
    title: "Портал 1С-услуг",
    done: "Сайт с услугами и примерами внедрений 1С.",
    result: { text: "От услуги — к заявке" },
    details:
      "Многостраничный сайт для компании по внедрению 1С: услуги, примеры работ и формы заявок. Быстро открывается и помогает найти услугу.",
  },
  {
    id: "web-quest",
    number: "02",
    category: "Web",
    title: "Обучающий веб-квест",
    done: "Сценарий и механики квеста на EasyLab.",
    result: { text: "Обучение через игру" },
    details:
      "Придумал сценарий и игровые механики для учеников онлайн-школы. Собрал квест на платформе EasyLab.",
  },
  {
    id: "webinar-landing",
    number: "03",
    category: "Web",
    title: "Лендинг для интенсива",
    done: "Страница интенсива на EasyLab.",
    result: { text: "Регистрация и участие в интенсиве" },
    details:
      "Страница интенсива онлайн-школы на EasyLab. Помогает зарегистрироваться и прийти на интенсив.",
  },
  {
    id: "materials-catalog",
    number: "04",
    category: "Web",
    title: "Каталог стройматериалов",
    done: "Каталог, быстрый расчёт и заявки в таблицу.",
    result: { value: "100%", text: "заявок без потерь" },
    details:
      "Каталог стройматериалов для опта и розницы с быстрым расчётом. Заявки сразу попадают в таблицу.",
  },
  {
    id: "card-agent",
    number: "05",
    category: "AI & Bots",
    title: "ИИ-агент учебных карточек",
    done: "ИИ готовит учебные карточки и задания.",
    result: { text: "В разы меньше рутины у методистов" },
    details: "Нейросеть готовит учебные карточки и задания в нужной структуре.",
  },
  {
    id: "school-assistant",
    number: "06",
    category: "AI & Bots",
    title: "Школьный бот-помощник",
    done: "Бот: расписание, звонки, меню и помощь с заданиями.",
    result: { value: "80%", text: "типовых вопросов — автоматически" },
    details:
      "Круглосуточный Telegram-бот: расписание, звонки и меню столовой. Нейросеть помогает с заданиями.",
  },
  {
    id: "lead-bot-parser",
    number: "07",
    category: "AI & Bots",
    title: "Бот сбора заявок",
    done: "Бот сортирует заявки и собирает данные с сайта.",
    result: { text: "Заявки и данные в одном канале" },
    details:
      "Telegram-бот уточняет заявки и отбирает целевые. Также следит за данными на внешнем сайте и собирает их.",
  },
  {
    id: "web-to-sheets",
    number: "08",
    category: "Automation",
    title: "Сайт → таблица",
    done: "Проверка заявки и запись в таблицу.",
    result: { value: "20+", text: "заявок за минуты" },
    details:
      "Заявки с сайта автоматически проверяются и записываются в таблицу. Менеджеры не копируют контакты вручную.",
  },
  {
    id: "service-sync",
    number: "09",
    category: "Automation",
    title: "Синхронизация сервисов",
    done: "Обмен данными и уведомления в чат.",
    result: { text: "Данные приходят автоматически" },
    details:
      "Сервисы автоматически обмениваются данными и присылают уведомления в рабочие чаты.",
  },
];

// Направления — категории, в которых есть хотя бы один кейс (те же, что дают кнопки фильтра).
const directions = categories.filter((category) =>
  projects.some((project) => project.category === category),
);

// Цифры первого экрана обобщённые; первые две считаются из данных и растут вместе с ними.
export const heroNumbers = [
  { value: projects.length, prefix: "", suffix: "", label: "готовых проектов" },
  {
    value: directions.length,
    prefix: "",
    suffix: "",
    label: "направления: сайты, боты, автоматизация",
  },
  { value: 80, prefix: "до", suffix: "%", label: "рутины забирает автоматика" },
  { value: 24, prefix: "", suffix: "/7", label: "всё работает без вас" },
];

export const services: {
  icon: "window" | "send" | "workflow" | "blocks" | "crm" | "panel";
  name: string;
  text: string;
}[] = [
  {
    icon: "window",
    name: "Сайты",
    text: "Лендинги, многостраничные сайты, платформы. С приёмом заявок или без.",
  },
  { icon: "send", name: "Боты", text: "Telegram-боты под любые задачи бизнеса." },
  {
    icon: "workflow",
    name: "Связки и интеграции",
    text: "Сервисы сами обмениваются данными. Настраиваю под ваш запрос.",
  },
  {
    icon: "blocks",
    name: "Системы под ключ",
    text: "Сайт, бот и связки в одной системе, которая упрощает работу бизнеса.",
  },
  {
    icon: "crm",
    name: "CRM-системы",
    text: "Создаю CRM под ваш запрос: для работы с клиентами, заявками и процессами.",
  },
  {
    icon: "panel",
    name: "Веб-панели",
    text: "Панели для управления и отслеживания нужных показателей — под ваши задачи.",
  },
];

// tint — оттенок, которым плашка загорается при наведении.
export const why = [
  {
    title: "Всё в одних руках",
    text: "Сайт, бот и связка между ними — один человек, а не три подрядчика.",
    tint: "#5B72FF",
  },
  {
    title: "ИИ по делу",
    text: "Ставлю нейросеть туда, где она снимает рутину, а не «чтобы было».",
    tint: "#F5A430",
  },
  {
    title: "Довожу до рабочего",
    text: "Сдаю не макет и не «почти готово», а то, чем уже пользуются.",
    tint: "#B49DFF",
  },
  {
    title: "Говорю по-человечески",
    text: "Без терминов: что сделаю, зачем это нужно и что вы получите.",
    tint: "#2FCB9B",
  },
];

export const processSteps = [
  { title: "Вы пишете", text: "Описываете задачу своими словами." },
  { title: "Бриф", text: "Изучаю вводные и задаю уточняющие вопросы." },
  { title: "План", text: "Обсуждаем решение, инструменты и порядок работы." },
  {
    title: "Готовый продукт",
    text: "Разработка, интеграции и передача того, чем уже можно пользоваться.",
  },
];

// На странице технологии не называются: массив — источник числа «инструментов в работе».
// Новая технология — одна строка в items.
export const stack: { name: string; items: string[] }[] = [
  {
    name: "Frontend & UI",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend & Automation",
    items: ["Python", "n8n", "Docker", "REST APIs", "Webhooks"],
  },
  {
    name: "AI & Integrations",
    items: [
      "LLM Orchestration",
      "Prompt Engineering",
      "AI Agents",
      "Telegram Bot API",
    ],
  },
];
export const stackCount = stack.reduce((sum, group) => sum + group.items.length, 0);

// Свои продукты владельца в онлайн-школе — его слова.
const ownProducts = [
  "ИИ-агент учебных карточек",
  "веб-квест",
  "лендинг для интенсива",
];

// Школа по названию и должность не называются нигде.
export const about: {
  paragraphs: string[];
  tags: string[];
  facts: { value: string; unit?: string; label: string; note?: string; color: string }[];
} = {
  paragraphs: [
    "Разработчик сайтов, Telegram-ботов и автоматизации. Работаю в EdTech — в онлайн-школе программирования.",
    "Не делаю «сайт ради сайта». Беру задачу бизнеса: заявки теряются, на одни и те же вопросы отвечают вручную, данные переносят руками. Собираю систему, которая делает это сама, — и отдаю готовой к работе.",
  ],
  tags: ["Сайты", "Telegram-боты", "ИИ", "Интеграции", "Автоматизация", "EdTech"],
  facts: [
    {
      value: String(ownProducts.length),
      label: "своих продукта в онлайн-школе",
      note: ownProducts.join(" · "),
      color: "#8FA2FF",
    },
    {
      value: String(stackCount),
      label: "инструментов в работе",
      note: "От сайта до нейросети — подбираю под задачу",
      color: "#F5C26B",
    },
    { value: "~1", unit: "час", label: "до ответа в Telegram", color: "#CDBFFF" },
  ],
};

// Утверждённый владельцем дизайн основной страницы, 2026-10-09.
export const portfolioCopy = {
  intro: "Портфолио",
  monogram: "ТО",
  scroll: "Листайте вниз",
  aboutTitle: "Обо мне",
  worksTitle: "Кейсы",
  servicesTitle: "Что делаю",
  whyTitle: "Почему я",
  processTitle: ["От идеи", "до запуска"],
  contactTitle: ["Есть", "задача?"],
  contactShort: "Обсудим",
  contactTelegram: "Telegram",
  contactMax: "MAX",
  reasonHint: "Наведите или коснитесь",
  reference: "Дизайн по референсу Matthew / Muhammad Aseif",
};

// Данные сохранённого прототипа; его адрес перенаправляет на основную страницу.
export const matthewPreviewCopy = {
  ...portfolioCopy,
  title: "Тим Окунев — Matthew / предпросмотр",
  label: "Matthew · Предпросмотр",
  back: "Текущая версия",
  replay: "Повторить анимации",
  contactDescription: copy.contactSection.description,
  additionalServices: services.filter(service => service.icon === "crm" || service.icon === "panel"),
};
