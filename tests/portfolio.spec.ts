import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { categories, copy, projects } from "../data/projects";

// Ожидаемое содержание — строки из спецификации, а не из модуля данных:
// название кейса, его фильтр и подкатегория.
const specCases = [
  ["Корпоративный портал 1С-решений", "Web", "Web"],
  ["Геймифицированный Web-квест", "Web", "Web / Interactive"],
  ["Интерактивный вебинарный лендинг", "Web", "Web / EdTech"],
  ["Каталог стройматериалов с лидогенерацией", "Web", "Web / E-commerce"],
  ["AI-агент генерации образовательных карточек", "AI & Bots", "AI"],
  ["Школьный AI-ассистент & Инфо-хаб", "AI & Bots", "AI / Bots"],
  ["Telegram-бот сбора заявок и парсер", "AI & Bots", "AI / Bots"],
  [
    "Сквозной пайплайн передачи данных (Web → Sheets)",
    "Automation",
    "Automation",
  ],
  ["Автоматизация фоновой синхронизации сервисов", "Automation", "Automation"],
] as const;
const specTitles = specCases.map(([title]) => title);
// Количества берутся из данных: десятый кейс не должен ломать тесты.
const padded = (count: number) => count.toString().padStart(2, "0");
const usedCategories = categories.filter((category) =>
  projects.some((project) => project.category === category),
);

test("renders portrait and contact links without overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(248, 250, 252)",
  );
  const portrait = page.getByRole("img", {
    name: "Портрет разработчика — TimA",
  });
  await expect(portrait).toBeVisible();
  await expect
    .poll(() =>
      portrait.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

// Тексты черновиков — из таблицы «Контакты» спецификации.
const generalDraft =
  "Здравствуйте! Пишу с вашего сайта-портфолио. Хочу обсудить проект.";
const personalChat = "https://t.me/opskeeper";

test("every contact link opens the personal Telegram chat with its own draft", async ({
  page,
}) => {
  await page.goto("/");
  const contact = { name: "Написать в Telegram" };
  for (const [link, draft] of [
    [
      page.locator(".site-header .contact-link"),
      "Здравствуйте! Пишу с вашего сайта-портфолио. Хочу обсудить сотрудничество.",
    ],
    [
      page.getByRole("link", { name: "Обсудить проект", exact: true }),
      "Здравствуйте! Посмотрел ваше портфолио и хочу обсудить проект.",
    ],
    [
      page.locator("#contact").getByRole("link", contact),
      "Здравствуйте! Есть идея, которую хочу реализовать. Давайте обсудим.",
    ],
    [page.locator(".quick-contact"), generalDraft],
  ] as const) {
    await expect(link).toHaveAttribute("target", "_blank");
    const url = new URL((await link.getAttribute("href"))!);
    expect(url.origin + url.pathname).toBe(personalChat);
    expect(url.searchParams.get("text")).toBe(draft);
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
    "Здравствуйте! Заинтересовал кейс «Сквозной пайплайн передачи данных (Web → Sheets)» в вашем портфолио. Хочу обсудить похожий проект.",
  );
  // Неизвестный идентификатор (в том числе прежнего кейса) ведёт как /tg.
  expect(await draft("/tg/corporate")).toBe(generalDraft);
  expect(await draft("/tg/no-such-case")).toBe(generalDraft);
});

test("cases section is headed by the agreed copy", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#projects");
  await expect(section.locator(".eyebrow").first()).toHaveText(
    "01 / РЕАЛИЗОВАННЫЕ КЕЙСЫ",
  );
  await expect(section.locator("h2").first()).toHaveText(
    /^Кейсы\.\s*Что сделано и что это дало\.$/,
  );
  await expect(section.locator(".section-description")).toHaveText(
    /^Веб, AI-боты и автоматизация\.\s*В каждой карточке — формат, суть работы и ценность для бизнеса\.$/,
  );
});

test("shows the real cases in order as text cards led by the result", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(projects.length);
  const titles = await cards.locator("h3").allTextContents();
  expect(titles.filter((title) => specTitles.includes(title as never))).toEqual(
    specTitles,
  );
  for (const [index, [title, , label]] of specCases.entries()) {
    const card = cards.filter({
      has: page.getByText(title, { exact: true }),
    });
    await expect(card.locator(".project-kicker")).toHaveText(
      new RegExp(`^${padded(index + 1)}\\s*${label}$`),
    );
  }
  // Первый кейс сверяется с таблицей «Содержания» целиком.
  const portal = cards.first();
  await expect(portal.locator(".project-result")).toHaveText(
    "Понятный путь от каталога услуг до заявки",
  );
  await expect(portal.locator(".project-description")).toHaveText(
    "Разработка архитектуры под каталог B2B-услуг, кейсы внедрения 1С и лидогенерацию.",
  );
  await expect(portal.locator(".project-format")).toHaveText(
    "Масштабный многостраничный веб-ресурс",
  );
  await expect(portal.locator(".project-tags span")).toHaveText([
    "Многостраничный сайт",
    "B2B",
    "Next.js",
    "TypeScript",
  ]);
  // Чисел в результатах только два, оба — из задачи.
  await expect(page.locator(".project-result strong")).toHaveText([
    "100%",
    "80%",
  ]);
  await expect(cards.nth(3).locator(".project-result")).toHaveText(
    /^100%\s*заявок фиксируются без задержек$/,
  );
  await expect(cards.nth(5).locator(".project-result")).toHaveText(
    /^80%\s*типовых школьных вопросов — без участия человека$/,
  );
  // Заявлена только своя часть работы на чужой платформе.
  await expect(cards.nth(1).locator(".project-description")).toHaveText(
    /^Разработка интерактивного сценария на базе платформы EasyLab:/,
  );
  await expect(cards.nth(2).locator(".project-description")).toHaveText(
    /^Разработка контентного модуля на базе платформы EasyLab:/,
  );
  const body = page.locator("body");
  await expect(body).not.toContainText(/движ[ок]/i);
  for (const gone of [
    "Больше, чем корпоративный сайт",
    "FORMA®",
    "ORBIT",
    "POINT.",
    "Концептуальное превью",
  ])
    await expect(body).not.toContainText(gone);
  await expect(page.locator(".project-preview")).toHaveCount(0);
  await expect(cards.locator("img")).toHaveCount(0);
  // Части карточки идут сверху вниз, результат — самый крупный текст.
  const layout = await cards.evaluateAll((nodes) =>
    nodes.map((node) => {
      const parts = [
        ".project-kicker",
        "h3",
        ".project-result",
        ".project-description",
        ".project-format",
        ".project-tags",
      ].map((selector) => node.querySelector(selector));
      const size = (element: Element) =>
        parseFloat(getComputedStyle(element).fontSize);
      const texts = [...node.querySelectorAll("*")].filter((element) =>
        [...element.childNodes].some(
          (child) => child.nodeType === 3 && child.textContent?.trim(),
        ),
      );
      const result = parts[2];
      return {
        tops: parts.map((part) =>
          part ? Math.round(part.getBoundingClientRect().top) : NaN,
        ),
        result: Math.max(
          0,
          ...texts
            .filter((element) => result?.contains(element))
            .map(size),
        ),
        rest: Math.max(
          0,
          ...texts
            .filter((element) => !result?.contains(element))
            .map(size),
        ),
      };
    }),
  );
  for (const card of layout) {
    expect(card.tops).toEqual([...card.tops].sort((a, b) => a - b));
    expect(new Set(card.tops).size).toBe(card.tops.length);
    expect(card.result).toBeGreaterThan(card.rest);
  }
});

test("filters show only categories with cases and announce the shown count", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator(".project-card");
  const counter = page.locator("#projects").getByRole("status");
  const shown = (count: number) => `${padded(count)} / ${copy.projects.count}`;
  await expect(page.locator(".filters button")).toHaveText([
    new RegExp(`^${copy.projects.all}\\s*${padded(projects.length)}$`),
    ...usedCategories,
  ]);
  await expect(cards).toHaveCount(projects.length);
  await expect(counter).toBeVisible();
  await expect(counter).toHaveAttribute("aria-live", "polite");
  await expect(counter).toHaveText(shown(projects.length));
  for (const name of usedCategories) {
    const count = projects.filter(
      (project) => project.category === name,
    ).length;
    const button = page.getByRole("button", { name, exact: true });
    await button.click();
    await expect(cards).toHaveCount(count);
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(counter).toHaveText(shown(count));
    for (const [title, filter] of specCases)
      await expect(
        cards.filter({
          has: page.getByText(title, { exact: true }),
        }),
      ).toHaveCount(filter === name ? 1 : 0);
  }
  await page.getByRole("button", { name: copy.projects.all }).click();
  await expect(cards).toHaveCount(projects.length);
});

test("reduced motion switches filters without animating the cards", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const cards = page.locator(".project-card");
  const first = usedCategories[0];
  await page.getByRole("button", { name: first, exact: true }).click();
  await expect(cards).toHaveCount(
    projects.filter((project) => project.category === first).length,
  );
  // Сразу после щелчка: все карточки на месте, без прозрачности и сдвига.
  const frames = await page.evaluate(async () => {
    document.querySelector<HTMLElement>(".filters button")!.click();
    const samples: { count: number; moving: number }[] = [];
    for (let frame = 0; frame < 3; frame += 1) {
      await new Promise(requestAnimationFrame);
      const nodes = [...document.querySelectorAll(".project-card")];
      samples.push({
        count: nodes.length,
        moving: nodes.filter((node) => {
          const style = getComputedStyle(node);
          return style.opacity !== "1" || style.transform !== "none";
        }).length,
      });
    }
    return samples;
  });
  expect(frames.at(-1)).toEqual({ count: projects.length, moving: 0 });
});

test("case grid is even: three, two and one column with equal rows", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const cards = page.locator(".project-card");
  const measure = () =>
    cards.evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          left: Math.round(rect.left),
          top: Math.round(rect.top),
          width: rect.width,
          height: rect.height,
        };
      }),
    );
  for (const [width, columns] of [
    [1440, 3],
    [768, 2],
    [320, 1],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(async () => new Set((await measure()).map((box) => box.left)).size)
      .toBe(columns);
    const boxes = await measure();
    const spread = (values: number[]) =>
      Math.max(...values) - Math.min(...values);
    // Выделенных (широких) карточек нет.
    expect(spread(boxes.map((box) => box.width))).toBeLessThanOrEqual(1);
    for (const top of new Set(boxes.map((box) => box.top)))
      expect(
        spread(
          boxes.filter((box) => box.top === top).map((box) => box.height),
        ),
      ).toBeLessThanOrEqual(1);
  }
  // На самом узком экране названия переносятся, а не обрезаются.
  expect(
    await cards
      .locator("h3")
      .evaluateAll((nodes) =>
        nodes.every(
          (node) =>
            node.scrollWidth <= node.clientWidth &&
            getComputedStyle(node).textOverflow !== "ellipsis",
        ),
      ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test("project dialog supports keyboard dismissal and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: `Подробнее о проекте: ${specTitles[0]}`,
  });
  const dialog = page.getByRole("dialog");
  const close = page.getByRole("button", { name: "Закрыть описание проекта" });
  const pageScroll = () => page.evaluate(() => document.body.style.overflow);
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press("Enter");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: specTitles[0], exact: true }),
  ).toBeVisible();
  await expect(close).toBeFocused();
  expect(await pageScroll()).toBe("hidden");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Обсудить похожую задачу" }),
  ).toBeFocused();
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

test("case dialog shows the business value and a Telegram draft naming the case", async ({
  page,
}) => {
  await page.goto("/");
  const title = "Школьный AI-ассистент & Инфо-хаб";
  await page
    .getByRole("button", { name: `Подробнее о проекте: ${title}` })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: title, exact: true }),
  ).toBeVisible();
  await expect(dialog.locator(".eyebrow")).toHaveText("AI / Bots");
  await expect(
    dialog.getByText("Telegram-бот + LLM", { exact: true }),
  ).toBeVisible();
  await expect(dialog.locator(".project-result")).toHaveText(
    /^80%\s*типовых школьных вопросов — без участия человека$/,
  );
  await expect(
    dialog.getByText(
      "Цифровой хаб школы (расписание, звонки, меню столовой) со встроенной нейросетью-помощником для разбора учебных заданий.",
    ),
  ).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Ценность для бизнеса" }),
  ).toBeVisible();
  await expect(
    dialog.getByText(
      "Круглосуточная автоматизация ответов на 80% типовых школьных вопросов.",
    ),
  ).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Теги" })).toBeVisible();
  await expect(dialog.locator(".project-tags span")).toHaveText([
    "Telegram Bot API",
    "LLM",
    "Python",
  ]);
  await expect(dialog.locator("img")).toHaveCount(0);
  await expect(dialog).not.toContainText(/превью/i);
  // Кнопка связи открывает личный чат с черновиком про этот кейс.
  const discuss = dialog.getByRole("link", { name: "Обсудить похожую задачу" });
  await expect(discuss).toHaveAttribute("target", "_blank");
  const url = new URL((await discuss.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe("https://t.me/opskeeper");
  expect(url.searchParams.get("text")).toBe(
    `Здравствуйте! Заинтересовал кейс «${title}» в вашем портфолио. Хочу обсудить похожий проект.`,
  );
  // «Посмотреть проект» есть только у кейса с заданной ссылкой.
  const linked = projects.find((project) => project.title === title)?.url;
  await expect(
    dialog.getByRole("link", { name: "Посмотреть проект" }),
  ).toHaveCount(linked ? 1 : 0);
});

test("reduced motion keeps final metrics and chips remain interactive", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#metrics").scrollIntoViewIfNeeded();
  // Первая цифра — число кейсов в данных; остальные и подписи — из «Содержания».
  await expect(page.locator(".metric-value")).toHaveText([
    projects.length.toString(),
    "100%",
    "80%",
    "24/7",
  ]);
  await expect(page.locator(".metric h3")).toHaveText([
    "Реализованных кейсов",
    "Заявок фиксируются автоматически",
    "Типовых вопросов закрывает бот",
    "Работают AI-ассистенты",
  ]);
  await expect(page.locator(".metric p")).toHaveText([
    "Web, AI-боты и автоматизация",
    "Кейс: каталог стройматериалов",
    "Кейс: школьный AI-ассистент",
    "Кейс: школьный AI-ассистент",
  ]);
  await expect(page.locator("#metrics")).not.toContainText(
    /8\+|нед\.|автономия/i,
  );
  expect(
    await page
      .locator(".float-badge")
      .first()
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.getByRole("button", { name: "Python & API" }).click();
  await expect(page.locator("#stack-detail")).toContainText(
    "Оркестрация сервисов",
  );
});

test("page and project dialog pass WCAG AA checks", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.locator(".project-open").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const dialogScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogScan.violations).toEqual([]);
});

test("layout fits narrow phones, tablets and large monitors", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      )
      .toBeLessThanOrEqual(0);
  }
});

test("metrics count on entering the viewport and settle at their target", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 500 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const samples = await page
    .locator(".metric-value")
    .nth(1)
    .evaluate(async (element) => {
      element.scrollIntoView({ behavior: "instant", block: "center" });
      const values: string[] = [];
      const started = performance.now();
      while (performance.now() - started < 2100) {
        values.push(element.textContent || "");
        await new Promise(requestAnimationFrame);
      }
      return values;
    });
  expect(samples.some((value) => parseInt(value) < 100)).toBe(true);
  expect(samples.at(-1)).toBe("100%");
});
