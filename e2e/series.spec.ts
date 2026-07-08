import { test, expect } from "@playwright/test";

test.describe("Series index page", () => {
  test("lists all parts of a series in order", async ({ page }) => {
    await page.goto("/b/series/typescript-deep-dive/");

    await expect(page.locator("h1")).toHaveText("TypeScript Deep Dive");

    const links = page.locator("[data-testid='series-part-link']");
    await expect(links).toHaveCount(2);

    await expect(links.nth(0)).toContainText("Part 1");
    await expect(links.nth(0)).toContainText("TypeScript Basics");

    await expect(links.nth(1)).toContainText("Part 2");
    await expect(links.nth(1)).toContainText("TypeScript Generics");
  });

  test("returns 404 for non-existent series", async ({ page }) => {
    const response = await page.goto("/b/series/non-existent-series/");

    expect(response?.status()).toBe(404);
  });
});

test.describe("Series navigation on article pages", () => {
  test("first part shows only next link", async ({ page }) => {
    await page.goto("/b/ts-intro/");

    const prevLink = page.locator("[data-testid='series-prev']");
    const nextLink = page.locator("[data-testid='series-next']");

    await expect(prevLink).toHaveCount(0);
    await expect(nextLink).toContainText("TypeScript Generics");
  });

  test("last part shows only prev link", async ({ page }) => {
    await page.goto("/b/ts-generics/");

    const prevLink = page.locator("[data-testid='series-prev']");
    const nextLink = page.locator("[data-testid='series-next']");

    await expect(prevLink).toContainText("TypeScript Basics");
    await expect(nextLink).toHaveCount(0);
  });

  test("navigates to next part via next link", async ({ page }) => {
    await page.goto("/b/ts-intro/");

    await page.locator("[data-testid='series-next'] a").click();
    await page.waitForURL("/b/ts-generics/");

    await expect(page.locator("h1")).toContainText("TypeScript Generics");
  });

  test("navigates to previous part via prev link", async ({ page }) => {
    await page.goto("/b/ts-generics/");

    await page.locator("[data-testid='series-prev'] a").click();
    await page.waitForURL("/b/ts-intro/");

    await expect(page.locator("h1")).toContainText("TypeScript Basics");
  });

  test("standalone article shows no series navigation", async ({ page }) => {
    await page.goto("/b/my-first-post/");

    const prevLink = page.locator("[data-testid='series-prev']");
    const nextLink = page.locator("[data-testid='series-next']");

    await expect(prevLink).toHaveCount(0);
    await expect(nextLink).toHaveCount(0);
  });
});
