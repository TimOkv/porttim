import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
  for (const link of await page.locator('a[href^="https://t.me/"]').all()) {
    const url = new URL((await link.getAttribute("href"))!);
    expect(url.pathname).toBe("/opskeeper");
    expect(url.searchParams.get("text")).toContain("проект");
  }
  expect(
    await page.locator('a[href^="https://t.me/"]').count(),
  ).toBeGreaterThanOrEqual(4);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("all categories filter the nine cases and restore the grid", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(9);
  for (const [name, count] of [
    ["Web", 4],
    ["AI & Bots", 3],
    ["Automation", 2],
  ] as const) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(
      page.getByRole("button", { name, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Все проекты" }).click();
  await expect(page.locator(".project-card")).toHaveCount(9);
});

test("project dialog supports keyboard dismissal and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Подробнее о проекте: Больше, чем корпоративный сайт",
  });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("heading", {
      name: "Больше, чем корпоративный сайт",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Закрыть описание проекта" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Обсудить похожую задачу" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Закрыть описание проекта" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Закрыть описание проекта" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("reduced motion keeps final metrics and chips remain interactive", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#metrics").scrollIntoViewIfNeeded();
  await expect(page.locator(".metric-value")).toHaveText([
    "8+",
    "100%",
    "< 2 нед.",
    "24/7",
  ]);
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
