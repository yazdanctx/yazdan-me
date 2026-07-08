import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npx serve@14 out -p 3000 --no-clipboard",
    port: 3000,
    cwd: ".",
    reuseExistingServer: !process.env.CI,
  },
});
