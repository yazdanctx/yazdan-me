import { test, expect } from "@playwright/test";

test.describe("Article page", () => {
  test("renders article with correct title and content", async ({ page }) => {
    await page.goto("/b/my-first-post");

    await expect(page).toHaveTitle("My First Post");

    const heading = page.locator("h1");
    await expect(heading).toHaveText("My First Post");

    const date = page.locator("time");
    await expect(date).toContainText("2026-07-08");

    const description = page.locator("text=This is my first blog post on the new MDX-powered blog.");
    await expect(description).toBeVisible();

    const mdxContent = page.locator("text=Welcome to my blog!");
    await expect(mdxContent).toBeVisible();

    const codeBlock = page.locator("code");
    await expect(codeBlock).toContainText("function greet");
  });

  test("page has pitch black background", async ({ page }) => {
    await page.goto("/b/my-first-post");

    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  });

  test("shows 404 for non-existent article", async ({ page }) => {
    const response = await page.goto("/b/non-existent-article");

    expect(response?.status()).toBe(404);
  });
});
