import { expect, test, type Page } from "@playwright/test";
import { categories, projects, stack } from "../data/projects";

const personalChat = "https://t.me/opskeeper";
const personalMax =
  "https://max.ru/u/f9LHodD0cOL3ZxdR2MdBHG-1wve5Qo86kG6e9FnepcXpbeAlAVVOr3iiv8o";
// Тексты черновиков — из описания дизайна, а не из модуля ссылок.
const generalDraft = "Здравствуйте! Пишу с вашего сайта. Хочу обсудить задачу.";
const isMobile = () => test.info().project.name === "mobile";
const overflow = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );

test("dark page shows the name, the portrait and no runtime errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Сайт, бот\s*и автоматизация —\s*в одних руках/,
  );
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(2, 4, 8)",
  );
  await expect(page.locator(".brand")).toHaveText(/Тим\s*Окунев/);
  const portrait = page.getByRole("img", { name: "Портрет — Тим Окунев" });
  await expect(portrait).toBeVisible();
  await expect
    .poll(() =>
      portrait.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  expect(await overflow(page)).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("hero shows no broken image when the portrait fails to load", async ({
  page,
}) => {
  await page.route(/portrait/, (route) => route.abort());
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-portrait")).toHaveCount(0);
});

test("every contact link opens the personal Telegram chat with its own draft", async ({
  page,
}) => {
  await page.goto("/");
  for (const [link, draft] of [
    [
      page.locator(".site-header .contact-link").first(),
      "Здравствуйте! Увидел ваш сайт. Хочу обсудить задачу.",
    ],
    [
      page.locator(".hero .contact-link"),
      "Здравствуйте! Посмотрел ваш сайт и хочу обсудить проект.",
    ],
    [
      page.locator("#contact .contact-link"),
      "Здравствуйте! Есть задача, которую хочу обсудить.",
    ],
    [page.locator(".quick-contact"), generalDraft],
  ] as const) {
    await expect(link).toHaveAttribute("target", "_blank");
    const url = new URL((await link.getAttribute("href"))!);
    expect(url.origin + url.pathname).toBe(personalChat);
    expect(url.searchParams.get("text")).toBe(draft);
  }
  // Второй канал — MAX: кнопка в блоке контакта и плавающая рядом с Telegram, без черновика.
  await expect(page.locator(".hero .contact-link")).toHaveText("Связаться");
  const max = page.locator('a[href*="max.ru"]');
  await expect(max).toHaveCount(2);
  for (const link of [
    page.locator("#contact").getByRole("link", { name: "Написать в MAX" }),
    page.locator(".quick-max"),
  ]) {
    await expect(link).toHaveAttribute("href", personalMax);
    await expect(link).toHaveAttribute("target", "_blank");
  }
  // Других адресов Telegram на странице нет, и ни один черновик не пуст.
  const links = await page
    .locator('a[href*="t.me"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
  expect(links.length).toBeGreaterThanOrEqual(4);
  for (const href of links) {
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe(personalChat);
    expect(url.searchParams.get("text")).toBeTruthy();
  }
});

test("short /tg addresses redirect to the personal chat", async ({
  request,
}) => {
  const draft = async (path: string) => {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    const url = new URL(response.headers().location);
    expect(url.origin + url.pathname).toBe(personalChat);
    return url.searchParams.get("text");
  };
  expect(await draft("/tg")).toBe(generalDraft);
  expect(await draft("/tg/web-to-sheets")).toBe(
    "Меня заинтересовал проект «Сайт → таблица», хочу сделать что-то подобное",
  );
  // Неизвестный идентификатор ведёт как /tg.
  expect(await draft("/tg/no-such-case")).toBe(generalDraft);
});

test("hero numbers count up and settle at 9 · 3 · до 80% · 24/7", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  // Для чтения с экрана значения сразу финальные; первые два считаются из данных.
  const used = categories.filter((category) =>
    projects.some((project) => project.category === category),
  );
  await expect(page.locator(".hero-number .sr-only")).toHaveText([
    String(projects.length),
    String(used.length),
    "до 80%",
    "24/7",
  ]);
  const samples = await page
    .locator(".hero-number-value")
    .nth(2)
    .evaluate(async (element) => {
      const values: string[] = [];
      const started = performance.now();
      while (performance.now() - started < 2600) {
        values.push(element.textContent || "");
        await new Promise(requestAnimationFrame);
      }
      return values;
    });
  const digits = (value: string) => parseInt(value.replace(/\D/g, ""), 10);
  expect(samples.some((value) => digits(value) < 80)).toBe(true);
  expect(digits(samples.at(-1)!)).toBe(80);
});

test("phone menu opens with the button, closes on Escape and after choosing a section", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Разделы" });
  const open = page.getByRole("button", { name: "Открыть меню" });
  if (!isMobile()) {
    await expect(nav.getByRole("link", { name: "Кейсы" })).toBeVisible();
    await expect(open).toBeHidden();
    return;
  }
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeHidden();
  await open.click();
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Обсудить задачу" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeHidden();
  await expect(open).toBeFocused();
  await open.click();
  await nav.getByRole("link", { name: "Обо мне" }).click();
  await expect(nav.getByRole("link", { name: "Кейсы" })).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("services and reasons show the agreed copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#services h2")).toHaveText(
    /Что могу\s*сделать для вас/,
  );
  await expect(page.locator("#services .tile h3")).toHaveText([
    "Сайты",
    "Боты",
    "Связки и интеграции",
    "Системы под ключ",
  ]);
  await expect(page.locator("#services .tile p").nth(3)).toHaveText(
    "Сайт, бот и связки в одной системе, которая упрощает работу бизнеса.",
  );
  await expect(page.locator("#why h2")).toHaveText(
    /Четыре причины\s*написать мне/,
  );
  await expect(page.locator("#why .tile h3")).toHaveText([
    "Всё в одних руках",
    "ИИ по делу",
    "Довожу до рабочего",
    "Говорю по-человечески",
  ]);
  // У каждой причины свой оттенок подсветки.
  const tints = await page
    .locator("#why .tile")
    .evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).getPropertyValue("--t").trim()),
    );
  expect(new Set(tints).size).toBe(4);
});

// Ожидаемое содержание — строки из описания дизайна: название, подпись категории, результат.
const specCases = [
  ["Портал 1С-услуг", "Сайты", "Понятный путь от услуги до заявки"],
  ["Обучающий веб-квест", "Сайты", "Учатся через игру, а не сухую теорию"],
  ["Лендинг для интенсива", "Сайты", "Посетители регистрируются и приходят на интенсив"],
  ["Каталог стройматериалов", "Сайты", "100% заявок доходят без потерь"],
  ["ИИ-агент учебных карточек", "Боты и ИИ", "У методистов в разы меньше рутины"],
  ["Школьный бот-помощник", "Боты и ИИ", "80% типовых вопросов — без человека"],
  ["Бот сбора заявок", "Боты и ИИ", "Заявки и данные — в одном канале"],
  ["Сайт → таблица", "Автоматизация", "20+ заявок за считаные минуты"],
  ["Синхронизация сервисов", "Автоматизация", "Информация доходит без участия человека"],
] as const;

test("shows the nine cases in order with what was done and the result", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator(".case-card");
  await expect(cards).toHaveCount(projects.length);
  for (const [index, [title, label, result]] of specCases.entries()) {
    const card = cards.nth(index);
    await expect(card.locator("h3")).toHaveText(title);
    await expect(card.locator(".case-kicker")).toContainText(
      `${String(index + 1).padStart(2, "0")} · ${label}`,
    );
    await expect(card.locator(".case-done")).toHaveText(projects[index].done);
    await expect(card.locator(".case-result")).toHaveText(result);
  }
  // Формат и технические теги с карточек ушли.
  await expect(page.locator("#projects")).not.toContainText("Next.js");
});

test("filters show only categories with cases and the right counts", async ({
  page,
}) => {
  await page.goto("/");
  const group = page.getByRole("group", { name: "Фильтр кейсов" });
  const used = categories.filter((category) =>
    projects.some((project) => project.category === category),
  );
  await expect(group.getByRole("button")).toHaveCount(used.length + 1);
  const labels = { Web: "Сайты", "AI & Bots": "Боты и ИИ", Automation: "Автоматизация" };
  for (const category of used) {
    const count = projects.filter((project) => project.category === category).length;
    const button = group.getByRole("button", { name: `${labels[category]} · ${count}` });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".case-card")).toHaveCount(count);
    await expect(page.locator("#projects [role=status]")).toHaveText(
      `Показано кейсов: ${count}`,
    );
  }
  await group.getByRole("button", { name: `Все · ${projects.length}` }).click();
  await expect(page.locator(".case-card")).toHaveCount(projects.length);
});

test("case grid is even: three, two and one column with equal rows", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [width, columns] of [
    [1440, 3],
    [900, 2],
    [390, 1],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    const boxes = await page
      .locator(".case-card")
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const { top, height } = node.getBoundingClientRect();
          return { top: Math.round(top), height: Math.round(height) };
        }),
      );
    const firstRow = boxes.filter((box) => box.top === boxes[0].top);
    expect(firstRow.length).toBe(columns);
    expect(new Set(firstRow.map((box) => box.height)).size).toBe(1);
  }
});

test("case dialog supports keyboard dismissal and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: `Открыть кейс: ${specCases[0][0]}`,
  });
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Закрыть" });
  const pageScroll = () => page.evaluate(() => document.body.style.overflow);
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press("Enter");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: specCases[0][0], exact: true }),
  ).toBeVisible();
  await expect(close).toBeFocused();
  expect(await pageScroll()).toBe("hidden");
  // Сколько бы ни нажимали Tab, фокус остаётся внутри окна.
  for (let step = 0; step < 4; step += 1) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await pageScroll()).toBe("");
  await trigger.click();
  await close.click();
  await expect(dialog).not.toBeVisible();
  // Щелчок мимо окна тоже закрывает его.
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("case dialog shows the details, the result and a Telegram draft naming the case", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Открыть кейс: Сайт → таблица" }).click();
  const dialog = page.getByRole("dialog");
  const draft =
    "Меня заинтересовал проект «Сайт → таблица», хочу сделать что-то подобное";
  await expect(dialog.locator(".eyebrow")).toHaveText("08 · Автоматизация");
  await expect(dialog).toContainText(
    "Менеджерам не нужно копировать контакты руками.",
  );
  await expect(dialog.locator(".dialog-result")).toHaveText(
    "20+ заявок за считаные минуты",
  );
  await expect(dialog.locator(".dialog-draft")).toContainText(draft);
  const link = dialog.getByRole("link", { name: "Написать в Telegram" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe(personalChat);
  expect(url.searchParams.get("text")).toBe(draft);
  // Публичной ссылки у кейса нет — нет и кнопки просмотра.
  await expect(dialog.getByRole("link", { name: "Посмотреть проект" })).toHaveCount(0);
});

test("case dialog scrolls on a low screen and keeps the Telegram button reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 700, height: 360 });
  await page.goto("/");
  await page.locator(".case-card").first().click();
  const link = page
    .getByRole("dialog")
    .getByRole("link", { name: "Написать в Telegram" });
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeInViewport();
});

test("process shows four steps: animated in order, at once with reduced motion", async ({
  page,
}) => {
  const steps = page.locator(".process-step");
  const opacities = () =>
    steps.evaluateAll((nodes) =>
      nodes.map((node) => Number(getComputedStyle(node).opacity)),
    );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(steps.locator("h3")).toHaveText([
    "Вы пишете",
    "Бриф",
    "План",
    "Готовый продукт",
  ]);
  expect(await opacities()).toEqual([1, 1, 1, 1]);
  expect(
    await page
      .locator(".process-dot")
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  // С движением плашки появляются по очереди, когда блок входит в окно просмотра.
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect((await opacities())[3]).toBe(0);
  await page.locator("#process").scrollIntoViewIfNeeded();
  await page.locator(".process").scrollIntoViewIfNeeded();
  await expect.poll(opacities, { timeout: 8000 }).toEqual([1, 1, 1, 1]);
});

test("about section names the author, shows three facts and no job details", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#about");
  await expect(section.locator("h2")).toHaveText(/Тим\s*Окунев/);
  await expect(section.locator(".about-text p:not(.eyebrow)")).toHaveText([
    "Разработчик сайтов, Telegram-ботов и автоматизации. Работаю в EdTech — в онлайн-школе программирования.",
    "Не делаю «сайт ради сайта». Беру задачу бизнеса: заявки теряются, на одни и те же вопросы отвечают вручную, данные переносят руками. Собираю систему, которая делает это сама, — и отдаю готовой к работе.",
  ]);
  await expect(section.locator(".about-tags li")).toHaveText([
    "Сайты",
    "Telegram-боты",
    "ИИ",
    "Интеграции",
    "Автоматизация",
    "EdTech",
  ]);
  const tools = stack.reduce((sum, group) => sum + group.items.length, 0);
  await expect(section.locator(".about-facts strong")).toHaveText([
    "3",
    String(tools),
    /~1\s*час/,
  ]);
  await expect(section.locator(".about-facts li").first()).toContainText(
    "ИИ-агент учебных карточек · веб-квест · лендинг для интенсива",
  );
  // Школа по названию, срок, должность и названия технологий на странице не встречаются.
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/EasyCode|должност|молодой специалист|Next\.js|n8n/i);
  // \b в JS не видит границ кириллических слов, поэтому границы заданы явно.
  expect(await section.innerText()).not.toMatch(
    /(?<![а-яё])(год|года|лет)(?![а-яё])/i,
  );
});
