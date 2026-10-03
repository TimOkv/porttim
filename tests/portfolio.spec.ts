import { expect, test, type Page } from "@playwright/test";
import { categories, projects } from "../data/projects";

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
