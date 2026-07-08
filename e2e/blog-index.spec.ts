import { test, expect } from "@playwright/test";

test.describe("Blog index page", () => {
  test("redirects from / to /b", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("/b/");
  });

  test("shows series sections with articles", async ({ page }) => {
    await page.goto("/b/");

    await expect(page.locator("h1")).toHaveText("Blog");

    await expect(page.locator("text=TypeScript Deep Dive")).toBeVisible();
    await expect(page.locator("text=React Patterns")).toBeVisible();

    const tsLink = page.locator("a[href='/b/ts-intro/']");
    await expect(tsLink).toContainText("TypeScript Basics");

    const reactLink = page.locator("a[href='/b/react-hooks/']");
    await expect(reactLink).toContainText("React Hooks Guide");
  });

  test("shows standalone articles", async ({ page }) => {
    await page.goto("/b/");

    const standaloneLink = page.locator("a[href='/b/my-first-post/']");
    await expect(standaloneLink).toContainText("My First Post");
  });

  test("navigates to article from index", async ({ page }) => {
    await page.goto("/b/");

    await page.locator("a[href='/b/ts-intro/']").click();
    await page.waitForURL("/b/ts-intro/");

    await expect(page.locator("h1")).toContainText("TypeScript Basics");
  });
});
