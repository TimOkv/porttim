import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../data/projects";

const telegram = "https://t.me/opskeeper";
const max =
  "https://max.ru/u/f9LHodD0cOL3ZxdR2MdBHG-1wve5Qo86kG6e9FnepcXpbeAlAVVOr3iiv8o";
const cases = (page: Page) =>
  page.getByRole("button", { name: /^Открыть кейс:/ });

test("main route serves the approved portfolio in its HTML", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toMatch(/<h1\b[^>]*>Тим Окунев<\/h1>/);
  expect(html).toContain("data-portfolio");
  expect(html).not.toContain("Matthew · Предпросмотр");
  expect(html).not.toMatch(/name="robots" content="[^"]*noindex/);
});

test("skip link bypasses header navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Перейти к содержимому", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Листайте вниз", exact: true }),
  ).toBeFocused();
});

test("approved design is the homepage without prototype controls", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Тим Окунев",
  );
  await expect(
    page.getByRole("img", { name: "Портрет — Тим Окунев" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Повторить анимации" }),
  ).toHaveCount(0);
  await expect(page.getByText("Matthew · Предпросмотр")).toHaveCount(0);
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]'),
  ).toHaveCount(0);
  await expect(page).toHaveTitle("Тим Окунев — сайты, боты и автоматизация");
  expect(errors).toEqual([]);
});

test("former preview redirects to the main portfolio", async ({ request }) => {
  const response = await request.get("/prototype/matthew", { maxRedirects: 0 });
  expect([307, 308]).toContain(response.status());
  expect(response.headers().location).toBe("/");
});

test("filters retain the correct cases and can restore the entire list", async ({
  page,
}) => {
  await page.goto("/");
  await expect(cases(page)).toHaveCount(projects.length);
  for (const [label, names] of [
    [
      "Боты и ИИ",
      [
        "ИИ-агент учебных карточек",
        "Школьный бот-помощник",
        "Бот сбора заявок",
      ],
    ],
    ["Автоматизация", ["Сайт → таблица", "Синхронизация сервисов"]],
  ] as const) {
    await page.getByRole("button", { name: new RegExp(`^${label}`) }).click();
    await expect(cases(page)).toHaveCount(names.length);
    for (const name of names)
      await expect(
        page.getByRole("button", {
          name: `Открыть кейс: ${name}`,
          exact: true,
        }),
      ).toBeVisible();
  }
  await page.getByRole("button", { name: /^Все/ }).click();
  await expect(cases(page)).toHaveCount(projects.length);
});

test("case details preserve the result and project-specific Telegram draft", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Открыть кейс: Сайт → таблица", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Сайт → таблица");
  await expect(dialog).toContainText("20+ заявок за минуты");
  const link = dialog.getByRole("link", {
    name: "Написать в Telegram",
    exact: true,
  });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe(telegram);
  expect(url.searchParams.get("text")).toBe(
    "Меня заинтересовал проект «Сайт → таблица», хочу сделать что-то подобное",
  );
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(
    dialog.getByRole("link", { name: "MAX", exact: true }),
  ).toHaveAttribute("href", max);
});

test("dialog keeps keyboard focus inside and restores the case on Escape", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Открыть кейс: Портал 1С-услуг",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Закрыть", exact: true });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "MAX", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("dialog actions remain reachable on a short screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 360 });
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Открыть кейс: Школьный бот-помощник",
      exact: true,
    })
    .click();
  const link = page
    .getByRole("dialog")
    .getByRole("link", { name: "Написать в Telegram", exact: true });
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeInViewport();
});

test("mobile menu closes on Escape and after choosing a section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "Открыть меню",
    exact: true,
  });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Разделы", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Кейсы", exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("name keeps moving when the page is stationary", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const marquee = page.locator("[data-name-marquee]");
  await expect(marquee).toBeVisible();
  const initial = await marquee.evaluate((e) => getComputedStyle(e).transform);
  await expect
    .poll(() => marquee.evaluate((e) => getComputedStyle(e).transform))
    .not.toBe(initial);
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("facts grow on scroll and settle at the factual values", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const counts = page.locator("[data-animated-count]");
  await expect(counts).toHaveText(["0", "0", "~0"]);
  await page.locator("[data-fact]").first().scrollIntoViewIfNeeded();
  await expect(counts).toHaveText(["3", "14", "~1"]);
});

test("reduced motion stops the marquee and shows final facts immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-name-marquee]")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator("[data-animated-count]")).toHaveText([
    "3",
    "14",
    "~1",
  ]);
  await expect(page.locator("[data-intro]")).toHaveCount(0);
  await page.locator("#process").scrollIntoViewIfNeeded();
  await expect(page.locator("#process h2")).toBeVisible();
  await expect(page.locator("#process h2")).toHaveCSS("opacity", "1");
});

test("portfolio remains readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator("[data-intro]")).not.toBeVisible();
  await expect(page.locator("[data-static-count]")).toHaveText([
    "3",
    "14",
    "~1",
  ]);
  await expect(page.locator("[data-static-count]").first()).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Открыть кейс: Сайт → таблица",
      exact: true,
    }),
  ).toHaveCSS("opacity", "1");
  await expect(page.locator("#about h2")).toHaveCSS("transform", "none");
  await expect(
    page
      .locator("#contact")
      .getByRole("link", { name: "Telegram", exact: true }),
  ).toBeVisible();
  await context.close();
});

test("failed portrait does not leave a broken image", async ({ page }) => {
  await page.route("**/_next/image?**", (route) => route.abort());
  await page.route("**/portfolio/tim-cutout.png", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.getByRole("img", { name: "Портрет — Тим Окунев" }),
  ).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Тим Окунев",
  );
});

test("reasons animate with pointer interaction and can receive keyboard focus", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const reason = page.getByRole("article", {
    name: "Всё в одних руках",
    exact: true,
  });
  await reason.scrollIntoViewIfNeeded();
  if (testInfo.project.name === "mobile") await reason.tap();
  else await reason.hover();
  await expect(reason).toHaveAttribute("data-active", "true");
  await reason.focus();
  await expect(reason).toBeFocused();
});

test("services include CRM and web panels without decorative numbering", async ({
  page,
}) => {
  await page.goto("/");
  const serviceTitles = page.locator("#services h3");
  await expect(serviceTitles).toHaveText([
    "Сайты",
    "Боты",
    "Связки и интеграции",
    "Системы под ключ",
    "CRM-системы",
    "Веб-панели",
  ]);
  for (const row of await cases(page).all())
    expect((await row.innerText()).trim()).not.toMatch(/^0\d\s/);
  await expect(page.locator("#process")).not.toContainText(/Шаг\s*0\d/i);
});

test("layout fits phone, tablet and desktop widths", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  for (const width of testInfo.project.name === "mobile"
    ? [320, 390]
    : [768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const section of [
      "#top",
      "#projects",
      "#why",
      "#process",
      "#contact",
    ]) {
      await page.locator(section).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(0);
    }
  }
});

test("page and dialog pass WCAG AA checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const audit = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  expect((await audit()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Открыть кейс: Сайт → таблица", exact: true })
    .click();
  expect((await audit()).violations).toEqual([]);
});

test("contact links point to both personal chats and keep the Telegram draft", async ({
  page,
}) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact).toContainText("Отвечу в Telegram и MAX");
  const link = contact.getByRole("link", { name: "Telegram", exact: true });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe(telegram);
  expect(url.searchParams.get("text")).toBe(
    "Здравствуйте! Есть задача, которую хочу обсудить.",
  );
  await expect(
    contact.getByRole("link", { name: "MAX", exact: true }),
  ).toHaveAttribute("href", max);
});

test("short Telegram routes preserve their drafts", async ({ request }) => {
  for (const [path, draft] of [
    ["/tg", "Здравствуйте! Пишу с вашего сайта. Хочу обсудить задачу."],
    [
      "/tg/no-such-case",
      "Здравствуйте! Пишу с вашего сайта. Хочу обсудить задачу.",
    ],
    [
      "/tg/web-to-sheets",
      "Меня заинтересовал проект «Сайт → таблица», хочу сделать что-то подобное",
    ],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    const url = new URL(response.headers().location);
    expect(url.origin + url.pathname).toBe(telegram);
    expect(url.searchParams.get("text")).toBe(draft);
  }
});
